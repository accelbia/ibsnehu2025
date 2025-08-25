import React, { useEffect, useRef, useState } from 'react';

const Landing: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [secondsRemaining, setSecondsRemaining] = useState<string>('');

  const countDownToConference = () => {
    const conferenceDate = new Date('2025-08-31T09:00:00');
    const conferenceEndDate = new Date('2025-10-31T17:00:00');
    const now = new Date();

    if (now > conferenceEndDate) {
      return ['Conference has ended', ''];
    }
    if (now >= conferenceDate && now <= conferenceEndDate) {
      return [`Conference is ongoing, till ${conferenceEndDate.toLocaleDateString()}`, ''];
    }

    const timeDifference = conferenceDate.getTime() - now.getTime();
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return [`${days} days ${hours} hours ${minutes} minutes`, `${seconds} seconds remaining till paper/abstract submission`];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const [time, seconds] = countDownToConference();
      setTimeRemaining(time);
      setSecondsRemaining(seconds);
    }, 1000);
    

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="landing" ref={sectionRef}>
      <h2 className="landing-content">Welcome to the</h2>
      <div className="landing-title">
        <h1 className="landing-content">
          XLVIII All India Botanical Conference <span style={{ fontStyle: 'italic', textTransform: 'lowercase' }}>of</span>
        </h1>
        <h1 className="landing-content">the Indian Botanical Society</h1>
      </div>
      <p className="landing-content">
        & International Symposium on Biology and Biotechnology of Plant Diversity for Bioeconomy
      </p>
      <div className="title-nav">
        <a href="#schedule">Conference Schedule</a>
        <a href="#scientificprogrammes">Scientific Programmes</a>
      </div>
      <span className="countdown">{timeRemaining}</span>
      <span className="seconds-remaining">{secondsRemaining}</span>
      <h2>Paper/Abstract submission deadline: <strong>31st March 2025</strong></h2>
      <a
        type="button"
        className="button"
        href="https://register.ibsnehu2025.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Register Now
      </a>
    </div>
  );
};

export default Landing;