import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { hightlightsSlides } from '../assets/images/CarouselVideos';
import gsap from 'gsap';
import { replayImg, pauseImg, playImg } from '../assets/images';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/all"
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
  const [loadedDate, setLoadedDate] = useState([]);

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider",{
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    })
   
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);


  useEffect(() => {
    if (loadedDate.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }

  }, [startPlay, videoId, isPlaying, loadedDate]);

  const handleLoadedMetadata = (i, e) => setLoadedDate((pre) => [...pre, e])

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animation to move the indicator
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                    ? "10vw" // tablet
                    : "4vw", // laptop
            });

            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId == 0) {
        anim.restart();
      }

      // update the progress bar
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
          hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate);
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    switch (type) {
      case 'video-end':
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }))
        break;
      case 'video-last':
        setVideo((pre) => ({ ...pre, isLastVideo: true }))
        break;
      case 'video-reset':
        setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }))
        break;
      case 'play':
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }))
        break;
        case 'pause':
          setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }))
          break;
      default:
        return video;


    }
  }

  return (
    <>
      <div className='flex items-center'>
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id='slider' className='sm:pr-20 pr-0'>
            <div className='video-carousel_container'>
              <div className='w-full h-full flex-center
                    rounded-3xl overflow-hidden'>
                <video
                  id='video'
                  playsInline={true}
                  preload='auto'
                  muted
                  
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() =>
                    i !== 4
                      ? handleProcess('video-end', i)
                      : handleProcess('video-last')
                  }
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));

                    // Animate the text description when video starts playing
                    gsap.to(textDesRef.current[i], {
                      opacity: 1,
                      delay: 1.5,
                      duration: 2,
                      ease: "power2.inOut",
                    });
                  }}
                  onPause={() => {
                    gsap.to(textDesRef.current[i], {
                      opacity: 0,  // Fade out when video pauses
                      duration: 2,
                      ease: "power2.inOut",
                    });
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                >
                  <source src={list.video} type='video/mp4' />

                </video>

              </div>
              <div ref={(el) => (textDesRef.current[i] = el)} className='absolute top-12 left-[5%] font-[Rye] bg-black bg-opacity-20 opacity-0 backdrop-blur-sm z-10'>
                {list.textLists.map((text) => (
                  <p key={text} className='md:text-2xl text-xl font-[Rye] font-medium'>{text}</p>
                ))}

              </div>
              <div>

              </div>

            </div>
          </div>
        ))}

      </div>

      <div className='relative flex-center mt-10'>
        <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur-sm rounded-full'>
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className='mx-2 w-3 h-3 rounded-full bg-gray-200
            cursor-pointer relative'
            >
              <span className='absolute h-full w-full rounded-full'
                ref={(el) => (videoSpanRef.current[i] = el)}
              />


            </span>
          ))}

        </div>
        <button className='control-btn'>

          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={isLastVideo ? () => handleProcess('video-reset')
              : !isPlaying
                ? () => handleProcess('play')
                : () => handleProcess('pause')
            }
          />



        </button>

      </div>
    </>
  )
}

export default VideoCarousel
