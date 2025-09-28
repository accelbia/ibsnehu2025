import React from 'react';
import './index.css';
import IBS from '/ibs.svg';
import NEHU from '/nehu.svg';

const Footer: React.FC = () => {
  const lastUpdate = process.env.BUILD_TIMESTAMP;

  const formatDate = (dateString: string | undefined) => {
    // DD/MM/YYYY HH:MM
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <footer className='footer'>
      <div className='left'>
        <a href='https://www.indianbotsoc.org/' target='_blank' rel='noopener noreferrer'>
          <img src={IBS} alt='IBS Logo' className='ibs-logo' />
        </a>
        <a href='https://nehu.ac.in/' target='_blank' rel='noopener noreferrer'>
          <img src={NEHU} alt='NEHU Logo' className='nehu-logo' />
        </a>
        <p>
          © 2025 All India Botanical Conference Organized by Department of Botany and School of Life
          Sciences North-Eastern Hill University, Shillong
        </p>
      </div>
      <div className='right'>
        <p>
          {/* Developed by
          <br />
          <a href='https://accelbia.design' target='_blank' rel='noopener noreferrer'>
            accelbia.design
          </a> */}
          <p>Last update: {formatDate(lastUpdate)}</p>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
