import React, { useEffect } from 'react';
import { ReactComponent as KibrisLogo } from '../../assets/kibrislogo.svg'; // Ensure this path is correct
import './SplashScreen.css';

const SplashScreen = ({ setLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Display the splash screen for 3 seconds

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className="splash-screen">
      <KibrisLogo className="splash-logo" />
    </div>
  );
};

export default SplashScreen;
