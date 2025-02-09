import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleFileChange = (base64) => {
    setPostData({ ...postData, selectedFile: base64 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post.title}"` : "Creating a Memory"}
        </Typography>
        <TextField
          name="creator"
          variant="filled"
          label="Creator"
          fullWidth
          focused
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="filled"
          label="Title"
          fullWidth
          focused
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="filled"
          label="Message"
          fullWidth
          multiline
          focused
          minRows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="filled"
          label="Tags (comma separated)"
          fullWidth
          focused
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <Button
            variant="outlined"
            color="default"
            size="large"
            component="label"
            fullWidth
            startIcon={<AddAPhotoOutlinedIcon />}
          >
            Add an image
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    handleFileChange(reader.result);
                  };
                }
              }}
            />
          </Button>
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          startIcon={<PostAddOutlinedIcon />}
        >
          Post a memory
        </Button>

        <Button
          variant="contained"
          size="small"
          onClick={clear}
          startIcon={<ClearOutlinedIcon />}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
