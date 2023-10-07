import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIsUserLoggedIn } from "../store/authSlice";

const AuthLayout = ({ children, authentication = true }) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const isUserLoggedIn = useSelector(getIsUserLoggedIn);

    useEffect(() => {
        setLoader(true);
        if (authentication && isUserLoggedIn !== authentication) {
            navigate("/login");
        } else if (!authentication && isUserLoggedIn !== authentication) {
            navigate("/");
        }
        setLoader(false);
    }, [isUserLoggedIn, navigate, authentication]);

    return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default AuthLayout;
