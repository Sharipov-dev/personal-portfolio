'use client';
import { useState } from 'react';
import { getApiUrl } from '../../config/api';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [navData, setNavData] = useState({
        aboutMe: 'About Me',
        experience: 'Experience',
        projects: 'Projects',
        contact: 'Contact'
    });

    useState(() => {
        fetch(getApiUrl('/values/values.json'))
            .then(res => res.json())
            .then(data => setNavData(data.navigation))
            .catch(err => console.error('Failed to fetch navigation data:', err));
    });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 w-full bg-white text-black shadow-2xl py-4 z-50 min-h-[70px]">
            <div className="container-responsive">
                <div className="flex items-center justify-between">
                    <div 
                        className="text-xl font-bold cursor-pointer  transition-colors duration-200"
                        onClick={() => scrollToSection('home')}
                    >
                        Portfolio
                    </div>

                    <ul className="hidden md:flex flex-row gap-8 lg:gap-20 items-center justify-between font-bold tracking-wide text-base lg:text-lg">
                        <li 
                            className="cursor-pointer  transition-colors duration-200"
                            onClick={() => scrollToSection('home')}
                        >
                            {navData.aboutMe.toUpperCase()}
                        </li>
                        <li 
                            className="cursor-pointer  transition-colors duration-200"
                            onClick={() => scrollToSection('experience')}
                        >
                            {navData.experience.toUpperCase()}
                        </li>
                        <li 
                            className="cursor-pointer  transition-colors duration-200"
                            onClick={() => scrollToSection('projects')}
                        >
                            {navData.projects.toUpperCase()}
                        </li>
                        <li 
                            className="cursor-pointer  transition-colors duration-200"
                            onClick={() => scrollToSection('contact')}
                        >
                            {navData.contact.toUpperCase()}
                        </li>
                    </ul>

                    <button
                        onClick={toggleMenu}
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </button>
                </div>

                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4 pb-4 border-t border-gray-700`}>
                    <ul className="flex flex-col space-y-4 pt-4">
                        <li 
                            className="cursor-pointer  transition-colors duration-200 text-center"
                            onClick={() => scrollToSection('home')}
                        >
                            {navData.aboutMe.toUpperCase()}
                        </li>
                        <li 
                            className="cursor-pointer  transition-colors duration-200 text-center"
                            onClick={() => scrollToSection('experience')}
                        >
                            {navData.experience.toUpperCase()}
                        </li>
                        <li 
                            className="cursor-pointer  transition-colors duration-200 text-center"
                            onClick={() => scrollToSection('projects')}
                        >
                            {navData.projects.toUpperCase()}
                        </li>
                        <li 
                            className="cursor-pointer  transition-colors duration-200 text-center"
                            onClick={() => scrollToSection('contact')}
                        >
                            {navData.contact.toUpperCase()}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}