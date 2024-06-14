import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

function AdminPanel() {
    const [cars, setCars] = useState([]);
    const [carDetails, setCarDetails] = useState({
        fullName: '',
        brand: '',
        model: '',
        year: '',
        price: '',
        description: '',
        mileage: '',
        engine: '',
        transmission: '',
        fuelType: '',
        drivetrain: '',
        carType: '',
        power: '',
        images: []
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cars');
            setCars(response.data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarDetails({ ...carDetails, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        setCarDetails({ ...carDetails, images: files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in carDetails) {
            if (key === 'images') {
                for (let i = 0; i < carDetails.images.length; i++) {
                    formData.append('images', carDetails.images[i]);
                }
            } else {
                formData.append(key, carDetails[key]);
            }
        }

        console.log('Form Data:', [...formData.entries()]);  // Form verilerini logla

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            if (editing) {
                console.log('Updating car with ID:', editingId);
                const response = await axios.put(`http://localhost:5000/api/cars/${editingId}`, formData, config);
                console.log('Update response:', response.data); // Güncelleme yanıtını logla
                setEditing(false);
                setEditingId(null);
            } else {
                console.log('Adding new car');
                const response = await axios.post('http://localhost:5000/api/cars', formData, config);
                console.log('Add response:', response.data); // Ekleme yanıtını logla
            }
            fetchCars(); // Verileri güncelle
            setCarDetails({
                fullName: '',
                brand: '',
                model: '',
                year: '',
                price: '',
                description: '',
                mileage: '',
                engine: '',
                transmission: '',
                fuelType: '',
                drivetrain: '',
                carType: '',
                power: '',
                images: []
            });
            setSelectedFiles([]);
        } catch (error) {
            console.error('Error submitting car:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            }
        }
    };

    const handleEdit = (car) => {
        setEditing(true);
        setEditingId(car._id);
        setCarDetails({
            fullName: car.fullName || '',
            brand: car.brand || '',
            model: car.model || '',
            year: car.year || '',
            price: car.price || '',
            description: car.description || '',
            mileage: car.mileage || '',
            engine: car.engine || '',
            transmission: car.transmission || '',
            fuelType: car.fuelType || '',
            drivetrain: car.drivetrain || '',
            carType: car.carType || '',
            power: car.power || '',
            images: car.images || []
        });
        console.log('Editing car:', car);  // Düzenlenen arabanın verilerini logla
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/cars/${id}`);
            fetchCars();
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="fullName" placeholder="Tam Ad" value={carDetails.fullName} onChange={handleInputChange} required />
                <input type="text" name="brand" placeholder="Marka" value={carDetails.brand} onChange={handleInputChange} required />
                <input type="text" name="model" placeholder="Model" value={carDetails.model} onChange={handleInputChange} required />
                <input type="number" name="year" placeholder="Yıl" value={carDetails.year} onChange={handleInputChange} required />
                <input type="number" name="price" placeholder="Fiyat" value={carDetails.price} onChange={handleInputChange} required />
                <input type="text" name="description" placeholder="Açıklama" value={carDetails.description} onChange={handleInputChange} required />
                <input type="number" name="mileage" placeholder="Kilometre" value={carDetails.mileage} onChange={handleInputChange} required />
                <input type="text" name="engine" placeholder="Motor" value={carDetails.engine} onChange={handleInputChange} required />
                <input type="text" name="transmission" placeholder="Vites" value={carDetails.transmission} onChange={handleInputChange} required />
                <input type="text" name="fuelType" placeholder="Yakıt Türü" value={carDetails.fuelType} onChange={handleInputChange} required />
                <input type="text" name="drivetrain" placeholder="Çekiş" value={carDetails.drivetrain} onChange={handleInputChange} required />
                <input type="text" name="carType" placeholder="Kasa Tipi" value={carDetails.carType} onChange={handleInputChange} required />
                <input type="number" name="power" placeholder="Güç" value={carDetails.power} onChange={handleInputChange} required />
                <input type="file" name="images" onChange={handleFileChange} multiple />
                <div className="selected-files">
                    {selectedFiles.map((file, index) => (
                        <img key={index} src={URL.createObjectURL(file)} alt={`Selected ${index}`} width="100" height="100" />
                    ))}
                </div>
                <button type="submit" className="btn btn-primary">{editing ? 'Güncelle' : 'Ekle'}</button>
            </form>

            <h2>Mevcut Arabalar</h2>
            <div className="car-list">
                {cars.map(car => (
                    <div key={car._id} className="car-item">
                        <img src={car.images[0]} alt={car.fullName} className="car-image" />
                        <h3>{car.fullName}</h3>
                        <div className="car-actions">
                            <button onClick={() => handleEdit(car)} className="btn btn-edit">Düzenle</button>
                            <button onClick={() => handleDelete(car._id)} className="btn btn-delete">Sil</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPanel;
