import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthStatus, logout } from "../../store/authSlice";

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authStatus = useSelector(getAuthStatus);

    const logoutHandler = () => {
        dispatch(logout());
        if (authStatus === "succeeded") {
            navigate("/");
        }
    };
    return (
        <button
            className="h-full px-4 flex justify-center items-center hover:bg-purple-300 transition-colors duration-200 ease-in"
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
};

export default LogoutBtn;
