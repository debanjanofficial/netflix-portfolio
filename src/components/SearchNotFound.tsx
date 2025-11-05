import React from 'react';
import './SearchNotFound.css';
import { useLanguage } from '../context/LanguageContext';

interface SearchNotFoundProps {
  query: string;
  onBack: () => void;
}

const SearchNotFound: React.FC<SearchNotFoundProps> = ({ query, onBack }) => {
  const { t } = useLanguage();
  return (
    <section className="searchNotFound">
      <div className="searchNotFound__card">
        <h1 className="searchNotFound__title">{t('search.noResultsTitle')}</h1>
        <p className="searchNotFound__description">
          {t('search.noResultsDescription')} <span className="searchNotFound__query">{query}</span>
        </p>
        <button type="button" className="searchNotFound__back" onClick={onBack}>
          ← {t('search.backHome')}
        </button>
      </div>
    </section>
  );
};

export default SearchNotFound;
