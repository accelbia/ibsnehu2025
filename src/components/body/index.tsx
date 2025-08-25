import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';


import Landing from './landing';
// import Dsdotc from './dsdotc';
import Schedule from './schedule';
import ScientificProgrammes from './scientific-programmes';

gsap.registerPlugin(ScrollTrigger);

const Body: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);

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
          }
        );
      });
    }
  }, []);
  return (
    <div className="body">
      <div className="container">
        <div className="section" id='landing' ref={sectionRef}>
          <Landing />
        </div>

        <div className="section" id="schedule" ref={sectionRef}>
          <Schedule />
        </div>

        <div className="section" id="scientificprogrammes" ref={sectionRef}>
        <ScientificProgrammes />
        </div>

        {/* <div className="section" id="dsdotc" ref={el => { if (el) columnsRef.current[0] = el; }}> */}
          {/* <Dsdotc /> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Body;