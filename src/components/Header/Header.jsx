import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Container, Logo, Avatar } from "../index";
import { getIsUserLoggedIn } from "../../store/authSlice";

const Header = () => {
    const isUserLoggedIn = useSelector(getIsUserLoggedIn);

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !isUserLoggedIn,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !isUserLoggedIn,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: isUserLoggedIn,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: isUserLoggedIn,
        },
    ];

    return (
        <header className="shadow bg-purple-500 h-20">
            <Container>
                <nav className="flex h-full">
                    <div className="mr-4 h-full flex items-center justify-center">
                        <Link to="/">
                            <Logo
                                width="70px"
                                className=" p-2 rounded hover:bg-purple-300 transition-colors duration-200 ease-in"
                            />
                        </Link>
                    </div>
                    <ul className=" relative flex ml-auto gap-4 text-lg">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.slug}
                                        className={({ isActive }) =>
                                            `h-full px-4 flex justify-center items-center hover:bg-purple-300 transition-colors duration-200 ease-in
                                            ${
                                                isActive
                                                    ? "bg-purple-300 font-medium text-purple-950"
                                                    : ""
                                            }
                                            `
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ) : null
                        )}
                        {isUserLoggedIn && (
                            <li className=" flex items-center">
                                <Avatar />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
