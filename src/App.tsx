import './App.css';
import { useState } from 'react';
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
import InvitationLetter from './components/header/invitation_letter';
import Membership from './components/header/membership';
import OfficeBearers from './components/body/office_bearers';
import TimelineModal from './components/header/timeline';
import FsMenu from './components/header/fs-menu';
import Fellowship from './components/body/fellowship';

function App() {
  const [displayInvitation, setDisplayInvitation] = useState(false);
  const [displayMembership, setDisplayMembership] = useState(false);
  const [displayOfficeBearers, setDisplayOfficeBearers] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayTimeline, setDisplayTimeline] = useState(false);
  const [displayFellowship, setDisplayFellowship] = useState(false);

  return (
    <>
      <Header
        displayInvitation={displayInvitation}
        setDisplayInvitation={setDisplayInvitation}
        displayMembership={displayMembership}
        setDisplayMembership={setDisplayMembership}
        displayOfficeBearers={displayOfficeBearers}
        setDisplayOfficeBearers={setDisplayOfficeBearers}
        displayMenu={displayMenu}
        setDisplayMenu={setDisplayMenu}
        displayTimeline={displayTimeline} // New prop for Timeline visibility
        setDisplayTimeline={setDisplayTimeline} // New prop for Timeline visibility
      />
      <InvitationLetter isVisible={displayInvitation} setIsVisible={setDisplayInvitation} />
      <Membership isVisible={displayMembership} setIsVisible={setDisplayMembership} />
      <TimelineModal isVisible={displayTimeline} setIsVisible={setDisplayTimeline} />
      <Fellowship isVisible={displayFellowship} setIsVisible={setDisplayFellowship} />

      <FsMenu
        displayMenu={displayMenu}
        setDisplayMenu={setDisplayMenu}
        displayInvitation={displayInvitation}
        setDisplayInvitation={setDisplayInvitation}
        displayMembership={displayMembership}
        setDisplayMembership={setDisplayMembership}
        displayOfficeBearers={displayOfficeBearers}
        setDisplayOfficeBearers={setDisplayOfficeBearers}
        displayTimeline={displayTimeline} // New prop for Timeline visibility
        setDisplayTimeline={setDisplayTimeline} // Correctly pass the function
      />
      <OfficeBearers isVisible={displayOfficeBearers} setIsVisible={setDisplayOfficeBearers} />
      <Body />
      <Footer />
    </>
  );
}

export default App;
