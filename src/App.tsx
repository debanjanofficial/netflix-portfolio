import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
import Row from './components/Row';
import Footer from './components/Footer';
import Intro from './components/Intro';
import Profile from './components/Profile';
import RecruiterDashboard from './components/RecruiterDashboard';
import VisitorDashboard from './components/VisitorDashboard';
import SkillsShowcase from './components/SkillsShowcase';
import ExperienceShowcase from './components/ExperienceShowcase';
import EducationShowcase from './components/EducationShowcase';
import ProjectsShowcase from './components/ProjectsShowcase';
import ResearchShowcase from './components/ResearchShowcase';
import SearchNotFound from './components/SearchNotFound';
import { useLanguage } from './context/LanguageContext';
import { skillGroups, experiences, educationEntries, projectEntries, publications, researchInterests, personalDetails } from './content/data';
import { translations } from './i18n/translations';
import { LanguageCode } from './context/LanguageContext';

type AppState = 'intro' | 'profile' | 'main' | 'notFound';
type ProfileSection = 'dashboard' | 'skills' | 'experience' | 'education' | 'research' | 'projects';

interface AuthUser {
  firstName: string;
  lastName: string;
  provider: 'guest';
}

interface SearchIndexItem {
  id: string;
  type: 'skills' | 'experience' | 'education' | 'research' | 'projects';
  targetId: string;
  label: Record<LanguageCode, string>;
  keywords: string[];
}

interface HeaderSearchResult {
  id: string;
  label: string;
  category: string;
}

const STORAGE_KEY = 'portfolioUser';
const PROFILE_KEY = 'portfolioProfile';
const RECRUITER_SECTION_KEY = 'portfolioRecruiterSection';
const INTRO_SESSION_KEY = 'portfolioIntroSeen';

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
  if (stored === 'skills' || stored === 'experience' || stored === 'education' || stored === 'research' || stored === 'projects') {
    return stored;
  }
  if (stored === 'certifications') {
    return 'education';
  }
  return 'dashboard';
};

const publicUser: AuthUser = {
  firstName: 'Portfolio',
  lastName: 'Visitor',
  provider: 'guest',
};

function App() {
  const { language, t } = useLanguage();
  const [guestUser] = useState<AuthUser>(() => readStoredUser() ?? publicUser);
  const [profile, setProfile] = useState<string>(() => readStoredProfile()); // recruiter, visitor
  const [recruiterSection, setRecruiterSection] = useState<ProfileSection>(() =>
    readStoredRecruiterSection(),
  );
  const [visitorSection, setVisitorSection] = useState<ProfileSection>('dashboard');
  const [appState, setAppState] = useState<AppState>(() => {
    const storedProfile = readStoredProfile();
    if (typeof window !== 'undefined' && !window.sessionStorage.getItem(INTRO_SESSION_KEY)) {
      return 'intro';
    }
    return storedProfile ? 'main' : 'profile';
  });
  const [skillsFocusId, setSkillsFocusId] = useState<string | undefined>();
  const [experienceFocusId, setExperienceFocusId] = useState<string | undefined>();
  const [educationFocusId, setEducationFocusId] = useState<string | undefined>();
  const [projectsFocusId, setProjectsFocusId] = useState<string | undefined>();
  const [researchFocusId, setResearchFocusId] = useState<string | undefined>();
  const [notFoundQuery, setNotFoundQuery] = useState('');
  const user = guestUser;

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
    setResearchFocusId(undefined);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
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
      } else if (section === 'research') {
        setResearchFocusId(focusId);
      }
      setProfile('recruiter');
      setAppState('main');
      setRecruiterSection(section);
      scrollToTop();
    },
    [clearFocusStates, scrollToTop],
  );

  const navigateToVisitorSection = useCallback(
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
      } else if (section === 'research') {
        setResearchFocusId(focusId);
      }
      setProfile('visitor');
      setAppState('main');
      setVisitorSection(section);
      scrollToTop();
    },
    [clearFocusStates, scrollToTop],
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
        addKeyword(keywords, content.thesisTitle);
        addKeyword(keywords, content.location);
        addKeyword(keywords, content.duration);
        addKeyword(keywords, content.supervisors);
        content.bullets.forEach((bullet) => addKeyword(keywords, bullet));
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
        addKeyword(keywords, content.context);
        content.bullets.forEach((bullet) => addKeyword(keywords, bullet));
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

    publications.forEach((entry) => {
      const label: Record<LanguageCode, string> = {
        en: `${translations.en['recruiter.section.research']} – ${entry.content.en.title}`,
        de: `${translations.de['recruiter.section.research']} – ${entry.content.de.title}`,
      };
      const keywords = new Set<string>();
      [entry.content.en, entry.content.de].forEach((content) => {
        addKeyword(keywords, content.citation);
        addKeyword(keywords, content.title);
        addKeyword(keywords, content.venue);
        addKeyword(keywords, content.status);
      });
      researchInterests.en.forEach((interest) => addKeyword(keywords, interest));
      researchInterests.de.forEach((interest) => addKeyword(keywords, interest));
      items.push({ id: `research-${entry.id}`, type: 'research', targetId: entry.id, label, keywords: Array.from(keywords) });
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
        case 'research':
          navigateToRecruiterSection('research', item.targetId);
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
    } else if (profile === 'visitor') {
      setVisitorSection('dashboard');
    }
    setAppState('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [profile, clearFocusStates]);

  const handleOpenLinkedIn = useCallback(() => {
    window.open(personalDetails.linkedinUrl, '_blank');
  }, []);

  const handleOpenCV = useCallback(() => {
    window.open('/Debanjan-Chakraborty-CV.pdf', '_blank');
  }, []);

  const activateProfile = (selectedProfile: string) => {
    clearFocusStates();
    setProfile(selectedProfile);
    setAppState('main');
    if (selectedProfile === 'recruiter') {
      setRecruiterSection(readStoredRecruiterSection());
      setVisitorSection('dashboard');
    } else if (selectedProfile === 'visitor') {
      setVisitorSection('dashboard');
      setRecruiterSection('dashboard');
    } else {
      setRecruiterSection('dashboard');
      setVisitorSection('dashboard');
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
    setVisitorSection('dashboard');
    clearFocusStates();
    setNotFoundQuery('');
  };

  const handleSignOut = () => {
    setProfile('');
    setRecruiterSection('dashboard');
    setVisitorSection('dashboard');
    clearFocusStates();
    setNotFoundQuery('');
    setAppState('profile');
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
      case 'research':
        navigateToRecruiterSection('research');
        break;
      case 'contact':
        window.location.href = personalDetails.emailUrl;
        break;
      default:
        setRecruiterSection('dashboard');
        clearFocusStates();
    }
  };

  const handleVisitorSectionSelect = (sectionId: string) => {
    switch (sectionId) {
      case 'skills':
        navigateToVisitorSection('skills');
        break;
      case 'experience':
        navigateToVisitorSection('experience');
        break;
      case 'education':
      case 'certifications':
        navigateToVisitorSection('education');
        break;
      case 'projects':
        navigateToVisitorSection('projects');
        break;
      case 'research':
        navigateToVisitorSection('research');
        break;
      case 'contact':
        window.location.href = personalDetails.emailUrl;
        break;
      default:
        setVisitorSection('dashboard');
        clearFocusStates();
    }
  };

  const handleRecruiterSectionBack = () => {
    clearFocusStates();
    setRecruiterSection('dashboard');
    scrollToTop();
  };

  const handleVisitorSectionBack = () => {
    clearFocusStates();
    setVisitorSection('dashboard');
    scrollToTop();
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

  const handleIntroComplete = () => {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    setAppState(profile ? 'main' : 'profile');
  };

  if (appState === 'intro') {
    return <Intro onIntroComplete={handleIntroComplete} />;
  }

  if (appState === 'profile') {
    return <Profile onProfileSelect={handleProfileSelect} viewerName={user.firstName} />;
  }

  const headerShouldRender = !(
    appState === 'main' &&
    (
      (profile === 'recruiter' && ['skills', 'experience', 'education', 'research', 'projects'].includes(recruiterSection)) ||
      (profile === 'visitor' && ['skills', 'experience', 'education', 'research', 'projects'].includes(visitorSection))
    )
  );

  const headerElement = (
    <Header
      profile={profile}
      onSelectProfile={handleHeaderProfileSelect}
      onExitToProfiles={handleExitToProfiles}
      onSignOut={handleSignOut}
      onAccount={handleExitToProfiles}
      onHome={handleHomeNavigation}
      onOpenLinkedIn={handleOpenLinkedIn}
      onOpenCV={handleOpenCV}
      onSearch={handleSearch}
      onSelectSearchResult={handleSelectSearchResult}
      onSearchNoResults={handleSearchNoResults}
      showLoginButton={false}
      onLogin={handleExitToProfiles}
    />
  );

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
          <SkillsShowcase onBack={handleRecruiterSectionBack} initialGroupId={skillsFocusId} />
        ) : recruiterSection === 'experience' ? (
          <ExperienceShowcase onBack={handleRecruiterSectionBack} initialExperienceId={experienceFocusId} />
        ) : recruiterSection === 'education' ? (
          <EducationShowcase onBack={handleRecruiterSectionBack} initialEducationId={educationFocusId} />
        ) : recruiterSection === 'projects' ? (
          <ProjectsShowcase onBack={handleRecruiterSectionBack} initialProjectId={projectsFocusId} />
        ) : recruiterSection === 'research' ? (
          <ResearchShowcase onBack={handleRecruiterSectionBack} initialPublicationId={researchFocusId} />
        ) : (
          <>
            <Banner profile={profile} />
            <RecruiterDashboard onSelectSection={handleRecruiterSectionSelect} />
          </>
        )
      ) : profile === 'visitor' ? (
        visitorSection === 'skills' ? (
          <SkillsShowcase onBack={handleVisitorSectionBack} initialGroupId={skillsFocusId} />
        ) : visitorSection === 'experience' ? (
          <ExperienceShowcase onBack={handleVisitorSectionBack} initialExperienceId={experienceFocusId} />
        ) : visitorSection === 'education' ? (
          <EducationShowcase onBack={handleVisitorSectionBack} initialEducationId={educationFocusId} />
        ) : visitorSection === 'projects' ? (
          <ProjectsShowcase onBack={handleVisitorSectionBack} initialProjectId={projectsFocusId} />
        ) : visitorSection === 'research' ? (
          <ResearchShowcase onBack={handleVisitorSectionBack} initialPublicationId={researchFocusId} />
        ) : (
          <>
            <Banner profile={profile} />
            <VisitorDashboard onSelectSection={handleVisitorSectionSelect} />
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
