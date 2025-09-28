import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
import './pagination.css';
import './a11y.css';
import './navigation.css';

// Register the SplitText plugin
gsap.registerPlugin(SplitText);

const images = [
  {
    src: '/Sight Seeing/Khasi-Hills-Mawphanlur-1.jpg',
    caption: 'Mawphanlur: A serene village in the Khasi Hills.',
  },
  {
    src: '/Sight Seeing/Dawki-Shnongpdeng.avif',
    caption: 'Dawki Shnongpdeng: A serene riverside destination.',
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
    src: '/Sight Seeing/Kongthong-Village-1.avif',
    caption: 'Kongthong Village: The whistling village of Meghalaya.',
  },
  {
    src: '/Sight Seeing/Krangshuri.jpg',
    caption: 'Krangshuri Falls: A stunning waterfall with crystal-clear waters.',
  },
  {
    src: '/Sight Seeing/Kyllang-Rock-1.jpg',
    caption: 'Kyllang Rock: A massive dome-shaped rock formation.',
  },
  {
    src: '/Sight Seeing/Mawlynnong.avif',
    caption:
      'Mawlynnong Living Root Bridge: A marvel of bioengineeringa at Asia’s cleanest village',
  },
  {
    src: '/Sight Seeing/Mawphlang-Sacred-Groves-1.avif',
    caption: 'Mawphlang Sacred Groves: A forest steeped in tradition.',
  },
  {
    src: '/Sight Seeing/Mawsmai-Cave-1.jpg',
    caption: 'Mawsmai Cave: A popular tourist cave in Sohra.',
  },
  {
    src: '/Sight Seeing/Nartiang-Monoliths.avif',
    caption: 'Nartiang Monoliths: A site of ancient monolithic structures.',
  },
  {
    src: '/Sight Seeing/Nohkalikai-Falls-1.webp',
    caption: 'Nohkalikai Falls: The tallest plunge waterfall in India.',
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
    src: '/Sight Seeing/Shillong-City-1.jpg',
    caption: 'Shillong City: The Scotland of the East.',
  },
  {
    src: '/Sight Seeing/Don-Bosco-Museum.png',
    caption: 'Don Bosco Museum: Showcasing the rich culture of Northeast India.',
  },
  {
    src: '/Sight Seeing/Sohra-1.jpg',
    caption: 'Sohra (Cherrapunjee): Famous for its waterfalls and caves.',
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

  // Ensure fonts are loaded before initializing SplitText
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

          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            modules={[Navigation, Pagination, A11y]}
            scrollbar={{ draggable: true }}
            navigation
            pagination={{ clickable: true }}
            style={{ width: '100%', height: 'auto' }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                  <img
                    src={image.src}
                    alt={image.caption}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                  <p style={{ marginTop: '8px', fontStyle: 'italic' }}>{image.caption}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#555' }}>
            Image Credits:{' '}
            <a href='https://www.meghalayatourism.in' target='_blank' rel='noopener noreferrer'>
              Meghalaya Tourism
            </a>
          </p>
          <p>
            Participants interested in sight seeing may contact the Registration Counter of the
            conference on the arrival day and book their visits for arrangement of vehicles on
            payment basis.
          </p>
        </div>
      </div>
      <div className='fullscreen-blur' onClick={() => setIsVisible(false)}></div>
    </>
  );
};

export default SightSeeing;
