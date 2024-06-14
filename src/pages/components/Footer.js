import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { ReactComponent as InstagramLogo } from '../../assets/instagram.svg';
import { ReactComponent as PhoneLogo } from '../../assets/phone.svg';
import { ReactComponent as WhatsappLogo } from '../../assets/whatsapp.svg';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer_menu">
                <Link to='/kibrisautokonum'>
                    <ul className="footer_menu-item">Yerimiz</ul>
                </Link>
                <ScrollLink to="tum-araclar" smooth={true} duration={500}>
                    <ul className="footer_menu-item">Araçlarımız</ul>
                </ScrollLink>
                <Link to='/kıbrısautokonum'>
                    <ul className="footer_menu-item">İletişim ve Konum</ul>
                </Link>
            </div>
            <div className="footer_icons">
                <a href="tel:+905338670888" className="contact-button">
                    <PhoneLogo />
                    <span>Telefon</span>
                </a>
                <a href="https://wa.me/+905338670888 " className="contact-button">
                    <WhatsappLogo />
                    <span>WhatsApp</span>
                </a>
                <a href="https://www.instagram.com/kibrisauto" className="contact-button">
                    <InstagramLogo />
                    <span>Instagram</span>
                </a>
            </div>
            <div className="footer_company-text">Kibrisarabam @ 2024 All rights reserved.</div>
        </footer>
    );
}

export default Footer;
