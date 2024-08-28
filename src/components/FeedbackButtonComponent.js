import React, { useState } from 'react';
import FeedbackModalComponent from './FeedbackModalComponent';
import '../styles/FeedbackButtonComponent.css'; // Import the CSS file for styling

const FeedbackButtonComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="feedback-button" onClick={handleButtonClick}>
        Feedback
      </div>
      {showModal && <FeedbackModalComponent onClose={handleCloseModal} />}
    </>
  );
};

export default FeedbackButtonComponent;
