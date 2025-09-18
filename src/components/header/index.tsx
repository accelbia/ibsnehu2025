import LaunchIcon from '@mui/icons-material/Launch';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import './index.css';
import FsMenu from './fs-menu';

interface HeaderProps {
  displayInvitation: boolean;
  setDisplayInvitation: (value: boolean) => void;

  displayMembershipAndFellowship: boolean;
  setDisplayMembershipAndFellowship: (value: boolean) => void;

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
  displayMembershipAndFellowship,
  setDisplayMembershipAndFellowship,
  displayOfficeBearers,
  setDisplayOfficeBearers,
  displayMenu,
  setDisplayMenu,
  displayTimeline,
  setDisplayTimeline,
}) => {
  return (
    <header>
      <div className='title desktop'>
        <h1>
          XLVIII ALL INDIA BOTANICAL CONFERENCE{' '}
          <span
            style={{
              fontStyle: 'italic',
              textTransform: 'lowercase',
            }}
          >
            of
          </span>
          <br />
          THE INDIAN BOTANICAL SOCIETY
          <br />
        </h1>
        <p>
          And International Symposium on Biology and Biotechnology of Plant
          Diversity for Bioeconomy
        </p>
      </div>

      <div className='title mobile'>
        <h1>
          XLVIII AIBC{' '}
          <span
            style={{
              fontStyle: 'italic',
              textTransform: 'lowercase',
            }}
          >
            of
          </span>{' '}
          IBS
        </h1>
      </div>

      <nav>
        <ul>
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
            <a
              className='navButton'
              onClick={() =>
                setDisplayMembershipAndFellowship(
                  !displayMembershipAndFellowship,
                )
              }
            >
              Membership and Fellowship
            </a>
          </li>
          <li>
            <a
              className='navButton'
              onClick={() => setDisplayTimeline(!displayTimeline)}
            >
              Pre and Post Conference Events
            </a>
          </li>
        </ul>
        <a
          className='button'
          href='https://register.ibsnehu2025.org/'
          target='_blank'
        >
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
        displayMembershipAndFellowship={displayMembershipAndFellowship}
        setDisplayMembershipAndFellowship={setDisplayMembershipAndFellowship}
        displayOfficeBearers={displayOfficeBearers}
        setDisplayOfficeBearers={setDisplayOfficeBearers}
        displayTimeline={displayTimeline}
        setDisplayTimeline={setDisplayTimeline}
      />
    </header>
  );
};

export default Header;
