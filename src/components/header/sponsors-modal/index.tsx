import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

import './styles.css';
// Register the SplitText plugin
gsap.registerPlugin(SplitText);

interface SponsorsModalProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const SponsorsModal: React.FC<SponsorsModalProps> = ({ isVisible, setIsVisible }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  // Sponsor logos data
  const sponsors = [
    { name: 'ANRF', logo: '/Co-organizers:Sponsors/ANRF.png' },
    { name: 'ATARI', logo: '/Co-organizers:Sponsors/ATARI.jpg' },
    { name: 'BIRAC', logo: '/Co-organizers:Sponsors/BIRAC.png' },
    { name: 'BRDC', logo: '/Co-organizers:Sponsors/BRDC.jpg' },
    { name: 'BSI', logo: '/Co-organizers:Sponsors/BSI.png' },
    { name: 'CIMAP', logo: '/Co-organizers:Sponsors/CIMAP.png' },
    { name: 'CSIR', logo: '/Co-organizers:Sponsors/CSIR.jpg' },
    { name: 'DBT', logo: '/Co-organizers:Sponsors/DBT.png' },
    { name: 'IASST', logo: '/Co-organizers:Sponsors/IASST.jpg' },
    { name: 'IBDLP', logo: '/Co-organizers:Sponsors/IBDLP.jpg' },
    { name: 'IBS', logo: '/Co-organizers:Sponsors/IBS.jpg' },
    { name: 'IBSD', logo: '/Co-organizers:Sponsors/IBSD.png' },
    { name: 'ISRS', logo: '/Co-organizers:Sponsors/ISRS.png' },
    { name: 'MBDA', logo: '/Co-organizers:Sponsors/MBDA.jpeg' },
    { name: 'NBRI', logo: '/Co-organizers:Sponsors/NBRI.jpg' },
    { name: 'NEC', logo: '/Co-organizers:Sponsors/NEC.jpg' },
    { name: 'NECTAR', logo: '/Co-organizers:Sponsors/NECTAR.jpg' },
    { name: 'NEHU', logo: '/Co-organizers:Sponsors/NEHU.png' },
    { name: 'NEIST', logo: '/Co-organizers:Sponsors/NEIST.jpg' },
    { name: 'NESAC', logo: '/Co-organizers:Sponsors/NESAC.png' },
  ];

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
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    sectionsRef.current.forEach((section) => {
      gsap.set(section, { opacity: 0, y: 50 });
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
          <h1 ref={headingRef}>Co-organizers and Sponsors</h1>
          <p>
            We extend our heartfelt gratitude to all the co-organizers and sponsors who have made
            the XLVIII All India Botanical Conference possible through their generous support and
            collaboration.
          </p>
        </div>

        <div
          ref={(el) => {
            if (el) {
              sectionsRef.current.push(el);
            }
          }}
          className='sponsors-grid'
        >
          {sponsors.map((sponsor, index) => (
            <div key={index} className='sponsor-item'>
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                loading='lazy'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='fullscreen-blur' onClick={() => setIsVisible(false)}></div>
    </>
  );
};

export default SponsorsModal;
