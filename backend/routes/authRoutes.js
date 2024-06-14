const express = require('express');
const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Burada veritabanı veya başka bir depolama ile doğrulama yapılmalı
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});

module.exports = router;
