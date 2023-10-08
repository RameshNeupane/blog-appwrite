import logo from "../assets/logo.svg";

const Logo = ({ width = "70px", className = "" }) => {
    return (
        <img
            src={logo}
            alt="logo"
            width={width}
            className={`${className}`}
            title="blog-appwrite"
        ></img>
    );
};

export default Logo;
