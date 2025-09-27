import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import data from '../../../../assets/data.json';
import './index.css';

gsap.registerPlugin(SplitText);

interface ContactProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const Contact: React.FC<ContactProps> = ({ isVisible, setIsVisible }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, setIsVisible]);

  useEffect(() => {
    if (isVisible && headingRef.current) {
      const split = new SplitText(headingRef.current, { type: 'chars' });
      gsap.from(split.chars, {
        duration: 1,
        opacity: 0,
        y: 10,
        stagger: 0.05,
        ease: 'power2.out',
      });
    }
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
            });
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      },
      { threshold: 0.3 }, // Trigger when 20% of the element is visible
    );

    sectionsRef.current.forEach((section) => {
      gsap.set(section, { opacity: 0, y: 50 }); // Initial state
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className='modal'>
        <IconButton
          className='close-button'
          onClick={() => setIsVisible(false)}
          aria-label='Close'
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >
          <CloseIcon />
        </IconButton>
        <div
          ref={(el) => {
            if (el) {
              sectionsRef.current.push(el);
            }
          }}
        >
          <h1 ref={headingRef}>Contact Information</h1>
        </div>

        <div
          ref={(el) => {
            if (el) {
              sectionsRef.current.push(el);
            }
          }}
          className='contact-section'
        >
          <h2>{data['CONTACT PERSON'].Name}</h2>
          <p>{data['CONTACT PERSON'].Role}</p>
          <p>
            {data['CONTACT PERSON'].Department}, {data['CONTACT PERSON'].Institution},{' '}
            {data['CONTACT PERSON'].City} - {data['CONTACT PERSON']['Postal Code']}
          </p>
          <p>
            {' '}
            <a href={`tel:${data['CONTACT PERSON'].Phone}`}>{data['CONTACT PERSON'].Phone}</a>
          </p>
          <p>
            {' '}
            <a href={`mailto:${data['CONTACT PERSON'].Email}?cc=secretariat@ibsnehu2025.org`}>
              {data['CONTACT PERSON'].Email}
            </a>
          </p>
        </div>

        <div
          ref={(el) => {
            if (el) {
              sectionsRef.current.push(el);
            }
          }}
          className='contact-section'
        >
          <h2>Prof. Santaram Joshi</h2>
          <p>Joint-Organizing Secretary, All India Botanical Conference 2025</p>
          <p>
            {' '}
            <a href={`tel:+919436102171`}>+919436102171</a>
          </p>
          <p>
            <a href='mailto:secretariat@ibsnehu2025.org'>secretariat@ibsnehu2025.org</a>
          </p>
        </div>
      </div>
      <div className='fullscreen-blur' onClick={() => setIsVisible(false)}></div>
    </>
  );
};

export default Contact;
