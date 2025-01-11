const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  diseases: [String],
  allergies: [String],
  roomNumber: String,
  bedNumber: String,
  floorNumber: String,
  age: Number,
  gender: String,
  contactInfo: String,
  emergencyContact: String,
  // Add more fields as necessary
});

module.exports = mongoose.model('Patient', patientSchema);
