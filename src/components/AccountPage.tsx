import React from 'react';
import './AccountPage.css';
import { AuthProvider, SignInData } from './SignIn';
import { useLanguage } from '../context/LanguageContext';

interface AccountPageProps {
  user: SignInData | null;
  onBack: () => void;
  onSignOut: () => void;
  onLinkProvider: (provider: AuthProvider) => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ user, onBack, onSignOut, onLinkProvider }) => {
  const { t } = useLanguage();

  const renderStatus = () => {
    if (!user) {
      return <p className="account__message">{t('account.notSignedIn') || 'You are not signed in.'}</p>;
    }

    if (user.provider === 'guest') {
      return (
        <p className="account__message">
          {t('account.guestMessage').replace('{{name}}', `${user.firstName} ${user.lastName}`)}
        </p>
      );
    }

    if (user.provider === 'google') {
      return (
        <p className="account__message">
          {t('account.googleSignedIn').replace('{{name}}', `${user.firstName} ${user.lastName}`)}
        </p>
      );
    }

    if (user.provider === 'linkedin') {
      return (
        <p className="account__message">
          {t('account.linkedinSignedIn').replace('{{name}}', `${user.firstName} ${user.lastName}`)}
        </p>
      );
    }

    if (user.provider === 'facebook') {
      return (
        <p className="account__message">
          {t('account.facebookSignedIn').replace('{{name}}', `${user.firstName} ${user.lastName}`)}
        </p>
      );
    }

    return null;
  };

  return (
    <section className="account">
      <div className="account__card">
        <button className="account__back" type="button" onClick={onBack}>
          ← {t('account.back')}
        </button>
        <h1 className="account__title">{t('account.title')}</h1>
        {renderStatus()}
        <div className="account__actions">
          <p className="account__prompt">{t('account.switchPrompt')}</p>
          <div className="account__providers">
            <button
              type="button"
              className="account__provider account__provider--google"
              onClick={() => onLinkProvider('google')}
            >
              {t('account.linkGoogle')}
            </button>
            <button
              type="button"
              className="account__provider account__provider--linkedin"
              onClick={() => onLinkProvider('linkedin')}
            >
              {t('account.linkLinkedIn')}
            </button>
            <button
              type="button"
              className="account__provider account__provider--facebook"
              onClick={() => onLinkProvider('facebook')}
            >
              {t('account.linkFacebook')}
            </button>
          </div>
        </div>
        <div className="account__footer">
          <button type="button" className="account__signOut" onClick={onSignOut}>
            {t('account.signOut')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
