import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton } from '@mui/material';
import './index.css';

interface FsMenuProps {
    displayMenu: boolean;
    setDisplayMenu: (value: boolean) => void;

    displayInvitation: boolean;
    setDisplayInvitation: (value: boolean) => void;

    displayMembershipAndFellowship: boolean;
    setDisplayMembershipAndFellowship: (value: boolean) => void;

    displayOfficeBearers: boolean;
    setDisplayOfficeBearers: (value: boolean) => void;
}

const FsMenu: React.FC<FsMenuProps> = ({
    displayMenu,
    setDisplayMenu,
    displayInvitation,
    setDisplayInvitation,
    displayMembershipAndFellowship,
    setDisplayMembershipAndFellowship,
    displayOfficeBearers,
    setDisplayOfficeBearers
}) => {

    if (!displayMenu) return null;
    return (
        <div className="fs-menu" onClick={() => setDisplayMenu(false)}>
            <IconButton
                style={{ position: 'absolute', top: 20, right: 20, zIndex: 12 }}
                onClick={() => setDisplayMenu(false)}
                aria-label="close menu"
            >
                <CloseIcon />
            </IconButton>
            <div className="fs-menu-content">
                <ul>
                    <li>
                        <a
                            onClick={() => {
                                setDisplayInvitation(!displayInvitation);
                                setDisplayMenu(false);
                            }}
                        >
                            Invitation Letter
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => {
                                setDisplayMembershipAndFellowship(!displayMembershipAndFellowship);
                                setDisplayMenu(false);
                            }}
                        >
                            Membership and Fellowship
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => {
                                setDisplayOfficeBearers(!displayOfficeBearers);
                                setDisplayMenu(false);
                            }}
                        >
                            Office Bearers
                        </a>
                    </li>
                    <li>
                        <a
                            className="button"
                            href="https://register.ibsnehu2025.org/"
                            target="_blank"
                            onClick={() => setDisplayMenu(false)}
                        >
                            Register<LaunchIcon />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="fs-menu-backdrop"></div>
        </div>
    );
};

export default FsMenu;