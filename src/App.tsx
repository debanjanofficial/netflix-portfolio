import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
import Row from './components/Row';
import Footer from './components/Footer';
import Intro from './components/Intro';
import Profile from './components/Profile';
import RecruiterDashboard from './components/RecruiterDashboard';

function App() {
  const [appState, setAppState] = useState('intro'); // intro, profile, main
  const [profile, setProfile] = useState(''); // recruiter, stalker

  const handleIntroComplete = () => {
    setAppState('profile');
  };

  const handleProfileSelect = (selectedProfile: string) => {
    setProfile(selectedProfile);
    setAppState('main');
  };

  const handleProfileSwitch = () => {
    setAppState('profile');
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

  if (appState === 'intro') {
    return <Intro onIntroComplete={handleIntroComplete} />;
  }

  if (appState === 'profile') {
    return <Profile onProfileSelect={handleProfileSelect} />;
  }

  return (
    <div className="App">
      <Header profile={profile} onProfileSwitch={handleProfileSwitch} />
      <Banner profile={profile} />
      {profile === 'recruiter' ? (
        <RecruiterDashboard />
      ) : (
        <>
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
