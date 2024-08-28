import React from 'react';
import '../styles/InfoModalComponent.css'; // Import the CSS file for styling

const InfoModalComponent = ({ onClose }) => {
  return (
    <div className="info-modal-overlay" onClick={onClose}>
      <div className="info-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="info-modal-header">
          <h2>Information</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="info-modal-body">
          <div>
            <h3>Instructions:</h3>
            <p>
              Interact with the points on the map to explore and discover UBC’s history, interesting facts, and notable figures.
            </p>
            <p>
              Each point also has an activity and comments section to engage with the community and share your experiences.
            </p>
            <p>
              Additionally, you can create your own points to contribute to our collective knowledge and share your stories. What do you know about UBC that you'd like to share? Use the "+" sign at the bottom of the platform to add a point.
            </p>
            <p>
              Feel free to leave feedback using the form at the bottom right of the map. Your insights will help us improve the platform’s functionality.
            </p>

            <h3>About this project:</h3>
            <p>
              UBC PointQuest was created to introduce new UBC students and other Point Grey campus visitors to lesser-known facts about the university, making their experience more interactive and engaging. Users can learn about historical facts, trivia, connections to Indigenous history, and significant locations on campus.
            </p>
            <p>
              For more information, visit our website:
              <a href="https://pointquest.educ.ubc.ca" target="_blank">https://pointquest.educ.ubc.ca</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InfoModalComponent;
