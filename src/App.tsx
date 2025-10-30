import './App.css';
import { useState } from 'react';
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
import InvitationLetter from './components/header/invitation_letter';
import OfficeBearers from './components/body/office_bearers';
import TimelineModal from './components/header/timeline';
import FsMenu from './components/header/fs-menu';
import Fellowship from './components/body/fellowship';
import SponsorsModal from './components/header/sponsors-modal';

function App() {
  const [displayInvitation, setDisplayInvitation] = useState(false);
  const [displayOfficeBearers, setDisplayOfficeBearers] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayTimeline, setDisplayTimeline] = useState(false);
  const [displayFellowship, setDisplayFellowship] = useState(false);
  const [displaySponsors, setDisplaySponsors] = useState(false);

  return (
    <>
      <Header
        displayInvitation={displayInvitation}
        setDisplayInvitation={setDisplayInvitation}
        displayOfficeBearers={displayOfficeBearers}
        setDisplayOfficeBearers={setDisplayOfficeBearers}
        displayMenu={displayMenu}
        setDisplayMenu={setDisplayMenu}
        displayTimeline={displayTimeline}
        setDisplayTimeline={setDisplayTimeline}
        displaySponsors={displaySponsors}
        setDisplaySponsors={setDisplaySponsors}
      />
      <InvitationLetter isVisible={displayInvitation} setIsVisible={setDisplayInvitation} />
      <TimelineModal isVisible={displayTimeline} setIsVisible={setDisplayTimeline} />
      <SponsorsModal isVisible={displaySponsors} setIsVisible={setDisplaySponsors} />
      <Fellowship isVisible={displayFellowship} setIsVisible={setDisplayFellowship} />

      <FsMenu
        displayMenu={displayMenu}
        setDisplayMenu={setDisplayMenu}
        displayInvitation={displayInvitation}
        setDisplayInvitation={setDisplayInvitation}
        displayOfficeBearers={displayOfficeBearers}
        setDisplayOfficeBearers={setDisplayOfficeBearers}
        displayTimeline={displayTimeline}
        setDisplayTimeline={setDisplayTimeline}
        displaySponsors={displaySponsors}
        setDisplaySponsors={setDisplaySponsors}
      />
      <OfficeBearers isVisible={displayOfficeBearers} setIsVisible={setDisplayOfficeBearers} />
      <Body />
      <Footer />
    </>
  );
}

export default App;
