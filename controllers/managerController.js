// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Patient = require('../models/patientModel');
const PantryStaff = require('../models/pantryStaffModel');
const MealDelivery = require('../models/mealDeliveryModel');
const DietChart = require('../models/dietChartModel');
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



// Add a new patient
exports.addPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({ message: 'Patient added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding patient', error });
  }
};

// Get all patients
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error });
  }
};

//Get individual patient details 
exports.getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error });
  }
};

// Update patient details
exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: 'Patient updated successfully', updatedPatient });
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient', error });
  }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error });
  }
};



// Add a new pantry staff member
exports.addPantryStaff = async (req, res) => {
  try {
    const newPantryStaff = new PantryStaff(req.body);
    await newPantryStaff.save();
    res.status(201).json({ message: 'Pantry staff added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding pantry staff', error });
  }
};

// Get all pantry staff members
exports.getPantryStaff = async (req, res) => {
  try {
    const pantryStaff = await PantryStaff.find();
    res.status(200).json(pantryStaff);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pantry staff', error });
  }
};

// Update pantry staff details
exports.updatePantryStaff = async (req, res) => {
  try {
    const updatedPantryStaff = await PantryStaff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: 'Pantry staff updated successfully', updatedPantryStaff });
  } catch (error) {
    res.status(500).json({ message: 'Error updating pantry staff', error });
  }
};

// Delete a pantry staff member
exports.deletePantryStaff = async (req, res) => {
  try {
    await PantryStaff.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Pantry staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pantry staff', error });
  }
};



// Add a new meal delivery
exports.addMealDelivery = async (req, res) => {
  try {
    const newMealDelivery = new MealDelivery(req.body);
    await newMealDelivery.save();
    res.status(201).json({ message: 'Meal delivery added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding meal delivery', error });
  }
};

// Get all meal deliveries
exports.getMealDeliveries = async (req, res) => {
  try {
    const mealDeliveries = await MealDelivery.find()
      .populate('patient')
      .populate('dietChart')
      .populate('pantryStaff');
    res.status(200).json(mealDeliveries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meal deliveries', error });
  }
};

// Update meal delivery status
exports.updateMealDelivery = async (req, res) => {
  try {
    const updatedMealDelivery = await MealDelivery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: 'Meal delivery updated successfully', updatedMealDelivery });
  } catch (error) {
    res.status(500).json({ message: 'Error updating meal delivery', error });
  }
};

// Delete a meal delivery
exports.deleteMealDelivery = async (req, res) => {
  try {
    await MealDelivery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Meal delivery deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meal delivery', error });
  }
};



// Add a new diet chart
exports.addDietChart = async (req, res) => {
  try {
    const newDietChart = new DietChart(req.body);
    await newDietChart.save();
    res.status(201).json({ message: 'Diet chart added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding diet chart', error });
  }
};

// Get diet charts by patient ID
exports.getDietChartsByPatient = async (req, res) => {
  try {
    const dietCharts = await DietChart.find({ patient: req.params.patientId });
    res.status(200).json(dietCharts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching diet charts', error });
  }
};

// Update a diet chart
exports.updateDietChart = async (req, res) => {
  try {
    const updatedDietChart = await DietChart.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: 'Diet chart updated successfully', updatedDietChart });
  } catch (error) {
    res.status(500).json({ message: 'Error updating diet chart', error });
  }
};

// Delete a diet chart
exports.deleteDietChart = async (req, res) => {
  try {
    await DietChart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Diet chart deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting diet chart', error });
  }
};
