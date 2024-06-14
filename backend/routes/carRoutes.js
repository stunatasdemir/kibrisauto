const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const carController = require('../controllers/carController');
const cloudinary = require('../config/cloudinaryConfig');
const Car = require('../models/Car');

// Birden fazla dosya yükleme işlemi için upload.array() kullanıyoruz
router.post('/upload', upload.array('images', 10), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("No files uploaded.");
    }
    try {
        const uploadPromises = req.files.map(file => cloudinary.uploader.upload(file.path));
        const uploadResults = await Promise.all(uploadPromises);
        const imageUrls = uploadResults.map(result => result.secure_url);
        res.json({ imageUrls });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).send('Failed to upload images');
    }
});

router.get('/search', async (req, res) => {
    try {
        const query = req.query.query;
        const cars = await Car.find({
            $or: [
                { brand: { $regex: query, $options: 'i' } },
                { model: { $regex: query, $options: 'i' } }
                // Diğer alanlar da eklenerek genişletilebilir.
            ]
        });
        res.json(cars);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).send('Error during search');
    }
});

// Benzersiz marka listesini alma rotası
router.get('/brands', carController.getBrands);

// Yeni filtreleme rotası
router.get('/filter', async (req, res) => {
    try {
        const { brand, model, year } = req.query;
        const query = {};

        if (brand) query.brand = { $regex: brand, $options: 'i' };
        if (model) query.model = { $regex: model, $options: 'i' };
        if (year) query.year = Number(year);  // Yılın sayı olarak çevrildiğinden emin olalım

        const cars = await Car.find(query);
        res.json(cars);
    } catch (error) {
        console.error('Error during filtering:', error);
        res.status(500).send({ message: error.message });
    }
});

// Tüm arabaları getiren rota
router.get('/all', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        console.error('Error fetching all cars:', error);
        res.status(500).send({ message: error.message });
    }
});

// Get all cars
router.get('/', carController.getCars);

// Get a specific car by ID
router.get('/:id', carController.getCar);

// Add a new car
router.post('/', upload.array('images', 10), async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Files:', req.files);

    const { fullName, brand, model, year, price, description, mileage, engine, transmission, fuelType, drivetrain, carType, power } = req.body;
    
    // Zorunlu alanların kontrolü
    if (!fullName || !brand || !model || !year || !price || !description || !mileage || !engine || !transmission || !fuelType || !drivetrain || !carType || !power) {
        return res.status(400).json({ message: 'All required fields must be provided' });
    }

    try {
        const uploadPromises = req.files.map(file => cloudinary.uploader.upload(file.path));
        const uploadResults = await Promise.all(uploadPromises);
        const imageUrls = uploadResults.map(result => result.secure_url);

        const newCar = new Car({
            fullName,
            brand,
            model,
            year,
            price,
            description,
            mileage,
            engine,
            transmission,
            fuelType,
            drivetrain,
            carType,
            power,
            images: imageUrls
        });

        const savedCar = await newCar.save();
        res.json(savedCar);
    } catch (error) {
        console.error('Error saving car:', error);
        res.status(500).json({ message: 'Error saving car', error });
    }
});

// Update an existing car
router.put('/:id', carController.updateCar);

// Delete a car
router.delete('/:id', carController.deleteCar);

module.exports = router;
