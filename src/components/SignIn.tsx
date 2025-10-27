import React, { useState } from 'react';
import './SignIn.css';

export type AuthProvider = 'google' | 'linkedin' | 'guest';

export interface SignInData {
  firstName: string;
  lastName: string;
  provider: AuthProvider;
}

interface SignInProps {
  onSignIn: (data: SignInData) => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (provider: AuthProvider) => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter both first and last name before continuing.');
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
      <div className="signin__overlay" />
      <div className="signin__card">
        <h1 className="signin__title">Sign In</h1>
        <p className="signin__subtitle">
          Continue your Netflix-style journey with personalized access.
        </p>
        <form
          className="signin__form"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="signin__label" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            className="signin__input"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
              setError('');
            }}
          />

          <label className="signin__label" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            className="signin__input"
            placeholder="Enter your last name"
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
            Sign in with Google
          </button>

          <button
            type="button"
            className="signin__provider signin__provider--linkedin"
            onClick={() => handleSubmit('linkedin')}
          >
            <span className="signin__providerIcon" aria-hidden="true">
              in
            </span>
            Sign in with LinkedIn
          </button>

          <button
            type="button"
            className="signin__provider signin__provider--guest"
            onClick={() => handleSubmit('guest')}
          >
            <span className="signin__providerIcon" aria-hidden="true">
              GU
            </span>
            Continue as Guest
          </button>
        </form>
        <p className="signin__disclaimer">
          We&apos;ll remember you on this browser for faster access next time.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
