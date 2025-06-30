"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface ParticlesProps {
  count?: number;
  maxSize?: number;
  blur?: boolean;
}

function Particles({ count = 15, maxSize = 3, blur = false }: ParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * maxSize + 1,
    }));
    
    setParticles(newParticles);
  }, [count, maxSize]);

  return (
    <>
      {particles.map(particle => (
        <motion.div 
          key={particle.id}
          className={`absolute rounded-full bg-white/60 ${blur ? 'blur-[1px]' : ''}`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: `${particle.x}%`,
            left: `${particle.y}%`, 
          }}
          animate={{
            x: [0, Math.random() * 20 - 10],
            y: [0, Math.random() * 20 - 10],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  )
}

export default Particles
