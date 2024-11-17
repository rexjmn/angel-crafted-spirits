import { useEffect, useRef, useState, memo } from 'react';
import { hightlightsSlides } from '../assets/images/CarouselVideos';
import gsap from 'gsap';
import { replayImg, pauseImg, playImg } from '../assets/images';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRefs = useRef([]);
  const videoSpanRefs = useRef([]);
  const videoDivRefs = useRef([]);
  const textDesRefs = useRef([]);

  const [videoState, setVideoState] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = videoState;

  const updateVideoState = (newState) => setVideoState((prev) => ({ ...prev, ...newState }));

  // ScrollTrigger Animation
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        gsap.to(video, {
          scrollTrigger: {
            trigger: video,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onComplete: () => {
            if (index === videoId) {
              updateVideoState({ startPlay: true, isPlaying: true });
            }
          },
        });
      }
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  // Slider Animation
  useEffect(() => {
    const sliderAnimation = gsap.to('#slider', {
      x: `${-100 * videoId}%`,
      duration: 1.5,
      ease: 'power2.inOut',
    });

    return () => sliderAnimation.kill();
  }, [videoId]);

  // Sync Progress Bar with Video Playback
  useEffect(() => {
    const span = videoSpanRefs.current[videoId];
    const currentVideo = videoRefs.current[videoId];

    if (span && currentVideo) {
      const anim = gsap.to(span, {
        width: '100%',
        backgroundColor: '#0d141a',
        duration: currentVideo.duration || 1,
        paused: true,
        onComplete: () => handleProcess('video-end', videoId),
      });

      const animUpdate = () => {
        if (currentVideo) {
          anim.progress(currentVideo.currentTime / currentVideo.duration);
        }
      };

      if (isPlaying) {
        anim.play();
        gsap.ticker.add(animUpdate);
      } else {
        anim.pause();
        gsap.ticker.remove(animUpdate);
      }

      return () => {
        anim.kill();
        gsap.ticker.remove(animUpdate);
      };
    }
  }, [videoId, isPlaying]);

  // Play/Pause Videos
  useEffect(() => {
    if (loadedData.length > 3) {
      const currentVideo = videoRefs.current[videoId];
      if (currentVideo) {
        isPlaying ? currentVideo.play() : currentVideo.pause();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleProcess = (type, index) => {
    switch (type) {
      case 'video-end':
        updateVideoState({ isEnd: true, videoId: index + 1 < hightlightsSlides.length ? index + 1 : 0 });
        break;
      case 'video-last':
        updateVideoState({ isLastVideo: true });
        break;
      case 'video-reset':
        updateVideoState({ isLastVideo: false, videoId: 0 });
        break;
      case 'play':
      case 'pause':
        updateVideoState({ isPlaying: !isPlaying });
        break;
      default:
        break;
    }
  };

  const handleLoadedMetadata = (index, event) => {
    setLoadedData((prev) => [...prev, event]);
  };

  return (
    <div className="video-carousel-container flex flex-col items-center">
      <div className="flex overflow-hidden w-full">
        {hightlightsSlides.map((slide, index) => (
          <VideoSlide
            key={slide.id}
            slide={slide}
            videoRefs={videoRefs}
            textDesRefs={textDesRefs}
            handleProcess={handleProcess}
            handleLoadedMetadata={handleLoadedMetadata}
            index={index}
          />
        ))}
      </div>

      <div className="controls flex-center mt-10">
        <div className="progress-container flex gap-4 py-2 px-4 bg-[#e1c340] backdrop-blur-sm rounded-full">
          {hightlightsSlides.map((_, index) => (
            <ProgressIndicator key={index} index={index} videoDivRefs={videoDivRefs} videoSpanRefs={videoSpanRefs} />
          ))}
        </div>
        <button
          className="control-btn ml-4"
          onClick={() => handleProcess(isLastVideo ? 'video-reset' : isPlaying ? 'pause' : 'play')}
        >
          <img
            src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg}
            alt={isLastVideo ? 'replay' : isPlaying ? 'pause' : 'play'}
          />
        </button>
      </div>
    </div>
  );
};

const VideoSlide = memo(({ slide, videoRefs, textDesRefs, handleProcess, handleLoadedMetadata, index }) => (
  <div id="slider" className="sm:pr-20 pr-0 flex items-center justify-center rounded-3xl flex-shrink-0 w-full">
    <div className="video-carousel_container flex items-center justify-center">
      <div className="video-frame rounded-3xl overflow-hidden relative">
        <video
          ref={(el) => (videoRefs.current[index] = el)}
          muted
          playsInline
          preload="auto"
          className="w-full h-full"
          onEnded={() => handleProcess(index !== hightlightsSlides.length - 1 ? 'video-end' : 'video-last', index)}
          onLoadedMetadata={(event) => handleLoadedMetadata(index, event)}
        >
          <source src={slide.video} type="video/webm" />
        </video>
        <div
          ref={(el) => (textDesRefs.current[index] = el)}
          className="video-description absolute top-1/2 left-5 opacity-0 bg-opacity-20 backdrop-blur-sm p-4 rounded"
        >
          {slide.textLists.map((text, idx) => (
            <p key={idx} className="text-3xl md:text-2xl font-serif text-white">
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  </div>
));

const ProgressIndicator = memo(({ index, videoDivRefs, videoSpanRefs }) => (
  <span ref={(el) => (videoDivRefs.current[index] = el)} className="progress-indicator w-3 h-3 rounded-full bg-gray-200 cursor-pointer relative">
    <span ref={(el) => (videoSpanRefs.current[index] = el)} className="progress-bar absolute w-full h-full rounded-full" />
  </span>
));

export default VideoCarousel;
