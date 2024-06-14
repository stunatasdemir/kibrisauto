const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    mileage: { type: Number, required: true },
    engine: { type: String, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    drivetrain: { type: String, required: true },
    carType: { type: String, required: true },
    power: { type: String, required: true },
    images: { type: [String], required: true }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
