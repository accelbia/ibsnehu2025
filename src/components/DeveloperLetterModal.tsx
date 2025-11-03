import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './DeveloperLetterModal.css';

// Register the SplitText plugin
gsap.registerPlugin(SplitText);

interface DeveloperLetterModalProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const DeveloperLetterModal: React.FC<DeveloperLetterModalProps> = ({ isVisible, setIsVisible }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('developerLetterShown', 'true');
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isVisible && modalRef.current && backdropRef.current) {
      // Set initial state
      gsap.set([modalRef.current, backdropRef.current], { opacity: 0 });

      // Animate to final visibility
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
      });

      gsap.to(modalRef.current, {
        opacity: 1,
        duration: 1.5,
        delay: 0.3,
        ease: 'power2.out',
      });

      // Add SplitText animation for the heading
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: 'chars' });
        gsap.from(split.chars, {
          duration: 1,
          opacity: 0,
          y: 10,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.8, // Start after modal has faded in
        });
      }
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={backdropRef}
      className='developer-letter-modal-backdrop'
      onClick={handleBackdropClick}
    >
      <div ref={modalRef} className='developer-letter-modal'>
        <button className='developer-letter-modal-close' onClick={handleClose}>
          ×
        </button>
        <div className='developer-letter-content'>
          <div className='lottie-animation'>
            <DotLottieReact
              src='https://lottie.host/e7858b01-2595-4e67-92fd-c839b50befcf/p0WaCeYAJB.lottie'
              loop={false}
              autoplay
            />
          </div>
          <h2 ref={headingRef}>Thank You!</h2>
          <div className='developer-letter-text'>
            <p>Hello Everyone,</p>
            <p>
              As the web developer and designer behind the IBS Conference 2025, I want to personally
              thank all attendees, speakers, and organizers for making this year's event memorable.
              It was a privilege to craft the digital experience that brought together such a
              vibrant community of researchers and botanists.
            </p>
            <p>
              Creating a seamless platform for scientific exchange was an exciting challenge, and
              seeing the successful culmination of this event has been truly rewarding. If you found
              the website helpful during the conference or would like to explore more about what I
              do, feel free to visit{' '}
              <a href='https://accelbia.design' target='_blank' rel='noopener noreferrer'>
                accelbia.design
              </a>{' '}
              .
            </p>
            <p>
              Thanks once again for your support and participation. I look forward to contributing
              to many more impactful projects in the future!
            </p>
            <div className='developer-signature'>
              <p>
                <strong>Warm regards,</strong>
              </p>
              <p>
                <a href='https://bento.me/accelbia' target='_blank' rel='noopener noreferrer'>
                  <strong>Ayush Barik</strong>
                </a>
              </p>
              <p>
                <a href='https://accelbia.design' target='_blank' rel='noopener noreferrer'>
                  Founding Designer, accelbia.design
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperLetterModal;
