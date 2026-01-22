'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface PixelRoomProps {
    greetingText: {
        greetingFirst: string;
        greetingSecond: string;
        greetingThird: string;
        greetingFourth: string;
    };
}

interface Particle {
    id: number;
    left: string;
    delay: string;
    duration: string;
}

const PixelRoom = ({ greetingText }: PixelRoomProps) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 8}s`,
            duration: `${8 + Math.random() * 6}s`,
        }));
        setParticles(newParticles);
        setIsLoaded(true);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="room-scene min-h-screen flex items-center justify-center relative pt-20">
            {/* Background gradient overlay */}
            <div className="hero-gradient absolute inset-0 pointer-events-none" />

            {/* Ambient particles */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="ambient-particle"
                    style={{
                        left: particle.left,
                        animationDelay: particle.delay,
                        animationDuration: particle.duration,
                    }}
                />
            ))}

            {/* Decorative pixel sprites */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top left - Window with glow */}
                <div className="absolute top-24 left-[5%] md:left-[10%] float-sprite glow-warm opacity-70">
                    <Image
                        src="/images/pixelImage/window.png"
                        alt=""
                        width={80}
                        height={80}
                        className="pixel-sprite w-16 md:w-20 h-auto"
                    />
                </div>

                {/* Top right - Window 2 */}
                <div className="absolute top-28 right-[5%] md:right-[12%] float-sprite-delayed glow-warm opacity-70">
                    <Image
                        src="/images/pixelImage/window2.png"
                        alt=""
                        width={80}
                        height={80}
                        className="pixel-sprite w-14 md:w-18 h-auto"
                    />
                </div>

                {/* Left side - Bookshelf */}
                <div className="absolute top-1/3 left-[2%] md:left-[5%] float-sprite opacity-60 hidden md:block">
                    <Image
                        src="/images/pixelImage/bookshelve.png"
                        alt=""
                        width={140}
                        height={180}
                        className="pixel-sprite w-24 lg:w-32 h-auto"
                    />
                </div>

                {/* Right side - Shelf with plants */}
                <div className="absolute top-1/4 right-[3%] md:right-[6%] float-sprite-delayed opacity-60 hidden md:block">
                    <Image
                        src="/images/pixelImage/shelve.png"
                        alt=""
                        width={120}
                        height={150}
                        className="pixel-sprite w-20 lg:w-28 h-auto"
                    />
                </div>

                {/* Bottom left - Bed */}
                <div className="absolute bottom-[15%] left-[3%] md:left-[8%] float-sprite opacity-50 hidden lg:block">
                    <Image
                        src="/images/pixelImage/bed.png"
                        alt=""
                        width={200}
                        height={120}
                        className="pixel-sprite w-36 xl:w-44 h-auto"
                    />
                </div>

                {/* Bottom right - Table with bird */}
                <div className="absolute bottom-[12%] right-[5%] md:right-[10%] float-sprite-delayed opacity-50 hidden lg:block">
                    <Image
                        src="/images/pixelImage/table.png"
                        alt=""
                        width={180}
                        height={120}
                        className="pixel-sprite w-32 xl:w-40 h-auto"
                    />
                </div>

                {/* Crates - decorative */}
                <div className="absolute bottom-[20%] left-[15%] float-sprite opacity-40 hidden xl:block">
                    <Image
                        src="/images/pixelImage/crates.png"
                        alt=""
                        width={80}
                        height={80}
                        className="pixel-sprite w-16 h-auto"
                    />
                </div>
            </div>

            {/* Main content */}
            <div className="container-responsive relative z-10">
                <div className={`flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    {/* Text content */}
                    <div className="flex-1 text-center lg:text-left max-w-2xl">
                        <div className="mb-6">
                            <span className="text-[var(--accent-primary)] font-medium text-sm md:text-base tracking-wide uppercase">
                                Welcome to my space
                            </span>
                        </div>

                        <h1 className="heading-xl mb-6">
                            <span className="text-[var(--text-primary)]">{greetingText.greetingFirst}</span>
                            <br />
                            <span className="gradient-text">Arthur Sharipov</span>
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
                                className="btn-primary"
                            >
                                View My Work
                            </button>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="btn-secondary"
                            >
                                Get In Touch
                            </button>
                        </div>
                    </div>

                    {/* Photo with decorative frame */}
                    <div className="relative flex-shrink-0">
                        {/* Decorative painting behind photo */}
                        <div className="absolute -top-8 -right-4 md:-right-8 float-sprite opacity-80 z-0">
                            <Image
                                src="/images/pixelImage/painting.png"
                                alt=""
                                width={100}
                                height={120}
                                className="pixel-sprite w-16 md:w-20 h-auto"
                            />
                        </div>

                        {/* Photo frame */}
                        <div className="photo-frame relative z-10">
                            <Image
                                src="/images/me.jpg"
                                alt="Arthur Sharipov"
                                width={320}
                                height={400}
                                className="w-56 h-72 md:w-72 md:h-96 object-cover rounded-[17px]"
                                priority
                            />
                        </div>

                        {/* Floating accent elements */}
                        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[var(--accent-primary)] rounded-full opacity-20 blur-2xl" />
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-[var(--accent-warm)] rounded-full opacity-20 blur-2xl" />
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                    <span className="text-sm text-[var(--text-muted)]">Scroll to explore</span>
                    <div className="w-6 h-10 border-2 border-[var(--border-color)] rounded-full flex justify-center pt-2">
                        <div className="w-1.5 h-3 bg-[var(--accent-primary)] rounded-full animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PixelRoom;
