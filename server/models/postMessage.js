import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  comments: [String],
  likeCount: {
    type: Number,
    default: 0,
  },
  dislikeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now, // This will store the timestamp in ISO 8601 format
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;

// import mongoose from "mongoose";

// const postSchema = mongoose.Schema({
//   title: String,
//   message: String,
//   creator: String,
//   tags: [String],
//   selectedFile: String,
//   comments: [String],
//   likeCount: {
//     type: Number,
//     default: 0,
//   },
//   dislikeCount: {
//     type: Number,
//     default: 0,
//   },
//   createdAt: {
//     type: String, // Change the type to String
//     default: new Date().toISOString(), // Use new Date().toISOString() to set the default value
//   },
// });

// const PostMessage = mongoose.model("PostMessage", postSchema);

// export default PostMessage;