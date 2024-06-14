import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as KibrisarabamLogo } from '../assets/kibrislogo.svg';
import './AdminLogin.css';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const adminName = 'admin';  // Hardcoded admin kullanıcı adı
        const adminPass = 'password';  // Hardcoded admin şifresi

        if (username === adminName && password === adminPass) {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/admin');
        } else {
            setError('Kullanıcı adı veya şifre hatalı');
        }
    };

    return (
        <div className="admin-login">
            <div className="admin-login-left">
                <div className="login-form-container">
                    <KibrisarabamLogo className="admin-login-logo" />
                    <h2>Admin Girişi</h2>
                    {error && <p className="error">{error}</p>}
                    <input
                        type="text"
                        placeholder="Kullanıcı Adı"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Giriş Yap</button>
                </div>
            </div>
            <div className="admin-login-right">
                <div className="info-container">
                    
                    
                    <p>KıbrısAutoya Hoşgeldiniz! </p>
                    <p>Kıbrıs Auto admin paneline erişim sağlamak için lütfen kullanıcı adı ve şifreniz ile giriş yapın.</p>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
