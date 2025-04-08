import React from 'react';
import './Hero.css';
import dark_arrow from '../../assets/dark-arrow.png';

const Hero = () => {
    return (
        <div className='hero container'>
            <div className='hero-text'>
                <h1>Welcome to AnalEyes</h1>
                <p>
                    Your vision matters!<br/> AnalEyes empowers you with cutting-edge AI technology to analyze your eye health.
                    Upload videos or images to get accurate results for conditions like stye, cataract, conjunctivitis, or a healthy status.
                </p>
                <button className='btn'>Start Your Eye Analysis <img src={dark_arrow} alt="Explore" /></button>
            </div>
        </div>
    );
}

export default Hero;
