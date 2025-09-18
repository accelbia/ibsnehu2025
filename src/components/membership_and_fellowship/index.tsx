import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

// Register the SplitText plugin
gsap.registerPlugin(SplitText);

interface MembershipAndFellowShipProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const MembershipAndFellowShip: React.FC<MembershipAndFellowShipProps> = ({
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
          <h1 ref={headingRef}>Membership and Fellowship</h1>
        </div>

        <div
          ref={(el) => {
            if (el) {
              sectionsRef.current.push(el);
            }
          }}
        >
          <h2>MEMBERSHIP OF the Indian Botanical Society</h2>
          <p>
            Membership of the society is open to students, research scholars,
            teachers and scientists interested in botanical sciences. The annual
            membership is: Rs. 300/- for renewal of the current year
            subscription and Rs. 350/- for new entrants; life membership is Rs.
            4050/-. Membership dues may be paid through online bank transfer
            (details are available in the membership form on the society’s
            website) and the payment acknowledgement along with the membership
            forms sent to Dr. Alok Srivastava, Treasurer- IBS, Department of
            Plant Sciences, MJP Rohilkhand University, Bareilly-243006 (U.P.).
            Email:{' '}
            <a href='mailto:alokplantsciences@gmail.com'>
              alokplantsciences@gmail.com
            </a>
            . Application form for membership is available on Society’s website{' '}
            <a
              href='http://www.indianbotsoc.org'
              target='_blank'
              rel='noopener noreferrer'
            >
              www.indianbotsoc.org
            </a>
          </p>
        </div>

        <div
          ref={(el) => {
            if (el) {
              sectionsRef.current.push(el);
            }
          }}
        >
          <h2>Fellowship for the Indian Botanical Society (F. B. S.)</h2>
          <p>
            Life members who have completed at least 5 years of standing are
            eligible to apply for the fellowship of the Society. Interested
            members are requested to send a soft copy of the application as per
            the given proforma for consideration by July 31st, 2025 to the
            Secretary, IBS at{' '}
            <a href='mailto:secretaryibs2017@gmail.com'>
              secretaryibs2017@gmail.com
            </a>
            . The applicants if found suitable shall be issued a Fellowship
            Certificate of F.B.S during the conference on payment of the
            requisite fee of Rs. 1500/- only. **
          </p>
        </div>

        <div
          className='caption'
          ref={(el) => {
            if (el) {
              sectionsRef.current.push(el);
            }
          }}
        >
          ** Applicant should submit a soft copy of the full paper for these
          contests by 31st, July 2025 along with other required information as
          per the given proforma, to The Secretary, Indian Botanical Society at{' '}
          <a href='mailto:secretaryibs2017@gmail.com'>
            secretaryibs2017@gmail.com
          </a>
          .
        </div>
      </div>
      <div
        className='fullscreen-blur'
        onClick={() => setIsVisible(false)}
      ></div>
    </>
  );
};

export default MembershipAndFellowShip;
