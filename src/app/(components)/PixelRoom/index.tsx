'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface PixelRoomProps {
    greetingText: {
        greetingFirst: string;
        greetingSecond: string;
        greetingThird: string;
        greetingFourth: string;
    };
}

interface Star {
    id: number;
    left: string;
    top: string;
    size: number;
    delay: string;
    duration: string;
}

interface Planet {
    id: number;
    src: string;
    position: {
        top: string;
        left?: string;
        right?: string;
    };
    size: string;
    bounceClass: string;
}

const PixelRoom = ({ greetingText }: PixelRoomProps) => {
    const [stars, setStars] = useState<Star[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const sectionRef = useRef<HTMLElement>(null);

    // Define planets
    const planets: Planet[] = [
        {
            id: 1,
            src: '/images/pixelImage/bed.png',
            position: { top: '15%', left: '8%' },
            size: 'w-32 md:w-40 lg:w-48',
            bounceClass: 'bounce-slow'
        },
        {
            id: 2,
            src: '/images/pixelImage/bookshelve.png',
            position: { top: '25%', right: '5%' },
            size: 'w-28 md:w-36 lg:w-44',
            bounceClass: 'bounce-medium'
        },
        {
            id: 3,
            src: '/images/pixelImage/shelve.png',
            position: { top: '55%', left: '5%' },
            size: 'w-24 md:w-32 lg:w-36',
            bounceClass: 'bounce-fast'
        },
        {
            id: 4,
            src: '/images/pixelImage/table.png',
            position: { top: '65%', right: '8%' },
            size: 'w-28 md:w-36 lg:w-40',
            bounceClass: 'bounce-medium'
        },
        {
            id: 5,
            src: '/images/pixelImage/painting.png',
            position: { top: '80%', left: '15%' },
            size: 'w-20 md:w-24 lg:w-28',
            bounceClass: 'bounce-fast'
        }
    ];

    useEffect(() => {
        // Generate stars
        const newStars: Star[] = Array.from({ length: 150 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() > 0.7 ? 2 : 1,
            delay: `${Math.random() * 5}s`,
            duration: `${2 + Math.random() * 3}s`,
        }));
        setStars(newStars);
        setIsLoaded(true);
    }, []);

    // Parallax effect - mouse
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (sectionRef.current) {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                setMousePosition({
                    x: (clientX / innerWidth - 0.5) * 50,
                    y: (clientY / innerHeight - 0.5) * 50,
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section ref={sectionRef} className="space-scene min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
            {/* Deep space background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#0a0520] to-[#030014] pointer-events-none" />
            
            {/* Nebula clouds */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="nebula nebula-purple" 
                     style={{ 
                         transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)` 
                     }} 
                />
                <div className="nebula nebula-blue" 
                     style={{ 
                         transform: `translate(${-mousePosition.x * 0.2}px, ${-mousePosition.y * 0.2}px)` 
                     }} 
                />
                <div className="nebula nebula-pink" 
                     style={{ 
                         transform: `translate(${mousePosition.x * 0.4}px, ${-mousePosition.y * 0.3}px)` 
                     }} 
                />
            </div>

            {/* Twinkling stars */}
            <div className="absolute inset-0 pointer-events-none">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="star"
                        style={{
                            left: star.left,
                            top: star.top,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            animationDelay: star.delay,
                            animationDuration: star.duration,
                        }}
                    />
                ))}
            </div>

            {/* Bouncing Planets */}
            <div className="absolute inset-0 overflow-hidden">
                {planets.map((planet) => (
                    <div
                        key={planet.id}
                        className={`absolute ${planet.bounceClass} pointer-events-none`}
                        style={{
                            ...planet.position,
                        }}
                    >
                        <Image
                            src={planet.src}
                            alt="Planet"
                            width={200}
                            height={200}
                            className={`pixel-sprite ${planet.size} h-auto`}
                        />
                    </div>
                ))}
            </div>

            {/* Main content */}
            <div className="container-responsive relative z-10">
                <div className={`flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    {/* Text content */}
                    <div className="flex-1 text-center lg:text-left max-w-2xl">
                        <div className="mb-6">
                            <span className="text-[var(--accent-cyan)] font-medium text-sm md:text-base tracking-wide uppercase cosmic-glow">
                                Welcome to my cosmic space
                            </span>
                        </div>

                        <h1 className="heading-xl mb-6">
                            <span className="text-[var(--text-primary)]">{greetingText.greetingFirst}</span>
                            <br />
                            <span className="gradient-text-space">Arthur Sharipov</span>
                        </h1>

                        <p className="text-body-lg mb-4">
                            {greetingText.greetingSecond}
                        </p>

                        <p className="text-body mb-8 max-w-lg mx-auto lg:mx-0">
                            {greetingText.greetingThird}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button
                                onClick={() => scrollToSection('projects')}
                                className="btn-primary-space"
                            >
                                <span className="relative z-10">Explore My Universe</span>
                            </button>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="btn-secondary-space"
                            >
                                <span className="relative z-10">Connect</span>
                            </button>
                        </div>
                    </div>

                    {/* Photo with space frame */}
                    <div className="relative flex-shrink-0">
                        {/* Cosmic rings around photo */}
                        <div className="cosmic-ring-1" />
                        <div className="cosmic-ring-2" />
                        <div className="cosmic-ring-3" />

                        {/* Photo frame */}
                        <div className="photo-frame-space relative z-10">
                            <Image
                                src="/images/me.jpg"
                                alt="Arthur Sharipov"
                                width={320}
                                height={400}
                                className="w-56 h-72 md:w-72 md:h-96 object-cover rounded-[20px]"
                                priority
                            />
                        </div>

                        {/* Floating light particles */}
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--accent-cyan)] rounded-full opacity-20 blur-3xl animate-pulse-slow" />
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--accent-primary)] rounded-full opacity-25 blur-3xl animate-pulse-slower" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PixelRoom;
