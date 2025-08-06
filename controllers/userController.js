const { response } = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ where: { username} });

    if(!user){
      return res.status(401).json({message: 'User not found'});
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if(!isPassValid){
      return res.status(401).json({message: 'Invalid password'})
    }
    
    const token = jwt.sign({ id: user.id, username: user.username }, 'access', {
      expiresIn: '1h'
    });

    return res.status(200).json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Remove session cookie
    res.status(200).json({ message: 'User logged out' });
  });
};

exports.registration = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
