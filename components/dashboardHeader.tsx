import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut, RefreshCw, Zap } from 'lucide-react'
import BlurFade from './magicui/blur-fade';
import { useClerk } from "@clerk/nextjs"

export default function DashboardHeader({ generating, setGenerating }: { generating: boolean, setGenerating: (generating: boolean) => void }) {
  const { signOut } = useClerk();
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col max-[730px]:hidden md:flex-row max-[1100px]:w-[700px] max-[1200px]:w-[1000px] mx-auto justify-between items-center mb-10 gap-4 md:gap-0 px-4 md:px-0"
  >
    <BlurFade>
      <h1 style={{fontFamily : "Audiowide", textShadow : "1px 1px 3px  rgba(0,0,0,0.6) , -1px -1px 3px  rgba(255,255,255,1)"}} className="text-2xl md:text-5xl font-bold text-gray-100   text-center md:text-left  ">
        Content Dashboard
      </h1>
    </BlurFade>

    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => signOut()}
        className="px-4 md:px-6 py-2 md:py-3 bg-white border border-dashed border-gray-400 hover:bg-gray-50 rounded-xl text-gray-700 text-sm md:text-base font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 md:gap-3 transition-all cursor-pointer w-full sm:w-auto"
      >
        <LogOut className="w-4 h-4 md:w-5 md:h-5" />
        Logout
      </motion.button>
    </div>
  </motion.div> 
  )
}