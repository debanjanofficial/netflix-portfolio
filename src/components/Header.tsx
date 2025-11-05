import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Header.css';
import { useLanguage, LanguageCode } from '../context/LanguageContext';

interface SearchResultOption {
  id: string;
  label: string;
  category: string;
}

interface HeaderProps {
  profile: string;
  onSelectProfile: (profile: string) => void;
  onExitToProfiles: () => void;
  onSignOut: () => void;
  onAccount: () => void;
  onHome: () => void;
  onOpenLinkedIn: () => void;
  onOpenCV: () => void;
  onSearch: (query: string) => SearchResultOption[];
  onSelectSearchResult: (resultId: string) => void;
  onSearchNoResults: (query: string) => void;
  showLoginButton: boolean;
  onLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({
  profile,
  onSelectProfile,
  onExitToProfiles,
  onSignOut,
  onAccount,
  onHome,
  onOpenLinkedIn,
  onOpenCV,
  onSearch,
  onSelectSearchResult,
  onSearchNoResults,
  showLoginButton,
  onLogin,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultOption[]>([]);
  const [isSolid, setIsSolid] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSolid(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    } else {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (languageMenuRef.current && !languageMenuRef.current.contains(target)) {
        setLanguageMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const profileLabel = useMemo(() => {
    if (!profile) {
      return t('header.profile');
    }
    return profile === 'recruiter' ? t('profile.recruiter') : t('profile.stalker');
  }, [profile, t]);

  const otherProfiles = useMemo(() => {
    const options = [
      { id: 'recruiter', label: t('header.dropdown.recruiter') },
      { id: 'stalker', label: t('header.dropdown.stalker') },
    ];
    if (!profile) {
      return options;
    }
    return options.filter((option) => option.id !== profile);
  }, [profile, t]);

  const handleLanguageToggle = () => {
    setLanguageMenuOpen((open) => !open);
  };

  const handleLanguageSelect = (code: LanguageCode) => {
    setLanguage(code);
    setLanguageMenuOpen(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }
    const results = onSearch(value);
    setSearchResults(results);
  };

  const handleSearchResultSelect = (id: string) => {
    onSelectSearchResult(id);
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (searchResults.length > 0) {
        handleSearchResultSelect(searchResults[0].id);
      } else if (searchQuery.trim()) {
        onSearchNoResults(searchQuery.trim());
        setSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    } else if (event.key === 'Escape') {
      setSearchOpen(false);
    }
  };

  const handleProfileClick = () => {
    setDropdownOpen((open) => !open);
  };

  const closeProfileDropdown = () => {
    setDropdownOpen(false);
  };

  const handleProfileBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setDropdownOpen(false);
    }
  };

  return (
    <header className={`header ${isSolid ? 'header--solid' : ''}`}>
      <div className="header__left">
        <span className="header__brand">DEBANJAN</span>
        <nav className="header__nav" aria-label="Primary">
          <button type="button" className="header__navItem" onClick={onHome}>
            {t('header.home')}
          </button>
          <button type="button" className="header__navItem" onClick={onOpenLinkedIn}>
            {t('header.linkedin')}
          </button>
          <button type="button" className="header__navItem" onClick={onOpenCV}>
            {t('header.cv')}
          </button>
          <div className="header__language" ref={languageMenuRef}>
            <button type="button" className="header__navItem" onClick={handleLanguageToggle}>
              {t('header.language')}
            </button>
            {languageMenuOpen && (
              <div className="header__languageMenu" role="menu">
                <button
                  type="button"
                  className={`header__languageOption ${language === 'en' ? 'active' : ''}`}
                  onClick={() => handleLanguageSelect('en')}
                >
                  English
                </button>
                <button
                  type="button"
                  className={`header__languageOption ${language === 'de' ? 'active' : ''}`}
                  onClick={() => handleLanguageSelect('de')}
                >
                  Deutsch
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
      <div className="header__right">
        <div className="header__search" ref={searchRef}>
          {searchOpen ? (
            <div className="header__searchBar">
              <input
                ref={searchInputRef}
                className="header__searchInput"
                type="search"
                value={searchQuery}
                onChange={(event) => handleSearchChange(event.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder={t('header.searchPlaceholder')}
              />
              <button
                type="button"
                className="header__searchClose"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                ×
              </button>
              {searchResults.length > 0 && (
                <ul className="header__searchResults" role="listbox">
                  {searchResults.map((result) => (
                    <li key={result.id}>
                      <button
                        type="button"
                        className="header__searchResult"
                        onMouseDown={(event) => {
                          event.preventDefault();
                          handleSearchResultSelect(result.id);
                        }}
                      >
                        <span className="header__searchResultLabel">{result.label}</span>
                        <span className="header__searchResultCategory">{result.category}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <button
              className="header__iconButton"
              type="button"
              aria-label={t('header.searchPlaceholder')}
              onClick={() => setSearchOpen(true)}
            >
              <svg className="header__icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path d="M15.5 14h-.79l-.28-.27a6 6 0 10-.71.71l.27.28v.79l5 5 1.5-1.5-5-5zm-6 0a4 4 0 110-8 4 4 0 010 8z" />
              </svg>
            </button>
          )}
        </div>
        {showLoginButton && (
          <button type="button" className="header__loginButton" onClick={onLogin}>
            {t('signin.loginButton')}
          </button>
        )}
        <div
          className="header__profile"
          ref={profileMenuRef}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={closeProfileDropdown}
          onClick={handleProfileClick}
          onBlur={handleProfileBlur}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setDropdownOpen((open) => !open);
            }
          }}
        >
          <img
            className="header__avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt={`${profileLabel} avatar`}
          />
          <span className="header__profileName">{profileLabel}</span>
          <svg
            className={`header__caret ${dropdownOpen ? 'header__caret--open' : ''}`}
            viewBox="0 0 24 24"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
          {dropdownOpen && (
            <div
              className="header__dropdown"
              role="menu"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={closeProfileDropdown}
            >
              {otherProfiles.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  className="header__dropdownItem"
                  onClick={() => {
                    onSelectProfile(id);
                    setDropdownOpen(false);
                  }}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                className="header__dropdownItem"
                onClick={() => {
                  onExitToProfiles();
                  setDropdownOpen(false);
                }}
              >
                {t('header.dropdown.manageProfiles')}
              </button>
              <button
                type="button"
                className="header__dropdownItem"
                onClick={() => {
                  onExitToProfiles();
                  setDropdownOpen(false);
                }}
              >
                {t('header.dropdown.exitProfile')}
              </button>
              <button
                type="button"
                className="header__dropdownItem"
                onClick={() => {
                  window.alert('Coming soon');
                  setDropdownOpen(false);
                }}
              >
                {t('header.dropdown.transferProfile')}
              </button>
              <div className="header__dropdownSeparator" aria-hidden="true" />
              <button
                type="button"
                className="header__dropdownItem"
                onClick={() => {
                  onAccount();
                  setDropdownOpen(false);
                }}
              >
                {t('header.dropdown.account')}
              </button>
              <button
                type="button"
                className="header__dropdownItem"
                onClick={() => {
                  window.alert('Help centre coming soon');
                  setDropdownOpen(false);
                }}
              >
                {t('header.dropdown.help')}
              </button>
              <div className="header__dropdownSeparator" aria-hidden="true" />
              <button
                type="button"
                className="header__dropdownItem header__dropdownItem--signout"
                onClick={() => {
                  onSignOut();
                  setDropdownOpen(false);
                }}
              >
                {t('header.dropdown.signOut')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
