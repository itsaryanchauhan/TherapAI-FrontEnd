"use client"

import { motion } from 'framer-motion'
import React from 'react'

const Footer = () => {
  const delay = 0.04
  return (
    <>
      <footer className="w-[90vw] mx-auto rounded-t-4xl overflow-hidden bg-black text-white py-8 shadow-[0px_-5px_50px_rgba(139,92,246,0.6)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-lg sm:text-xl font-bold mb-3">About Us</h3>
              <p className="text-gray-400 text-sm sm:text-base max-w-xs">Democratizing mental health care through AI-powered therapy sessions and complete privacy control.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-lg sm:text-xl font-bold mb-3">Contact</h3>
              <p className="text-gray-400 text-sm sm:text-base">Email: info@TherapAI.com</p>
              <p className="text-gray-400 text-sm sm:text-base">Phone: (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-lg sm:text-xl font-bold mb-3">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">GitHub</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm sm:text-base">© 2024 TherapAI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <motion.div
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: delay * 16, duration: 0.5, ease: "easeOut" }}
        className="w-full h-[20vh] sm:h-[25vh] md:h-[30vh] flex items-center bg-black mask-[linear-gradient(to_top,transparent,black_40%)] justify-center relative overflow-hidden">
        <h1
          style={{
            fontFamily: 'Audiowide, cursive',
            WebkitTextStroke: '0.1px rgba(255,255,255,0.1)',
          }}
          className="relative z-10 max-[500px]:text-5xl  sm:text-6xl  md:text-6xl lg:text-8xl xl:text-[10vw] 2xl:text-[12vw] text-black font-bold tracking-wider"
        >
          TherapAI
        </h1>
      </motion.div>
    </>
  )
}

export default Footer
