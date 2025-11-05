import React from 'react';
import './Profile.css';
import { useLanguage } from '../context/LanguageContext';

interface ProfileProps {
  onProfileSelect: (profile: string) => void;
  viewerName?: string;
}

const Profile: React.FC<ProfileProps> = ({ onProfileSelect, viewerName }) => {
  const { t } = useLanguage();
  const heading = viewerName
    ? t('profile.headingWithName').replace('{{name}}', viewerName)
    : t('profile.heading');

  return (
    <div className="profile">
      <h1 className="profile__title">{heading}</h1>
      <div className="profile__list">
        <div className="profile__item" onClick={() => onProfileSelect('recruiter')}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Recruiter" />
          <span>{t('profile.recruiter')}</span>
        </div>
        <div className="profile__item" onClick={() => onProfileSelect('stalker')}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Stalker" />
          <span>{t('profile.stalker')}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
