import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        authService
            .logout()
            .then(() => {
                dispatch(logout());
            })
            .then(() => {
                navigate("/");
            });
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
