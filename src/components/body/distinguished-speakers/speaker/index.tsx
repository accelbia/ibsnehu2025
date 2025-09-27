import React from 'react';
import './index.css';

interface SpeakerProps {
  image: string;
  name: string;
  honors: string;
  affiliation: string;
}

const Speaker: React.FC<SpeakerProps> = ({ image, name, honors, affiliation }) => {
  return (
    <div className='speaker-card'>
      <img src={image} alt={name} className='speaker-image' />
      <div className='speaker-details'>
        <h2 className='speaker-name'>{name}</h2>
        <p className='speaker-honors'>{honors}</p>
        <p className='speaker-affiliation'>{affiliation}</p>
      </div>
    </div>
  );
};

export default Speaker;
