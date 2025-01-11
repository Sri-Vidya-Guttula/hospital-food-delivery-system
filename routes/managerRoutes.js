// routes/managerRoutes.js
const express = require('express');
const router = express.Router();
const authManagerMiddleware = require('../middlewares/authManager');
const { register, login , addPatient, getPatients} = require('../controllers/managerController');

const managerController = require('../controllers/managerController');

router.post('/register', register);
router.post('/login', login);


router.post('/patients', authManagerMiddleware, addPatient);
router.get('/patients', authManagerMiddleware, getPatients);
router.get('/patients/:id', authManagerMiddleware, managerController.getPatientById);
router.put('/patients/:id', authManagerMiddleware, managerController.updatePatient);
router.delete('/patients/:id', authManagerMiddleware, managerController.deletePatient);


router.post('/diet-charts', authManagerMiddleware, managerController.addDietChart);
router.get('/diet-charts/patient/:patientId', authManagerMiddleware, managerController.getDietChartsByPatient);
router.put('/diet-charts/:id', authManagerMiddleware, managerController.updateDietChart);
router.delete('/diet-charts/:id', authManagerMiddleware, managerController.deleteDietChart);


router.post('/pantry-staff', authManagerMiddleware, managerController.addPantryStaff);
router.get('/pantry-staff', authManagerMiddleware, managerController.getPantryStaff);
router.put('/pantry-staff/:id', authManagerMiddleware, managerController.updatePantryStaff);
router.delete('/pantry-staff/:id', authManagerMiddleware, managerController.deletePantryStaff);


router.post('/meal-deliveries', authManagerMiddleware, managerController.addMealDelivery);
router.get('/meal-deliveries', authManagerMiddleware, managerController.getMealDeliveries);
router.put('/meal-deliveries/:id', authManagerMiddleware, managerController.updateMealDelivery);
router.delete('/meal-deliveries/:id', authManagerMiddleware,  managerController.deleteMealDelivery);




module.exports = router;
