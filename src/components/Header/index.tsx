import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="fixed top-4  left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-between w-[90%] max-w-5xl p-4 bg-black shadow-md rounded-full">
            <img src="/src/assets/logo-white.svg" alt="Logo" className="w-[100px] h-[50px]" />
            <nav className="flex items-center justify-center">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="hover:text-blue-600">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-blue-600">
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
