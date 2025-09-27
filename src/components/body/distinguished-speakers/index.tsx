import React, { useEffect } from 'react';
import Speaker from './speaker';
import speakersData from '../../../assets/speakers.json';
import './index.css';
import { gsap } from 'gsap';

const DistinguishedSpeakers: React.FC = () => {
  useEffect(() => {
    gsap.fromTo(
      '.distinguished-speakers .speaker-card', // Updated class name to match the DOM structure
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 1,
        ease: 'power2.out',
      },
    );
  }, []);

  return (
    <>
      <h1>Distinguised Speakers</h1>
      <div className='distinguished-speakers'>
        {speakersData.map((speaker) => (
          <Speaker
            key={speaker.id}
            image={`/people/${speaker.image}`} // Assuming `speaker.image` contains the filename (e.g., '8.jpg')
            name={speaker.name}
            honors={speaker.honors}
            affiliation={speaker.affiliation}
          />
        ))}
      </div>
    </>
  );
};

export default DistinguishedSpeakers;
