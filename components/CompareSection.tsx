"use client"

import React, { useState, useEffect } from 'react'
import TwitterPost from './TwitterPost'
import LinkedInPost from './LinkedInPost'
import RedditPost from './RedditPost'
import { motion, AnimatePresence } from 'framer-motion'
import RightSection from './RightSection'
import useStore from '@/app/store/store'
import { BorderBeam } from './magicui/border-beam'
import DimSheet from './DimSheet'

function CompareComponent() {
  const [activeTab, setActiveTab] = useState<'twitter' | 'linkedin' | 'reddit'>('linkedin')

  const Hovered = useStore((state) => state.Hovered)
  const setHovered = useStore((state) => state.setHovered)

  useEffect(() => {
    const tabs: ('twitter' | 'linkedin' | 'reddit')[] = ['twitter', 'linkedin', 'reddit']
    const currentIndex = tabs.indexOf(activeTab)

    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % tabs.length
      setActiveTab(tabs[nextIndex])
    }, 5000)

    return () => clearTimeout(timer)
  }, [activeTab])

  const variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, filter: "blur(8px)", transition: { duration: 0.3 } }
  }

  return (
    <div className="w-full max-w-[95%] md:max-w-[90%] lg:max-w-[85%] h-fit py-6 sm:py-10 md:py-12 lg:py-16 mx-auto mt-10 sm:mt-12 md:mt-16 lg:mt-20 relative z-10">
      <div className="absolute bg-gradient-to-t from-purple-500/30 to-transparent opacity-70 h-[280px] sm:h-[320px] md:h-[360px] w-[100px] sm:w-[120px] md:w-[130px] rounded-full -top-8 sm:-top-12 md:-top-16 -left-5 sm:-left-8 md:-left-10 z-[-1] blur-[30px] sm:blur-[40px] md:blur-[50px]"></div>
      <div className="absolute bg-gradient-to-b from-blue-500/30 to-transparent opacity-70 h-[180px] sm:h-[220px] md:h-[260px] w-[100px] sm:w-[130px] md:w-[150px] rounded-full -bottom-5 sm:-bottom-8 md:-bottom-10 -right-5 sm:-right-8 md:-right-10 z-[-1] blur-[40px] sm:blur-[50px] md:blur-[60px]"></div>

      <div className="backdrop-blur-md bg-white/5 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(124,58,237,0.2)] sm:shadow-[0_0_35px_rgba(124,58,237,0.3)] border border-white/20 relative">
        <AnimatePresence>
          {Hovered && (
            <motion.div
              key={Hovered}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
              transition={{ delay: 0.2, duration: 0.3, ease: "easeInOut" }}
              className={`absolute top-1/2 scale-160 md:scale-140   
                ${Hovered === "Right" ? "md:left-1/4 left-1/2  top-1/4 md:top-1/2" : "md:right-1/4 right-1/2 top-3/4 md:top-1/2"} 
                ${Hovered === "Right" ? "md:-translate-x-1/2 -translate-x-1/2" : "md:translate-x-1/2 translate-x-1/2"} 
                -translate-y-1/2 rounded-lg mask-[linear-gradient(to_bottom,black,transparent)] 
                flex items-center justify-center z-20 pointer-events-none`}
            >
              <BorderBeam />
              <div className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 flex flex-col bg-black shadow-[0_0_20px_rgba(0,0,0,0.6)] sm:shadow-[0_0_35px_rgba(0,0,0,0.8)] border-2 border-black/30">
                <span style={{ fontFamily: "sans-serif" }} className="text-white font-medium text-sm sm:text-base md:text-lg">{Hovered === "Left" ? "" : ""} Feel heard.</span>
                <span style={{ fontFamily: "Audiowide" }} className="text-purple-500 font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl"> Feel Better</span>
                <span style={{ fontFamily: "Audiowide" }} className="text-white text-center font-medium text-md sm:text-xl md:text-2xl"><span className='text-purple-500'>{Hovered === "Left" ? "" : ""}</span></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row h-auto md:h-[420px] lg:h-[500px] relative">
          {/* Left Section - 100% on mobile, 50% on md and up */}
          <motion.div
            onMouseEnter={() => setHovered("Left")}
            onMouseLeave={() => setHovered(null)}
            className="w-full md:w-1/2 flex flex-col md:flex-row relative"
            animate={{
              filter: Hovered === "Right" ? "blur(15px)" : "blur(0px)"
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            {Hovered === "Right" && (
              <DimSheet Hovered={Hovered} />
            )}
            {/* Sidebar - full width on mobile, 25% on md and up */}
            <div className="w-full md:w-[25%] bg-gray-800/50 border-b md:border-b-0 md:border-r border-white/10">
              <div className="flex flex-row md:flex-col h-auto md:h-full pt-0 md:pt-4">
                {['twitter', 'linkedin', 'reddit'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as 'twitter' | 'linkedin' | 'reddit')}
                    className={`py-2.5 md:py-4 px-3 md:px-5 flex-1 md:max-h-[50px] md:flex-auto cursor-pointer text-center md:text-left transition-all duration-300 ${activeTab === tab
                      ? 'bg-purple-600/20 border-b-4 md:border-b-0 md:border-l-4 border-purple-500 text-white font-medium'
                      : 'text-gray-300 hover:bg-gray-700/50 border-b-4 md:border-b-0 md:border-l-4 border-transparent'
                      }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Content - full width on mobile, 75% on md and up */}
            <div className="w-full md:w-[75%] bg-gray-900/30 p-3 sm:p-4 md:p-5 overflow-y-auto relative h-[360px] md:h-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'twitter' && (
                  <motion.div
                    key="twitter"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="h-full flex items-center justify-center"
                  >
                    <TwitterPost onMainScreen={true} />
                  </motion.div>
                )}
                {activeTab === 'linkedin' && (
                  <motion.div
                    key="linkedin"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="h-full flex items-center justify-center"
                  >
                    <LinkedInPost />
                  </motion.div>
                )}
                {activeTab === 'reddit' && (
                  <motion.div
                    key="reddit"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="h-full flex items-center justify-center"
                  >
                    <RedditPost />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Section - 100% on mobile, 50% on md and up */}
          <motion.div
            onMouseEnter={() => setHovered("Right")}
            onMouseLeave={() => setHovered(null)}
            className="w-full md:w-1/2 bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center relative overflow-hidden h-[360px] md:h-auto"
            animate={{
              filter: Hovered === "Left" ? "blur(15px)" : "blur(0px)"
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            {Hovered === "Left" && (
              <DimSheet Hovered={Hovered} />
            )}
            <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] rounded-full absolute opacity-30 bg-[radial-gradient(circle,_white,_#e9d5ff,_#a855f7,_#7e22ce,_transparent)] blur-[50px] sm:blur-[60px] md:blur-[80px]"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center relative z-10 w-full h-full"
            >
              <RightSection />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CompareComponent