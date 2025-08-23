import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

const Body: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (sectionRef.current) {
      const columns = columnsRef.current;

      columns.forEach((column, index) => {
        gsap.fromTo(
          column,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.2, // Stagger the animations
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%', // Trigger when 20% of the section is in viewport
              end: 'bottom 20%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, []);

  const [timeRemaining, setTimeRemaining] = React.useState<string>('');
  const [secondsRemaining, setSecondsRemaining] = React.useState<string>('');

  const countDownToConference = () => {
    const conferenceDate = new Date('2025-10-29T09:00:00');
    const conferenceEndDate = new Date('2025-10-31T17:00:00');
    if (new Date() > conferenceEndDate) {
      return ['Conference has ended', ''];
    }
    if (new Date() >= conferenceDate && new Date() <= conferenceEndDate) {
      return ['Conference is ongoing, till ' + conferenceEndDate.toLocaleDateString(), ''];
    }

    const now = new Date();
    const timeDifference = conferenceDate.getTime() - now.getTime();
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return [`${days} days ${hours} hours ${minutes} minutes`, `${seconds} seconds remaining`];
  };


  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(countDownToConference()[0]);
      setSecondsRemaining(countDownToConference()[1]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="body">
      <div className="container">
        <div className="section" id='landing'>
          <div className="landing">
            <h2 className='landing-content'>Welcome to the</h2>
            <div className="landing-title">
              <h1 className='landing-content'>XLVIII All India Botanical Conference <span style={{ fontStyle: 'italic', textTransform: 'lowercase' }}>of</span></h1>
              <h1 className='landing-content'>the Indian Botanical Society</h1>
            </div>
            <p className='landing-content'>& International Symposium on Biology and Biotechnology of Plant Diversity for Bioeconomy</p>
            <div className="title-nav">
              <a href="#schedule" >Conference Schedule</a>
              <a href="#speakers">Featured Speakers</a>

            </div>
            <span className="countdown">{timeRemaining}</span>
            <span className="seconds-remaining">{secondsRemaining}</span>
            <a type="button" className="button" href="https://register.ibsnehu2025.org/" target="_blank" rel="noopener noreferrer">Register Now</a>

          </div>
        </div>

        <div className="section" id="schedule">
          <h2>Conference Schedule</h2>
          <ul>
            <li>Day 1: Keynote Speakers</li>
            <li>Day 2: Workshops and Panels</li>
            <li>Day 3: Networking Events</li>
          </ul>
        </div>

        <div className="section" id="obc" ref={sectionRef}>
          <h1>Organizing Bodies and Committees</h1>
        </div>
        <div className="section">
          
        </div>
      </div>
    </div>
  );
};

export default Body;