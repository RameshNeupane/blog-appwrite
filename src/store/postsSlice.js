import service from "../appwrite/service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    posts: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: "",
};

// add new post
export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    async ({ data, userId }) => {
        console.log(data, userId);
        const file = await service.uploadFile(data.image[0]);

        if (file) {
            const fileId = file.$id;
            data.featuredImage = fileId;
            data.userId = userId;
            const newPost = await service.createPost({
                ...data,
            });
            if (newPost) return newPost;
        }
    }
);

// update post
export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async ({ post, data }) => {
        // handle file i.e. image file
        const file = data.image[0]
            ? await service.uploadFile(data.image[0])
            : null;

        // delete old image after new image is uploaded successfully
        if (file) {
            await service.deleteFile(post.featuredImage);
        }

        // now update post
        const updatedPost = await service.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined,
        });
        if (updatePost) {
            return updatedPost;
        } else {
            return post;
        }
    }
);

// fetch all posts
export const fetchAllPosts = createAsyncThunk(
    "posts/fetchAllPosts",
    async () => {
        const response = await service.getPosts();
        return response.documents;
    }
);

// delete post
export const deletePost = createAsyncThunk("posts/deletePost", async (post) => {
    const response = await service.deletePost(post.$id);
    if (response) {
        const responseDeleteFile = await service.deleteFile(post.featuredImage);
        if (responseDeleteFile) {
            return post;
        }
    }
});

// posts slice
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        resetPosts: (state) => {
            state.posts = [];
            state.status = "idle";
            state.error = "";
        },
        resetPostsStatus: (state) => {
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            // addNewPost
            .addCase(addNewPost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = "";
                state.posts = [...state.posts, action.payload];
            })
            .addCase(addNewPost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // fetchAllPosts
            .addCase(fetchAllPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload;
                state.error = "";
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // updatePost
            .addCase(updatePost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = "";
                const { $id } = action.payload;
                const posts = state.posts.filter((post) => post.$id !== $id);
                state.posts = [...posts, action.payload];
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // deletePost
            .addCase(deletePost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = "";
                const { $id } = action.payload;
                const posts = state.posts.filter((post) => post.$id !== $id);
                state.posts = [...posts];
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const getAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getSinglePostById = (state, postId) =>
    state.posts.posts.find((post) => post.$id === postId);

export const { resetPosts, resetPostsStatus } = postsSlice.actions;

export default postsSlice.reducer;
