import React, { useEffect, useRef, useState } from 'react';
import TimelineModal from '../../header/timeline'; // Import the Timeline component
import './index.css';

interface LandingProps {
  setBodyVariant: React.Dispatch<
    React.SetStateAction<'home' | 'scientific-programmes' | 'distinguished-speakers'>
  >;
}

const Landing: React.FC<LandingProps> = ({ setBodyVariant }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [secondsRemaining, setSecondsRemaining] = useState<string>('');
  const [isTimelineVisible, setIsTimelineVisible] = useState<boolean>(false); // State for Timeline visibility

  const countDownToConference = () => {
    const conferenceDate = new Date('2025-10-30T09:00:00');
    const conferenceEndDate = new Date('2025-11-01T17:00:00');
    const now = new Date();

    if (now > conferenceEndDate) {
      return ['Conference has ended', 'We look forward to seeing you next year!'];
    }
    if (now >= conferenceDate && now <= conferenceEndDate) {
      return [`Conference is ongoing, till ${conferenceEndDate.toLocaleDateString()}`, ''];
    }

    const timeDifference = conferenceDate.getTime() - now.getTime();
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return [
      `${days} days ${hours} hours ${minutes} minutes`,
      `${seconds} seconds remaining till conference `,
    ];
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
    <div className='landing' ref={sectionRef}>
      <h2 className='landing-content'>Welcome to the</h2>
      <div className='landing-title'>
        <h1 className='landing-content'>
          XLVIII All India Botanical Conference{' '}
          <span
            style={{
              fontStyle: 'italic',
              textTransform: 'lowercase',
            }}
          >
            of
          </span>
        </h1>
        <h1 className='landing-content'>the Indian Botanical Society</h1>
      </div>

      <p className='landing-content' style={{ margin: '0' }}>
        And
      </p>
      <p
        className='landing-content'
        style={{
          marginTop: '0',
          fontSize: '1.4rem',
          fontWeight: '300',
          marginBottom: '20px',
        }}
      >
        International Symposium on Biology and Biotechnology of Plant Diversity for Bioeconomy
      </p>
      <div className='title-nav'>
        <a href='#distinguished-speakers' onClick={() => setBodyVariant('distinguished-speakers')}>
          Distinguished Speakers
        </a>
        <a
          href='#program-schedule'
          onClick={() => setIsTimelineVisible(true)}
          className='coming-soon-header'
        >
          Detailed Program Schedule
        </a>
      </div>
      <span className='countdown'>{timeRemaining}</span>
      <span className='seconds-remaining'>{secondsRemaining}</span>
      <a
        type='button'
        className='button'
        href='https://forms.cloud.microsoft/r/G8UMm1RdEx'
        target='_blank'
        rel='noopener noreferrer'
      >
        Register Now
      </a>

      {/* Render the Timeline modal */}
      <TimelineModal isVisible={isTimelineVisible} setIsVisible={setIsTimelineVisible} />
    </div>
  );
};

export default Landing;
