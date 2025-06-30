"use client";
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaReddit, FaDiscord, FaTiktok, FaUser } from 'react-icons/fa';

interface ConnectorLineProps {
  width?: number;
  height?: number;
  color?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ConnectorLine: React.FC<ConnectorLineProps> = ({
  width = 134,
  height = 15,
  color = "#a855f7",
  duration = 1.8,
  className = "",
  style = {}
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 134 15"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        position: 'absolute',
        left: '0',
        top: '0',
        transition: 'fill 0.2s ease, stroke 0.2s ease',
        ...style
      }}
    >
      <motion.path
        d="M133.5 1C133.5 0.723858 133.276 0.5 133 0.5C132.724 0.5 132.5 0.723858 132.5 1H133.5ZM133 1H132.5V1.75H133H133.5V1H133ZM133 3.25H132.5V4.75H133H133.5V3.25H133ZM133 6.25H132.5V7H133H133.5V6.25H133Z"
        fill={color}
        style={{
          transition: 'fill 0.2s ease'
        }}
      />
      <motion.path
        d="M133.008 7.49994C133.284 7.49569 133.504 7.26842 133.5 6.99231C133.496 6.7162 133.268 6.49581 132.992 6.50006L133.008 7.49994ZM133 7L132.992 6.50006L131.977 6.51568L131.984 7.01562L131.992 7.51557L133.008 7.49994L133 7ZM129.953 7.04687L129.945 6.54693L127.914 6.57818L127.922 7.07812L127.93 7.57807L129.961 7.54682L129.953 7.04687ZM125.891 7.10937L125.883 6.60943L123.852 6.64068L123.859 7.14062L123.867 7.64057L125.898 7.60932L125.891 7.10937ZM121.828 7.17187L121.82 6.67193L119.789 6.70318L119.797 7.20312L119.805 7.70307L121.836 7.67182L121.828 7.17187ZM117.766 7.23437L117.758 6.73443L115.727 6.76568L115.734 7.26562L115.742 7.76557L117.773 7.73432L117.766 7.23437ZM113.703 7.29687L113.695 6.79693L111.664 6.82818L111.672 7.32812L111.68 7.82807L113.711 7.79682L113.703 7.29687ZM109.641 7.35937L109.633 6.85943L107.602 6.89068L107.609 7.39062L107.617 7.89057L109.648 7.85932L109.641 7.35937ZM105.578 7.42187L105.57 6.92193L103.539 6.95318L103.547 7.45312L103.555 7.95307L105.586 7.92182L105.578 7.42187ZM101.516 7.48437L101.508 6.98443L99.4767 7.01568L99.4844 7.51562L99.4921 8.01557L101.523 7.98432L101.516 7.48437ZM97.4531 7.54687L97.4454 7.04693L95.4142 7.07818L95.4219 7.57812L95.4296 8.07807L97.4608 8.04682L97.4531 7.54687ZM93.3906 7.60937L93.3829 7.10943L91.3517 7.14068L91.3594 7.64062L91.3671 8.14057L93.3983 8.10932L93.3906 7.60937ZM89.3281 7.67187L89.3204 7.17193L87.2892 7.20318L87.2969 7.70312L87.3046 8.20307L89.3358 8.17182L89.3281 7.67187ZM85.2656 7.73437L85.2579 7.23443L83.2267 7.26568L83.2344 7.76562L83.2421 8.26557L85.2733 8.23432L85.2656 7.73437ZM81.2031 7.79687L81.1954 7.29693L79.1642 7.32818L79.1719 7.82812L79.1796 8.32807L81.2108 8.29682L81.2031 7.79687ZM77.1406 7.85937L77.1329 7.35943L75.1017 7.39068L75.1094 7.89062L75.1171 8.39057L77.1483 8.35932L77.1406 7.85937ZM73.0781 7.92187L73.0704 7.42193L71.0392 7.45318L71.0469 7.95312L71.0546 8.45307L73.0858 8.42182L73.0781 7.92187ZM69.0156 7.98437L69.0079 7.48443L66.9767 7.51568L66.9844 8.01562L66.9921 8.51557L69.0233 8.48432L69.0156 7.98437ZM64.9531 8.04687L64.9454 7.54693L62.9142 7.57818L62.9219 8.07812L62.9296 8.57807L64.9608 8.54682L64.9531 8.04687ZM60.8906 8.10937L60.8829 7.60943L58.8517 7.64068L58.8594 8.14062L58.8671 8.64057L60.8983 8.60932L60.8906 8.10937ZM56.8281 8.17187L56.8204 7.67193L54.7892 7.70318L54.7969 8.20312L54.8046 8.70307L56.8358 8.67182L56.8281 8.17187ZM52.7656 8.23437L52.7579 7.73443L50.7267 7.76568L50.7344 8.26562L50.7421 8.76557L52.7733 8.73432L52.7656 8.23437ZM48.7031 8.29687L48.6954 7.79693L46.6642 7.82818L46.6719 8.32812L46.6796 8.82807L48.7108 8.79682L48.7031 8.29687ZM44.6406 8.35937L44.6329 7.85943L42.6017 7.89068L42.6094 8.39062L42.6171 8.89057L44.6483 8.85932L44.6406 8.35937ZM40.5781 8.42187L40.5704 7.92193L38.5392 7.95318L38.5469 8.45312L38.5546 8.95307L40.5858 8.92182L40.5781 8.42187ZM36.5156 8.48437L36.5079 7.98443L34.4767 8.01568L34.4844 8.51562L34.4921 9.01557L36.5233 8.98432L36.5156 8.48437ZM32.4531 8.54687L32.4454 8.04693L30.4142 8.07818L30.4219 8.57812L30.4296 9.07807L32.4608 9.04682L32.4531 8.54687ZM28.3906 8.60937L28.3829 8.10943L26.3517 8.14068L26.3594 8.64062L26.3671 9.14057L28.3983 9.10932L28.3906 8.60937ZM24.3281 8.67187L24.3204 8.17193L22.2892 8.20318L22.2969 8.70312L22.3046 9.20307L24.3358 9.17182L24.3281 8.67187ZM20.2656 8.73437L20.2579 8.23443L18.2267 8.26568L18.2344 8.76562L18.2421 9.26557L20.2733 9.23432L20.2656 8.73437ZM16.2031 8.79687L16.1954 8.29693L14.1642 8.32818L14.1719 8.82812L14.1796 9.32807L16.2108 9.29682L16.2031 8.79687ZM12.1406 8.85937L12.1329 8.35943L10.1017 8.39068L10.1094 8.89062L10.1171 9.39057L12.1483 9.35932L12.1406 8.85937ZM8.07813 8.92187L8.07043 8.42193L6.03918 8.45318L6.04688 8.95312L6.05457 9.45307L8.08582 9.42182L8.07813 8.92187ZM4.01563 8.98437L4.00793 8.48443L1.99231 8.50006L2 9L2.00769 9.49994L4.02332 9.48432L4.01563 8.98437Z"
        stroke={color}
        strokeWidth="1"
        style={{
          transition: 'stroke 0.2s ease'
        }}
        initial={{ x: 0 }}
        animate={{
          x: [-2, 2]
        }}
        transition={{
          repeat: Infinity,
          duration: duration,
          ease: "linear",
          repeatType: "loop"
        }}
      />
    </svg>
  );
};

export default function SocialGrowthComponent() {
  const elevatedItems = [2, 6, 13, 5, 17];
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const centerIndex = 9; // Center box index for user profile
  const mobileCenterIndex = 6; // Center box index for mobile
  const mobileElevatedItems = [0, 3, 8, 11]; // Mobile elevated items
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    // Check for mobile viewport on mount and resize
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Social media icons mapping
  const socialIcons = {
    2: <FaInstagram className="w-5 h-5 md:w-8 md:h-8" />,
    6: <FaLinkedin className="w-5 h-5 md:w-8 md:h-8" />,
    13: <FaReddit className="w-5 h-5 md:w-8 md:h-8" />,
    5: <FaDiscord className="w-5 h-5 md:w-8 md:h-8" />,
    17: <FaTiktok className="w-5 h-5 md:w-8 md:h-8" />
  };

  // Mobile social media icons mapping
  const mobileSocialIcons = {
    0: <FaInstagram className="w-5 h-5" />,
    3: <FaLinkedin className="w-5 h-5" />,
    8: <FaReddit className="w-5 h-5" />,
    11: <FaDiscord className="w-5 h-5" />
  };

  return (
    <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="p-4 md:p-6 relative bg-gradient-to-r from-blue-900/30 to-purple-800/30 w-full h-full rounded-lg relative overflow-hidden">

      <div className="absolute top-0 left-0  lg:hidden block  w-full h-1/3 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>

      <h1 className="text-2xl md:text-3xl lg:text-4xl relative z-[100] font-bold text-white/90 pt-3 translate-y-[-40%] lg:translate-y-0  md:pt-6"
        style={{
          fontFamily: 'Audiowide, sans-serif',
          textShadow: '0 0px 15px rgba(0,0,0,0.6)'
        }}>
        Mental Health <span className="text-purple-500/80" style={{ textShadow: '0 0px 8px rgba(0,0,0,0.5)' }}>Revolution</span>
      </h1>

      <div className="flex flex-col md:flex-row max-h-full">
        <div className="w-full hidden lg:block md:w-[40%] pr-0 md:pr-4 z-[100] relative h-full pt-6 md:pt-12">
          <p className="text-white/80 text-base md:text-lg font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
            Democratizing access to quality mental health care through AI-powered therapy
          </p>
        </div>

        <div className='w-full absolute hidden lg:block top-0 left-0 bg-black/90 h-full z-[50] [mask-image:linear-gradient(to_right,black,black,transparent,transparent)] md:[mask-image:linear-gradient(to_right,black,black,transparent,transparent)]' />

        <div className="w-full lg:w-[60%] min-w-[520px] scale-90 lg:scale-100 mt-8 md:mt-0 md:translate-y-[-15%] relative">

          {/* Desktop Grid */}
          <div className="hidden md:flex flex-wrap gap-1 md:gap-2 relative z-[70]">
            {Array.from({ length: 18 }).map((_, index) => {
              const isCenter = index === centerIndex;
              const isElevated = elevatedItems.includes(index);


              return (
                <motion.div
                  key={index}
                  className={`
                    aspect-square rounded-sm flex items-center justify-center
                    w-[calc(25%-0.75rem)] sm:w-[calc(20%-0.8rem)] md:w-[calc(16.666%-0.5rem)]
                    ${isCenter
                      ? `bg-gradient-to-r from-purple-600/70 to-indigo-700/90 text-white font-bold backdrop-blur-md border-2 border-white/40 z-[80]`
                      : isElevated
                        ? `bg-gradient-to-r from-indigo-600/60 to-purple-700/80 text-white font-medium backdrop-blur-sm border border-white/20`
                        : 'bg-white/5 border border-white/5 text-white/30'
                    }
                  `}
                  style={{
                    boxShadow: isCenter
                      ? isHover
                        ? '0 0 35px rgba(168,85,247,0.9), inset 0 0 20px rgba(168,85,247,1)'
                        : '0 0 25px rgba(168,85,247,0.8), inset 0 0 15px rgba(168,85,247,1)'
                      : isElevated
                        ? isHover
                          ? '0 0 10px rgba(0,0,0,0.4), inset 0 0 8px rgba(168,85,247,0.7)'
                          : '0 0 15px rgba(0,0,0,0.5), inset 0 0 10px rgba(168,85,247,0.9)'
                        : 'none',
                    opacity: isCenter ? '1' : isElevated ? '1' : '0.4',
                    filter: isHover && isCenter
                      ? 'brightness(1.2) contrast(1.1)'
                      : isHover && isElevated
                        ? 'brightness(0.9) contrast(0.95)'
                        : 'brightness(1) contrast(1)',
                    transition: 'box-shadow 0.5s ease, filter 0.5s ease 0.1s'
                  }}
                  animate={{
                    scale: isCenter
                      ? (isHover ? 1.2 : 1.1)
                      : isElevated
                        ? (isHover ? 0.9 : 1.0)
                        : 1.0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                    mass: 1,
                    delay: isCenter ? 0 : 0.03 * index
                  }}
                >
                  {isCenter ? (
                    <FaUser className="w-6 h-6 md:w-10 md:h-10 text-white" />
                  ) : (
                    isElevated && socialIcons[index as keyof typeof socialIcons]
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Grid */}
          <div className="flex md:hidden flex-wrap gap-1 xs:gap-1.5 sm:gap-2 relative z-[70] mx-auto scale-[0.85] xs:scale-90 sm:scale-100 translate-y-[-5%] xs:translate-y-[-10%] sm:translate-y-[-15%] max-w-[95%] xs:max-w-[90%] sm:max-w-full">
            {Array.from({ length: 9 }).map((_, index) => {
              const isCenter = index === mobileCenterIndex;
              const isElevated = mobileElevatedItems.includes(index);

              return (
                <div
                  key={index}
                  className={`
                    aspect-square rounded-sm flex items-center justify-center
                    w-[calc(33%-0.35rem)] xs:w-[calc(33%-0.5rem)] sm:w-[calc(33%-0.67rem)]
                    ${isCenter
                      ? 'bg-gradient-to-r from-purple-600/80 scale-105 xs:scale-110 to-indigo-700/90 text-white font-bold backdrop-blur-md border-[1.5px] xs:border-2 border-white/40 z-[80]'
                      : isElevated
                        ? 'bg-gradient-to-r from-indigo-600/70 to-purple-700/80 text-white font-medium backdrop-blur-sm border border-white/30'
                        : 'bg-white/5 border border-white/10 text-white/40'
                    }
                  `}
                  style={{
                    boxShadow: isCenter
                      ? '0 0 15px rgba(168,85,247,0.9), inset 0 0 10px rgba(168,85,247,1)'
                      : isElevated
                        ? '0 0 10px rgba(0,0,0,0.5), inset 0 0 6px rgba(168,85,247,0.8)'
                        : 'none',
                    opacity: isCenter ? '1' : isElevated ? '1' : '0.7',
                  }}
                >
                  {isCenter ? (
                    <FaUser className="w-4 h-4 xs:w-5 xs:h-5 sm:w-7 sm:h-7 text-white" />
                  ) : (
                    isElevated && mobileSocialIcons[index as keyof typeof mobileSocialIcons]
                  )}
                </div>
              );
            })}
          </div>

          {/* Connection line between Instagram (index 2) and center user - Desktop */}
          <div className="absolute z-[15] scale-x-150  pointer-events-none overflow-hidden hidden md:block" style={{
            top: '10%',
            left: '45%',
            transformOrigin: 'left center',
            width: '65px',
            height: '15px'
          }}>
            <ConnectorLine color={isHover ? "#a855f7" : "#fff"} />
          </div>
          <div className="absolute z-[15] scale-x-130  pointer-events-none overflow-hidden hidden md:block" style={{
            top: '10%',
            left: '59%',
            transformOrigin: 'left center',
            width: '65px',
            height: '15px',
            rotate: '90deg'
          }}>
            <ConnectorLine color={isHover ? "#a855f7" : "#fff"} />
          </div>

          {/* Connection line between Reddit (index 13) and center user - Desktop */}
          <div className="absolute z-[15] scale-x-150 pointer-events-none overflow-hidden hidden md:block" style={{
            bottom: '41%',
            left: '25%',
            transformOrigin: 'left center',
            width: '130px',
            height: '15px'
          }}>
            <ConnectorLine color={isHover ? "#a855f7" : "#fff"} />
          </div>
          <div className="absolute z-[15] scale-x-100 pointer-events-none overflow-hidden hidden md:block" style={{
            bottom: '41%',
            left: '25%',
            transformOrigin: 'left center',
            width: '130px',
            height: '15px',
            rotate: '90deg'
          }}>
            <ConnectorLine color={isHover ? "#a855f7" : "#fff"} />
          </div>

          {/* Connection line between Tiktok (index 18) and center user - Desktop */}
          <div className="absolute z-[15] scale-x-120 pointer-events-none overflow-hidden hidden md:block" style={{
            bottom: '8%',
            right: '20%',
            transformOrigin: 'left center',
            width: '130px',
            height: '15px'
          }}>
            <ConnectorLine color={isHover ? "#a855f7" : "#fff"} />
          </div>
          <div className="absolute z-[15] scale-x-60 pointer-events-none overflow-hidden hidden md:block" style={{
            bottom: '31%',
            right: '20%',
            transformOrigin: 'left center',
            width: '130px',
            height: '10px',
            rotate: '90deg'
          }}>
            <ConnectorLine color={isHover ? "#a855f7" : "#fff"} />
          </div>


          {/* Connection line between Linkedin (index 6) and center user - Desktop */}
          <div className="absolute z-[15] scale-x-200 pointer-events-none overflow-hidden hidden md:block" style={{
            top: '41.6%',
            left: '12%',
            transformOrigin: 'left center',
            width: '400px',
            height: '14px'
          }}>
            <ConnectorLine color={isHover ? "#a855f7" : "#fff"} />
          </div>


          {/* Connection line between discord (index 5) and center user - Desktop */}
          <div className="absolute z-[15] scale-x-140 pointer-events-none overflow-hidden hidden md:block" style={{
            top: '46.6%',
            right: '12%',
            transformOrigin: 'left center',
            width: '200px',
            height: '14px'
          }}>
            <ConnectorLine color={isHover ? "#a855f7" : "#fff"} />
          </div>
          <div className="absolute z-[15] scale-x-100 pointer-events-none overflow-hidden hidden md:block" style={{
            top: '46.6%',
            right: '0%',
            transformOrigin: 'left center',
            width: '100px',
            height: '14px',
            rotate: '270deg',
          }}>
            <ConnectorLine color={isHover ? "#a855f7" : "#fff"} />
          </div>


        </div>
      </div>

      <div className="w-[80%] md:w-[60%] h-[30%] md:h-[40%] rounded-full absolute top-0 -right-1/3 scale-100 md:scale-110 -translate-y-[20%] md:-translate-y-[30%] opacity-40 bg-[radial-gradient(circle,_#e9d5ff,_#a855f7,_#7e22ce,_transparent,transparent)] blur-[30px] md:blur-[54px] z-[1]" />
    </div>
  );
}