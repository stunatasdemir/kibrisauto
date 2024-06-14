import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./components/Navbar";
import './homePage.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as InstagramLogo } from '../assets/instagram.svg';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import Footer from './components/Footer';

// Video dosyasını içe aktarın
import videoFile from '../assets/Y2meta.app-Alfa Romeo _Feel For Yourself_ _ Unreal Engine 5 Cinematic-(1080p).mp4';

function HomePage() {
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 0) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/api/cars')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Tüm arabaları çekerken hata oluştu:', error);
            });

        axios.get('http://localhost:5000/api/cars/brands')
            .then(response => {
                setBrands(response.data);
            })
            .catch(error => {
                console.error('Markaları çekerken hata oluştu:', error);
            });
    }, []);

    const handleSearch = () => {
        axios.get(`http://localhost:5000/api/cars/filter?brand=${brand}&model=${model}&year=${year}`)
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Filtreleme sırasında hata oluştu:', error);
            });
    };

    const handleCarClick = (id) => {
        navigate(`/details/${id}`);
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="hero">
                <video autoPlay loop muted className="hero-video">
                    <source src={videoFile} type="video/mp4" />
                </video>
                <div className="hero-overlay">
                    <h1>Kıbrıs Auto</h1>
                </div>
            </div>
            <section className="search-section">
                <div className="hero-search_bar">
                    <select value={brand} onChange={e => setBrand(e.target.value)}>
                        <option value="">Marka Seçin</option>
                        {brands.map((brand, index) => (
                            <option key={index} value={brand}>{brand}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Model"
                        value={model}
                        onChange={e => setModel(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Yıl"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                    />
                    <button onClick={handleSearch}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21L15 15M17 10C17 12.7614 14.7614 15 12 15C9.23858 15 7 12.7614 7 10C7 7.23858 9.23858 5 12 5C14.7614 5 17 7.23858 17 10Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </section>
            <div id="tum-araclar" className="main-tum_araclar">
                <h2>Tüm Araçlar</h2>
                <div className="main-tum_araclar-list">
                    {cars.map(car => (
                        <div key={car._id} className="main_box" onClick={() => handleCarClick(car._id)}>
                            <img src={car.images[0]} alt={`${car.fullName} cover`} className="main_box-image" />
                            <div className="main_box-container">
                                <p>{car.fullName}</p>
                                <div className="main_box-details">
                                    <div className="main_box-detail">
                                        <span role="img" aria-label="location">📍</span> {car.location}
                                    </div>
                                    <div className="main_box-detail">
                                        <span role="img" aria-label="date">📅</span> {car.year}
                                    </div>
                                    <div className="main_box-detail">
                                        <span role="img" aria-label="mileage">🚗</span> {car.mileage} km
                                    </div>
                                    <div className="main_box-detail">
                                        <span role="img" aria-label="power">⚡</span> {car.power} hp
                                    </div>
                                    <div className="main_box-detail">
                                        <span role="img" aria-label="fuel">⛽</span> {car.fuelType}
                                    </div>
                                    <div className="main_box-detail">
                                        <span role="img" aria-label="transmission">⚙️</span> {car.transmission}
                                    </div>
                                </div>
                                <p className="main_box-price">{car.price} £</p>
                                <button className="main_box-meeting">Randevu Oluştur</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
