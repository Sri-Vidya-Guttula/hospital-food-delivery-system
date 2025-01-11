// routes/pantryRoutes.js
const express = require('express');
const router = express.Router();
const authPantryMiddleware = require('../middlewares/authPantry');
const pantryController = require('../controllers/pantryController');


router.post('/register', pantryController.register);
router.post('/login', pantryController.login);
// Meal preparation tasks routes
router.get('/get-meal-deliveries', authPantryMiddleware, pantryController.getAssignedMealDeliveries);
// router.put('/meal-preparation-tasks/:taskId', authPantryMiddleware, pantryController.updatePreparationStatus);

// // Delivery personnel routes
// router.post('/delivery-personnel', authPantryMiddleware, pantryController.addDeliveryPersonnel);
// router.get('/delivery-personnel', authPantryMiddleware, pantryController.getDeliveryPersonnel);
// router.put('/delivery-personnel/:id', authPantryMiddleware, pantryController.updateDeliveryPersonnel);
// router.delete('/delivery-personnel/:id', authPantryMiddleware, pantryController.deleteDeliveryPersonnel);

// // Meal delivery routes
// router.post('/assign-meal-box', authPantryMiddleware, pantryController.assignMealBox);
// router.get('/track-meal-deliveries', authPantryMiddleware, pantryController.trackMealDeliveries);
// router.put('/meal-deliveries/:id', authPantryMiddleware, pantryController.updateMealDeliveryStatus);

module.exports = router;
