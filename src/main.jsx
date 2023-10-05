import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
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
import { AuthLayout } from "./components";

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
