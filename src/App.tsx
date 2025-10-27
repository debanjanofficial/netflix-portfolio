import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
import Row from './components/Row';
import Footer from './components/Footer';
import Intro from './components/Intro';
import Profile from './components/Profile';
import RecruiterDashboard from './components/RecruiterDashboard';
import SkillsShowcase from './components/SkillsShowcase';
import SignIn, { SignInData } from './components/SignIn';

type AppState = 'signin' | 'intro' | 'profile' | 'main';
type RecruiterSection = 'dashboard' | 'skills';

type AuthUser = SignInData;

const STORAGE_KEY = 'netflixPortfolioUser';
const PROFILE_KEY = 'netflixPortfolioProfile';
const RECRUITER_SECTION_KEY = 'netflixPortfolioRecruiterSection';

const readStoredUser = (): AuthUser | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
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

const readStoredRecruiterSection = (): RecruiterSection => {
  if (typeof window === 'undefined') {
    return 'dashboard';
  }

  const stored = window.localStorage.getItem(RECRUITER_SECTION_KEY);
  return stored === 'skills' ? 'skills' : 'dashboard';
};

function App() {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());
  const [profile, setProfile] = useState<string>(() => readStoredProfile()); // recruiter, stalker
  const [recruiterSection, setRecruiterSection] = useState<RecruiterSection>(() =>
    readStoredRecruiterSection(),
  );
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

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

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

  const handleSignIn = (data: SignInData) => {
    setUser(data);
    setAppState(profile ? 'main' : 'intro');
  };

  const handleIntroComplete = () => {
    setAppState('profile');
  };

  const activateProfile = (selectedProfile: string) => {
    setProfile(selectedProfile);
    setAppState('main');
    if (selectedProfile === 'recruiter') {
      setRecruiterSection(readStoredRecruiterSection());
    } else {
      setRecruiterSection('dashboard');
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
  };

  const handleSignOut = () => {
    setProfile('');
    setUser(null);
    setAppState('signin');
    setRecruiterSection('dashboard');
  };

  const handleRecruiterSectionSelect = (section: string) => {
    if (section.toLowerCase() === 'skills') {
      setRecruiterSection('skills');
    }
  };

  const handleSkillsBack = () => {
    setRecruiterSection('dashboard');
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
    return <SignIn onSignIn={handleSignIn} />;
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

  return (
    <div className="App">
      {profile === 'recruiter' && recruiterSection === 'skills' ? null : (
        <Header
          profile={profile}
          onSelectProfile={handleHeaderProfileSelect}
          onExitToProfiles={handleExitToProfiles}
          onSignOut={handleSignOut}
        />
      )}
      {profile === 'recruiter' ? (
        recruiterSection === 'skills' ? (
          <SkillsShowcase onBack={handleSkillsBack} />
        ) : (
          <>
            <Banner profile={profile} />
            <RecruiterDashboard onSelectSection={handleRecruiterSectionSelect} />
          </>
        )
      ) : (
        <>
          <Banner profile={profile} />
          <Row title="Featured Projects" projects={projects.featured} />
          <Row title="Trending Projects" projects={projects.trending} />
          <Row title="Top Rated Projects" projects={projects.topRated} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
