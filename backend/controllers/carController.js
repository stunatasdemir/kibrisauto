const Car = require('../models/Car');

exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addCar = async (req, res) => {
    const {
        fullName, brand, model, year, price, mileage, engine, transmission,
        fuelType, drivetrain, images, carType, power, description
    } = req.body;

    console.log('Request Body:', req.body);  // Gelen verileri logla

    if (
        !fullName || !brand || !model || !year || !price || !mileage || !engine ||
        !transmission || !fuelType || !drivetrain || !carType || !power
    ) {
        console.log('Missing required fields');
        return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const car = new Car({
        fullName, brand, model, year, price, mileage, engine, transmission,
        fuelType, drivetrain, images, carType, power, description
    });

    try {
        const newCar = await car.save();
        res.status(201).json(newCar);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(400).json({ message: err.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        console.log('Update request body:', req.body);  // Güncelleme verilerini logla
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Verilerin doğru bir şekilde güncellenmesini sağlamak için tek tek atama yapıyoruz.
        car.fullName = req.body.fullName || car.fullName;
        car.brand = req.body.brand || car.brand;
        car.model = req.body.model || car.model;
        car.year = req.body.year || car.year;
        car.price = req.body.price || car.price;
        car.description = req.body.description || car.description;
        car.mileage = req.body.mileage || car.mileage;
        car.engine = req.body.engine || car.engine;
        car.transmission = req.body.transmission || car.transmission;
        car.fuelType = req.body.fuelType || car.fuelType;
        car.drivetrain = req.body.drivetrain || car.drivetrain;
        car.carType = req.body.carType || car.carType;
        car.power = req.body.power || car.power;
        car.images = req.body.images || car.images;

        const updatedCar = await car.save();
        console.log('Updated car:', updatedCar);  // Güncellenen araba verilerini logla
        res.json(updatedCar);
    } catch (err) {
        console.log('Update error:', err.message);  // Hata mesajını logla
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json({ message: 'Car deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBrands = async (req, res) => {
    try {
        const brands = await Car.distinct('brand');
        res.json(brands);
    } catch (error) {
        console.error('Error fetching brands:', error);
        res.status(500).send('Failed to fetch brands');
    }
};
