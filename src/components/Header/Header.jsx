import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status);

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
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
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
