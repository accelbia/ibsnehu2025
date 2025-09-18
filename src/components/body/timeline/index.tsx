import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton } from '@mui/material';
import './index.css';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

// Register the SplitText plugin
gsap.registerPlugin(SplitText);

interface TimelineModalProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const TimelineModal: React.FC<TimelineModalProps> = ({
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
          <h1 ref={headingRef}>Pre and Post Conference Events</h1>
          <Timeline>
            <TimelineItem>
              <TimelineOppositeContent>
                <h3 className='date'>Timeline</h3>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h3 className='timelineTitle'>Event</h3>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineOppositeContent>
                <h3 className='date'>26th October, 2025</h3>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h3 className='timelineTitle'>
                  Pre-conference Event Registration Closes
                </h3>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineOppositeContent>
                <h3 className='date'>28th October, 2025</h3>
                <h3 className='date'>11:00 am - 5:00 pm</h3>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <p className='timelineItem'>Pre-conference Event</p>
                <h3 className='timelineTitle'>
                  Demo and Hands-on Training on RS & GIS using Google Earth
                  Engine (GEE)
                </h3>
                <p className='timelineContent'>
                  The training will provide participants with hands-on exposure
                  to cloud-based geospatial analysis, satellite data handling,
                  remote sensing indices, change detection, and machine
                  learning-based classification techniques. The sessions will
                  cover both fundamental concepts and practical implementations,
                  enabling participants to explore real-world environmental
                  applications such as vegetation monitoring, water resource
                  mapping, and land cover classification. The program is
                  designed for students, researchers, and professionals eager to
                  enhance their skills in remote sensing, GIS, and data-driven
                  Earth system science using GEE’s powerful cloud computing
                  infrastructure.
                </p>
                <img
                  src='./gis.png'
                  alt='GIS'
                  style={{ width: '100%', marginTop: '10px' }}
                />
                <a
                  className='button'
                  href='https://forms.cloud.microsoft/r/kT9j9AEueZ'
                  target='_blank'
                >
                  Register for Event
                  <LaunchIcon />
                </a>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineOppositeContent>
                <h3 className='date'>29th-31st October, 2025</h3>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h3 className='timelineTitle'>Conference</h3>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineOppositeContent>
                <h3 className='date'>30th October, 2025</h3>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h3 className='timelineTitle'>
                  Post-conference Event Registration Closes
                </h3>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineOppositeContent>
                <h3 className='date'>1st November, 2025</h3>
                <h3 className='date'>11:00 am - 5:00 pm</h3>
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>
                <p className='timelineItem'>Post-conference Event</p>
                <h3 className='timelineTitle'>
                  Demo and Hands-On Training on Terrestrial Laser Scanning (TLS)
                  for Forest AGB and Carbon estimation
                </h3>
                {/* <p className='timelineItem'>Demo and Hands-On Training on Terrestrial Laser Scanning (TLS) for Forest AGB and Carbon estimation</p> */}
                <p className='timelineContent'>
                  This session will introduce the fundamentals of LiDAR
                  technology, the working principles of time-of-flight laser
                  ranging, and the advantages of TLS for high-resolution forest
                  structure mapping, biomass estimation, and ecological
                  monitoring. Participants will gain practical exposure to the
                  RIEGL VZ-400i TLS system, including scanner setup and data
                  acquisition. This post-conference training is designed for
                  students, researchers, and professionals who wish to
                  strengthen their understanding of LiDAR technology and acquire
                  practical skills for applying TLS in environmental and
                  forestry studies.
                </p>
                <img
                  src='./lidar.png'
                  alt='LIDAR'
                  style={{ width: '100%', marginTop: '10px' }}
                />
                <a
                  className='button'
                  href='https://forms.cloud.microsoft/r/kT9j9AEueZ'
                  target='_blank'
                >
                  Register for Event
                  <LaunchIcon />
                </a>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
          <div className='feedback-form'></div>
        </div>

        <a
          className='button'
          href='https://register.ibsnehu2025.org/'
          target='_blank'
        >
          Register
          <LaunchIcon />
        </a>
      </div>
      <div
        className='fullscreen-blur'
        onClick={() => setIsVisible(false)}
      ></div>
    </>
  );
};

export default TimelineModal;
