import React from 'react';
import '../styles/FeedbackModalComponent.css'; // Import the CSS file for styling

const FeedbackModalComponent = ({ onClose }) => {
  return (
    <div className="feedback-modal-overlay" onClick={onClose}>
      <div className="feedback-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="feedback-modal-header">
          <h2>Submit Feedback</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="feedback-modal-body">
          <iframe 
            src="https://ubc.ca1.qualtrics.com/jfe/form/SV_0Us3Di2wzxFZDv0"
            title="Feedback Form"
            width="100%"
            height="400px"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default FeedbackModalComponent;
