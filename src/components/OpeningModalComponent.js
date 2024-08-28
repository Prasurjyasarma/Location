import React from 'react';
import '../styles/OpeningModalComponent.css'; // Import the CSS file for styling

const OpeningModalComponent = ({ onClose }) => {
  const handleGetStarted = () => {
    onClose(); // Just close the modal without handling the name
  };

  return (
    <div className="opening-modal-overlay" onClick={onClose}>
      <div className="opening-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="opening-modal-header">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="opening-modal-body">
          <div className="modal-content-wrapper">
            <img src="/Media/UBCPointQuestLogo.png" alt="PointQuest Logo" className="modal-logo" />
            <div className="modal-text">
              <h2>Welcome to UBC PointQuest</h2>
                <p>Discover hidden gems of the university by interacting with the points located on the map. This platform will also show you how to physically navigate to each location.</p>
                <p>Use the "+" sign at the bottom of the map to add your own points and contribute to our collective knowledge.</p>
                <p>Enjoy your journey through the UBC Point Grey campus!</p>
            </div>
          </div>
        </div>
        <div className="opening-modal-footer">
          <button className="get-started-button" onClick={handleGetStarted}>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default OpeningModalComponent;
