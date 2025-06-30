"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <nav className="w-full absolute top-0 z-50 bg-transparent px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20 sm:h-16">
          {/* Left side - Brand */}
          <div className="flex-shrink-0">
            <Link href="/" style={{ fontFamily: 'Audiowide, sans-serif' }} className="text-xl sm:text-2xl text-gray-300 font-bold relative group">
              <span className="inline-block transition-colors duration-300 ease-out group-hover:text-white">
                TherapAI
              </span>
            </Link>
          </div>


          {/* Right side - Auth Buttons */}
          <div style={{ fontFamily: 'Montserrat, sans-serif' }} className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => window.location.href = "https://therapai.netlify.app/"}
              className="no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs sm:text-sm font-semibold leading-6 text-white inline-block"
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(147,51,234,0.6)_0%,rgba(147,51,234,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-purple-900/20 py-0.5 px-3 sm:px-4 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-purple-900/30">
                <span style={{ fontFamily: "Audiowide" }} className="transition-transform cursor-pointer duration-300 group-hover:scale-105">Get Started</span>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-purple-600/0 via-purple-600/90 to-purple-600/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
