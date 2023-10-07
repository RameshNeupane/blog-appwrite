import {
    login,
    getAuthError,
    getAuthStatus,
    getIsUserLoggedIn,
} from "../store/authSlice";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const isUserLoggedIn = useSelector(getIsUserLoggedIn);
    const authError = useSelector(getAuthError);
    const authStatus = useSelector(getAuthStatus);

    const handleLogin = (data) => {
        dispatch(login(data));
        if (authStatus === "succeeded") {
            navigate("/");
        }
    };
    return (
        <div className="flex items-center justify-center w-full">
            <div
                className={`mx-auto w-full max-w-lg bg-purple-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-flex justify-center w-full max-w-[100px]">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary text-purple-800 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {/* {authError && (
                    <p className="text-red-600 mt-8 text-center">{authError}</p>
                )} */}
                <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="enter your email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                            value
                                        ) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full">
                            {authStatus === "loading"
                                ? "Signing in..."
                                : "Sign in"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
