import React from "react";
import "../styles/CommentDisplay.css";

const CommentListComponent = ({
  markerName,
  markerComments,
  setMarkerComments,
  setReplyingTo,
}) => {
  const handleLike = (commentIndex, replyIndex = null) => {
    setMarkerComments((prevComments) => {
      const currentComments = prevComments[markerName] || [];

      const updateLikes = (comments, index, isReply, replyIndex = null) => {
        return comments.map((comment, i) => {
          if (i === index) {
            if (isReply && replyIndex !== null) {
              const updatedReplies = comment.replies.map((reply, j) => {
                if (j === replyIndex) {
                  return { ...reply, likes: reply.likes + 1 };
                }
                return reply;
              });
              return { ...comment, replies: updatedReplies };
            } else {
              return { ...comment, likes: comment.likes + 1 };
            }
          } else if (comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateLikes(comment.replies, index, isReply, replyIndex),
            };
          }
          return comment;
        });
      };

      const updatedComments = updateLikes(
        currentComments,
        commentIndex,
        replyIndex !== null,
        replyIndex
      );

      return { ...prevComments, [markerName]: updatedComments };
    });
  };

  const renderComments = (comments, depth = 0) => {
    return comments.map((comment, index) => (
      <li key={index} style={{ marginLeft: depth * 20 + "px" }}>
        <div className="comment-content">
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
          {comment.image && (
            <img
              src={comment.image}
              alt="uploaded"
              className="uploaded-image"
            />
          )}
          <div className="comment-actions">
            <span onClick={() => handleLike(index)}>{comment.likes} likes</span>
            <span>·</span>
            <span onClick={() => setReplyingTo(comment)}>Reply</span>
            <span>·</span>
            <span>{comment.time}</span>
          </div>
          <ul className="replies-list">
            {renderComments(comment.replies, depth + 1)}
          </ul>
        </div>
      </li>
    ));
  };

  return (
    <div className="comments-section">
      <h3>Comments...</h3>
      <ul className="comments-list">
        {renderComments(markerComments[markerName] || [])}
      </ul>
    </div>
  );
};

export default CommentListComponent;
