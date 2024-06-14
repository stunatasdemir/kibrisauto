import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ReactComponent as PhoneLogo } from '../assets/phone.svg';
import { ReactComponent as WhatsappLogo } from '../assets/whatsapp.svg';
import Navbar from './components/Navbar';
import FsLightbox from 'fslightbox-react';
import './OtoDetails.css';

function OtoDetails() {
    const [car, setCar] = useState({});
    const { id } = useParams();
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [allCars, setAllCars] = useState([]);
    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: 1
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/cars/${id}`)
            .then(response => {
                setCar(response.data);
                setImages(response.data.images);
                if (response.data.images.length > 0) {
                    setSelectedImage(response.data.images[0]);
                }
            })
            .catch(error => {
                console.error('Araba detayları çekerken hata oluştu:', error);
            });

        axios.get('http://localhost:5000/api/cars/all')
            .then(response => {
                setAllCars(response.data);
            })
            .catch(error => {
                console.error('Tüm arabaları çekerken hata oluştu:', error);
            });
    }, [id]);

    const openLightboxOnSlide = (number) => {
        setLightboxController({
            toggler: !lightboxController.toggler,
            slide: number
        });
    };

    return (
        <div className='details-container'>
            <Navbar />
            <div className='details-content'>
                <div className='details-main'>
                    <div className='details-gallery'>
                        <div className='details-image' onClick={() => openLightboxOnSlide(images.indexOf(selectedImage) + 1)}>
                            <img src={selectedImage} alt={`${car.fullName} cover`} />
                        </div>
                        <div className='details-thumbnails'>
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${car.fullName} ${index + 1}`}
                                    onClick={() => setSelectedImage(image)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='details-description'>
                        <h2>Açıklama</h2>
                        <p className="highlight">🔹 Öne Çıkanlar:</p>
                        <p>{car.description}</p>
                    </div>
                </div>
                <div className='details-sidebar'>
                    <div className='details-info'>
                        <h2>Araba Bilgileri</h2>
                        <ul>
                            <li><strong>Fiyat:</strong> {car.price}£</li>
                            <li><strong>Marka:</strong> {car.brand}</li>
                            <li><strong>Model:</strong> {car.model}</li>
                            <li><strong>Yıl:</strong> {car.year}</li>
                            <li><strong>Vites:</strong> {car.transmission}</li>
                            <li><strong>Yakıt Türü:</strong> {car.fuelType}</li>
                            <li><strong>Kilometre:</strong> {car.mileage} km</li>
                            <li><strong>Motor Gücü:</strong> {car.power} hp</li>
                            <li><strong>Motor Hacmi:</strong> {car.engine} cc</li>
                            <li><strong>Çekiş:</strong> {car.drivetrain}</li>
                            <li><strong>Kasa Tipi:</strong> {car.carType}</li>
                        </ul>
                    </div>
                    <div className='details-contact'>
                        <h2>İletişim</h2>
                        <a href="tel:+905338670888" className="contact-button">
                            <PhoneLogo />
                            <span>Telefonu Göster</span>
                        </a>
                        <a href="https://wa.me/+905338670888" className="contact-button">
                            <WhatsappLogo />
                            <span>Mesaj Gönder</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className='similar-cars'>
                <h2>Benzer İlanları İnceleyin</h2>
                <div className='similar-cars-list'>
                    {allCars.map((similarCar) => (
                        <Link key={similarCar._id} to={`/details/${similarCar._id}`} className='similar-car-item'>
                            <img src={similarCar.images[0]} alt={`${similarCar.fullName} cover`} />
                            <div className='similar-car-info'>
                                <p>{similarCar.fullName}</p>
                                <p className="similar-car-price">{similarCar.price} TL</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FsLightbox
                toggler={lightboxController.toggler}
                sources={images}
                slide={lightboxController.slide}
            />
        </div>
    );
}

export default OtoDetails;
