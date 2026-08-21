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
          <div className="profile__avatar" aria-hidden="true">
            R
          </div>
          <span>{t('profile.recruiter')}</span>
        </div>
        <div className="profile__item" onClick={() => onProfileSelect('visitor')}>
          <div className="profile__avatar" aria-hidden="true">
            V
          </div>
          <span>{t('profile.visitor')}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
