import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Register the SplitText plugin
gsap.registerPlugin(SplitText);

const images = [
  {
    src: '/Sight Seeing/Kyllang-Rock-1.jpg',
    caption: 'Kyllang Rock: A massive dome-shaped rock formation.',
  },
  {
    src: '/Sight Seeing/Mawlynnong-Living-Root-Bridge-1.jpg',
    caption: 'Mawlynnong Living Root Bridge: A marvel of bioengineering.',
  },
  {
    src: '/Sight Seeing/Shillong-City-1.jpg',
    caption: 'Shillong City: The Scotland of the East.',
  },
  {
    src: '/Sight Seeing/sohra.jpg',
    caption: 'Sohra (Cherrapunjee): Famous for its waterfalls and caves.',
  },
  {
    src: '/Sight Seeing/Arwah-Cave-1.jpg',
    caption: 'Arwah Cave: A limestone cave with fossils and stalactites.',
  },
  {
    src: '/Sight Seeing/Dainthlen.jpg',
    caption: 'Dainthlen Falls: A waterfall with a legendary tale.',
  },
  {
    src: '/Sight Seeing/Khasi-Hills-Mawphanlur-1.jpg',
    caption: 'Mawphanlur: A serene village in the Khasi Hills.',
  },
  {
    src: '/Sight Seeing/Mawsmai-Cave-1.jpg',
    caption: 'Mawsmai Cave: A popular tourist cave in Sohra.',
  },
  {
    src: '/Sight Seeing/Nongkhnum-River-Village-1.jpg',
    caption: 'Nongkhnum River Island: The second largest river island in Asia.',
  },
  {
    src: '/Sight Seeing/Nongriat-Root-Bridges-1.jpg',
    caption: 'Nongriat Root Bridges: Famous double-decker living root bridge.',
  },
  {
    src: '/Sight Seeing/Umiam-Lake-1.jpg',
    caption: 'Umiam Lake: A scenic reservoir also known as Barapani.',
  },
];

interface SightSeeingProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const preloadImages = (imagePaths: string[]) => {
  imagePaths.forEach((path) => {
    const img = new Image();
    img.src = path;
  });
};

const SightSeeing: React.FC<SightSeeingProps> = ({ isVisible, setIsVisible }) => {
  // Preload images on component mount
  useEffect(() => {
    const imagePaths = images.map((image) => image.src);
    preloadImages(imagePaths);
  }, []);

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
          <h1 ref={headingRef}>SightSeeing</h1>
        </div>

        <div
          ref={(el) => {
            if (el) {
              sectionsRef.current.push(el);
            }
          }}
        >
          <h2>Tourist spots in nearby places of Shillong</h2>
          <p>
            Meghalaya’s highest elevations are found in the Khasi Hills, and its southern edge is
            home to some of the rainiest places on the planet. Sohra and Mawsynram are famous for
            their intense monsoon rains. Shillong offers a unique blend of small-town charm and
            modern urban vibes. From Shillong, travelers can easily access popular destinations such
            as scenic road trips, the cleanest village, caves and breathtaking waterfalls in Sohra
            (Cherrapunjee), the viewpoint at Shillong Peak, the sacred grove at Mawphlang, the
            monoliths at Nartiang, the scenic beauty of Umiam, and the Double Decker Root Bridge at
            Mawlynnong.
          </p>
          {/* <Carousel
            autoPlay
            infiniteLoop
            interval={5000}
            showThumbs={false}
            showStatus={false}
            dynamicHeight={false}
            centerMode={true}
            centerSlidePercentage={100}
            emulateTouch
            swipeable
          >
            {images.map((image, index) => (
              <div
                key={index}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <img
                  src={image.src}
                  alt={image.caption}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <p className='legend' style={{ textAlign: 'center' }}>
                  {image.caption}
                </p>
              </div>
            ))}
          </Carousel>
          <p>[Photo Courtesy: Meghalaya Tourism]</p> */}
          <img
            src={`${images[0].src}`}
            alt={images[0].caption}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <p className='legend' style={{ textAlign: 'center' }}>
            {images[0].caption}
          </p>
          <img
            src={`${images[1].src}`}
            alt={images[1].caption}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <p className='legend' style={{ textAlign: 'center' }}>
            {images[1].caption}
          </p>
          <img
            src={`${images[2].src}`}
            alt={images[2].caption}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <p className='legend' style={{ textAlign: 'center' }}>
            {images[2].caption}
          </p>
          <img
            src={`${images[3].src}`}
            alt={images[3].caption}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <p className='legend' style={{ textAlign: 'center' }}>
            {images[3].caption}
          </p>
          <p>
            Participants interested in sight seeing may contact the Registration Counter of the
            conference on the arrival day and book their visits for arrangement of Vehicles on
            payment basis.
          </p>
        </div>
      </div>
      <div className='fullscreen-blur' onClick={() => setIsVisible(false)}></div>
    </>
  );
};

export default SightSeeing;
