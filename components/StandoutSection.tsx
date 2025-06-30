"use client"
import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, delay } from 'framer-motion'
import Particles from './Particles'

const StandoutSection = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const sectionRef = useRef(null) // New ref for the whole section
  const textRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const delay = 0.04

  useEffect(() => {
    setIsClient(true)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500)
    }
    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-20% 0px -20% 0px" // Trigger when section is 20% in view
  })

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start end", "end start"]
  })

  const items = [
    {
      id: 'ai-chat',
      icon: '🧠',
      label: 'AI Therapy',
      color: 'bg-purple-500',
      position: { top: isMobile ? '5%' : '10%', left: isMobile ? '5%' : '20%' },
      rotation: -15,
      initialX: -100,
      initialY: -10,
      path: [
        { x: -100, y: -100 },
        { x: -75, y: -80 },
        { x: -50, y: -50 },
        { x: 0, y: 0 }
      ]
    },
    {
      id: 'voice',
      icon: '🎙️',
      label: 'Voice Sessions',
      color: 'bg-blue-600',
      position: { top: isMobile ? '10%' : '15%', right: isMobile ? '5%' : '25%' },
      rotation: isMobile ? 0 : 15,
      initialX: 100,
      initialY: -100,
      path: [
        { x: 100, y: -100 },
        { x: 80, y: -80 },
        { x: 50, y: -40 },
        { x: 0, y: 0 }
      ]
    },
    {
      id: 'video',
      icon: '�',
      label: 'Video Therapy',
      color: 'bg-pink-500',
      position: { bottom: isMobile ? '5%' : '50%', left: isMobile ? '5%' : '15%' },
      rotation: 10,
      initialX: -100,
      initialY: -60,
      path: [
        { x: -100, y: -60 },
        { x: -75, y: -45 },
        { x: -40, y: -25 },
        { x: 0, y: 0 }
      ]
    },
    {
      id: 'available',
      icon: '⏰',
      label: '24/7 Available',
      color: 'bg-black',
      position: { top: '25%', right: isMobile ? '35%' : '15%' },
      rotation: isMobile ? 20 : -10,
      initialX: 100,
      initialY: 70,
      path: [
        { x: 100, y: 70 },
        { x: 80, y: 55 },
        { x: 40, y: 30 },
        { x: 0, y: 0 }
      ]
    },
    {
      id: 'privacy',
      icon: '🔒',
      label: 'Privacy First',
      color: 'bg-green-600',
      position: { bottom: isMobile ? '25%' : '20%', right: isMobile ? '45%' : '20%' },
      rotation: isMobile ? 20 : -5,
      initialX: 100,
      initialY: 100,
      path: [
        { x: 100, y: 100 },
        { x: 75, y: 75 },
        { x: 40, y: 40 },
        { x: 0, y: 0 }
      ]
    },
    {
      id: 'affordable',
      icon: '💰',
      label: 'Affordable',
      color: 'bg-orange-500',
      position: { bottom: isMobile ? '20%' : '15%', left: isMobile ? '65%' : '25%' },
      rotation: isMobile ? -10 : 5,
      initialX: -100,
      initialY: 100,
      path: [
        { x: -100, y: 100 },
        { x: -75, y: 75 },
        { x: -40, y: 40 },
        { x: 0, y: 0 }
      ]
    }
  ]

  const words = [
    "TherapAI", "helps", "individuals", "and", "organizations", "access",
    "quality", "mental", "health", "support", "through", "AI-powered",
    "therapy", "sessions", "designed", "for", "everyone"
  ];


  return (
    <section ref={sectionRef} className="w-screen h-[80vh] mt-[3vh] md:mt-[10vh]  relative flex items-center justify-center overflow-hidden">
      <Particles count={isMobile ? 20 : 40} maxSize={3} />
      {/* Background effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay * 17, duration: 0.5, ease: "easeOut" }}
        className="w-[60vw] h-[40vw] rounded-full absolute bottom-0 translate-y-[53%] opacity-80 bg-[radial-gradient(circle,_white,_#e9d5ff,_#a855f7,_#7e22ce,_#4c1d95,_transparent,transparent)] blur-[84px]" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay * 18, duration: 0.5, ease: "easeOut" }}
        className='absolute bg-gradient-to-t from-blue-700/60 to-transparent opacity-80 h-[400px] w-[130px] rounded-full  -translate-y-1/4 rotate-125 left-0 z-[-1] blur-[40px]'></motion.div>


      {/* Floating items */}
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className={`absolute bg-gradient-to-br md:scale-100 scale-90 from-white to-white/70 shadow-md z-[50] backdrop-blur-sm rounded-full px-2 py-1 cursor-pointer
            border border-${item.color}/20 hover:border-${item.color}/40 transition-colors
            shadow-lg hover:shadow-xl`}
          style={{
            ...item.position,
            width: 'auto',
            minWidth: '120px',
            transform: `rotate(${item.rotation}deg)`,
            rotate: `${item.rotation}deg`
          }}
          initial={{
            opacity: 0,
            x: item.initialX,
            y: item.initialY,
            filter: "blur(5px)"
          }}
          animate={isInView ? {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            transition: {
              duration: 1,
              delay: 0.2 * index, // More pronounced staggering
              type: "spring",
              stiffness: 25,
              damping: 18,
              mass: 1.2,
              ease: "easeOut"
            }
          } : {
            opacity: 0,
            x: item.initialX,
            y: item.initialY,
            filter: "blur(5px)"
          }}

        >
          <div className="flex items-center gap-3">
            <span className={`rounded-full text-2xl ${item.color}`}>{item.icon}</span>
            <motion.span
              className="font-medium z-[999]"
              initial={{ filter: "blur(5px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.8 + (0.1 * index) }}
            >
              {item.label}
            </motion.span>
          </div>
        </motion.div>
      ))}

      {/* Center content */}
      <motion.div
        ref={textRef}
        className="text-center max-w-2xl px-6 z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <h2
          className="text-3xl md:text-5xl font-medium mb-6 flex flex-wrap justify-center gap-x-2"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              style={{
                color: useTransform(
                  scrollYProgress,
                  [0, (i / words.length) * 0.75],
                  ["#6B7280", word == "connection" ? "#8B5CF6" : "#ffffff"]
                ),
                filter: useTransform(
                  scrollYProgress,
                  [0, (i / words.length) * 0.75],
                  ["blur(5px)", "blur(0px)"]
                ),
                fontFamily: word == "connection" ? "Audiowide, sans-serif" : "Inter, sans-serif",
                textShadow: word == "connection" ? "0 0 2px #8B5CF6" : ""
              }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </h2>
      </motion.div>
    </section>
  )
}

export default StandoutSection
