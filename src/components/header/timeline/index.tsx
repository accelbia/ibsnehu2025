import { useState, useEffect, useRef } from 'react';
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
import DownloadIcon from '@mui/icons-material/Download';
// Register the SplitText plugin
gsap.registerPlugin(SplitText);

interface TimelineModalProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const TimelineModal: React.FC<TimelineModalProps> = ({ isVisible, setIsVisible }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [preConferenceTime, setPreConferenceTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [postConferenceTime, setPostConferenceTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeRemaining = (targetDate: string) => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = Math.max(0, target - now);

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPreConferenceTime(calculateTimeRemaining('2025-10-26T23:59:59'));
      setPostConferenceTime(calculateTimeRemaining('2025-11-01T23:59:59'));
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

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
          <h1 ref={headingRef}>Pre and Post Conference Events</h1>

          <Timeline>
            <TimelineItem className='timelineItem'>
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

            <TimelineItem className='timelineItem'>
              <TimelineOppositeContent>
                <h3 className='date'>26th October, 2025</h3>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h3 className='timelineTitle'>Pre-conference Event Registration Closes</h3>
                <p className='timelineContent'>
                  {preConferenceTime.days} days, {preConferenceTime.hours} hours,{' '}
                  {preConferenceTime.minutes} minutes, {preConferenceTime.seconds} seconds remaining
                </p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem className='timelineItem'>
              <TimelineOppositeContent>
                <h3 className='date'>28th October, 2025</h3>
                <h3 className='date'>09:30 am - 11:00 am</h3>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h3 className='timelineTitle'>Prof. R. S. Tripathi Commemoration Lecture</h3>
                <p className='timelineContent'>
                  The first Prof. R. S. Tripathi Commemoration Lecture Award will be delivered by
                  Padma Shri Dr. Eklabya Sharma <span className='honors'>FNA FNASc</span>, Former
                  DDG, ICIMOD, Kathmandu. The event will be chaired by Prof. S. Umdor, Pro-Vice
                  Chancellor, NEHU, Shillong. All are welcome to attend.
                </p>
                <p className='timelineContent'>Venue: Community Hall, NEHU</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem className='timelineItem'>
              <TimelineOppositeContent>
                <h3 className='date'>28th October, 2025</h3>
                <h3 className='date'>11:00 am - 5:00 pm</h3>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <p className='timelineContent'>Pre-conference Event</p>
                <h3 className='timelineTitle'>
                  Demo and Hands-on Training on RS & GIS using Google Earth Engine (GEE)
                </h3>
                <p className='timelineContent'>
                  The training will provide participants with hands-on exposure to cloud-based
                  geospatial analysis, satellite data handling, remote sensing indices, change
                  detection, and machine learning-based classification techniques. The sessions will
                  cover both fundamental concepts and practical implementations, enabling
                  participants to explore real-world environmental applications such as vegetation
                  monitoring, water resource mapping, and land cover classification. The program is
                  designed for students, researchers, and professionals eager to enhance their
                  skills in remote sensing, GIS, and data-driven Earth system science using GEE’s
                  powerful cloud computing infrastructure.
                </p>
                <img src='./gis.png' alt='GIS' style={{ width: '100%', marginTop: '10px' }} />
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

            <TimelineItem className='timelineItem'>
              <TimelineOppositeContent>
                <h3 className='date'>28th October, 2025</h3>
                <h3 className='date'>12:30 pm - 1:30 pm</h3>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent>
                <h3 className='timelineTitle'>Inauguration</h3>
                <p className='timelineContent'>
                  <strong>Welcome:</strong> Prof. S.K. Barik, NEHU, Shillong and President, IBS
                  <br />
                  <strong>About the Course:</strong> Course Director: Dr. Mukund D. Behera, IIT
                  Kharagpur
                  <br />
                  <strong>Presidential Remark:</strong> Dr. Shiva Prasad Agarwal, President ISRS and
                  Director, NESAC
                  <br />
                  <strong>Chief Guest:</strong> Dr. Subhash Ashutosh{' '}
                  <span className='honors'>IFS</span>, Former Director, FSI, & Co-Chairman and
                  Director, CoE for NRM & Sustainable Livelihoods, MBDA/MBMA, Govt. of Meghalaya
                  <br />
                  <strong>Vote of Thanks:</strong> Dr. Dibyajyoti Chutia, Head, Geoinformatics and
                  IT Division, NESAC
                  <br />
                  <strong>Faculty Members:</strong> Scientists from IIT Kharagpur (Dr. Mukund D
                  Behera, Vikramjeet Singh), and NESAC (Dr. K.K. Sharma, Dr. Kasturi Chakraborty,
                  Dr. Dibyajyoti Chutia)
                </p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem className='timelineItem'>
              <TimelineOppositeContent>
                <h3 className='date'>29th-31st October, 2025</h3>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h3 className='timelineTitle'>
                  XLVIII All India Botanical Conference of the Indian Botanical Society
                </h3>
                <p className='timelineContent' style={{ margin: 0, marginBottom: '10px' }}>
                  and International Symposium on Biology and Biotechnology of Plant Diversity for
                  Bioeconomy
                </p>

                <a
                  className='button'
                  href='https://forms.cloud.microsoft/r/G8UMm1RdEx'
                  target='_blank'
                >
                  Register
                  <LaunchIcon />
                </a>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem className='timelineItem'>
              <TimelineOppositeContent>
                <h3 className='date'>30th October, 2025</h3>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h3 className='timelineTitle'>Post-conference Event Registration Closes</h3>
                <p className='timelineContent'>
                  {postConferenceTime.days} days, {postConferenceTime.hours} hours,{' '}
                  {postConferenceTime.minutes} minutes, {postConferenceTime.seconds} seconds
                  remaining
                </p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem className='timelineItem'>
              <TimelineOppositeContent>
                <h3 className='date'>1st November, 2025</h3>
                <h3 className='date'>11:00 am - 5:00 pm</h3>
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <p className='timelineContent'>Post-conference Event</p>
                <h3 className='timelineTitle'>
                  Demo and Hands-On Training on Terrestrial Laser Scanning (TLS) for Forest AGB and
                  Carbon estimation
                </h3>
                <p className='timelineContent'>
                  This session will introduce the fundamentals of LiDAR technology, the working
                  principles of time-of-flight laser ranging, and the advantages of TLS for
                  high-resolution forest structure mapping, biomass estimation, and ecological
                  monitoring. Participants will gain practical exposure to the RIEGL VZ-400i TLS
                  system, including scanner setup and data acquisition. This post-conference
                  training is designed for students, researchers, and professionals who wish to
                  strengthen their understanding of LiDAR technology and acquire practical skills
                  for applying TLS in environmental and forestry studies.
                </p>
                <img src='./lidar.png' alt='LIDAR' style={{ width: '100%', marginTop: '10px' }} />
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

            <TimelineItem className='timelineItem'>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h3 className='timelineTitle'>Event Concludes with distribution of Certificates</h3>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem className='timelineItem'>
              <TimelineOppositeContent>
                <h3 className='date'>1st November, 2025</h3>
                <h3 className='date'>5:00 pm - 6:00 pm</h3>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>
                <h3 className='timelineTitle'>Concluding Session</h3>
                <p className='timelineContent'>
                  <strong>Welcome and Training Report:</strong> Prof. S. K. Barik, Dean, School of
                  Life Sciences, NEHU
                  <br />
                  <strong>Presidential Remark:</strong> Dr. K. K. Sharma, Group Head, Remote Sensing
                  Applications Group, NESAC
                  <br />
                  <strong>Address by the Chief Guest:</strong> Prof. P. S. Roy{' '}
                  <span className='honors'>FNASc FNAAS</span>, Former Director, Indian Institute of
                  Remote Sensing, Dept. of Space, Govt. of India, Dehradun
                  <br />
                  <strong>Distribution of Certificates:</strong> Chief Guest
                  <br />
                  <strong>Vote of Thanks:</strong> Dr. Kasturi Chakraborty, Head, Forestry & Ecology
                  Division, NESAC
                  <br />
                </p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>

          <div className='instructions'>
            <h2>Instructions to Participants</h2>
            <ul className='instruction-list'>
              <li>
                Participants interested to join these two-days events (Demo and Hands-on Training on
                RS & GIS using Google Earth Engine (GEE), and Terrestrial Laser Scanning (TLS) for
                Forest AGB and Carbon estimation) need to register through{' '}
                <a href='https://forms.cloud.microsoft/r/kT9j9AEueZ' target='_blank'>
                  this link
                </a>
                . This registration is additional and in addition to the
                <a href='https://forms.cloud.microsoft/r/G8UMm1RdEx' target='_blank'>
                  Conference / Symposium registration.
                </a>
              </li>
              <li>
                <strong>Registration fees:</strong> Rs. 500 for one day and Rs. 1000 for both the
                days. This will cover study materials and working lunch.
              </li>
              <li>Participants need to bring their own laptop.</li>
              <li>
                At the end of the event, training completion certificates will be presented to all
                the registered participating candidates.
              </li>
            </ul>
          </div>

          <div className='organizers'>
            <h2>Organizers</h2>
            <ul className='organizer-list'>
              <li>
                <a className='organizer-item' href='https://www.iitkgp.ac.in/' target='_blank'>
                  <img
                    src='/Sponsor Logos/iitkgp.png'
                    alt='Indian Institute of Technology, Kharagpur'
                    style={{ width: 'auto', height: '80px' }}
                  />
                  <span className='organizer-alt'>Indian Institute of Technology, Kharagpur</span>
                </a>
              </li>
              <li>
                <a className='organizer-item' href='https://nehu.ac.in/' target='_blank'>
                  <img
                    src='/Sponsor Logos/nehu.svg'
                    alt='North-Eastern Hill University, Shillong'
                    style={{ width: 'auto', height: '80px' }}
                  />
                  <span className='organizer-alt'>North-Eastern Hill University, Shillong</span>
                </a>
              </li>
              <li>
                <a className='organizer-item' href='https://nesac.gov.in/' target='_blank'>
                  <img
                    src='/Sponsor Logos/nesac.png'
                    alt='North-East Space Application Centre, Shillong'
                    style={{ width: 'auto', height: '80px' }}
                  />
                  <span className='organizer-alt'>
                    North-East Space Application Centre, Shillong
                  </span>
                </a>
              </li>
              <li>
                <a className='organizer-item' href='https://isgindia.org/' target='_blank'>
                  <img
                    src='/Sponsor Logos/isg.png'
                    alt='Indian Society of Geomatics, Kharagpur Chapter'
                    style={{ width: 'auto', height: '80px' }}
                  />
                  <span className='organizer-alt'>
                    Indian Society of Geomatics, Kharagpur Chapter
                  </span>
                </a>
              </li>
              <li>
                <a className='organizer-item' href='https://mbda.gov.in/' target='_blank'>
                  <img
                    src='/Sponsor Logos/mbda.jpeg'
                    alt='Meghalaya Basin Development Authority'
                    style={{ width: 'auto', height: '80px' }}
                  />
                  <span className='organizer-alt'>Meghalaya Basin Development Authority</span>
                </a>
              </li>
              <li>
                <a className='organizer-item' href='https://www.isrs-india.org/' target='_blank'>
                  <img
                    src='/Sponsor Logos/isrs.png'
                    alt='Indian Society of Remote Sensing, Shillong Chapter'
                    style={{ width: 'auto', height: '80px' }}
                  />
                  <span className='organizer-alt'>
                    Indian Society of Remote Sensing, Shillong Chapter
                  </span>
                </a>
              </li>
            </ul>

            <h2>Course Director</h2>
            <ul className='organizers-list'>
              <li>
                <p className='name'>Dr. Mukund Dev Behera</p>
                <p className='affiliation'>IIT, Kharagpur</p>
              </li>
            </ul>

            <h2>Training Faculty</h2>
            <ul className='organizers-list'>
              <li>
                <p className='name'>Dr. K. K. Sharma</p>
                <p className='affiliation'>
                  Group Head, Remote Sensing Applications Group (RSAG), NESAC & Deputy Project
                  Director, NER-DRR
                </p>
              </li>
              <li>
                <p className='name'>Dr. Kasturi Chakraborty</p>
                <p className='affiliation'>Head, Forestry & Ecology Division, NESAC</p>
              </li>
              <li>
                <p className='name'>Dr. Dibyajyoti Chutia</p>
                <p className='affiliation'>Head, Geoinformatics and IT Division, NESAC</p>
              </li>
              <li>
                <p className='name'>Vikramjeet Singh</p>
                <p className='affiliation'>CORAL, IIT Kharagpur</p>
              </li>
            </ul>

            <h2>Advisers</h2>
            <ul className='organizers-list'>
              <li>
                <p className='name'>Dr. Subhash Ashutosh</p>
                <p className='affiliation'>
                  Former Director, Forest Survey of India, and Co-Chairman and Director, Centre of
                  Excellence for NRM & Sustainable Livelihoods, MBDA/MBMA, Govt. of Meghalaya
                </p>
              </li>
              <li>
                <p className='name'>Dr. S. P. Agarwal</p>
                <p className='affiliation'>
                  Director, NESAC and President, Indian Society of Remote Sensing (ISRS)
                </p>
              </li>
              <li>
                <p className='name'>Prof. Sunil Dey</p>
                <p className='affiliation'>
                  Chairman, ISRS, Shillong Chapter and Professor, Department of Geography, NEHU
                </p>
              </li>
              <li>
                <p className='name'>Prof. Saroj K Barik</p>
                <p className='affiliation'>
                  Dean, School of Life Sciences, North-Eastern Hill University
                </p>
              </li>
            </ul>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a
              className='button'
              href='/Pre and Post Conference Event Brochure.pdf'
              target='_blank'
            >
              Download
              <DownloadIcon />
            </a>
          </div>
        </div>
      </div>
      <div className='fullscreen-blur' onClick={() => setIsVisible(false)}></div>
    </>
  );
};

export default TimelineModal;
