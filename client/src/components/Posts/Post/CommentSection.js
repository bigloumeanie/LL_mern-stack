import React, { useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div>
      <TextField
        id="comment-input"
        label="Add a Comment"
        variant="outlined"
        fullWidth
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button variant="contained" size="small" onClick={handleCommentSubmit}>
        Submit
      </Button>

      <div>
        {comments.map((comment, index) => (
          <Typography key={index} variant="body2">
            {comment}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
