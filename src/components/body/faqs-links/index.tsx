import './index.css';
import ExternalLinkIcon from '@mui/icons-material/OpenInNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CarIcon from '@mui/icons-material/DirectionsCar';
import HotelIcon from '@mui/icons-material/Hotel';
import ScienceIcon from '@mui/icons-material/Science';
import BadgeIcon from '@mui/icons-material/Badge';
import FellowShipIcon from '@mui/icons-material/School';
import ContactIcon from '@mui/icons-material/ContactMail';
import FlowerIcon from '@mui/icons-material/LocalFlorist';
import React from 'react';
import Contact from './contact';
import SightSeeing from './sight-seeing';

interface FAQsLinksProps {
  setBodyVariant: React.Dispatch<
    React.SetStateAction<'home' | 'scientific-programmes' | 'distinguished-speakers'>
  >;
  setDisplayOfficeBearers: (value: boolean) => void;
  setDisplayFellowship: (value: boolean) => void;
  setDisplayGoldenJubileeLetter: (value: boolean) => void;
}
const FAQsLinks = ({
  setBodyVariant,
  setDisplayOfficeBearers,
  setDisplayFellowship,
  setDisplayGoldenJubileeLetter,
}: FAQsLinksProps) => {
  const [displayContact, setDisplayContact] = React.useState(false);
  const [displaySightSeeing, setDisplaySightSeeing] = React.useState(false);

  return (
    <>
      {displayContact && <Contact isVisible={displayContact} setIsVisible={setDisplayContact} />}
      {displaySightSeeing && (
        <SightSeeing isVisible={displaySightSeeing} setIsVisible={setDisplaySightSeeing} />
      )}
      <div className='faq-links-container'>
        <div className='faq-container'>
          <h1 className='heading'>FAQs</h1>
          <div className='faq-item'>
            <h2 className='faq-question'>What is the conference about?</h2>
            <p className='faq-answer'>
              The conference focuses on the latest advancements in Biological Sciences/Biodiversity
              Research and Biomanufacturing for Bioeconomy.
            </p>
          </div>
          <div className='faq-item'>
            <h2 className='faq-question'>Who can attend?</h2>
            <p className='faq-answer'>
              Researchers, students, and industries interested in Biological Sciences and
              Biomanufacturing are welcome to attend.
            </p>
          </div>
          <div className='faq-item'>
            <h2 className='faq-question'>How can I register?</h2>
            <p className='faq-answer'>
              You can register for the conference and related events using the following links:
            </p>
            <ul className='faq-registration-links'>
              <li>
                <a
                  href='https://forms.cloud.microsoft/r/G8UMm1RdEx'
                  target='_blank'
                  className='link'
                >
                  Conference/International Symposium Registration
                </a>
              </li>
              <li>
                <a
                  href='https://forms.cloud.microsoft/r/kT9j9AEueZ'
                  target='_blank'
                  className='link'
                >
                  Pre and Post Conference Event Registration
                </a>
              </li>
              <li>
                <a
                  className='link'
                  href='https://forms.cloud.microsoft/r/QZYECrUeb6'
                  target='_blank'
                >
                  Life Sciences Golden Jubilee Delegate Registration
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='links-container'>
          <h1 className='heading'>Important Links</h1>
          <div className='link-item'>
            <a href='https://forms.cloud.microsoft/r/G8UMm1RdEx' target='_blank' className='link'>
              <ExternalLinkIcon fontSize='small' style={{ marginRight: '5px' }} />
              Conference/International Symposium Registration
            </a>
          </div>
          <div className='link-item'>
            <a href='https://forms.cloud.microsoft/r/kT9j9AEueZ' target='_blank' className='link'>
              <ExternalLinkIcon fontSize='small' style={{ marginRight: '5px' }} />
              Pre and Post Conference Event Registration
            </a>
          </div>
          <div className='link-item'>
            <a className='link' onClick={() => setDisplayGoldenJubileeLetter(true)}>
              <FlowerIcon fontSize='small' style={{ marginRight: '5px' }} />
              Life Sciences Golden Jubilee Delegate Registration
            </a>
          </div>
          <div className='link-item'>
            <a
              className='link'
              onClick={() => {
                setDisplayFellowship(true);
              }}
            >
              <FellowShipIcon fontSize='small' style={{ marginRight: '5px' }} />
              IBS Fellowship
            </a>
          </div>
          <div className='link-item'>
            <a className='link' onClick={() => setBodyVariant('scientific-programmes')}>
              <ScienceIcon fontSize='small' style={{ marginRight: '5px' }} />
              Scientific Programmes
            </a>
          </div>
          <div className='link-item'>
            <a className='link' onClick={() => setDisplaySightSeeing(true)}>
              <VisibilityIcon fontSize='small' style={{ marginRight: '5px' }} />
              Sight Seeing Arrangement
            </a>
          </div>
          <div className='link-item new'>
            <a className='link' href='/Transport Schedule - IBS NEHU 2025.pdf' target='_blank'>
              <CarIcon fontSize='small' style={{ marginRight: '5px' }} />
              Transport Arrangement from Guwahati
            </a>
            <p className='transport-caption'>
              <a
                href='mailto:bajpaienviro@gmail.com,secretariat@ibsnehu2025.org?subject=Arrival at Guwahati'
                style={{ color: '#ff6b35' }}
              >
                Participants are advised to intimate to bajpaienviro@gmail.com their arrival date
                and time at Guwahati Railway Station/Airport to facilitate transport arrangement to
                Shillong.
              </a>
            </p>
          </div>
          <div className='link-item new'>
            <a
              className='link'
              href='/Accommodation Arrangement - IBS NEHU 2025.pdf'
              target='_blank'
            >
              <HotelIcon fontSize='small' style={{ marginRight: '5px' }} />
              Accommodation Allotment
            </a>
          </div>
          <div className='link-item'>
            <a
              className='link'
              onClick={() => setDisplayOfficeBearers(true)} // Open office bearers modal
            >
              <BadgeIcon fontSize='small' style={{ marginRight: '5px' }} />
              IBS Office Bearers and Organizing Committees
            </a>
          </div>
          <div className='link-item'>
            <a className='link' onClick={() => setDisplayContact(true)}>
              <ContactIcon fontSize='small' style={{ marginRight: '5px' }} />
              Contact Information
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQsLinks;
