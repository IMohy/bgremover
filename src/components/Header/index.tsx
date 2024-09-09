import { Link, useLocation } from "react-router-dom";
import Paragraph from "../Paragraph";
import headerData from "./data";

const Header = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="box">
            <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-between w-full max-w-7xl p-4 bg-black shadow-md rounded-full">
                <div className="flex items-center gap-2">
                    <img src="/logo-white.svg" alt="Logo" className="w-[50px] h-[50px]" />
                    <Paragraph text="Remove It Easy" className="text-white font-bold" />
                </div>
                <nav className="flex items-center justify-center mx-4">
                    <ul className="flex space-x-8 text-white">
                        {headerData.map((item) => (
                            <li key={item.id}>
                                <Link to={item.link} className={`pb-1 ${isActive(item.link) ? "border-b-2 border-white" : ""}`}>
                                    <Paragraph
                                        text={item.title}
                                        className={`font-bold ${isActive(item.link) ? "text-white border-b-2 border-white" : "text-gray-300"
                                            }`}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;
