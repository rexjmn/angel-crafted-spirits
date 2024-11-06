import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { rightImg, watchImg } from '../assets/images';
import VideoCarousel from './VideoCarousel';

const HighLights = () => {
    useGSAP(() => {
        gsap.to('#title', {
            opacity: 1,
            duration: 1,
            y: -80,
           
            onComplete: () => {
                // After the animation completes, the opacity stays at 1
            }
        });
        gsap.to('.link', { opacity: 1, y: 10, duration: 1, stagger: 0.25 })
    }, []);

    return (
        <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-gradient-to-b from-[#000000] to-[#292929]">
            <div className="screen-max-width">
                <div className=" mb-12 w-full md:flex items-center justify-between ">
                    <h1 id="title" className="section-heading text-white">
                        Get the highlights.
                    </h1>

                    <div className="flex flex-wrap items-end gap-5">
                        <p className="link text-white">
                            Watch the film
                            <img src={watchImg} alt="watch" className="ml-2" />
                        </p>
                        <p className="link text-white">
                            Watch the event
                            <img src={rightImg} alt="right" className="ml-2" />
                        </p>
                    </div>
                </div>

                <VideoCarousel />
            </div>
        </section>
    )
}

export default HighLights