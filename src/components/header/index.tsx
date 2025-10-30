import LaunchIcon from '@mui/icons-material/Launch';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import './index.css';
import FsMenu from './fs-menu';
import TitleIcon from './title-icon';

interface HeaderProps {
  displayInvitation: boolean;
  setDisplayInvitation: (value: boolean) => void;

  displayOfficeBearers: boolean;
  setDisplayOfficeBearers: (value: boolean) => void;

  displayMenu: boolean;
  setDisplayMenu: (value: boolean) => void;

  displayTimeline: boolean; // New prop for Timeline visibility
  setDisplayTimeline: (value: boolean) => void; // New prop for Timeline visibility

  displaySponsors: boolean; // New prop for Sponsors visibility
  setDisplaySponsors: (value: boolean) => void; // New prop for Sponsors visibility
}

const Header: React.FC<HeaderProps> = ({
  displayInvitation,
  setDisplayInvitation,
  displayOfficeBearers,
  setDisplayOfficeBearers,
  displayMenu,
  setDisplayMenu,
  displayTimeline,
  setDisplayTimeline,
  displaySponsors,
  setDisplaySponsors,
}) => {
  return (
    <header>
      <TitleIcon />
      <nav>
        <ul>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a
              className='navButton'
              onClick={() => {
                setDisplayInvitation(!displayInvitation);
              }}
            >
              Invitation Letter
            </a>
          </li>
          <li>
            <a className='navButton' onClick={() => setDisplaySponsors(!displaySponsors)}>
              Co-organizers and Sponsors
            </a>
          </li>
          <li>
            <a className='navButton' onClick={() => setDisplayTimeline(!displayTimeline)}>
              Pre and Post Conference Events
            </a>
          </li>
        </ul>
        <a className='button' href='https://register.ibsnehu2025.org/' target='_blank'>
          Register
          <LaunchIcon />
        </a>
      </nav>

      <IconButton
        className='menu-button mobile'
        onClick={() => setDisplayMenu(!displayMenu)}
        aria-label='menu'
      >
        <MenuIcon />
      </IconButton>

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
    </header>
  );
};

export default Header;
