import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { likePost, deletePost, dislikePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);

  useEffect(() => {
    const likeState = sessionStorage.getItem(`likeClicked_${post._id}`);
    setLikeClicked(likeState === "true");

    const dislikeState = sessionStorage.getItem(`dislikeClicked_${post._id}`);
    setDislikeClicked(dislikeState === "true");

    const deleteState = sessionStorage.getItem(`deleteClicked_${post._id}`);
    setDeleteClicked(deleteState === "true");
  }, [post._id]);

  const handleLikeClick = () => {
    if (!likeClicked) {
      dispatch(likePost(post._id));
      setLikeClicked(true);
      sessionStorage.setItem(`likeClicked_${post._id}`, "true");
    }
  };

  const handleDislikeClick = () => {
    if (!dislikeClicked) {
      dispatch(dislikePost(post._id));
      setDislikeClicked(true);
      sessionStorage.setItem(`dislikeClicked_${post._id}`, "true");
    }
  };

  const handleDeleteClick = () => {
    if (!deleteClicked) {
      dispatch(deletePost(post._id));
      setDeleteClicked(true);
      sessionStorage.setItem(`deleteClicked_${post._id}`, "true");
    }
  };
  const classes = useStyles();
  const theme = createTheme({
    palette: {
      background: {
        paper: "##ECECEC",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.creator}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon />
          </Button>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>

        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={handleLikeClick}
            disabled={likeClicked}
          >
            <ThumbUpAltIcon fontSize="small" /> Like {post.likeCount}
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={handleDislikeClick}
            disabled={dislikeClicked}
          >
            <ThumbDownAltIcon fontSize="small" /> Dislike {post.dislikeCount}
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={handleDeleteClick}
            disabled={deleteClicked}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default Post;
