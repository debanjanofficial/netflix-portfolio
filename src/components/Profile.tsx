import React from 'react';
import './Profile.css';

interface ProfileProps {
  onProfileSelect: (profile: string) => void;
  viewerName?: string;
}

const Profile: React.FC<ProfileProps> = ({ onProfileSelect, viewerName }) => {
  const heading = viewerName ? `Who's watching, ${viewerName}?` : "Who's watching?";

  return (
    <div className="profile">
      <h1 className="profile__title">{heading}</h1>
      <div className="profile__list">
        <div className="profile__item" onClick={() => onProfileSelect('recruiter')}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Recruiter" />
          <span>Recruiter</span>
        </div>
        <div className="profile__item" onClick={() => onProfileSelect('stalker')}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Stalker" />
          <span>Stalker</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
