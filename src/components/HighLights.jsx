import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { rightImg, watchImg } from '../assets/images';
import VideoCarousel from './VideoCarousel';

gsap.registerPlugin(ScrollTrigger);

const HighLights = () => {
    useGSAP(() => {
        // Animación del título y los enlaces al entrar en vista
        gsap.to('#title', {
            opacity: 1,
            duration: 1.5,
            y: -30,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#highlights',
                start: 'top 80%', 
                toggleActions: 'play none none none',
            },
        });
        
        gsap.to('.link', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            stagger: 0.3,
            scrollTrigger: {
                trigger: '#highlights',
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });

        // Animación de opacidad para VideoCarousel
        gsap.fromTo(
            '#video-carousel-container', 
            { opacity: 0 }, 
            {
                opacity: 1,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '#video-carousel-container',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }, []);

    return (
        <section id="highlights" className="w-screen overflow-hidden h-full py-12 bg-gradient-to-b from-[#111111] via-[#1a1a1a] to-[#333333]">
            <div className="screen-max-width mx-auto px-6">
                <div className="mb-12 w-full flex flex-col md:flex-row items-center justify-between">
                    <h1 id="title" className="section-heading text-[#f5f5f5] font-serif text-4xl md:text-5xl font-bold tracking-wide mb-6 md:mb-0">
                        Get the Highlights
                    </h1>

                    <div className="flex flex-wrap items-center gap-5">
                        <p className="link text-[#c0a36e] flex items-center text-lg md:text-xl font-medium cursor-pointer transition-opacity duration-300 hover:opacity-80">
                            Watch the Film
                            <img src={watchImg} alt="watch" className="ml-2 w-6 h-6" />
                        </p>
                        <p className="link text-[#c0a36e] flex items-center text-lg md:text-xl font-medium cursor-pointer transition-opacity duration-300 hover:opacity-80">
                            Watch the Event
                            <img src={rightImg} alt="right" className="ml-2 w-6 h-6" />
                        </p>
                    </div>
                </div>

                {/* Agregar un ID único para VideoCarousel para la animación */}
                <div id="video-carousel-container">
                    <VideoCarousel />
                </div>
            </div>
        </section>
    );
};

export default HighLights;
