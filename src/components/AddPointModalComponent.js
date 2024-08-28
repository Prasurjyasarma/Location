import React, { useState } from 'react';
import '../styles/AddPointModalComponent.css'; // Import the CSS file for styling

const AddPointModalComponent = ({ onClose, onAddPoint, selectedLocation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // State to store the uploaded image

  const handleSubmit = () => {
    if (selectedLocation && name && description) {
      onAddPoint({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        name,
        description,
        image, // Include the image in the point data
      });
      setName('');
      setDescription('');
      setImage(null); // Reset the image after submission
      onClose();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Store the base64 string of the image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="add-point-modal-overlay" onClick={onClose}>
      <div className="add-point-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="add-point-modal-header">
          <h2>Add Point</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="add-point-modal-body">
          <p>Enter Name, Description, and Image for the marker</p>
          {selectedLocation && (
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter marker name"
                style={{ width: '100%', marginBottom: '10px' }}
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                rows="5"
                style={{ width: '100%', marginBottom: '10px' }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ marginBottom: '10px' }}
              />
              {image && (
                <div>
                  <p>Preview:</p>
                  <img src={image} alt="Preview" style={{ maxWidth: '100%', marginBottom: '10px' }} />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="add-point-modal-footer">
          <button onClick={handleSubmit} disabled={!selectedLocation || !name || !description}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPointModalComponent;
