import React, { useState, useEffect } from "react";
import "../styles/ModalComponent.css";
import CommentInputComponent from "../components/CommentsComponent";
import CommentListComponent from "../components/CommentsDisplay";

const ModalComponent = ({
  selectedMarker,
  setSelectedMarker,
  markerComments,
  setMarkerComments,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    if (selectedMarker && selectedMarker.content) {
      setCurrentIndex(0);
    }
  }, [selectedMarker]);

  if (
    !selectedMarker ||
    !selectedMarker.content ||
    selectedMarker.content.length === 0
  )
    return null;

  const content = selectedMarker.content;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? content.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === content.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderContent = (item, index) => (
    <div key={index} className="content-wrapper">
      {index === 0 && (
        <div className="first-slide">
          <img
            src={item.src}
            alt={selectedMarker.name}
            className="first-slide-image"
          />
          <div className="first-slide-text">
            <h2>{selectedMarker.name}</h2>
            {selectedMarker.category && (
              <p className="marker-category">
                <strong>#</strong> {selectedMarker.category}
              </p>
            )}
            <p>{selectedMarker.description}</p>
            <p>
              <strong>Take Action</strong>
            </p>
            <p>description of the action</p>
            {selectedMarker.address && (
              <p className="marker-address">{selectedMarker.address}</p>
            )}
          </div>
        </div>
      )}
      {index !== 0 && item.type === "image" && (
        <img
          src={item.src}
          alt={selectedMarker.name}
          className="content-image"
        />
      )}
      {index !== 0 && item.type === "youtube" && (
        <div className="responsive-iframe youtube-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${item.videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video"
          ></iframe>
        </div>
      )}
      {index !== 0 && item.type === "embed" && (
        <div className="responsive-iframe embed-wrapper">
          <iframe
            src={item.src}
            allowFullScreen
            title="Embedded Content"
          ></iframe>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="modal-overlay custom-modal-overlay"
      onClick={() => setSelectedMarker(null)}
    >
      <div
        className="modal-content custom-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="close-button-wrapper custom-close-button-wrapper"
          onClick={() => setSelectedMarker(null)}
        >
          <button className="close-button custom-close-button"></button>
        </div>
        {currentIndex !== 0 && (
          <h2 className="modal-heading custom-modal-heading">
            {selectedMarker.name}
          </h2>
        )}
        <div className="scrollable-content custom-scrollable-content">
          <div className="content-container custom-content-container">
            {renderContent(content[currentIndex], currentIndex)}
          </div>
          {/* Comment Input and Comment List */}
          {currentIndex !== 0 && (
            <>
              <div className="comment-input-container">
                <CommentInputComponent
                  markerName={selectedMarker.name}
                  setMarkerComments={setMarkerComments}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                />
              </div>
              <div className="comment-list-container">
                <CommentListComponent
                  markerName={selectedMarker.name}
                  markerComments={markerComments}
                  setMarkerComments={setMarkerComments}
                  setReplyingTo={setReplyingTo}
                />
              </div>
            </>
          )}
        </div>
        {content.length > 1 && (
          <>
            <button
              className="nav-button prev-button custom-nav-button custom-prev-button"
              onClick={handlePrev}
            >
              ❮
            </button>
            <button
              className="nav-button next-button custom-nav-button custom-next-button"
              onClick={handleNext}
            >
              ❯
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalComponent;
