import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { animateWithGsap } from "../utils/animations";
import { explore1Img, explore2Img, exploreVideo } from "../utils";
import {
  textInGray1,
  textInGray2,
  textInGray3,
  texInWhite1,
  textInWhite2,
} from "../constants";

const Features = () => {
  const videoRef = useRef();
  useGSAP(() => {
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });
    animateWithGsap("#features_title", { opacity: 1, y: 0, delay: 0.5 });
    animateWithGsap(
      ".g_grow",
      { scale: 1, opacity: 1, ease: "power1" },
      {
        scrub: 5.5,
      }
    );
    animateWithGsap(".g_text", {
      y: 0,
      opacity: 1,
      ease: "power2.inOut",
      duration: 1,
    });
    // gsap.to("#features_title", { opacity: 1, y: 0, delay: 1.5 });
  }, []);
  return (
    <section className="h-full common-padding bg-zinc-900 relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">
            Exprore the full story.
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">
              Forged in titanium.
            </h2>
          </div>
          <div className="flex-center flex-col sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center">
              <video
                id="exploreVideo"
                ref={videoRef}
                playsInline={true}
                preload="none"
                muted
                autoPlay
                className="w-full h-full object-cover object-center"
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>
            {/* container for imgs */}
            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore1Img}
                    alt="titanium"
                    className="feature-video g_grow"
                  />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore2Img}
                    alt="titanium2"
                    className="feature-video g_grow"
                  />
                </div>
              </div>
              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    <p className="mb-3">
                      iPhone 15 Pro is{" "}
                      <span className="text-white">{texInWhite1}</span>
                      {textInGray1}
                    </p>
                    <br />
                    <p>
                      {textInGray2}
                      <span className="text-white">{textInWhite2}</span>
                      {textInGray3}
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
