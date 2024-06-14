import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../src/pages/homePage';
import OtoDetails from '../src/pages/OtoDetails';
import AdminLogin from '../src/pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';  // AdminPanel bileşenini import edin
import PrivateRoute from '../src/pages/components/PrivateRoute';  // PrivateRoute bileşenini import edin
import KıbrısAutoKonum from './pages/kıbrısautokonum';
import SplashScreen from '../src/pages/components/SplashScreen'; // SplashScreen bileşenini import edin

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? (
        <SplashScreen setLoading={setLoading} />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kıbrısautokonum" element={<KıbrısAutoKonum />} />
          <Route path="/details/:id" element={<OtoDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} /> {/* Burada rotayı düzelttik */}
          <Route path="/admin" element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          } />
        </Routes>
      )}
    </div>
  );
}

export default App;
