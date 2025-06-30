"use client"
import { useLenis } from "@/lib/lenis"
import React, { useState, useEffect } from 'react'
import Particles from './Particles'
import { ArrowRight, Wand2 } from 'lucide-react'
import Navbar from './Navbar'
import CompareComponent from './CompareSection'
import Gridcomponent from './Gridcomponent'
import { MarqueeDemo } from './Marq'
import StandoutSection from './StandoutSection'
import Footer from "./Footer"
import { AuroraText } from "@/components/magicui/aurora-text"
import { AnimatePresence, motion } from 'framer-motion'
import BlurFade from "./magicui/blur-fade"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import AuthModal from './AuthModal';
import useStore from '@/app/store/store';

function HeroSection() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const { isAuthModalOpen, setIsAuthModalOpen } = useStore();
  let auth = null

  useEffect(() => {
    auth = searchParams.get('auth');
    if (auth) {
      setIsAuthModalOpen(true);
    }
  }, [searchParams]);

  const delay = 0.08
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500)
    }
  }, [])

  useLenis()
  return (
    <div className="w-full min-h-screen items-center flex justify-center flex-col  relative overflow-hidden bg-blue-900/30">

      <AnimatePresence>
        <AuthModal auth={auth} isAuthModalOpen={isAuthModalOpen} setIsAuthModalOpen={setIsAuthModalOpen} />
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: delay * 1, duration: 0.5, ease: "easeOut" }}
        className="w-full h-full min-h-fit relative  z-[20]">
        <Navbar />
      </motion.div>


      {/* Hero Section */}
      <div className='w-full  md:w-[80%]    relative h-auto pt-[8vh] md:pt-[12vh]  flex py-8 md:py-16 lg:py-24 items-center flex-col rounded-br-[6vw] md:rounded-br-[3vw] overflow-hidden'>

        <BlurFade delay={delay * 1} className="w-full h-full absolute top-0 left-0">
          <Particles count={isMobile ? 20 : 35} maxSize={5} />
        </BlurFade>

        <BlurFade delay={delay * 3} className="w-fit h-fit ">
          <button style={{ fontFamily: 'Inter, sans-serif' }} className='text-gray-300 text-sm md:text-md font-semibold px-3 md:px-4 py-1 relative border-[1px] border-purple-500 mt-5 md:mt-4 mb-4 md:mb-6 shadow-[0_0_25px_rgba(168,85,247,0.6)] rounded-full bg-black/10 flex items-center gap-1 md:gap-2 z-10'>
            Free and Open-source
            <ArrowRight className="h-4 md:h-5 text-purple-500 w-4 md:w-5" />
          </button>
        </BlurFade>

        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: delay * 4, duration: 0.5, ease: "easeOut" }}
          style={{ fontFamily: 'Inter, sans-serif' }} className='text-[#c7cdd7] text-4xl md:text-5xl lg:text-6xl mt-3 md:mt-6 mb-2 md:mb-3 font-bold z-10 text-center px-4'>AI-Powered <AuroraText className="bg-gradient-to-b from-black/30 via-60% via-black/50 to-black/90 text-5xl -translate-y-1  rounded-full px-4 py-2 shadow-[0_0_8px_rgba(0,0,0,0.5)]" colors={['#1E40AF', '#4C1D95', '#2563EB', '#7C3AED']}>Therapy</AuroraText> <br className="min-[500px]:hidden" /> Platform
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: delay * 5, duration: 0.5, ease: "easeOut" }}
          style={{ fontFamily: 'Inter, sans-serif' }} className='text-[#c7cdd7]/60 md:text-lg max-[500px]:text-sm max-[500px]:py-2 font-medium max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[55%] text-center z-10 px-4'>Democratizing mental health care through AI-powered conversations, voice interactions, and video therapy sessions. Available 24/7 with complete privacy control.</motion.div>


        <div className='flex z-10 relative gap-2 md:gap-8 flex-wrap justify-center  max-[500px]:mt-5 min-[500px]:translate-y-10'>
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: delay * 7, duration: 0.5, ease: "easeOut" }}
          >
            <InteractiveHoverButton
              onClick={() => window.location.href = "https://therapai.netlify.app/"}
              style={{ fontFamily: 'Inter, sans-serif' }}
              className='cursor-pointer text-black text-base bg-white md:text-sm font-medium px-3 md:px-8 py-1.5 md:py-2 my-5 md:my-8 shadow-[0_0_25px_rgba(168,85,247,0.6)] rounded-full border border-black/20 flex items-center gap-1 md:gap-2'
            >
              Start Therapy
            </InteractiveHoverButton>

          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: delay * 7, duration: 0.5, ease: "easeOut" }}
            className='cursor-pointer text-white text-base transition-all hover:scale-105 duration-300  md:text-sm font-light px-3 shadow-lg md:px-3 py-1.5 md:py-2 my-5 md:my-8 rounded-full bg-black/30 flex items-center  gap-1 md:gap-2'> <Wand2 className="h-4 md:h-5 w-4 md:w-5" /> Learn More</motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay * 8, duration: 0.5, ease: "easeOut" }}
          className='absolute bg-gradient-to-t from-blue-300/60 to-transparent opacity-80 h-[600px] w-[130px] rounded-full top-0 -translate-y-1/4 rotate-135 left-1/3 z-[-1] blur-[40px]'></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay * 9, duration: 0.5, ease: "easeOut" }}
          className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-transparent via-purple-500/0 to-purple-800/50 [mask-image:linear-gradient(350deg,black,transparent,transparent,black)] rounded-br-[6vw] md:rounded-br-[3vw]" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay * 10, duration: 0.5, ease: "easeOut" }}
          className="w-[60vw] h-[40vw] max-[500px]:w-[80vw] max-[500px]:h-[100vw] rounded-full absolute bottom-0 translate-y-[30%] min-[500px]:translate-y-[53%] opacity-90 bg-[radial-gradient(circle,_white,_#e9d5ff,_#a855f7,_#7e22ce,_#4c1d95,_transparent,transparent)] blur-[84px]" />
      </div>

      <BlurFade delay={delay * 11} className="w-full h-full ">
        <MarqueeDemo />
      </BlurFade>

      <div className='w-[90%] min-h-screen md:h-[80vh] relative   overflow-hidden flex justify-center'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay * 10, duration: 0.5, ease: "easeOut" }}
          className="w-[50vw] h-[40vw] rounded-full absolute top-0 -translate-y-[53%] opacity-90 bg-[radial-gradient(circle,_white,_#e9d5ff,_#a855f7,_#7e22ce,_#4c1d95,_transparent,transparent)] blur-[84px]" />

        <motion.div
          initial={{ opacity: 0, y: -30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}

          transition={{ delay: delay * 11, duration: 0.5, ease: "easeOut" }}
          className="w-full h-full">
          <CompareComponent />
        </motion.div>
      </div>

      <div className='w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] h-auto py-10 md:h-[20vh] relative mt-12 sm:mt-18 md:mt-24 flex flex-col items-center justify-center px-4'>
        <BlurFade delay={delay * 12} className="absolute w-[80vw] md:w-[30vw] h-[30vh] mb-8">
          <Particles count={isMobile ? 20 : 35} maxSize={3} />
        </BlurFade>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay * 13, duration: 0.5, ease: "easeOut" }}
          className='absolute bg-gradient-to-t from-blue-300/60 to-transparent opacity-80 h-[600px] w-[130px] rounded-full top-0 -translate-y-1/3 rotate-90 left-1/3 z-[-1] blur-[40px]'>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: delay * 14, duration: 0.5, ease: "easeOut" }}
          style={{ fontFamily: 'Inter, sans-serif' }}
          className='text-[#c7cdd7] text-4xl sm:text-5xl w-screen md:text-6xl mb-4 md:mb-7 font-semibold tracking-tight text-center'>
          The Mental Health<span style={{ fontFamily: 'Audiowide, cursive' }} className='text-purple-500/80'>Crisis</span>.
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: delay * 15, duration: 0.5, ease: "easeOut" }}
          style={{ fontFamily: 'Inter, sans-serif' }}
          className='text-[#c7cdd7]/60 text-base sm:text-lg w-full md:text-xl font-medium text-center'>
          Mental health disorders affect millions worldwide, yet barriers to care prevent many from getting the help they need.
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: delay * 16, duration: 0.5, ease: "easeOut" }}
        className='w-full h-auto mt-12 sm:mt-18 md:mt-24 flex justify-center items-center relative'>
        <div className='absolute bg-gradient-to-b from-blue-600/60 to-blue-600/20 opacity-50 h-[900px] w-[230px] -translate-y-1/3 rounded-full bottom-0 rotate-225 right-0 z-[-1] blur-[60px]'></div>
        <Gridcomponent />
      </motion.div>


      <div>
        <StandoutSection />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: delay * 16, duration: 0.5, ease: "easeOut" }}
      >
        <Footer />
      </motion.div>


    </div>
  )
}

export default HeroSection