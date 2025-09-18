import './App.css';
import { useState } from 'react';
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
import InvitationLetter from './components/invitation_letter';
import MembershipAndFellowShip from './components/membership_and_fellowship';
import OfficeBearers from './components/office_bearers';
import TimelineModal from './components/body/timeline';
import FsMenu from './components/header/fs-menu';

function App() {
  const [displayInvitation, setDisplayInvitation] = useState(false);
  const [displayMembershipAndFellowship, setDisplayMembershipAndFellowship] =
    useState(false);
  const [displayOfficeBearers, setDisplayOfficeBearers] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayTimeline, setDisplayTimeline] = useState(false); // State for Timeline visibility
  return (
    <>
      <Header
        displayInvitation={displayInvitation}
        setDisplayInvitation={setDisplayInvitation}
        displayMembershipAndFellowship={displayMembershipAndFellowship}
        setDisplayMembershipAndFellowship={setDisplayMembershipAndFellowship}
        displayOfficeBearers={displayOfficeBearers}
        setDisplayOfficeBearers={setDisplayOfficeBearers}
        displayMenu={displayMenu}
        setDisplayMenu={setDisplayMenu}
        displayTimeline={displayTimeline} // New prop for Timeline visibility
        setDisplayTimeline={setDisplayTimeline} // New prop for Timeline visibility
      />
      <InvitationLetter
        isVisible={displayInvitation}
        setIsVisible={setDisplayInvitation}
      />
      <MembershipAndFellowShip
        isVisible={displayMembershipAndFellowship}
        setIsVisible={setDisplayMembershipAndFellowship}
      />
      <TimelineModal
        isVisible={displayTimeline}
        setIsVisible={setDisplayTimeline}
      />

      <FsMenu
        displayMenu={displayMenu}
        setDisplayMenu={setDisplayMenu}
        displayInvitation={displayInvitation}
        setDisplayInvitation={setDisplayInvitation}
        displayMembershipAndFellowship={displayMembershipAndFellowship}
        setDisplayMembershipAndFellowship={setDisplayMembershipAndFellowship}
        displayOfficeBearers={displayOfficeBearers}
        setDisplayOfficeBearers={setDisplayOfficeBearers}
        displayTimeline={false} // New prop for Timeline visibility
        setDisplayTimeline={() => {}} // New prop for Timeline visibility
      />
      <OfficeBearers
        isVisible={displayOfficeBearers}
        setIsVisible={setDisplayOfficeBearers}
      />
      <Body />
      <Footer />
    </>
  );
}

export default App;
