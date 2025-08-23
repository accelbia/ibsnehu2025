import React from 'react';
import './index.css';
import IBS from '/ibs.svg';
import NEHU from '/nehu.svg';
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="left">
        <a href="https://www.indianbotsoc.org/" target="_blank" rel="noopener noreferrer">
          <img src={IBS} alt="IBS Logo" className="ibs-logo" />
        </a>
        <a href="https://nehu.ac.in/" target="_blank" rel="noopener noreferrer">
          <img src={NEHU} alt="NEHU Logo" className="nehu-logo" />
        </a>
        <p>© 2025 All India Botanical Conference Organized by
          Department of Botany and School of Life Sciences
          North-Eastern Hill University, Shillong</p>
      </div>
      {/* <div className="right">
        <p>Developed by <a href="https://accelbia.design" target="_blank" rel="noopener noreferrer">accelbia.design</a></p>
      </div> */}
    </footer>
  );
}

export default Footer;