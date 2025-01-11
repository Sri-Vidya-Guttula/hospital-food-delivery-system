const mongoose = require('mongoose');

const mealDeliverySchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  dietChart: { type: mongoose.Schema.Types.ObjectId, ref: 'DietChart', required: true },
  pantryStaff: { type: mongoose.Schema.Types.ObjectId, ref: 'PantryStaff', required: true },
  deliveryStatus: { type: String, enum: ['Pending', 'In Progress', 'Delivered'], default: 'Pending' },
  deliveryTime: Date,
  // Add more fields as necessary
});

module.exports = mongoose.model('MealDelivery', mealDeliverySchema);
