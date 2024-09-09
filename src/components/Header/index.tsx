import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <motion.div
            className="box"
            animate={{
                scale: [0, 1],
                borderRadius: ["0%", "0%", "50%", "50%", "0%"],
            }}
            transition={{
                duration: 1,
                ease: "linear",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: 0,
                repeatDelay: 1,
            }}
        >
            <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-between w-full max-w-7xl p-4 bg-black shadow-md rounded-full">
                <div className="flex items-center gap-2">
                    <img src="/src/assets/logo-white.svg" alt="Logo" className="w-[50px] h-[50px]" />
                    <p className="font-bold text-white">REMOVE IT EASY</p>
                </div>
                <nav className="flex items-center justify-center mx-4">
                    <ul className="flex space-x-8 text-white">
                        <li>
                            <Link to="/" className={`pb-1 ${isActive("/") ? "border-b-2 border-white" : ""}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className={`pb-1 ${isActive("/contact") ? "border-b-2 border-white" : ""}`}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </motion.div>
    );
};

export default Header;
