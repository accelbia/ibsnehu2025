import LaunchIcon from '@mui/icons-material/Launch';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import './index.css';
import FsMenu from './fs-menu';
import TitleIcon from './title-icon';

interface HeaderProps {
  displayInvitation: boolean;
  setDisplayInvitation: (value: boolean) => void;

  displayMembership: boolean;
  setDisplayMembership: (value: boolean) => void;

  displayOfficeBearers: boolean;
  setDisplayOfficeBearers: (value: boolean) => void;

  displayMenu: boolean;
  setDisplayMenu: (value: boolean) => void;

  displayTimeline: boolean; // New prop for Timeline visibility
  setDisplayTimeline: (value: boolean) => void; // New prop for Timeline visibility
}

const Header: React.FC<HeaderProps> = ({
  displayInvitation,
  setDisplayInvitation,
  displayMembership,
  setDisplayMembership,
  displayOfficeBearers,
  setDisplayOfficeBearers,
  displayMenu,
  setDisplayMenu,
  displayTimeline,
  setDisplayTimeline,
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
            <a className='navButton' onClick={() => setDisplayMembership(!displayMembership)}>
              IBS Membership
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
        displayMembership={displayMembership}
        setDisplayMembership={setDisplayMembership}
        displayOfficeBearers={displayOfficeBearers}
        setDisplayOfficeBearers={setDisplayOfficeBearers}
        displayTimeline={displayTimeline}
        setDisplayTimeline={setDisplayTimeline}
      />
    </header>
  );
};

export default Header;
