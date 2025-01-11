const mongoose = require('mongoose');

const dietChartSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  morningMeal: { type: String, required: true },
  eveningMeal: { type: String, required: true },
  nightMeal: { type: String, required: true },
  morningIngredients: [String],
  eveningIngredients: [String],
  nightIngredients: [String],
  morningInstructions: String,
  eveningInstructions: String,
  nightInstructions: String,
  // Add more fields as necessary
});

module.exports = mongoose.model('DietChart', dietChartSchema);
