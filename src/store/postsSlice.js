import service from "../appwrite/service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    posts: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// add new post
export const addNewPost = createAsyncThunk("posts/addNewPost", async () => {});

// fetch all posts
export const fetchAllPosts = createAsyncThunk(
    "posts/fetchAllPosts",
    async () => {
        const response = await service.getPosts();
        return response.documents;
    }
);

// posts slice
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        resetPosts: (state) => {
            state.posts = [];
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload;
                state.error = null;
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const getAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { resetPosts } = postsSlice.actions;

export default postsSlice.reducer;
