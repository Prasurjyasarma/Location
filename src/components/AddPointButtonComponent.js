import React from 'react';
import '../styles/AddPointButtonComponent.css'; // Import the CSS file for styling

const AddPointButtonComponent = ({ isAddingPoint, setIsAddingPoint }) => {
  const handleButtonClick = () => {
    setIsAddingPoint(!isAddingPoint);
  };

  return (
    <>
      <div className="add-point-button" onClick={handleButtonClick}>
        +
      </div>
    </>
  );
};

export default AddPointButtonComponent;
