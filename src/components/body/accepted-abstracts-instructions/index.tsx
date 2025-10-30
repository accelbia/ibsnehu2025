import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import './index.css';
// Register the SplitText plugin
gsap.registerPlugin(SplitText);

interface AcceptedAbstractsInstructionsProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const AcceptedAbstractsInstructions: React.FC<AcceptedAbstractsInstructionsProps> = ({
  isVisible,
  setIsVisible,
}) => {
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
      document.fonts.ready.then(() => {
        const split = new SplitText(headingRef.current, { type: 'chars' });
        gsap.from(split.chars, {
          duration: 1,
          opacity: 0,
          y: 10,
          stagger: 0.05,
          ease: 'power2.out',
        });
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
      { threshold: 0.05 },
    );

    sectionsRef.current.forEach((section) => {
      gsap.set(section, { opacity: 0, y: 50 }); // Initial state
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const timelineItems = document.querySelectorAll('.timelineItem');

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
        { threshold: 0.3 }, // Trigger when 30% of the item is visible
      );

      timelineItems.forEach((item) => {
        gsap.set(item, { opacity: 0, y: 50 }); // Initial state
        observer.observe(item);
      });

      return () => observer.disconnect(); // Cleanup observer on unmount
    }
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
          <h1 ref={headingRef}>Summary of Presentations</h1>
          <h2>A. Number of posters and oral presentations under various sections</h2>
          <table cellPadding={5} cellSpacing={0}>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Scientific Sections</th>
                <th>Oral</th>
                <th>Poster</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mycology, Microbiology and Plant Pathology</td>
                <td>15</td>
                <td>17</td>
                <td>32</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Algae, Bryophytes and Pteridophytes Seed</td>
                <td>17</td>
                <td>11</td>
                <td>28</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Plants: Anatomy and Reproductive Biology</td>
                <td>10</td>
                <td>1</td>
                <td>11</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Seed Plants: Taxonomy, Ethnobotany and Plant Resource Utilization</td>
                <td>15</td>
                <td>29</td>
                <td>44</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Cytogenetics, Plant Breeding and Molecular Biology</td>
                <td>13</td>
                <td>2</td>
                <td>15</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Ecology and Environmental Biology</td>
                <td>18</td>
                <td>18</td>
                <td>36</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Plant Physiology and Biochemistry</td>
                <td>14</td>
                <td>25</td>
                <td>39</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Plant Biotechnology</td>
                <td>16</td>
                <td>13</td>
                <td>29</td>
              </tr>
              <tr>
                <th colSpan={5}>Special Sections</th>
              </tr>
              <tr>
                <th colSpan={5}>NEHU Golden Jubilee Thematic Sections</th>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  Biology of Plant diversity for Bioeconomy with special reference to North-East
                  India (SS-1)
                </td>
                <td>14</td>
                <td>4</td>
                <td>18</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Plant-Animal-Microbe Interactions (SS-2)</td>
                <td>6</td>
                <td>0</td>
                <td>6</td>
              </tr>
              <tr>
                <th></th>
                <th>Total</th>
                <th>138</th>
                <th>120</th>
                <th>258</th>
              </tr>
            </tbody>
          </table>
          <p>
            For full list of accepted abstracts,{' '}
            <a
              href='/docs/List of Accepted Abstracts - IBS NEHU 2025.pdf'
              target='_blank'
              rel='noopener noreferrer'
            >
              click here!
            </a>
          </p>
          <h2>B. Presidential Address</h2>
          <p>Number of addresses: 1</p>
          <h2>C. Award Lectures</h2>
          <p>Number of lectures: 6 (40 minutes each)</p>
          <h2>D. Plenary Talks</h2>
          <p>Number of talks: 11 (40 minutes each)</p>
          <h2>E. Lead Speakers</h2>
          <p>Number of talks: 21 (15 minutes each)</p>
          <h2>F. Special Lead Lectures</h2>
          <p>Number of lectures: 5 (15 minutes each)</p>
          <h1 ref={headingRef}>Instructions</h1>
          <ul className='instructions-list'>
            <li>Size of the poster: 3 ft width x 4 ft length</li>
            <li>Oral presentations not to exceed 10 min. (strictly)</li>
            <li>Only IBS members will be allowed to present (both Poster and Oral).</li>
            <li>Registration is compulsory for all presenters (Poster and Oral).</li>
          </ul>
        </div>
      </div>
      <div className='fullscreen-blur' onClick={() => setIsVisible(false)}></div>
    </>
  );
};

export default AcceptedAbstractsInstructions;
