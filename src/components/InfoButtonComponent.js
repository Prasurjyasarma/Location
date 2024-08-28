import React, { useState } from 'react';
import InfoModalComponent from './InfoModalComponent';
import '../styles/InfoButtonComponent.css'; // Import the CSS file for styling

const InfoButtonComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="info-button" onClick={handleButtonClick}>
        Information
      </div>
      {showModal && <InfoModalComponent onClose={handleCloseModal} />}
    </>
  );
};

export default InfoButtonComponent;
