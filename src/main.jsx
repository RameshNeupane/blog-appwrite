import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { AuthLayout } from "./components";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import {
    AddPost,
    AllPosts,
    EditPost,
    Home,
    Login,
    Post,
    Signup,
} from "./pages";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route
                path="login"
                element={
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                }
            />
            <Route
                path="signup"
                element={
                    <AuthLayout authentication={false}>
                        <Signup />
                    </AuthLayout>
                }
            />
            <Route
                path="all-posts"
                element={
                    <AuthLayout authentication={true}>
                        <AllPosts />
                    </AuthLayout>
                }
            />
            <Route
                path="add-post"
                element={
                    <AuthLayout authentication={true}>
                        <AddPost />
                    </AuthLayout>
                }
            />
            <Route
                path="edit-post/:slug"
                element={
                    <AuthLayout authentication={true}>
                        <EditPost />
                    </AuthLayout>
                }
            />
            <Route path="post/:slug" element={<Post />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
