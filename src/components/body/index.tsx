import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

import Landing from './landing';
import ScientificProgrammes from './scientific-programmes';
import Sections from './sections';
import FAQsLinks from './faqs-links';
import OfficeBearers from './office_bearers';
import DistinguishedSpeakers from './distinguished-speakers';
import Fellowship from './fellowship';
import GoldenJubileeLetter from './lifesciences-golden-jubilee-registration';

gsap.registerPlugin(ScrollTrigger);

const Body: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);

  const [bodyVariant, setBodyVariant] = React.useState<
    'home' | 'scientific-programmes' | 'distinguished-speakers'
  >('home');
  const [displayOfficeBearers, setDisplayOfficeBearers] = useState(false);
  const [displayFellowship, setDisplayFellowship] = useState(false);
  const [displayGoldenJubileeLetter, setDisplayGoldenJubileeLetter] = useState(false);
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
          },
        );
      });
    }
  }, []);

  return (
    <div className='body'>
      <div className='container'>
        {bodyVariant === 'home' && (
          <>
            <div className='section' id='landing' ref={sectionRef}>
              <Landing setBodyVariant={setBodyVariant} />
            </div>

            <div className='section' id='sections' ref={sectionRef}>
              <Sections />
            </div>

            <div className='section' id='faqs' ref={sectionRef}>
              <FAQsLinks
                setBodyVariant={setBodyVariant}
                setDisplayOfficeBearers={setDisplayOfficeBearers}
                setDisplayFellowship={setDisplayFellowship}
                setDisplayGoldenJubileeLetter={setDisplayGoldenJubileeLetter}
              />
            </div>
          </>
        )}

        {bodyVariant === 'scientific-programmes' && (
          <div className='section' id='scientificprogrammes' ref={sectionRef}>
            <ScientificProgrammes />
          </div>
        )}

        {bodyVariant === 'distinguished-speakers' && (
          <div className='section-infinite' id='distinguishedspeakers' ref={sectionRef}>
            <DistinguishedSpeakers />
          </div>
        )}

        {displayFellowship && (
          <Fellowship isVisible={displayFellowship} setIsVisible={setDisplayFellowship} />
        )}

        {displayGoldenJubileeLetter && (
          <GoldenJubileeLetter
            isVisible={displayGoldenJubileeLetter}
            setIsVisible={setDisplayGoldenJubileeLetter}
          />
        )}

        {/* Render the OfficeBearers modal */}
        {displayOfficeBearers && (
          <OfficeBearers isVisible={displayOfficeBearers} setIsVisible={setDisplayOfficeBearers} />
        )}
      </div>
    </div>
  );
};

export default Body;
