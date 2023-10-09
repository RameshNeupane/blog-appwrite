import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Footer, Header } from "./components";
import { currentUser, getIsUserLoggedIn } from "./store/authSlice";
import { fetchAllPosts } from "./store/postsSlice";

const App = () => {
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector(getIsUserLoggedIn);

    useEffect(() => {
        const fetchAll = async () => {
            if (!isUserLoggedIn) {
                await dispatch(currentUser());
            } else {
                await dispatch(fetchAllPosts());
            }
        };
        fetchAll();
    }, [dispatch, isUserLoggedIn]);

    return (
        <div className="min-w-screen min-h-screen flex flex-col justify-between">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default App;
