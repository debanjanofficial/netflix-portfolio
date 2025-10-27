import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Header.css';

const NAV_ITEMS = [
  'Home',
  'Shows',
  'Movies',
  'Games',
  'New & Popular',
  'My List',
  'Browse by Languages',
];

interface HeaderProps {
  profile: string;
  onSelectProfile: (profile: string) => void;
  onExitToProfiles: () => void;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({
  profile,
  onSelectProfile,
  onExitToProfiles,
  onSignOut,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSolid(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const profileLabel = useMemo(() => {
    if (!profile) {
      return 'Profile';
    }
    return profile.charAt(0).toUpperCase() + profile.slice(1);
  }, [profile]);

  const handleSelectProfile = (targetProfile: string) => {
    onSelectProfile(targetProfile);
    setDropdownOpen(false);
  };

  const handleExit = () => {
    onExitToProfiles();
    setDropdownOpen(false);
  };

  const handleTransferProfile = () => {
    window.alert('Coming soon');
    setDropdownOpen(false);
  };

  const handleSignOut = () => {
    onSignOut();
    setDropdownOpen(false);
  };

  const handlePlaceholder = (message: string) => {
    window.alert(message);
    setDropdownOpen(false);
  };

  const otherProfiles = useMemo(() => {
    const options = [
      { id: 'recruiter', label: 'Recruiter Profile' },
      { id: 'stalker', label: 'Stalker Profile' },
    ];
    if (!profile) {
      return options;
    }
    return options.filter((option) => option.id !== profile);
  }, [profile]);

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;
    if (
      profileMenuRef.current &&
      nextTarget instanceof Node &&
      profileMenuRef.current.contains(nextTarget)
    ) {
      return;
    }
    setDropdownOpen(false);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;
    if (
      profileMenuRef.current &&
      nextTarget instanceof Node &&
      profileMenuRef.current.contains(nextTarget)
    ) {
      return;
    }
    setDropdownOpen(false);
  };

  return (
    <header className={`header ${isSolid ? 'header--solid' : ''}`}>
      <div className="header__left">
        <span className="header__brand">DEBANJAN</span>
        <nav className="header__nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item}
              className={`header__navItem ${index === 0 ? 'active' : ''}`}
              type="button"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
      <div className="header__right">
        <button className="header__iconButton" type="button" aria-label="Search">
          <svg
            className="header__icon"
            viewBox="0 0 24 24"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M15.5 14h-.79l-.28-.27a6 6 0 10-.71.71l.27.28v.79l5 5 1.5-1.5-5-5zm-6 0a4 4 0 110-8 4 4 0 010 8z" />
          </svg>
        </button>
        <div
          className="header__profile"
          ref={profileMenuRef}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={handleMouseLeave}
          onClick={() => setDropdownOpen((open) => !open)}
          role="button"
          tabIndex={0}
          onBlur={handleBlur}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setDropdownOpen((open) => !open);
            }
          }}
        >
          <img
            className="header__avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt={`${profileLabel} avatar`}
          />
          <span className="header__profileName">{profileLabel}</span>
          <svg
            className={`header__caret ${dropdownOpen ? 'header__caret--open' : ''}`}
            viewBox="0 0 24 24"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
          {dropdownOpen && (
            <div className="header__dropdown" role="menu">
              {otherProfiles.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  className="header__dropdownItem"
                  onClick={() => handleSelectProfile(id)}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                className="header__dropdownItem"
                onClick={handleExit}
              >
                Manage Profiles
              </button>
              <button
                type="button"
                className="header__dropdownItem"
                onClick={handleExit}
              >
                Exit Profile
              </button>
              <button
                type="button"
                className="header__dropdownItem"
                onClick={handleTransferProfile}
              >
                Transfer Profile
              </button>
              <div className="header__dropdownSeparator" aria-hidden="true" />
              <button
                type="button"
                className="header__dropdownItem"
                onClick={() => handlePlaceholder('Account page coming soon')}
              >
                Account
              </button>
              <button
                type="button"
                className="header__dropdownItem"
                onClick={() => handlePlaceholder('Help Centre coming soon')}
              >
                Help Centre
              </button>
              <div className="header__dropdownSeparator" aria-hidden="true" />
              <button
                type="button"
                className="header__dropdownItem header__dropdownItem--signout"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
