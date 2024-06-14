import React, { useState } from 'react';
import './Slider.css';

const Slider = ({ images }) => {
    const [selectedImg, setSelectedImg] = useState(images[0]);

    const renderThumbnails = () => {
        return images.map((img, index) => (
            <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                onClick={() => setSelectedImg(img)}
                className={`thumb ${img === selectedImg ? 'active' : ''}`}
            />
        ));
    };

    return (
        <div className="slider">
            <div className="main-img">
                <img src={selectedImg} alt="Selected" className="fade-in" />
            </div>
            <div className="thumb-container">
                {renderThumbnails()}
            </div>
        </div>
    );
};

export default Slider;