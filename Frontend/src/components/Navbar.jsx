import { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/profiles", label: "Profiles" },
        { to: "/login", label: "Login" }
    ];

    return (
        <nav className="bg-blue-500 fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link 
                    to="/" 
                    className="text-white text-2xl font-bold hover:text-gray-300 transition-colors duration-300"
                >
                    FindOnMap
                </Link>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button 
                        onClick={toggleMenu} 
                        className="text-white focus:outline-none"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="text-gray-300 hover:text-white transition-colors duration-300 hover:bg-gray-700 px-3 py-2 rounded-md"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Dropdown Menu */}
                {isOpen && (
                    <div className="absolute top-full left-0 w-full bg-gray-900 md:hidden">
                        <div className="flex flex-col items-center py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="text-white w-full text-center py-3 hover:bg-gray-700 transition-colors duration-300"
                                    onClick={toggleMenu}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;