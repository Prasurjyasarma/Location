import React from 'react';
import '../styles/LogoComponent.css'; // Import the CSS file for styling

const LogoComponent = () => {
  const handleLogoClick = () => {
    window.location.href = 'https://pointquest.educ.ubc.ca/'; // Replace with your target URL
  };

  return (
    <div className="logo-container" onClick={handleLogoClick}>
      <img src="/Media/UBCPointQuestLogo.png" alt="Project Logo" className="logo" />
    </div>
  );
};

export default LogoComponent; // Ensure default export
