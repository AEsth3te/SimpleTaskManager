const Task = require('../models/task');



// GET /tasks endpoint
exports.getAllTasks = async (req, res) => {

    const tasks = await Task.findAll();
    res.json(tasks);
};

// POST /tasks endpoint
exports.createTask = async (req, res) => {
    const { taskName, taskDesc, isTaskCompleted } = req.body;
    const newTask = await Task.create({
        taskName,
        taskDesc,
        isTaskCompleted
    });
    res.status(201).json(newTask);
};

// PUT /tasks/:id endpoint
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { taskName, taskDesc, isTaskCompleted } = req.body;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Оновлюємо тільки ті поля, які реально прийшли у запиті
        if (taskName !== undefined) {
            task.taskName = taskName;
        }
        if (taskDesc !== undefined) {
            task.taskDesc = taskDesc;
        }
        if (isTaskCompleted !== undefined) {
            task.isTaskCompleted = isTaskCompleted;
        }

        await task.save();
        res.json(task);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// DELETE /tasks/:id endpoint
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const deletedTask = await Task.destroy({
        where: { idtask: id }
    });

    if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
    } else {
        res.json({ message: "Task deleted successfully" });
    }
}