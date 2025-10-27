import React, { useState } from 'react';
import './Header.css';
import FalconLogo from './FalconLogo';

interface HeaderProps {
  profile: string;
  onProfileSwitch: () => void;
}

const Header: React.FC<HeaderProps> = ({ profile, onProfileSwitch }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="header">
      <FalconLogo size="small" />
      <div className="header__profile" onClick={() => setDropdown(!dropdown)}>
        <img
          className="header__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="Avatar"
        />
        <span>{profile}</span>
        {dropdown && (
          <div className="header__dropdown">
            <div onClick={onProfileSwitch}>Switch Profile</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
