'use client';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { getApiUrl } from "../../config/api";

const ExperienceItem = ({ item, index }: { item: any; index: number }) => {
    const { ref: itemRef, isVisible: itemVisible } = useScrollAnimation(0.2);
    
    return (
        <div 
            ref={itemRef}
            className={`fade-in ${itemVisible ? 'visible' : ''} grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12`}
        >
            <div className="flex flex-col items-start justify-start font-light text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                {item.description}
            </div>
            
            <div className="w-full flex flex-col items-start justify-start space-y-2 sm:space-y-3">
                <div className="w-full flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                    <div className="font-light text-sm sm:text-base text-gray-600">
                        {item.date}
                    </div>
                    <div className="font-light text-sm sm:text-base text-[#666666]">
                        {item.location}
                    </div>
                </div>
                <div className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-black">
                    {item.company}
                </div>
                <div className="font-light text-sm sm:text-base md:text-lg text-gray-700">
                    {item.position}
                </div>
            </div>
        </div>
    );
};

const ExperienceSection = () => {
    const [experience, setExperience] = useState({
        title: "Experience",
        linkedInLink: "#",
        viewLinkedIn: "View LinkedIn",
        experience: []
    });

    const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.3);
    const { ref: dividerRef, isVisible: dividerVisible } = useScrollAnimation(0.2);

    useEffect(() => {
        fetch(getApiUrl('/values/values.json'))
            .then(res => res.json())
            .then(data => setExperience(data.experienceText))
            .catch(err => console.error('Failed to fetch experience data:', err));
    }, []);
    
    return (
        <div className="flex flex-col items-center justify-center w-full py-16 sm:py-20 md:py-24 lg:py-32">
            <div className="container-responsive">
                <div 
                    ref={titleRef}
                    className={`fade-in ${titleVisible ? 'visible' : ''} flex flex-row items-center justify-center mb-8 sm:mb-8`}
                >
                    <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
                        {experience.title}
                    </h1>
                </div>
                
                <div 
                    ref={dividerRef}
                    className={`fade-in ${dividerVisible ? 'visible' : ''} w-full px-4 sm:px-8 md:px-16 lg:px-16 relative mb-8 sm:mb-12`}
                >
                    <div className="h-[1px] bg-black"></div>
                </div>
                
                <div className="space-y-8 sm:space-y-12 lg:space-y-16">
                    {experience.experience.map((item: any, index: number) => (
                        <ExperienceItem key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExperienceSection;