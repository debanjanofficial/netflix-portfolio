import React, { useState } from 'react';
import './SignIn.css';
import { useLanguage } from '../context/LanguageContext';

export type AuthProvider = 'google' | 'linkedin' | 'facebook' | 'guest';

export interface SignInData {
  firstName: string;
  lastName: string;
  provider: AuthProvider;
  authId?: string;
  email?: string;
}

interface SignInProps {
  onAnonymousVisit: () => void;
  onProviderSignIn: (provider: Exclude<AuthProvider, 'guest'>) => void;
  onExistingProviderSignIn: (provider: Exclude<AuthProvider, 'guest'>) => void;
  providerLoading?: boolean;
  providersEnabled?: boolean;
  rememberedUser?: SignInData | null;
  onQuickLogin?: () => void;
  accountError?: string | null;
  onDismissAccountError?: () => void;
}

const SignIn: React.FC<SignInProps> = ({
  onAnonymousVisit,
  onProviderSignIn,
  onExistingProviderSignIn,
  providerLoading = false,
  providersEnabled = true,
  rememberedUser = null,
  onQuickLogin,
  accountError = null,
  onDismissAccountError,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const { t } = useLanguage();

  const ensureNamesPresent = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError(t('signin.error'));
      return false;
    }
    return true;
  };

  const handleProviderClick = (provider: Exclude<AuthProvider, 'guest'>) => {
    if (!ensureNamesPresent()) {
      return;
    }
    onProviderSignIn(provider);
  };

  const handleExistingProviderClick = (provider: Exclude<AuthProvider, 'guest'>) => {
    setShowLoginOptions(false);
    onExistingProviderSignIn(provider);
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
        {accountError && (
          <div className="signin__alert" role="alert">
            <span>{accountError}</span>
            {onDismissAccountError && (
              <button type="button" onClick={onDismissAccountError} aria-label="Dismiss alert">
                ×
              </button>
            )}
          </div>
        )}
        {rememberedUser && onQuickLogin && (
          <button type="button" className="signin__rememberButton" onClick={onQuickLogin}>
            {t('signin.rememberedLogin').replace(
              '{{name}}',
              `${rememberedUser.firstName} ${rememberedUser.lastName}`,
            )}
          </button>
        )}
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
            onClick={() => handleProviderClick('google')}
            disabled={providerLoading || !providersEnabled}
          >
            <span className="signin__providerIcon" aria-hidden="true">
              G
            </span>
            {t('signin.google')}
          </button>

          <button
            type="button"
            className="signin__provider signin__provider--linkedin"
            onClick={() => handleProviderClick('linkedin')}
            disabled={providerLoading || !providersEnabled}
          >
            <span className="signin__providerIcon" aria-hidden="true">
              in
            </span>
            {t('signin.linkedin')}
          </button>

          <button
            type="button"
            className="signin__provider signin__provider--facebook"
            onClick={() => handleProviderClick('facebook')}
            disabled={providerLoading || !providersEnabled}
          >
            <span className="signin__providerIcon" aria-hidden="true">
              f
            </span>
            {t('signin.facebook')}
          </button>

          <button
            type="button"
            className="signin__loginButton"
            onClick={() => setShowLoginOptions(true)}
          >
            {t('signin.loginButton')}
          </button>

          {!providersEnabled && (
            <p className="signin__notice">{t('signin.socialUnavailable')}</p>
          )}
        </form>
        {showLoginOptions && (
          <div className="signin__loginModal" role="dialog" aria-modal="true">
            <div className="signin__loginModalCard">
              <div className="signin__loginModalHeader">
                <h2>{t('signin.loginModalTitle')}</h2>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setShowLoginOptions(false)}
                >
                  ×
                </button>
              </div>
              <p className="signin__loginModalSubtitle">{t('signin.loginModalSubtitle')}</p>
              <button
                type="button"
                className="signin__provider signin__provider--google"
                onClick={() => handleExistingProviderClick('google')}
                disabled={providerLoading || !providersEnabled}
              >
                <span className="signin__providerIcon" aria-hidden="true">
                  G
                </span>
                {t('signin.google')}
              </button>
              <button
                type="button"
                className="signin__provider signin__provider--linkedin"
                onClick={() => handleExistingProviderClick('linkedin')}
                disabled={providerLoading || !providersEnabled}
              >
                <span className="signin__providerIcon" aria-hidden="true">
                  in
                </span>
                {t('signin.linkedin')}
              </button>
              <button
                type="button"
                className="signin__provider signin__provider--facebook"
                onClick={() => handleExistingProviderClick('facebook')}
                disabled={providerLoading || !providersEnabled}
              >
                <span className="signin__providerIcon" aria-hidden="true">
                  f
                </span>
                {t('signin.facebook')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
