'use client';
import { useState, useEffect } from 'react';
import { getApiUrl } from '../../config/api';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [navData, setNavData] = useState({
        aboutMe: 'About',
        experience: 'Experience',
        projects: 'Projects',
        contact: 'Contact'
    });

    useEffect(() => {
        fetch(getApiUrl('/values/values.json'))
            .then(res => res.json())
            .then(data => setNavData(data.navigation))
            .catch(err => console.error('Failed to fetch navigation data:', err));

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
            isScrolled ? 'nav-space py-3' : 'bg-transparent py-5'
        }`}>
            <div className="container-responsive">
                <div className="flex items-center justify-between">
                    {/* Logo with cosmic effect */}
                    <div
                        className="cursor-pointer group"
                        onClick={() => scrollToSection('home')}
                    >
                        <span className="font-bold text-xl text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors cosmic-glow">
                            Arthur
                        </span>
                        <span className="text-[var(--accent-cyan)] text-2xl">.</span>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex flex-row gap-1 items-center">
                        <li>
                            <button
                                className="nav-link"
                                onClick={() => scrollToSection('home')}
                            >
                                Home
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-link"
                                onClick={() => scrollToSection('experience')}
                            >
                                {navData.experience}
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-link"
                                onClick={() => scrollToSection('projects')}
                            >
                                {navData.projects}
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-link"
                                onClick={() => scrollToSection('contact')}
                            >
                                {navData.contact}
                            </button>
                        </li>
                    </ul>

                    {/* CTA Button - Desktop */}
                    <a
                        href="https://road-track-landing.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex btn-primary-space text-sm py-2 px-5"
                    >
                        Try My Product
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden transition-all duration-300 overflow-hidden ${
                    isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}>
                    <div className="glass-card p-6">
                        <ul className="flex flex-col space-y-2">
                            <li>
                                <button
                                    className="nav-link w-full text-left"
                                    onClick={() => scrollToSection('home')}
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    className="nav-link w-full text-left"
                                    onClick={() => scrollToSection('experience')}
                                >
                                    {navData.experience}
                                </button>
                            </li>
                            <li>
                                <button
                                    className="nav-link w-full text-left"
                                    onClick={() => scrollToSection('projects')}
                                >
                                    {navData.projects}
                                </button>
                            </li>
                            <li>
                                <button
                                    className="nav-link w-full text-left"
                                    onClick={() => scrollToSection('contact')}
                                >
                                    {navData.contact}
                                </button>
                            </li>
                            <li className="pt-4">
                                <a
                                    href="https://road-track-landing.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary-space w-full text-center"
                                >
                                    Try My Product
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
