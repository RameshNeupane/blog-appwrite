import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthStatus, getUserData, logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Avatar = () => {
    const navigate = useNavigate("");
    const dispatch = useDispatch();
    const userData = useSelector(getUserData);
    const authStatus = useSelector(getAuthStatus);

    const handleLogout = async () => {
        await dispatch(logout());
        navigate("/");
    };

    return (
        <Menu as="div" className="group relative z-50">
            <Menu.Button
                className="flex justify-center items-center rounded-full border-4 border-white group-hover:border-purple-300 transition-colors duration-200 ease-in"
                title="Menu"
            >
                <img
                    src={userData.avatar}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="bg-white rounded-full"
                />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-max origin-top-right px-4 py-3 bg-purple-300 border-2 border-black/10  rounded-md flex flex-col gap-2">
                    <Menu.Item>
                        {() => (
                            <div className="flex flex-col">
                                <span className="inline-block font-normal truncate text-normal">
                                    {userData.name}
                                </span>
                                <span className="inline-block font-normal truncate text-normal">
                                    {userData.email}
                                </span>
                            </div>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                disabled={authStatus === "loading"}
                                onClick={handleLogout}
                                className={`w-full p-2 border border-purple-500 rounded-md text-b2 disabled:cursor-not-allowed ${
                                    active && "bg-purple-500"
                                }`}
                            >
                                Sign out
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Avatar;
