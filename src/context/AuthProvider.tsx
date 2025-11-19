import React, { createContext, useContext, useMemo } from 'react';
import {
  Auth0Provider,
  useAuth0,
  RedirectLoginOptions,
  LogoutOptions,
  User,
} from '@auth0/auth0-react';

interface AuthContextValue {
  isConfigured: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: User;
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
  logout: (options?: LogoutOptions) => void;
}

const noopAsync = async () => {
  throw new Error('Authentication provider is not configured.');
};

const noop = () => undefined;

const AuthContext = createContext<AuthContextValue>({
  isConfigured: false,
  isLoading: false,
  isAuthenticated: false,
  user: undefined,
  loginWithRedirect: noopAsync,
  logout: noop,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContextBridge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth0 = useAuth0();

  const value = useMemo<AuthContextValue>(
    () => ({
      isConfigured: true,
      isLoading: auth0.isLoading,
      isAuthenticated: auth0.isAuthenticated,
      user: auth0.user,
      loginWithRedirect: auth0.loginWithRedirect,
      logout: auth0.logout,
    }),
    [auth0],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AppAuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const isConfigured = Boolean(domain && clientId);

  if (!isConfigured) {
    return (
      <AuthContext.Provider
        value={{
          isConfigured: false,
          isLoading: false,
          isAuthenticated: false,
          user: undefined,
          loginWithRedirect: noopAsync,
          logout: noop,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <Auth0Provider
      domain={domain!}
      clientId={clientId!}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <AuthContextBridge>{children}</AuthContextBridge>
    </Auth0Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
