import React, { useState } from "react";
import "../styles/CommentsComponent.css";

const CommentInputComponent = ({
  markerName,
  setMarkerComments,
  replyingTo,
  setReplyingTo,
}) => {
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleCommentSubmit = () => {
    if (!username || !newComment) return;

    const commentData = {
      username,
      text: newComment,
      replies: [],
      time: "Just now",
      likes: 0,
      image: imageURL,
    };

    setMarkerComments((prevComments) => {
      const currentComments = prevComments[markerName] || [];

      if (replyingTo !== null) {
        // Handle replies
        const addReply = (comments, replyingTo) => {
          return comments.map((comment) => {
            if (comment === replyingTo) {
              return {
                ...comment,
                replies: [...comment.replies, commentData],
              };
            } else if (comment.replies.length > 0) {
              return {
                ...comment,
                replies: addReply(comment.replies, replyingTo),
              };
            }
            return comment;
          });
        };

        const updatedComments = addReply(currentComments, replyingTo);

        return {
          ...prevComments,
          [markerName]: updatedComments,
        };
      } else {
        // Handle new comment
        return {
          ...prevComments,
          [markerName]: [...currentComments, commentData],
        };
      }
    });

    setNewComment("");
    setReplyingTo(null);
    setImageURL("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="comment-input-section">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
          className="comment-input"
        />
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={replyingTo !== null ? "Add a reply..." : "Add a comment"}
          className="comment-input"
        />
        <label htmlFor="image-upload" className="upload">
          Upload Media
        </label>
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          onChange={handleImageUpload}
          className="comment-image-upload"
        />
      </div>
      <button onClick={handleCommentSubmit} className="comment-submit-btn">
        {replyingTo !== null ? "Reply" : "Submit"}
      </button>
    </>
  );
};

export default CommentInputComponent;
