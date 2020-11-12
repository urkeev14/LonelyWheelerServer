const express = require('express')
const router = express.Router();

const motorVehicleController = require('../../controllers/motor-vehicle');

router.post('/persist', motorVehicleController.createOrUpdate);
router.get('/read', motorVehicleController.readAll);
router.get('/read/:id', motorVehicleController.read)


module.exports = router;