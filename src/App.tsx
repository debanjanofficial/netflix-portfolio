import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
import Row from './components/Row';
import Footer from './components/Footer';
import Intro from './components/Intro';
import Profile from './components/Profile';
import RecruiterDashboard from './components/RecruiterDashboard';
import StalkerDashboard from './components/StalkerDashboard';
import SkillsShowcase from './components/SkillsShowcase';
import ExperienceShowcase from './components/ExperienceShowcase';
import EducationShowcase from './components/EducationShowcase';
import ProjectsShowcase from './components/ProjectsShowcase';
import SignIn, { SignInData, AuthProvider } from './components/SignIn';
import AccountPage from './components/AccountPage';
import SearchNotFound from './components/SearchNotFound';
import { useLanguage } from './context/LanguageContext';
import { skillGroups, experiences, educationEntries, projectEntries } from './content/data';
import { translations } from './i18n/translations';
import { LanguageCode } from './context/LanguageContext';
import { useAuth } from './context/AuthProvider';
import emailjs from '@emailjs/browser';

type AppState = 'signin' | 'intro' | 'profile' | 'main' | 'account' | 'notFound';
type ProfileSection = 'dashboard' | 'skills' | 'experience' | 'education' | 'projects';

type AuthUser = SignInData;
type AuthFlow = 'login' | 'signup' | null;

interface SearchIndexItem {
  id: string;
  type: 'skills' | 'experience' | 'education' | 'projects';
  targetId: string;
  label: Record<LanguageCode, string>;
  keywords: string[];
}

interface HeaderSearchResult {
  id: string;
  label: string;
  category: string;
}

const STORAGE_KEY = 'netflixPortfolioUser';
const PROFILE_KEY = 'netflixPortfolioProfile';
const RECRUITER_SECTION_KEY = 'netflixPortfolioRecruiterSection';
const REMEMBERED_USER_KEY = 'netflixPortfolioRememberedUser';
const KNOWN_AUTH_USERS_KEY = 'netflixKnownAuthUsers';
const AUTH_FLOW_KEY = 'netflixAuthFlow';

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const readStoredUser = (): AuthUser | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as AuthUser;
    if (parsed.provider !== 'guest') {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch (error) {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

const readStoredProfile = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.localStorage.getItem(PROFILE_KEY) ?? '';
};

const readStoredRecruiterSection = (): ProfileSection => {
  if (typeof window === 'undefined') {
    return 'dashboard';
  }

  const stored = window.localStorage.getItem(RECRUITER_SECTION_KEY);
  if (stored === 'skills' || stored === 'experience' || stored === 'education' || stored === 'projects') {
    return stored;
  }
  if (stored === 'certifications') {
    return 'education';
  }
  return 'dashboard';
};

const readRememberedUser = (): AuthUser | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const raw = window.localStorage.getItem(REMEMBERED_USER_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as AuthUser;
  } catch (error) {
    window.localStorage.removeItem(REMEMBERED_USER_KEY);
    return null;
  }
};

const readKnownAuthUsers = (): string[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  const raw = window.localStorage.getItem(KNOWN_AUTH_USERS_KEY);
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw) as string[];
  } catch (error) {
    window.localStorage.removeItem(KNOWN_AUTH_USERS_KEY);
    return [];
  }
};

const readStoredAuthFlow = (): AuthFlow => {
  if (typeof window === 'undefined') {
    return null;
  }
  const raw = window.localStorage.getItem(AUTH_FLOW_KEY) as AuthFlow | null;
  return raw === 'login' || raw === 'signup' ? raw : null;
};

function App() {
  const { language, t } = useLanguage();
  const {
    isConfigured: authConfigured,
    isLoading: authLoading,
    isAuthenticated,
    user: auth0User,
    loginWithRedirect,
    logout,
  } = useAuth();
  const [guestUser, setGuestUser] = useState<AuthUser | null>(() => readStoredUser());
  const [rememberedUser, setRememberedUser] = useState<AuthUser | null>(() => readRememberedUser());
  const [profile, setProfile] = useState<string>(() => readStoredProfile()); // recruiter, stalker
  const [recruiterSection, setRecruiterSection] = useState<ProfileSection>(() =>
    readStoredRecruiterSection(),
  );
  const [stalkerSection, setStalkerSection] = useState<ProfileSection>('dashboard');
  const [appState, setAppState] = useState<AppState>(() => {
    if (typeof window === 'undefined') {
      return 'signin';
    }
    const hasStoredUser = !!window.localStorage.getItem(STORAGE_KEY);
    if (!hasStoredUser) {
      return 'signin';
    }
    const storedProfile = window.localStorage.getItem(PROFILE_KEY);
    return storedProfile ? 'main' : 'intro';
  });
  const [skillsFocusId, setSkillsFocusId] = useState<string | undefined>();
  const [experienceFocusId, setExperienceFocusId] = useState<string | undefined>();
  const [educationFocusId, setEducationFocusId] = useState<string | undefined>();
  const [projectsFocusId, setProjectsFocusId] = useState<string | undefined>();
  const [notFoundQuery, setNotFoundQuery] = useState('');
  const [knownAuthUsers, setKnownAuthUsers] = useState<string[]>(() => readKnownAuthUsers());
  const [authFlow, setAuthFlow] = useState<AuthFlow>(() => readStoredAuthFlow());
  const [accountError, setAccountError] = useState<string | null>(null);

  const updateAuthFlow = useCallback(
    (flow: AuthFlow) => {
      setAuthFlow(flow);
      if (typeof window === 'undefined') {
        return;
      }
      if (flow) {
        window.localStorage.setItem(AUTH_FLOW_KEY, flow);
      } else {
        window.localStorage.removeItem(AUTH_FLOW_KEY);
      }
    },
    [],
  );

  const addKnownAuthUser = useCallback((authId: string | undefined | null) => {
    if (!authId) {
      return;
    }
    setKnownAuthUsers((prev) => {
      if (prev.includes(authId)) {
        return prev;
      }
      const updated = [...prev, authId];
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(KNOWN_AUTH_USERS_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const authMappedUser = useMemo<AuthUser | null>(() => {
    if (!isAuthenticated || !auth0User) {
      return null;
    }
    const providerId = auth0User.sub?.split('|')[0];
    let provider: AuthProvider = 'guest';
    if (providerId === 'google-oauth2') {
      provider = 'google';
    } else if (providerId === 'linkedin') {
      provider = 'linkedin';
    } else if (providerId === 'facebook') {
      provider = 'facebook';
    }
    const fullName = auth0User.name || '';
    const nameParts = fullName.trim().split(' ');
    const firstName = auth0User.given_name || nameParts[0] || 'User';
    const lastName = auth0User.family_name || nameParts.slice(1).join(' ') || '';
    return {
      firstName,
      lastName,
      provider,
      authId: auth0User.sub,
      email: auth0User.email ?? undefined,
    };
  }, [auth0User, isAuthenticated]);

  const user = authMappedUser ?? guestUser;

  const sendWelcomeEmail = useCallback((userData: AuthUser) => {
    if (userData.provider !== 'google') {
      return;
    }
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS environment variables are not configured.');
      return;
    }
    if (!userData.email) {
      console.warn('No email address found for welcome message.');
      return;
    }
    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: userData.email,
          to_name: `${userData.firstName} ${userData.lastName}`,
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      )
      .catch((error) => {
        console.error('Failed to send welcome email', error);
      });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (guestUser) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(guestUser));
      window.localStorage.setItem(REMEMBERED_USER_KEY, JSON.stringify(guestUser));
      setRememberedUser(guestUser);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [guestUser]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (authMappedUser) {
      window.localStorage.setItem(REMEMBERED_USER_KEY, JSON.stringify(authMappedUser));
      setRememberedUser(authMappedUser);
    }
  }, [authMappedUser]);

  useEffect(() => {
    if (!authMappedUser) {
      if (!guestUser && !authLoading) {
        setAppState('signin');
      }
      return;
    }
    const authId = auth0User?.sub;
    const currentFlow = authFlow ?? readStoredAuthFlow();
    const isKnown = authId ? knownAuthUsers.includes(authId) : false;

    if (currentFlow === 'login' && authId && !isKnown) {
      setAccountError(t('signin.accountNotFound'));
      updateAuthFlow(null);
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
      setGuestUser(null);
      setRememberedUser(null);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(STORAGE_KEY);
        window.localStorage.removeItem(REMEMBERED_USER_KEY);
      }
      setAppState('signin');
      return;
    }

    if (authId && !isKnown) {
      addKnownAuthUser(authId);
      sendWelcomeEmail(authMappedUser);
    }
    setAccountError(null);
    setAppState(profile ? 'main' : 'intro');
    updateAuthFlow(null);
  }, [
    authMappedUser,
    auth0User,
    authFlow,
    knownAuthUsers,
    addKnownAuthUser,
    sendWelcomeEmail,
    logout,
    guestUser,
    authLoading,
    profile,
    updateAuthFlow,
    t,
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (profile) {
      window.localStorage.setItem(PROFILE_KEY, profile);
    } else {
      window.localStorage.removeItem(PROFILE_KEY);
    }
  }, [profile]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (profile === 'recruiter') {
      window.localStorage.setItem(RECRUITER_SECTION_KEY, recruiterSection);
    } else {
      window.localStorage.removeItem(RECRUITER_SECTION_KEY);
    }
  }, [profile, recruiterSection]);

  const clearFocusStates = useCallback(() => {
    setSkillsFocusId(undefined);
    setExperienceFocusId(undefined);
    setEducationFocusId(undefined);
    setProjectsFocusId(undefined);
  }, []);

  const navigateToRecruiterSection = useCallback(
    (section: ProfileSection, focusId?: string) => {
      clearFocusStates();
      if (section === 'skills') {
        setSkillsFocusId(focusId);
      } else if (section === 'experience') {
        setExperienceFocusId(focusId);
      } else if (section === 'education') {
        setEducationFocusId(focusId);
      } else if (section === 'projects') {
        setProjectsFocusId(focusId);
      }
      setProfile('recruiter');
      setAppState('main');
      setRecruiterSection(section);
    },
    [clearFocusStates],
  );

  const navigateToStalkerSection = useCallback(
    (section: ProfileSection, focusId?: string) => {
      clearFocusStates();
      if (section === 'skills') {
        setSkillsFocusId(focusId);
      } else if (section === 'experience') {
        setExperienceFocusId(focusId);
      } else if (section === 'education') {
        setEducationFocusId(focusId);
      } else if (section === 'projects') {
        setProjectsFocusId(focusId);
      }
      setProfile('stalker');
      setAppState('main');
      setStalkerSection(section);
    },
    [clearFocusStates],
  );

  const searchItems = useMemo<SearchIndexItem[]>(() => {
    const items: SearchIndexItem[] = [];

    const addKeyword = (set: Set<string>, value?: string) => {
      if (!value) {
        return;
      }
      const lower = value.toLowerCase();
      set.add(lower);
      lower.split(/[^a-z0-9äöüß]+/i).forEach((token) => {
        if (token) {
          set.add(token);
        }
      });
    };

    skillGroups.forEach((group) => {
      const label: Record<LanguageCode, string> = {
        en: `${translations.en['recruiter.section.skills']} – ${group.label.en}`,
        de: `${translations.de['recruiter.section.skills']} – ${group.label.de ?? group.label.en}`,
      };
      const keywords = new Set<string>();
      addKeyword(keywords, group.label.en);
      addKeyword(keywords, group.label.de);
      (group.items.en || []).forEach((item) => addKeyword(keywords, item));
      (group.items.de || []).forEach((item) => addKeyword(keywords, item));
      items.push({
        id: `skills-${group.id}`,
        type: 'skills',
        targetId: group.id,
        label,
        keywords: Array.from(keywords),
      });
    });

    experiences.forEach((entry) => {
      const label: Record<LanguageCode, string> = {
        en: `${translations.en['recruiter.section.experience']} – ${entry.content.en.role}`,
        de: `${translations.de['recruiter.section.experience']} – ${entry.content.de.role}`,
      };
      const keywords = new Set<string>();
      const contentValues = [...Object.values(entry.content.en), ...Object.values(entry.content.de)];
      contentValues.forEach((value) => {
        if (Array.isArray(value)) {
          value.forEach((item) => addKeyword(keywords, item));
        } else {
          addKeyword(keywords, value);
        }
      });
      items.push({
        id: `experience-${entry.id}`,
        type: 'experience',
        targetId: entry.id,
        label,
        keywords: Array.from(keywords),
      });
    });

    educationEntries.forEach((entry) => {
      const label: Record<LanguageCode, string> = {
        en: `${translations.en['recruiter.section.education']} – ${entry.content.en.degree}`,
        de: `${translations.de['recruiter.section.education']} – ${entry.content.de.degree}`,
      };
      const keywords = new Set<string>();
      const pushContent = (content: typeof entry.content.en) => {
        addKeyword(keywords, content.degree);
        addKeyword(keywords, content.institution);
        addKeyword(keywords, content.major);
        addKeyword(keywords, content.thesisTitle);
        addKeyword(keywords, content.thesisDescription);
        content.courses.forEach((course) => addKeyword(keywords, course));
      };
      pushContent(entry.content.en);
      pushContent(entry.content.de);
      items.push({
        id: `education-${entry.id}`,
        type: 'education',
        targetId: entry.id,
        label,
        keywords: Array.from(keywords),
      });
    });

    projectEntries.forEach((entry) => {
      const label: Record<LanguageCode, string> = {
        en: `${translations.en['recruiter.section.projects']} – ${entry.content.en.title}`,
        de: `${translations.de['recruiter.section.projects']} – ${entry.content.de.title}`,
      };
      const keywords = new Set<string>();
      const pushContent = (content: typeof entry.content.en) => {
        addKeyword(keywords, content.title);
        addKeyword(keywords, content.summary);
        content.tech.forEach((tech) => addKeyword(keywords, tech));
      };
      pushContent(entry.content.en);
      pushContent(entry.content.de);
      items.push({
        id: `projects-${entry.id}`,
        type: 'projects',
        targetId: entry.id,
        label,
        keywords: Array.from(keywords),
      });
    });

    return items;
  }, []);

  const handleSearch = useCallback(
    (query: string): HeaderSearchResult[] => {
      const trimmed = query.trim().toLowerCase();
      if (!trimmed) {
        return [];
      }
      const matches = searchItems.filter((item) =>
        item.keywords.some((keyword) => keyword.includes(trimmed)),
      );

      return matches.slice(0, 8).map((item) => ({
        id: item.id,
        label: item.label[language] ?? item.label.en,
        category: t(`recruiter.section.${item.type}`),
      }));
    },
    [language, searchItems, t],
  );

  const handleSelectSearchResult = useCallback(
    (resultId: string) => {
      const item = searchItems.find((entry) => entry.id === resultId);
      if (!item) {
        return;
      }

      switch (item.type) {
        case 'skills':
          navigateToRecruiterSection('skills', item.targetId);
          break;
        case 'experience':
          navigateToRecruiterSection('experience', item.targetId);
          break;
        case 'education':
          navigateToRecruiterSection('education', item.targetId);
          break;
        case 'projects':
          navigateToRecruiterSection('projects', item.targetId);
          break;
        default:
          break;
      }
      setNotFoundQuery('');
    },
    [navigateToRecruiterSection, searchItems],
  );

  const handleSearchNoResults = useCallback((query: string) => {
    setNotFoundQuery(query);
    setAppState('notFound');
  }, []);

  const handleSearchBack = useCallback(() => {
    setNotFoundQuery('');
    setAppState('main');
    setRecruiterSection('dashboard');
    clearFocusStates();
  }, [clearFocusStates]);

  const handleHomeNavigation = useCallback(() => {
    clearFocusStates();
    if (profile === 'recruiter') {
      setRecruiterSection('dashboard');
    } else if (profile === 'stalker') {
      setStalkerSection('dashboard');
    }
    setAppState('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [profile, clearFocusStates]);

  const handleOpenLinkedIn = useCallback(() => {
    window.open('https://www.linkedin.com/in/debanjan-chakraborty-dc/', '_blank');
  }, []);

  const handleOpenCV = useCallback(() => {
    window.open('/Debanjan-Chakraborty-CV.pdf', '_blank');
  }, []);

  const handleAccountBack = useCallback(() => {
    setAppState('main');
  }, []);

  const handleProviderSignIn = useCallback(
    async (provider: Exclude<AuthProvider, 'guest'>) => {
      if (!authConfigured) {
        window.alert('Social sign-in is not configured. Please contact the administrator.');
        return;
      }
      let connection = 'google-oauth2';
      if (provider === 'linkedin') {
        connection = 'linkedin';
      } else if (provider === 'facebook') {
        connection = 'facebook';
      }
      await loginWithRedirect({
        authorizationParams: {
          connection,
        },
      });
    },
    [authConfigured, loginWithRedirect],
  );

  const startSignupWithProvider = useCallback(
    (provider: Exclude<AuthProvider, 'guest'>) => {
      updateAuthFlow('signup');
      handleProviderSignIn(provider);
    },
    [handleProviderSignIn, updateAuthFlow],
  );

  const startLoginWithProvider = useCallback(
    (provider: Exclude<AuthProvider, 'guest'>) => {
      updateAuthFlow('login');
      handleProviderSignIn(provider);
    },
    [handleProviderSignIn, updateAuthFlow],
  );

  const handleLinkProvider = useCallback(
    (provider: AuthProvider) => {
      if (provider === 'guest') {
        return;
      }
      startLoginWithProvider(provider);
    },
    [startLoginWithProvider],
  );

  const handleQuickLogin = () => {
    if (!rememberedUser) {
      return;
    }
    if (rememberedUser.provider === 'guest') {
      setGuestUser(rememberedUser);
      setAppState(profile ? 'main' : 'intro');
    } else {
      startLoginWithProvider(rememberedUser.provider);
    }
  };

  const handleDismissAccountError = useCallback(() => {
    setAccountError(null);
  }, []);

  const handleAnonymousVisit = () => {
    const anonymousUser: AuthUser = {
      firstName: 'Anonymous',
      lastName: 'Visitor',
      provider: 'guest',
    };
    setGuestUser(anonymousUser);
    setProfile('');
    setAppState('profile');
    setRecruiterSection('dashboard');
    clearFocusStates();
    setNotFoundQuery('');
  };

  const handleIntroComplete = () => {
    setAppState('profile');
  };

  const activateProfile = (selectedProfile: string) => {
    clearFocusStates();
    setProfile(selectedProfile);
    setAppState('main');
    if (selectedProfile === 'recruiter') {
      setRecruiterSection(readStoredRecruiterSection());
      setStalkerSection('dashboard');
    } else if (selectedProfile === 'stalker') {
      setStalkerSection('dashboard');
      setRecruiterSection('dashboard');
    } else {
      setRecruiterSection('dashboard');
      setStalkerSection('dashboard');
    }
  };

  const handleProfileSelect = (selectedProfile: string) => {
    activateProfile(selectedProfile);
  };

  const handleHeaderProfileSelect = (selectedProfile: string) => {
    activateProfile(selectedProfile);
  };

  const handleExitToProfiles = () => {
    setProfile('');
    setAppState('profile');
    setRecruiterSection('dashboard');
    setStalkerSection('dashboard');
    clearFocusStates();
    setNotFoundQuery('');
  };

  const handleSignOut = () => {
    setProfile('');
    setGuestUser(null);
    setRecruiterSection('dashboard');
    setStalkerSection('dashboard');
    clearFocusStates();
    setNotFoundQuery('');
    if (authMappedUser && authConfigured) {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    } else {
      setAppState('signin');
    }
  };

  const handleRecruiterSectionSelect = (sectionId: string) => {
    switch (sectionId) {
      case 'skills':
        navigateToRecruiterSection('skills');
        break;
      case 'experience':
        navigateToRecruiterSection('experience');
        break;
      case 'education':
      case 'certifications':
        navigateToRecruiterSection('education');
        break;
      case 'projects':
        navigateToRecruiterSection('projects');
        break;
      case 'contact':
        window.open('mailto:debanjanofficial@gmail.com');
        break;
      default:
        setRecruiterSection('dashboard');
        clearFocusStates();
    }
  };

  const handleStalkerSectionSelect = (sectionId: string) => {
    switch (sectionId) {
      case 'skills':
        navigateToStalkerSection('skills');
        break;
      case 'experience':
        navigateToStalkerSection('experience');
        break;
      case 'education':
      case 'certifications':
        navigateToStalkerSection('education');
        break;
      case 'projects':
        navigateToStalkerSection('projects');
        break;
      case 'contact':
        window.open('mailto:debanjanofficial@gmail.com');
        break;
      default:
        setStalkerSection('dashboard');
        clearFocusStates();
    }
  };

  const handleSkillsBack = () => {
    clearFocusStates();
    setRecruiterSection('dashboard');
  };

  const handleStalkerSectionBack = () => {
    clearFocusStates();
    setStalkerSection('dashboard');
  };

  const projects = {
    featured: [
      {
        id: 1,
        name: 'Project 1',
        poster_path: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: 2,
        name: 'Project 2',
        poster_path: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
    ],
    trending: [
      {
        id: 3,
        name: 'Project 3',
        poster_path: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: 4,
        name: 'Project 4',
        poster_path: 'https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
      },
    ],
    topRated: [
      {
        id: 5,
        name: 'Project 5',
        poster_path: 'https://images.unsplash.com/photo-1592609931095-54a2168ae893?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: 6,
        name: 'Project 6',
        poster_path: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
    ],
  };

  if (appState === 'signin' || !user) {
    return (
      <SignIn
        onAnonymousVisit={handleAnonymousVisit}
        onProviderSignIn={startSignupWithProvider}
        onExistingProviderSignIn={startLoginWithProvider}
        providerLoading={authLoading}
        providersEnabled={authConfigured}
        rememberedUser={rememberedUser}
        onQuickLogin={rememberedUser ? handleQuickLogin : undefined}
        accountError={accountError}
        onDismissAccountError={accountError ? handleDismissAccountError : undefined}
      />
    );
  }

  if (appState === 'intro') {
    return <Intro onIntroComplete={handleIntroComplete} />;
  }

  if (appState === 'profile') {
    return (
      <Profile
        onProfileSelect={handleProfileSelect}
        viewerName={user.firstName}
      />
    );
  }

  const handleOpenAccount = () => {
    setAppState('account');
  };

  const headerShouldRender = !(
    appState === 'main' &&
    (
      (profile === 'recruiter' && ['skills', 'experience', 'education', 'projects'].includes(recruiterSection)) ||
      (profile === 'stalker' && ['skills', 'experience', 'education', 'projects'].includes(stalkerSection))
    )
  );

  const headerElement = (
    <Header
      profile={profile}
      onSelectProfile={handleHeaderProfileSelect}
      onExitToProfiles={handleExitToProfiles}
      onSignOut={handleSignOut}
      onAccount={handleOpenAccount}
      onHome={handleHomeNavigation}
      onOpenLinkedIn={handleOpenLinkedIn}
      onOpenCV={handleOpenCV}
      onSearch={handleSearch}
      onSelectSearchResult={handleSelectSearchResult}
      onSearchNoResults={handleSearchNoResults}
      showLoginButton={user?.provider === 'guest'}
      onLogin={handleOpenAccount}
    />
  );

  if (appState === 'account') {
    return (
      <div className="App">
        {headerElement}
        <AccountPage
          user={user}
          onBack={handleAccountBack}
          onSignOut={handleSignOut}
          onLinkProvider={handleLinkProvider}
        />
      </div>
    );
  }

  if (appState === 'notFound') {
    return (
      <div className="App">
        {headerElement}
        <SearchNotFound query={notFoundQuery} onBack={handleSearchBack} />
      </div>
    );
  }

  return (
    <div className="App">
      {headerShouldRender && headerElement}
      {profile === 'recruiter' ? (
        recruiterSection === 'skills' ? (
          <SkillsShowcase onBack={handleSkillsBack} initialGroupId={skillsFocusId} />
        ) : recruiterSection === 'experience' ? (
          <ExperienceShowcase onBack={handleSkillsBack} initialExperienceId={experienceFocusId} />
        ) : recruiterSection === 'education' ? (
          <EducationShowcase onBack={handleSkillsBack} initialEducationId={educationFocusId} />
        ) : recruiterSection === 'projects' ? (
          <ProjectsShowcase onBack={handleSkillsBack} initialProjectId={projectsFocusId} />
        ) : (
          <>
            <Banner profile={profile} />
            <RecruiterDashboard onSelectSection={handleRecruiterSectionSelect} />
          </>
        )
      ) : profile === 'stalker' ? (
        stalkerSection === 'skills' ? (
          <SkillsShowcase onBack={handleStalkerSectionBack} initialGroupId={skillsFocusId} />
        ) : stalkerSection === 'experience' ? (
          <ExperienceShowcase onBack={handleStalkerSectionBack} initialExperienceId={experienceFocusId} />
        ) : stalkerSection === 'education' ? (
          <EducationShowcase onBack={handleStalkerSectionBack} initialEducationId={educationFocusId} />
        ) : stalkerSection === 'projects' ? (
          <ProjectsShowcase onBack={handleStalkerSectionBack} initialProjectId={projectsFocusId} />
        ) : (
          <>
            <Banner profile={profile} />
            <StalkerDashboard onSelectSection={handleStalkerSectionSelect} />
          </>
        )
      ) : (
        <>
          <Banner profile={profile} />
          <Row title={t('home.featured')} projects={projects.featured} />
          <Row title={t('home.trending')} projects={projects.trending} />
          <Row title={t('home.topRated')} projects={projects.topRated} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
