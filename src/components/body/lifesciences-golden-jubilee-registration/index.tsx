import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import PlantIcon from '@mui/icons-material/LocalFlorist';
import './index.css';
// Register the SplitText plugin
gsap.registerPlugin(SplitText);

interface GoldenJubileeLetterProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const GoldenJubileeLetter: React.FC<GoldenJubileeLetterProps> = ({ isVisible, setIsVisible }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const paragraphsRef = useRef<HTMLParagraphElement[]>([]);

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

  useEffect(() => {
    if (isVisible) {
      gsap.set(paragraphsRef.current, { opacity: 0, y: 20 }); // Initial state for paragraphs
      gsap.to(paragraphsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.7, // Animate one paragraph after another
        ease: 'power2.out',
      });
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
          <h1 ref={headingRef}>
            Invitation to the
            <br /> Golden Jubilee Celebration
          </h1>
        </div>

        <div
          ref={(el) => {
            if (el) {
              sectionsRef.current.push(el);
            }
          }}
        >
          <img
            src='/letterhead-up.png'
            alt='Letterhead'
            className='letterhead-image'
            width={'100%'}
          />
        </div>

        <div
          ref={(el) => {
            if (el) {
              sectionsRef.current.push(el);
            }
          }}
        >
          <p
            ref={(el) => {
              if (el) {
                paragraphsRef.current.push(el);
              }
            }}
          >
            To
            <br />
            The Ph. D. Alumni of NEHU School of Life Sciences (1974 – 2025 Ph. D. awardees)
            <br />
            (Departments of Botany, Zoology, Biochemistry, and Biotechnology and Bioinformatics)
            <br />
            North-Eastern Hill University, Shillong
          </p>
          <p
            ref={(el) => {
              if (el) {
                paragraphsRef.current.push(el);
              }
            }}
            style={{ marginTop: '20px' }}
          >
            <em>
              <strong>Sub:</strong> Invitation to the Golden Jubilee Celebration of School of Life
              Sciences, North-Eastern Hill University, Shillong, XLVIII All India Botanical
              Conference of the Indian Botanical Society (IBS) and International Symposium on
              “Biology and Biotechnology of Plant Diversity for Bioeconomy” at North-Eastern Hill
              University (NEHU), Shillong, India.
            </em>
          </p>
          <p
            ref={(el) => {
              if (el) {
                paragraphsRef.current.push(el);
              }
            }}
          >
            Dear Alumni,
          </p>
          <p
            ref={(el) => {
              if (el) {
                paragraphsRef.current.push(el);
              }
            }}
          >
            I am happy to inform you that the School of Life Sciences, North-Eastern Hill
            University, Shillong has completed its 50 years of glorious journey, and we are
            celebrating the Golden Jubilee year along with the XLVIII All India Botanical Conference
            of the Indian Botanical Society (IBS), and International Symposium on “Biology and
            Biotechnology of Plant Diversity for Bioeconomy” at North-Eastern Hill University,
            Shillong during 29-31 October, 2025. The School began in 1974 with the establishment of
            the departments of Botany and Zoology, which was subsequently expanded with the setting
            up of departments of Biochemistry in 1980 and Biotechnology and Bioinformatics in 2005.
            We are proud of you for not only making significant contributions to the growth and
            success of our school through outstanding research work during your Ph.D. days, but also
            for having continuously uplifted the name of NEHU through your lifelong scientific
            achievements and other societal contributions, both within our country and abroad.
          </p>
          <p
            ref={(el) => {
              if (el) {
                paragraphsRef.current.push(el);
              }
            }}
          >
            On behalf of the School of Life Sciences, I cordially invite you to be a part of this
            celebration and encourage the faculty and students at our school through sharing your
            life-long scientific experience and achievements on 31st October, 2025, the exclusive
            date of Golden jubilee celebration. We shall be grateful if you also kindly send us a
            write-up along with your passport size photograph sharing your memories, anecdotes,
            experiences, or memorable incidents during your time at the School for the publication
            of a Souvenir. Whether it is a funny classroom moment, a cherished friendship, a
            research achievement, or an unforgettable event, your story will help us capture the
            spirit and legacy of these 50 years.
          </p>
          <p
            ref={(el) => {
              if (el) {
                paragraphsRef.current.push(el);
              }
            }}
          >
            Considering the time constraints, I humbly request you to kindly send your write-up to{' '}
            <a href='mailto:president@ibsnehu2025.org?cc=hshukla01@gmail.com&subject=Golden%20Jubilee%20Celebration%20Writeup'>
              president@ibsnehu2025.org
            </a>{' '}
            with a copy to{' '}
            <a href='mailto:president@ibsnehu2025.org?cc=hshukla01@gmail.com&subject=Golden%20Jubilee%20Celebration%20Writeup'>
              hshukla01@gmail.com
            </a>{' '}
            latest by 20th October, 2025. Every contribution, big or small, will be valued and
            included in our commemorative collection, helping to celebrate the School’s journey in a
            befitting manner with a personal touch.
          </p>
          <p
            ref={(el) => {
              if (el) {
                paragraphsRef.current.push(el);
              }
            }}
          >
            We look forward to reminiscing those beautiful moments with you and making this Golden
            Jubilee Celebration a truly special.
          </p>
          <p
            ref={(el) => {
              if (el) {
                paragraphsRef.current.push(el);
              }
            }}
          >
            Kindly let us know your travel dates and time through the above stated e-mail IDs and
            also by registering at “Life Sciences Golden Jubilee Celebration Delegation
            Registration” window of the Conference portal{' '}
            <a href='https://ibsnehu2025.org' target='_blank'>
              ibsnehu2025.org
            </a>{' '}
            to enable us to provide you the required logistic support. We are sure, you will be able
            to manage your travel cost from your home/work place to Guwahati and back from your own
            sources. It will be our pleasure to extend local hospitality (lodging and boarding) to
            you including the travel arrangements from Guwahati international airport/Railway
            Station to NEHU Campus. Awaiting your arrival at Shillong on 28th October, 2025 and with
            best regards,
          </p>
          <p
            ref={(el) => {
              if (el) {
                paragraphsRef.current.push(el);
              }
            }}
          >
            Yours Sincerely,
            <br />
            <strong
              style={{
                fontSize: '24px',
                color: 'var(--theme-color)',
              }}
            >
              Saroj K Barik
            </strong>
            <br />
            Dean, School of Life Sciences, NEHU
            <br />
            And President, Indian Botanical Society
          </p>
        </div>

        <a
          className='button heavy'
          href='https://forms.cloud.microsoft/r/QZYECrUeb6'
          target='_blank'
        >
          <PlantIcon />
          Register as Life Sciences Golden Jubilee Delegate
        </a>
      </div>

      <div className='fullscreen-blur' onClick={() => setIsVisible(false)}></div>
    </>
  );
};

export default GoldenJubileeLetter;
