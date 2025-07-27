'use client';
import Image from "next/image";
import ExperienceSection from "../(components)/ExperienceSection";
import ProjectsSection from "../(components)/ProjectsSection";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useEffect, useState } from "react";
import { getApiUrl } from "../config/api";

const HomePage = () => {
    const [greetingText, setGreetingText] = useState({
        greetingFirst: "Hello",
        greetingSecond: "I'm a developer",
        greetingThird: "Welcome to my portfolio",
        greetingFourth: "Let's build something amazing"
    });

    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.3);
    const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation(0.3);
    const { ref: experienceRef, isVisible: experienceVisible } = useScrollAnimation(0.2);
    const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation(0.2);

    useEffect(() => {
        fetch(getApiUrl('/values/values.json'))
            .then(res => res.json())
            .then(data => setGreetingText(data.aboutMeText))
            .catch(err => console.error('Failed to fetch greeting data:', err));
    }, []);
    
    return (
        <div className="w-full min-h-screen bg-white pt-24 sm:pt-28 md:pt-32 lg:pt-36 flex flex-col gap-12 sm:gap-16 md:gap-20">
            <section id="home" className="container-responsive">
                <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
                    <div 
                        ref={heroRef}
                        className={`fade-in ${heroVisible ? 'visible' : ''} flex flex-col items-start justify-start max-w-full lg:max-w-[540px] gap-4 sm:gap-6 order-2 lg:order-1`}
                    >
                        <h1 className={`fade-in ${heroVisible ? 'visible' : ''} font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight`}>
                            {greetingText.greetingFirst}
                        </h1>
                        <p className={`fade-in stagger-1 ${heroVisible ? 'visible' : ''} font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800`}>
                            {greetingText.greetingSecond}
                        </p>
                        <p className={`fade-in stagger-2 ${heroVisible ? 'visible' : ''} font-light text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600`}>
                            {greetingText.greetingThird}
                        </p>
                        <p className={`fade-in stagger-3 ${heroVisible ? 'visible' : ''} font-light text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600`}>
                            {greetingText.greetingFourth}
                        </p>
                    </div>
                    
                    <div 
                        ref={imageRef}
                        className={`fade-in ${imageVisible ? 'visible' : ''} order-1 lg:order-2 flex justify-center lg:justify-end`}
                    >
                        <div className="relative">
                            <Image 
                                src="/images/me.jpg" 
                                alt="me" 
                                width={330} 
                                height={440} 
                                className="rounded-3xl sm:rounded-[50px] lg:rounded-[87px] shadow-[0_0_40px_14px_rgba(0,0,0,0.1)] w-48 h-64 sm:w-64 sm:h-80 md:w-80 md:h-96 lg:w-[330px] lg:h-[440px] object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="experience" ref={experienceRef} className={`fade-in ${experienceVisible ? 'visible' : ''}`}>
                <ExperienceSection />
            </section>
            
            <section id="projects" ref={projectsRef} className={`fade-in ${projectsVisible ? 'visible' : ''}`}>
                <ProjectsSection/>
            </section>
            
            <section id="contact" className="container-responsive py-16 sm:py-20 md:py-24 lg:py-32">
                <div className="text-center">
                    <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8">
                        Get In Touch
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        I&apos;m always interested in new opportunities and exciting projects. Let&apos;s work together!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="mailto:arturka0505@gmail.com"
                            className="bg-black text-white px-8 py-3 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors duration-200"
                        >
                            Send Email
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/artur-sharipov-2105b0288/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors duration-200"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;