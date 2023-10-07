import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Footer, Header } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts, resetPosts } from "./store/postsSlice";
import { currentUser, getIsUserLoggedIn } from "./store/authSlice";

const App = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const isUserLoggedIn = useSelector(getIsUserLoggedIn);

    useEffect(() => {
        dispatch(currentUser());
    }, [dispatch]);

    useEffect(() => {
        if (isUserLoggedIn) {
            dispatch(fetchAllPosts());
        } else {
            // reset posts
            dispatch(resetPosts());
        }
    }, [dispatch, isUserLoggedIn]);

    return (
        <div className="min-w-screen min-h-screen flex flex-col justify-between">
            <Header />
            <main>
                {isLoading ? (
                    <div className="text-center text-xl font-medium">
                        Loading...
                    </div>
                ) : (
                    <Outlet />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default App;
