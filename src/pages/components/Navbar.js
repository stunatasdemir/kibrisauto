import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as KibrisarabamLogo } from '../../assets/kibrislogo.svg';
import { ReactComponent as PhoneLogo } from '../../assets/phone.svg';
import { ReactComponent as WhatsappLogo } from '../../assets/whatsapp.svg';
import "../homePage.css";
import { Link } from "react-router-dom";

function Navbar() {
    const navRef = useRef();
    const navigate = useNavigate();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    const handleAdminClick = () => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated) {
            navigate('/admin');
        } else {
            navigate('/admin/login');
        }
    };

    return (
        <header className="header">
            <div className='header_logo'>
                <Link to='/'><KibrisarabamLogo /></Link>
            </div>
            <nav className='header_menu' ref={navRef}>
                <Link to='/'><ul className='header_menu-item'>Anasayfa</ul></Link>
                <a href="#tum-araclar"><ul className='header_menu-item'>Araçlarımız</ul></a>
                <Link to='/kıbrısautokonum'><ul className='header_menu-item'>İletişim</ul></Link>
                <ul className='header_menu-item' onClick={handleAdminClick}>Admin</ul>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>X</button>
            </nav>
            <div className='header_buttons'>
                <div className='header_menu-button-phone'>
                    <a href='tel:+901234567890'><PhoneLogo /></a> 
                </div>
                <div className='header_menu-button-whatsapp'>
                    <a href='https://wa.me/+901234567890'><WhatsappLogo /></a>
                </div>
            </div>
            <button className="nav-btn" onClick={showNavbar}>☰</button>
        </header>
    );
}

export default Navbar;
