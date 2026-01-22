'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { getApiUrl } from "../config/api";
import PixelRoom from "../(components)/PixelRoom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[rgba(34,211,238,0.3)] to-[rgba(139,92,246,0.3)] backdrop-blur-xl border-2 border-[var(--accent-cyan)] flex items-center justify-center text-2xl transition-all duration-500 hover:scale-110 hover:rotate-12 cosmic-glow-border ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
            }`}
            aria-label="Back to top"
        >
            🚀
        </button>
    );
};

interface Experience {
    company: string;
    position: string;
    date: string;
    location: string;
    description: string;
}

interface GreetingText {
    greetingFirst: string;
    greetingSecond: string;
    greetingThird: string;
    greetingFourth: string;
}

interface ExperienceData {
    title: string;
    experience: Experience[];
}

const HomePage = () => {
    const [greetingText, setGreetingText] = useState<GreetingText>({
        greetingFirst: "Hello, I'm",
        greetingSecond: "Software developer with 1+ year of experience building web applications.",
        greetingThird: "I specialize in creating modern, scalable solutions using React, Next.js, Java, and cloud technologies.",
        greetingFourth: "Let's build something amazing together!"
    });
    const [experienceData, setExperienceData] = useState<ExperienceData>({
        title: "Experience",
        experience: []
    });

    const { ref: expRef, isVisible: expVisible } = useScrollAnimation(0.1);
    const { ref: projRef, isVisible: projVisible } = useScrollAnimation(0.1);
    const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation(0.1);

    useEffect(() => {
        fetch(getApiUrl('/values/values.json'))
            .then(res => res.json())
            .then(data => {
                setGreetingText(data.aboutMeText);
                setExperienceData(data.experienceText);
            })
            .catch(err => console.error('Failed to fetch data:', err));
    }, []);

    const projects = [
        {
            id: 1,
            title: "Personal Portfolio",
            description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features smooth animations, pixel art decorations, and mobile-first design.",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
            link: "#",
            github: "https://github.com/Sharipov-dev/personal-portfolio"
        },
        {
            id: 2,
            title: "Bank Microservices",
            description: "A comprehensive backend system simulating bank operations with 3 independent microservices: Account, Customer, and Transaction services.",
            technologies: ["Spring Boot", "Docker", "RabbitMQ", "Java", "PostgreSQL"],
            link: "https://github.com/Sharipov-dev/BankMicroservicesUpdated",
            github: "https://github.com/Sharipov-dev/BankMicroservicesUpdated"
        },
        {
            id: 3,
            title: "Investment Calculator",
            description: "An interactive investment calculator that computes future investment values based on interest rates, principal amounts, and time periods.",
            technologies: ["React", "JavaScript", "CSS"],
            link: "https://sharipov-dev.github.io/reactInvestmentCalculator/",
            github: "https://github.com/Sharipov-dev/reactInvestmentCalculator"
        }
    ];

    return (
        <div className="w-full min-h-screen relative">
            {/* Cosmic dust particles */}
            <div className="cosmic-dust-container">
                <div className="cosmic-dust cosmic-dust-1" />
                <div className="cosmic-dust cosmic-dust-2" />
                <div className="cosmic-dust cosmic-dust-3" />
            </div>

            {/* Hero Section with Pixel Room */}
            <section id="home">
                <PixelRoom greetingText={greetingText} />
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-20 md:py-32 relative">
                {/* Decorative bouncing planet sprite */}
                <div className="absolute top-20 right-10 opacity-40 hidden lg:block bounce-slow">
                    <Image
                        src="/images/pixelImage/bookshelve.png"
                        alt=""
                        width={100}
                        height={130}
                        className="pixel-sprite"
                    />
                </div>

                <div className="container-responsive">
                    <div
                        ref={expRef}
                        className={`fade-in ${expVisible ? 'visible' : ''}`}
                    >
                        <div className="text-center mb-16">
                            <span className="text-[var(--accent-primary)] font-medium text-sm tracking-wide uppercase mb-4 block">
                                Career Journey
                            </span>
                            <h2 className="heading-lg text-[var(--text-primary)]">
                                Work Experience
                            </h2>
                        </div>

                        <div className="max-w-3xl mx-auto space-y-8">
                            {experienceData.experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className={`timeline-item fade-in stagger-${index + 1} ${expVisible ? 'visible' : ''}`}
                                >
                                    <div className="experience-card">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                                            <div>
                                                <h3 className="heading-md text-[var(--text-primary)] mb-1">
                                                    {exp.company}
                                                </h3>
                                                <p className="text-[var(--accent-primary)] font-medium">
                                                    {exp.position}
                                                </p>
                                            </div>
                                            <div className="md:text-right">
                                                <p className="text-sm text-[var(--text-muted)]">
                                                    {exp.date}
                                                </p>
                                                <p className="text-sm text-[var(--text-secondary)]">
                                                    {exp.location}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-body leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Divider */}
            <div className="section-divider mx-auto max-w-4xl" />

            {/* Projects Section */}
            <section id="projects" className="py-20 md:py-32 relative">
                {/* Decorative bouncing planet sprites */}
                <div className="absolute top-24 left-10 opacity-35 hidden lg:block bounce-medium">
                    <Image
                        src="/images/pixelImage/table.png"
                        alt=""
                        width={120}
                        height={80}
                        className="pixel-sprite"
                    />
                </div>
                <div className="absolute bottom-24 right-10 opacity-35 hidden lg:block bounce-fast">
                    <Image
                        src="/images/pixelImage/shelve.png"
                        alt=""
                        width={80}
                        height={100}
                        className="pixel-sprite"
                    />
                </div>

                <div className="container-responsive">
                    <div
                        ref={projRef}
                        className={`fade-in ${projVisible ? 'visible' : ''}`}
                    >
                        <div className="text-center mb-16">
                            <span className="text-[var(--accent-primary)] font-medium text-sm tracking-wide uppercase mb-4 block">
                                Featured Work
                            </span>
                            <h2 className="heading-lg text-[var(--text-primary)] mb-4">
                                Projects
                            </h2>
                            <p className="text-body max-w-2xl mx-auto">
                                A collection of projects that showcase my skills and passion for building great software.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className={`modern-card p-6 flex flex-col fade-in stagger-${index + 1} ${projVisible ? 'visible' : ''}`}
                                >
                                    {/* Project header with gradient */}
                                    <div className="h-32 rounded-lg mb-6 flex items-center justify-center bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] relative overflow-hidden">
                                        <span className="text-white font-semibold text-lg z-10">
                                            {project.title}
                                        </span>
                                        <div className="absolute inset-0 opacity-20">
                                            <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full blur-xl" />
                                            <div className="absolute bottom-2 left-2 w-6 h-6 bg-white rounded-full blur-lg" />
                                        </div>
                                    </div>

                                    <h3 className="heading-md text-[var(--text-primary)] mb-3">
                                        {project.title}
                                    </h3>

                                    <p className="text-body text-sm mb-4 flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="tech-tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-3 mt-auto">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-primary flex-1 text-center text-sm py-3"
                                        >
                                            View Project
                                        </a>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-secondary flex-1 text-center text-sm py-3"
                                        >
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Divider */}
            <div className="section-divider mx-auto max-w-4xl" />

            {/* Contact Section */}
            <section id="contact" className="py-20 md:py-32 relative">
                {/* Decorative bouncing planet sprites */}
                <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-35 hidden lg:block bounce-slow">
                    <Image
                        src="/images/pixelImage/bed.png"
                        alt=""
                        width={100}
                        height={60}
                        className="pixel-sprite"
                    />
                </div>
                <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-35 hidden lg:block bounce-medium">
                    <Image
                        src="/images/pixelImage/painting.png"
                        alt=""
                        width={60}
                        height={75}
                        className="pixel-sprite"
                    />
                </div>

                <div className="container-responsive">
                    <div
                        ref={contactRef}
                        className={`fade-in ${contactVisible ? 'visible' : ''}`}
                    >
                        <div className="max-w-2xl mx-auto">
                            <div className="glass-card p-8 md:p-12 text-center">
                                <span className="text-[var(--accent-primary)] font-medium text-sm tracking-wide uppercase mb-4 block">
                                    Let&apos;s Connect
                                </span>
                                <h2 className="heading-lg text-[var(--text-primary)] mb-6">
                                    Get In Touch
                                </h2>
                                <p className="text-body-lg mb-8">
                                    I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                                    <a
                                        href="mailto:arturka0505@gmail.com"
                                        className="btn-primary"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Send Email
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/artur-sharipov-2105b0288/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                        LinkedIn
                                    </a>
                                </div>

                                <div className="text-[var(--text-muted)] text-sm">
                                    arturka0505@gmail.com
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t-2 border-[rgba(34,211,238,0.2)] relative">
                {/* Footer background glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(34,211,238,0.05)] to-transparent pointer-events-none" />
                
                <div className="container-responsive relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-sm text-[var(--text-secondary)] cosmic-glow">
                            &copy; 2025 Arthur Sharipov. Built with Next.js & cosmic energy.
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="bounce-fast opacity-70">
                                <Image
                                    src="/images/pixelImage/painting.png"
                                    alt=""
                                    width={28}
                                    height={35}
                                    className="pixel-sprite"
                                />
                            </div>
                            <span className="text-xs text-[var(--accent-cyan)] font-medium">
                                Crafted in the cosmos
                            </span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back to Top Button */}
            <BackToTopButton />
        </div>
    );
};

export default HomePage;
