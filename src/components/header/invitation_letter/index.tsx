import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton } from '@mui/material';
import DocumentIcon from '@mui/icons-material/Description';

import './styles.css';
// Register the SplitText plugin
gsap.registerPlugin(SplitText);

interface InvitationLetterProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const InvitationLetter: React.FC<InvitationLetterProps> = ({ isVisible, setIsVisible }) => {
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
          <h1 ref={headingRef}>Invitation Letter</h1>
          <p>Dear Fellow Researchers,</p>
          <p>
            During the year 2025, the Indian Botanical Society (IBS) has chosen the{' '}
            <strong>
              Department of Botany and School of Life Sciences, North-Eastern Hill University,
              Shillong (Meghalaya)
            </strong>{' '}
            to hold its <strong>XLVIII All India Botanical Conference</strong>. The conference shall
            be held during October 29-31, 2025 under the Presidentship of{' '}
            <strong>Prof. Saroj K. Barik</strong>. With great pleasure we cordially invite all IBS
            members to attend the conference and participate in the scientific sessions, symposia,
            poster presentations, and other activities of the conference for exchange of thoughts /
            opinion and scientific interaction.{' '}
          </p>
        </div>
        <div
          ref={(el) => {
            if (el) {
              sectionsRef.current.push(el);
            }
          }}
          className='invitation-links'
        >
          <a href='/docs/Valedictory Function Invitation - IBS NEHU 2025.pdf' target='_blank'>
            <DocumentIcon />
            Valedictory Function Invitation
          </a>

          <a
            href='/docs/Post-Conference Concluding Session Invitation - IBS NEHU 2025.pdf'
            target='_blank'
          >
            <DocumentIcon />
            Post-Conference Concluding Session Invitation
          </a>
        </div>

        <div
          ref={(el) => {
            if (el) {
              sectionsRef.current.push(el);
            }
          }}
        >
          <h2 className='title'>Venue</h2>
          <p>
            <strong>Shillong, the capital city of Meghalaya</strong> is 65 km away from Mawsynram,
            the wettest place on the earth. It is one of the important tourist destinations in the
            northeast India. Shillong is often referred to as the ‘Scotland of the East’ due to its
            striking similarity with the Scottish Highlands. Lying in the cradle of tall pine trees,
            Shillong’s undulating terrain is a constant source of attraction for tourists both from
            the country and abroad. The climate is moderately warm and humid during summer but quite
            cold in winters. October-November and March-April are the best months to visit Shillong.
            The end October in Shillong will have temperatures ranging from 15.9°C to 22.6°C (60.6°F
            to 72.7°F). The weather during this time is generally pleasant with clear skies and
            gentle winds. The beautiful and historic places of tourist interest in and around
            Shillong include Don Bosco Museum, Butterfly Museum, Botanical Garden, Shillong Peak,
            Umiam Lake, Ward’s Lake, and Cherrapunji, the second wettest place on the earth
            receiving exceptionally high annual rainfall.
          </p>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14390.703675865243!2d91.88387900693283!3d25.615683137901673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37507f24eb983da7%3A0x1e62b95388f833be!2sNorth-Eastern%20Hill%20University%20Meghalaya%20(NEHU)!5e0!3m2!1sen!2sin!4v1754735362714!5m2!1sen!2sin'
            width={'100%'}
            height='450'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>

        <div
          ref={(el) => {
            if (el) {
              sectionsRef.current.push(el);
            }
          }}
        >
          <h2 className='title'>About the Host</h2>
          <h3>
            Department of Botany, and School of Life Sciences, North-Eastern Hill University,
            Shillong
          </h3>
          <p>
            <strong>The School of Life Sciences</strong> is the premier centre for post-graduate
            teaching and research in the frontier areas of Biology, comprising four academic
            departments, viz., Department of Botany, Department of Zoology, Department of
            Biochemistry, and Department of Biotechnology and Bioinformatics. Two departments, viz.,
            Department of Botany and Department of Zoology have successfully completed their 50
            years of glorious journey and will celebrate Golden Jubilee during the International
            Symposium.
          </p>
          <p>
            <strong>The Department of Botany</strong> has been in the forefront of teaching and
            research in Plant Sciences in the country since its establishment in 1974. The
            Department stands today as a unique centre of learning in the country where
            multidisciplinary and interdisciplinary teaching and research in Plant Sciences have
            established permanent roots. The Department has been a UGC Centre of Advanced Studies in
            Botany, and the recipient of extramural research support from numerous national and
            international grant organizations during its glorious 50 years of existence. It is
            befitting to host the IBS Conference on this occasion.
          </p>
        </div>

        <div
          ref={(el) => {
            if (el) {
              sectionsRef.current.push(el);
            }
          }}
        >
          <a className='button' href='https://register.ibsnehu2025.org/' target='_blank'>
            Register
            <LaunchIcon />
          </a>
        </div>
      </div>
      <div className='fullscreen-blur' onClick={() => setIsVisible(false)}></div>
    </>
  );
};

export default InvitationLetter;
