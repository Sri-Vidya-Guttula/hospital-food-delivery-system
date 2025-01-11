// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const MealDelivery = require('../models/mealDeliveryModel')
// User registration
exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

exports.getAssignedMealDeliveries = async (req, res) => {
  try {
    const pantryStaffId = req.params; // Access user ID from req.user
    const deliveries = await MealDelivery.find({ pantryStaff: pantryStaffId });
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meal deliveries', error });
  }
};