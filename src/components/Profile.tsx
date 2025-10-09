import React from 'react';
import './Profile.css';

interface ProfileProps {
  onProfileSelect: (profile: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ onProfileSelect }) => {
  return (
    <div className="profile">
      <h1 className="profile__title">Who's watching?</h1>
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
