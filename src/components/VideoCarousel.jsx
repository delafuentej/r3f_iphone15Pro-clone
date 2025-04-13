import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import { hightlightsSlides } from "../constants";
import { playImg, replayImg, pauseImg } from "../utils";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    videoId: 0,
    isEnd: false,
    startPlay: false,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);

  const { videoId, isEnd, startPlay, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [videoId, isEnd]);

  useEffect(() => {
    const span = videoSpanRef.current[videoId];
    const div = videoDivRef.current[videoId];
    const vid = videoRef.current[videoId];

    if (!span || !div || !vid) return;

    let currentProgress = 0;

    const animate = gsap.to(span, {
      onUpdate: () => {
        const progress = Math.ceil(animate.progress() * 100);
        if (progress !== currentProgress) {
          currentProgress = progress;

          gsap.to(div, {
            width: window.innerWidth < 1200 ? "10vw" : "4vw",
          });

          gsap.to(span, {
            width: `${currentProgress}%`,
            backgroundColor: "#60A5FA",
          });
        }
      },
      onComplete: () => {
        if (isPlaying) {
          gsap.to(div, { width: "12px" });
          gsap.to(span, { backgroundColor: "#afafaf" });
        }
      },
    });

    if (videoId === 0) animate.restart();

    const animateUpdate = () => {
      animate.progress(
        vid.currentTime / hightlightsSlides[videoId].videoDuration
      );
    };

    if (isPlaying) {
      gsap.ticker.add(animateUpdate);
    } else {
      gsap.ticker.remove(animateUpdate);
    }

    return () => gsap.ticker.remove(animateUpdate);
  }, [videoId, startPlay, isPlaying]);

  useEffect(() => {
    if (loadedData.length > 3) {
      const vid = videoRef.current[videoId];
      if (!vid) return;

      if (!isPlaying) {
        vid.pause();
      } else if (startPlay) {
        vid.play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 }));
        break;
      case "play":
      case "pause":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      default:
        break;
    }
  };

  const handleLoadedMetaData = (i, ev) =>
    setLoadedData((prev) => [...prev, ev]);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((slide, index) => (
          <div id="slider" key={slide.id} className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  className={
                    slide.id === 2
                      ? "translate-x-44 pointer-events-none"
                      : "pointer-events-none"
                  }
                  playsInline
                  muted
                  preload="auto"
                  ref={(el) => (videoRef.current[index] = el)}
                  onPlay={() =>
                    setVideo((prev) => ({ ...prev, isPlaying: true }))
                  }
                  onEnded={() =>
                    index !== hightlightsSlides.length - 1
                      ? handleProcess("video-end", index)
                      : handleProcess("video-last", index)
                  }
                  onLoadedMetadata={(ev) => handleLoadedMetaData(index, ev)}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {slide.textLists.map((text, i) => (
                  <p key={i} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-zinc-800 backdrop-blur-sm rounded-full">
          {hightlightsSlides.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute w-full h-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={() =>
              isLastVideo
                ? handleProcess("video-reset")
                : !isPlaying
                ? handleProcess("play")
                : handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
