"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useStore from '../app/store/store'

const RightSection = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const { Hovered } = useStore()

  // Sample data for the bars - normal data
  const normalData = [
    { month: 'Jan', value: 30 },
    { month: 'Feb', value: 45 },
    { month: 'Mar', value: 35 },
    { month: 'Apr', value: 25 },
    { month: 'May', value: 40 },
    { month: 'Jun', value: 60 },
    { month: 'Jul', value: 50 },
  ]

  // Gradually increasing data for when hovered is "Right"
  const increasingData = [
    { month: 'Jan', value: 30 },
    { month: 'Feb', value: 40 },
    { month: 'Mar', value: 50 },
    { month: 'Apr', value: 60 },
    { month: 'May', value: 70 },
    { month: 'Jun', value: 80 },
    { month: 'Jul', value: 90 },
  ]

  // Use the appropriate data based on hover state
  const data = Hovered === "Right" ? increasingData : normalData

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full h-full"
      >
        <motion.div 
          className="bg-black/20 backdrop-blur-[8px] p-6 border border-white/10 h-full w-full rounded-lg"
          whileHover={{ boxShadow: '0 0 25px rgba(168,85,247,0.3)' }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full flex flex-col">
            
            <div className="flex-1 flex items-end justify-between relative min-h-[300px]">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-white/70 pr-2">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>
              
              {/* Horizontal grid lines */}
              <div className="absolute left-8 right-4 top-0 h-full flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-white/5 w-full"></div>
                ))}
              </div>
              
              {/* Bars container */}
              <div className="ml-8 flex-1 flex items-end justify-between h-[250px] relative pt-6">
                {data.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center z-20 justify-end relative h-full"
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <motion.div 
                      className="w-6 sm:w-10 rounded-t-md relative   cursor-pointer"
                      style={{ 
                        height: `${item.value}%`,
                        minHeight: '4px',
                        maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${item.value}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {/* Glass base with lighter purple */}
                      <div className="absolute inset-0 bg-purple-400/20 backdrop-blur-[12px]"></div>
                      
                      {/* Darker purple border */}
                      <div className="absolute inset-0 border border-purple-700/40 rounded-t-md"></div>
                      
                      {/* Glass shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-purple-300/20"></div>
                      
                      {/* Top highlight */}
                      <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/50 to-transparent"></div>
                      
                      {/* Purple glow */}
                      <div className="absolute inset-0 bg-purple-500/30 blur-[3px]"></div>
                      {/* Tooltip */}
                      {hoveredBar === index && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-purple-900/80 backdrop-blur-xl text-white px-3 py-2 rounded text-xs whitespace-nowrap border border-purple-500/40 z-10 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                          <div className="font-bold">{item.month}</div>
                          <div>Value: {item.value}</div>
                        </div>
                      )}
                    </motion.div>
                    <div className="text-xs text-white/80 mt-2">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default RightSection
