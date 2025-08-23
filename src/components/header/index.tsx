import LaunchIcon from '@mui/icons-material/Launch';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import './index.css';

interface HeaderProps {
  displayInvitation: boolean;
  setDisplayInvitation: (value: boolean) => void;

  displayMembershipAndFellowship: boolean;
  setDisplayMembershipAndFellowship: (value: boolean) => void;

  displayOfficeBearers: boolean;
  setDisplayOfficeBearers: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  displayInvitation,
  setDisplayInvitation,
  displayMembershipAndFellowship,
  setDisplayMembershipAndFellowship,
  displayOfficeBearers,
  setDisplayOfficeBearers,
}) => {

  return (
    <header>
      <div className="title desktop">
        <h1>XLVIII ALL INDIA BOTANICAL CONFERENCE <span style={
          { fontStyle: 'italic', textTransform: 'lowercase' }
        }>of</span><br />THE INDIAN BOTANICAL SOCIETY<br />
        </h1>
        <p>& International Symposium on Biology and Biotechnology of Plant Diversity for Bioeconomy</p>
      </div>

      <div className="title mobile">
        <h1>XLVIII AIBC <span style={{ fontStyle: 'italic', textTransform: 'lowercase' }}>of</span> IBS</h1>
      </div>

      <nav>
        <ul>
          <li><a onClick={() => setDisplayInvitation(!displayInvitation)}>Invitation Letter</a></li>
          <li><a onClick={() => setDisplayMembershipAndFellowship(!displayMembershipAndFellowship)}>Membership and Fellowship</a></li>
          <li><a onClick={() => setDisplayOfficeBearers(!displayOfficeBearers)}>Office Bearers</a></li>
        </ul>
        <a className="button" href="https://register.ibsnehu2025.org/" target='_blank'>Register<LaunchIcon /></a>
      </nav>


      <IconButton className="menu-button mobile">
        <MenuIcon />
      </IconButton>
    </header>
  );
};

export default Header;