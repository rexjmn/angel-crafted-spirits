import { useEffect, useRef, useState } from 'react';
import { hightlightsSlides } from '../assets/images/CarouselVideos';
import gsap from 'gsap';
import { replayImg, pauseImg, playImg } from '../assets/images';
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  const textDesRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useEffect(() => {
    gsap.to("#slider", {
      x: `${-100 * videoId}%`,
      duration: 1.5,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true })),
    });
  }, [videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      videoRef.current[videoId]?.[isPlaying ? 'play' : 'pause']();
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleLoadedMetadata = (i, e) => setLoadedData((prev) => [...prev, e]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current[videoId];
    if (span) {
      let anim = gsap.to(span, {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress !== currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 760 ? "10vw" : "4vw",
            });
            gsap.to(span, { width: `${currentProgress}%`, backgroundColor: "#0d141a" });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], { width: "12px" });
            gsap.to(span, { backgroundColor: "black" });
          }
        },
      });

      if (isPlaying) {
        gsap.ticker.add(() => anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration));
      } else {
        gsap.ticker.remove(() => anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration));
      }
    }
  }, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    setVideo((prev) => {
      switch (type) {
        case 'video-end': return { ...prev, isEnd: true, videoId: i + 1 };
        case 'video-last': return { ...prev, isLastVideo: true };
        case 'video-reset': return { ...prev, isLastVideo: false, videoId: 0 };
        case 'play': case 'pause': return { ...prev, isPlaying: !prev.isPlaying };
        default: return prev;
      }
    });
  };

  return (
    <div className="video-carousel-container flex flex-col items-center">
      <div className="flex overflow-hidden w-full">
        {hightlightsSlides.map((slide, i) => (
          <div key={slide.id} id="slider" className="sm:pr-20 pr-0 flex items-center justify-center rounded-3xl flex-shrink-0 w-full">
            <div className="video-carousel_container flex items-center justify-center  ">
              <div className="video-frame rounded-3xl overflow-hidden relative">
                <video
                  id="video"
                  ref={(el) => (videoRef.current[i] = el)}
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full"
                  onEnded={() => handleProcess(i !== 4 ? 'video-end' : 'video-last', i)}
                  onPlay={() => gsap.to(textDesRef.current[i], { opacity: 1, delay: 1.5, duration: 2 })}
                  onPause={() => gsap.to(textDesRef.current[i], { opacity: 0, duration: 2 })}
                  onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
                <div ref={(el) => (textDesRef.current[i] = el)} className="video-description absolute top-1/2 left-5 opacity-0 bg-opacity-20 backdrop-blur-sm p-4 rounded">
                  {slide.textLists.map((text, idx) => (
                    <p key={idx} className="text-3xl md:text-2xl font-serif text-white">{text}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="controls flex-center mt-10">
        <div className="progress-container flex gap-4 py-2 px-4 bg-[#e1c340] backdrop-blur-sm rounded-full">
          {videoRef.current.map((_, i) => (
            <span key={i} ref={(el) => (videoDivRef.current[i] = el)} className="progress-indicator w-3 h-3 rounded-full bg-gray-200 cursor-pointer relative">
              <span className="progress-bar absolute w-full h-full rounded-full" ref={(el) => (videoSpanRef.current[i] = el)} />
            </span>
          ))}
        </div>
        <button className="control-btn ml-4" onClick={() => handleProcess(isLastVideo ? 'video-reset' : !isPlaying ? 'play' : 'pause')}>
          <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'} />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
