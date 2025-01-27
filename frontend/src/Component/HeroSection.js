import React, { useState, useEffect } from 'react';
import home_page1 from '../Images/home_page1.jpg';
import home_page2 from '../Images/home_page2.avif';
import home_page3 from '../Images/home_page3.avif';
import "../styles/HeroSection.css";

export default function HeroSection() {
    const images = [home_page1, home_page2, home_page3];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <section className="hero">
            <div className="hero-container">
                <div className="hero-image">
                    <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
                </div>
                <button className="nav-button left" onClick={handlePrev}>&lt;</button>
                <button className="nav-button right" onClick={handleNext}>&gt;</button>
            </div>
            <div className="hero-indicators">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
}
