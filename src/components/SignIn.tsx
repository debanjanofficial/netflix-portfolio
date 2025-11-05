import React, { useState } from 'react';
import './SignIn.css';
import { useLanguage } from '../context/LanguageContext';

export type AuthProvider = 'google' | 'linkedin' | 'guest';

export interface SignInData {
  firstName: string;
  lastName: string;
  provider: AuthProvider;
}

interface SignInProps {
  onSignIn: (data: SignInData) => void;
  onAnonymousVisit: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn, onAnonymousVisit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (provider: AuthProvider) => {
    if (!firstName.trim() || !lastName.trim()) {
      setError(t('signin.error'));
      return;
    }

    onSignIn({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      provider,
    });
  };

  return (
    <div className="signin">
      <button
        type="button"
        className="signin__anonymousButton"
        onClick={onAnonymousVisit}
      >
        Visit as Anonymous
      </button>
      <div className="signin__overlay" />
      <div className="signin__card">
        <h1 className="signin__title">{t('signin.title')}</h1>
        <p className="signin__subtitle">{t('signin.subtitle')}</p>
        <form
          className="signin__form"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="signin__label" htmlFor="firstName">
            {t('signin.firstName')}
          </label>
          <input
            id="firstName"
            name="firstName"
            className="signin__input"
            placeholder={t('signin.firstName')}
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
              setError('');
            }}
          />

          <label className="signin__label" htmlFor="lastName">
            {t('signin.lastName')}
          </label>
          <input
            id="lastName"
            name="lastName"
            className="signin__input"
            placeholder={t('signin.lastName')}
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
              setError('');
            }}
          />

          {error && <p className="signin__error">{error}</p>}

          <button
            type="button"
            className="signin__provider signin__provider--google"
            onClick={() => handleSubmit('google')}
          >
            <span className="signin__providerIcon" aria-hidden="true">
              G
            </span>
            {t('signin.google')}
          </button>

          <button
            type="button"
            className="signin__provider signin__provider--linkedin"
            onClick={() => handleSubmit('linkedin')}
          >
            <span className="signin__providerIcon" aria-hidden="true">
              in
            </span>
            {t('signin.linkedin')}
          </button>

          <button
            type="button"
            className="signin__provider signin__provider--guest"
            onClick={() => handleSubmit('guest')}
          >
            <span className="signin__providerIcon" aria-hidden="true">
              GU
            </span>
            {t('signin.guest')}
          </button>
        </form>
        <p className="signin__disclaimer">{t('signin.disclaimer')}</p>
      </div>
    </div>
  );
};

export default SignIn;
