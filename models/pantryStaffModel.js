// models/pantryStaffModel.js
const mongoose = require('mongoose');

const pantryStaffSchema = new mongoose.Schema({
  name: String,
  contactInfo: String,
  location: String,
  tasks: [String],
});

module.exports = mongoose.model('PantryStaff', pantryStaffSchema);
