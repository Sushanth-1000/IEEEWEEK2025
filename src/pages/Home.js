import React, { useEffect, useRef, useState } from 'react';
import Navbaring from '../Components/Nav';
import './Home.css';
import Slider from '../Components/Slider.js';
import fetchEvents from '../Components/data.js';
import CountDown from '../Components/CountDown.js';
import AboutUs from '../Components/about_us.js';

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let vantaEffect = null;

    if (window.VANTA) {
      vantaEffect = window.VANTA.NET({
        el: "#vanta-bg", // TARGET THE ID SPECIFICALLY
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xc7c8e5,
        backgroundColor: 0x10111d,
        points: 20.00,    
        maxDistance: 22.00, 
        spacing: 18.00,   
        showDots: false
      });
    }

    const loadEvents = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div>
      {/* 1. DEDICATED BACKGROUND LAYER */}
      <div 
        id="vanta-bg" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: -1 
        }}
      ></div>

      {/* 2. CONTENT LAYER (Scrolls over the background) */}
      <div className="content-wrapper" style={{ position: 'relative', zIndex: 1 }}>
        <Navbaring />
        <div className="countdown-container">
          <CountDown />
        </div>
        
        <h2 className="events-title">Events</h2>
        <div className="center">
          <Slider data={events} activeSlide={5} />
        </div>
        
        <h2 className="flagship-title">Flagship Event</h2>
        <div className="flagship-container">
          <div className="flagship-event">
            <img src="/images/replacer.png" alt="Flagship Event Poster" className="poster" />
            <div className="description">
              <h3>Coming Soon</h3>
              <p>Stay tuned for more updates!</p>
              <a href="https://forms.gle//example" target='__blank'>
                <button className="know-more-button">Coming soon!</button>
              </a>
            </div>
          </div>
          <div className="flagship-event reverse">
            <img src="/images/replacer.png" alt="Flagship Event Poster" className="poster" />
            <div className="description">
              <h3>Coming Soon</h3>
              <p>Stay tuned for more updates!</p>
              <a href="https://forms.gle//example" target='__blank'>
                <button className="know-more-button">Coming soon!</button>
              </a>
            </div>
          </div>
          <AboutUs />
        </div>
      </div>
    </div>
  );
}

export default Home;