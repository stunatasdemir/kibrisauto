import React from 'react';
import Navbar from './components/Navbar';
import { Link } from 'react-router-dom';
import { ReactComponent as InstagramLogo } from '../assets/instagram.svg';
import { Link as ScrollLink } from 'react-scroll';

import './kıbrısautokonum.css';
import Footer from './components/Footer';

function KıbrısAutoKonum() {
    return (
        <div className="kıbrısautokonum-container">
            <Navbar />
            <div className="page-title">Yerimiz</div>
            <div className="map-container">
                <iframe
                    title="Kıbrıs Auto Konum"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.909635787908!2d33.3327155!3d35.2048587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2zMzXCsDEyJzE3LjYiTiAzM8KwMTknNTguNSJF!5e0!3m2!1str!2str!4v1615215038917!5m2!1str!2str"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
            <div className="contact-details">
                <div>
                    <h2>İletişim Bilgileri</h2>
                    <p><strong>İşletme Adı:</strong> Kıbrıs Auto</p>
                    <p><strong>Adres:</strong> Şehit Zafer Hasan Sokak No:5 Ortaköy/Lefkoşa</p>
                    <p><strong>Telefon:</strong> 0533 867 08 88 </p>
                    <p><strong>Ekspertiz:</strong> 0533 845 09 99 </p>
                    <p><strong>Rent a car:</strong> 0539 106 09 09 </p>
                    <p><strong>E-posta:</strong> fsmy8906@gmail.com</p>
                    <p><strong>Web Sitesi:</strong> <a href="http://kibrisarabam.com" target="_blank" rel="noopener noreferrer">kibrisarabam.com</a></p>
                    <p><strong>İşletme Açılış Tarihi:</strong> 17/08/23</p>
                    <p><strong>Hizmetler:</strong> Alım/Satım - Expertise - Car Wash & Make Up - Rent A Car</p>
                </div>
                <div>
                    <h2>Çalışma Saatleri</h2>
                    <p>Hafta içi: 08:00 - 18:00</p>
                    <p>Cumartesi: 08:00 - 18:00</p>
                    <p>Pazar: Kapalı</p>
                </div>
                </div>
            <Footer /> {/* Footer bileşenini buraya ekledik */}
        </div>
    );
}

export default KıbrısAutoKonum;