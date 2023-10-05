import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";

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

    if (isLoading) return <div>Loading...</div>;
    return (
        <div>
            <Header />
            <main>{/* <Outlet></Outlet> */}</main>
            {/* <Footer /> */}
        </div>
    );
};

export default App;
