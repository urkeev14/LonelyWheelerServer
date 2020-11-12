const mongoose = require("mongoose")

const MotorVehicleModel = require('../api/model/motor-vehicle')
const OfferModel = require('../api/model/offer')

exports.createOrUpdate = (request, response, next) => {

    const vehicle = new MotorVehicleModel({
        ...request.body,
        _id: mongoose.Types.ObjectId(),
    })

    vehicle.save(vehicle).then(savedVehicle => {
        if (savedVehicle) {
            onSuccess(response, savedVehicle, "Offer saved !")
        } else {
            onFail(response, null, "Fail saving offer !")
        }
    }).catch(error => {
        onFail(response, null, "Saving unsuccessful !")
    });
};

exports.readAll = (request, response, next) => {

    MotorVehicleModel.find({}, function (error, docs) {
        if (docs) {
            onSuccess(response, docs, "Motor-vehicle offers loaded !")
        } else if (error) {
            onFail(response, null, "No offers loaded...")
        } else {

        }

    });
};

exports.read = (request, response, next) => {

    const vehicleId = request.params.id

    MotorVehicleModel.findById(vehicleId, function (error, vehicle) {
        if (vehicle) {
            onSuccess(response, vehicle, "Motor-vehicle with !")
        } else if (error) {
            onFail(response, null, "ERROR loading vehicle with id " + vehicleId)
        } else {
            onFail(response, null, "No vehicles found with id!" + vehicleId)
        }

    });
};

function onSuccess(response, object, message) {
    prettyPrint(message, "$", 5)
    response.status(200).json({
        message: message,
        entity: object
    });
}

function onFail(response, object, message) {
    prettyPrint(message, "!", 5)
    response.status(201).json({
        message: message,
        entity: object
    });
}

function prettyPrint(message, separator, numOfRows) {
    // 6
    console.log()
    var dateTime = new Date().toLocaleTimeString()
    console.log(" ".repeat(102) + dateTime)
    for (i = 0; i < numOfRows; i++) {
        if (i != 2) {
            let stars = ""
            for (j = 0; j < (message.length + 100); j++) {
                stars = stars + separator
            }
            console.log(stars)
        } else {
            console.log(separator.repeat(40) + " ".repeat(10) + message + " ".repeat(10) + separator.repeat(40));
        }

    }
}