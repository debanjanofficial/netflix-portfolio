import React from 'react';
import './Footer.css';
import { personalDetails } from '../content/data';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__social">
        <a href={personalDetails.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={personalDetails.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={personalDetails.emailUrl}>Email</a>
      </div>
      <div className="footer__copy">
        &copy; 2026 Debanjan Chakraborty. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
