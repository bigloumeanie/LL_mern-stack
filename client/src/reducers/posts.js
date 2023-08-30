import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  DISLIKE,
  UPDATE_POST_WITH_COMMENT,
} from "../constants/actionTypes";

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DISLIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case UPDATE_POST_WITH_COMMENT:
      const { postId, comment } = action.payload;
      return posts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      );
    default:
      return posts;
  }
};
