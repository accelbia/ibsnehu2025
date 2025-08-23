import './App.css';
import { useState } from 'react';
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
import InvitationLetter from './components/invitation_letter';
import MembershipAndFellowShip from './components/membership_and_fellowship';
import OfficeBearers from './components/office_bearers';

function App() {
  const [displayInvitation, setDisplayInvitation] = useState(false);
  const [displayMembershipAndFellowship, setDisplayMembershipAndFellowship] = useState(false);
  const [displayOfficeBearers, setDisplayOfficeBearers] = useState(false);
  return (
    <>
      <Header
        displayInvitation={displayInvitation}
        setDisplayInvitation={setDisplayInvitation}

        displayMembershipAndFellowship={displayMembershipAndFellowship}
        setDisplayMembershipAndFellowship={setDisplayMembershipAndFellowship}

        displayOfficeBearers={displayOfficeBearers}
        setDisplayOfficeBearers={setDisplayOfficeBearers}
      />
      <InvitationLetter
        isVisible={displayInvitation}
        setIsVisible={setDisplayInvitation}
      />
      <MembershipAndFellowShip
        isVisible={displayMembershipAndFellowship}
        setIsVisible={setDisplayMembershipAndFellowship}
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
