import logo from "../assets/logo.svg";

const Logo = ({ width = "70px", className = "" }) => {
    return (
        <img
            src={logo}
            alt="logo"
            width={width}
            className={`${className}`}
        ></img>
    );
};

export default Logo;
