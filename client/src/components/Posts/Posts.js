import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    // Sort the posts array in descending order by createdAt
    const sortedPosts = [...posts].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        console.log(dateA);
        console.log(dateB);
        console.log(dateB - dateA);
        return dateB - dateA;
    });

    return (
        !sortedPosts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {sortedPosts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;


// import React from "react";
// import { Grid, CircularProgress } from "@material-ui/core";
// import { useSelector } from "react-redux";

// import Post from "./Post/Post";
// import useStyles from './styles';

// const Posts = ({ setCurrentId }) => {
//     const posts = useSelector((state) => state.posts);
//     const classes = useStyles();

//     // Sort the posts array in descending order by createdAt
//     const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//     return (
//         !sortedPosts.length ? <CircularProgress /> : (
//             <Grid className={classes.container} container alignItems="stretch" spacing={3}>
//                 {sortedPosts.map((post) => (
//                     <Grid key={post._id} item xs={12} sm={6}>
//                         <Post post={post} setCurrentId={setCurrentId} />
//                     </Grid>
//                 ))}
//             </Grid>
//         )
//     );
// }

// export default Posts;
