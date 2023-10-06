import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Footer, Header } from "./components";
import { login, logout } from "./store/authSlice";

const App = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setIsLoading(false));
    }, [dispatch]);

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
