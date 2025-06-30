import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageUp } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards, Autoplay } from 'swiper/modules';

interface ImageSwiperProps {
  tweetAnalysis: any;
  onMimicClick?: () => void;
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({ tweetAnalysis, onMimicClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // Individual slide animation
  const slideVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1 }
  };

  const handleMimicClick = () => {
    if (onMimicClick) {
      onMimicClick();
    }
  };

  return (
    <>
      <style jsx global>{`
        .swiper-slide {
          transition: opacity 0.3s ease;
        }
        .swiper-slide-active {
        }
        .swiper-cards .swiper-slide {
          margin-top: -10px !important;
        }
      `}</style>
      <div className='h-full w-full overflow-hidden relative px-6 py-3 flex items-center flex-col justify-center'>

        {/* <h1 className='text-gray-400 text-sm font-medium translate-y-[-10px]'>Media posts by {tweetAnalysis?.stored_data?.twitter_id}</h1> */}


        <AnimatePresence mode="wait">
          {!tweetAnalysis ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center group justify-center cursor-pointer"
              onClick={handleMimicClick}
            >
              <div className="relative w-full h-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-md border border-gray-400 border-dashed shadow-inner px-2">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-2">
                  <ImageUp className="w-10 h-10 text-gray-400   group-hover:text-gray-500 group-hover:scale-95 transition-all duration-300" />
                  <div className="text-center">
                    <p style={{fontSize: "14px", fontFamily: "Audiowide"}} className="text-gray-400 group-hover:text-gray-500 group-hover:scale-95 transition-all duration-300 font-medium">Click to mimic</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : tweetAnalysis?.stored_data?.images?.length > 0 ? (
            <motion.div
              key="swiper-container"
              initial="hidden"
              animate="show"
              variants={containerVariants}
              className="w-full h-full"
            >
              <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards, Autoplay]}
                className="mySwiper w-full h-full"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                cardsEffect={{
                  slideShadows: false,
                  perSlideOffset: 5,
                  perSlideRotate: 2,
                }}
              >
                {tweetAnalysis.stored_data.images.slice(0, 6).map((image: string, index: number) => (
                  <SwiperSlide 
                    style={{border: "1px dashed oklch(70.7% 0.022 261.325)"}} 
                    key={index} 
                    className="rounded-md bg-gray-200 shadow-md overflow-hidden p-2"
                  >
                    <motion.div
                      key={`image-${index}`}
                      variants={slideVariants}
                      transition={{ 
                        duration: 0.4,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      className="w-full h-full"
                    >
                      <motion.div
                        animate={{ 
                          opacity: activeIndex === index ? 1 : 0.6,
                          y: activeIndex === index ? 0 : 5,
                          filter: activeIndex === index ? "blur(0px)" : "blur(2px)"
                        }}
                        transition={{ 
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                        className="w-full h-full"
                      >
                        <Image 
                          src={image || ""} 
                          alt={`Image ${index + 1}`} 
                          width={100} 
                          height={100} 
                          className="object-fit rounded-md w-full h-full" 
                        />
                      </motion.div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          ) : (
            <motion.div
              key="no-media"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center justify-center cursor-pointer"
              onClick={handleMimicClick}
            >
              <div className="text-center">
                <ImageUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Click to mimic</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default ImageSwiper