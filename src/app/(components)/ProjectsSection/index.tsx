'use client';
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation(0.2);
    
    return (
        <div 
            ref={cardRef}
            className={`fade-in ${cardVisible ? 'visible' : ''} bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full`}
        >
            <div className="relative h-48 sm:h-56 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                        {project.title}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl sm:text-2xl mb-3 text-gray-900">
                    {project.title}
                </h3>
                
                <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed flex-grow">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech: string, techIndex: number) => (
                        <span 
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full font-medium"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex gap-3 mt-auto">
                    <a 
                        href={project.link}
                        target="_blank"
                        className="flex-1 bg-black text-white text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                    >
                        View Project
                    </a>
                    <a 
                        href={project.github}
                        target="_blank"
                        className="flex-1 border border-gray-300 text-gray-700 text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};

const ProjectsSection = () => {
    const projects = [
        {
            id: 1,
            title: "Personal Portfolio",
            description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features smooth animations and mobile-first design.",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
            image: "/images/portfolio.jpg",
            link: "#",
            github: "https://github.com/Sharipov-dev/personal-portfolio"
        },
        {
            id: 2,
            title: "Bank Microservices",
            description: "A backend application that simulates a bank's operations. It includes 3 independent services: Account Service, Customer Service and .",
            technologies: ["Sprint Boot", "Docker", "RabbitMQ", "Java", "PostgreSQL"],
            image: "/images/ecommerce.jpg",
            link: "https://github.com/Sharipov-dev/BankMicroservicesUpdated",
            github: "https://github.com/Sharipov-dev/BankMicroservicesUpdated"
        },
        {
            id: 3,
            title: "Investment Calculator",
            description: "A simple investment calculator that takes an interest rate and a principal amount and calculates the future value of the investment.",
            technologies: ["React", "JavaScript"],
            image: "/images/taskapp.jpg",
            link: "https://sharipov-dev.github.io/reactInvestmentCalculator/",
            github: "https://github.com/Sharipov-dev/reactInvestmentCalculator"
        }
    ];

    const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.3);
    const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation(0.2);

    return (
        <div className="flex flex-col items-center justify-center w-full py-16 sm:py-20 md:py-24 lg:py-32">
            <div className="container-responsive">
                <div 
                    ref={titleRef}
                    className={`fade-in ${titleVisible ? 'visible' : ''} text-center mb-12 sm:mb-16`}
                >
                    <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
                        Projects
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                        Here are some of the projects I&apos;ve worked on. Each one represents a unique challenge and learning experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsSection;