import {
    signup,
    getAuthStatus,
    getSignupError,
    resetSignupError,
    getIsUserLoggedIn,
} from "../store/authSlice";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signupError = useSelector(getSignupError);
    const authStatus = useSelector(getAuthStatus);
    const isUserLoggedIn = useSelector(getIsUserLoggedIn);
    const { register, handleSubmit } = useForm();

    const handleSignup = async (data) => {
        await dispatch(resetSignupError());
        await dispatch(signup(data));
        if (isUserLoggedIn) {
            navigate("/");
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`mx-auto w-full max-w-lg bg-purple-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-flex justify-center w-full max-w-[100px]">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary text-purple-800 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {signupError && (
                    <p className="text-red-600 mt-8 text-center">{signup}</p>
                )}
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
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
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            disabled={authStatus === "loading"}
                            type="submit"
                            className="w-full hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400"
                        >
                            {authStatus === "loading"
                                ? "Signing up..."
                                : "Create Account"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
