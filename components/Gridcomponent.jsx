"use client"

import React from 'react'
import { OrbitingCircles } from './magicui/orbiting-circles'
import InfiniteScroll from './InfiniteScroll/InfiniteScroll'
import SocialGrowthComponent from './Social';


function Gridcomponent() {
  const items = [
    {
      name: "Dr. Prerna Kapoor (Clinical Psychologist)",
      content: "TherapAI bridges the gap in mental health access, offering timely, stigma-free support to individuals who might otherwise hesitate to seek help."
    },
    {
      name: "Dr. Raghav Mehta (Psychiatrist & Researcher)",
      content: "AI-powered platforms like TherapAI can complement traditional therapy by providing early intervention, emotional check-ins, and continuous care."
    },
    {
      name: "Dr. Neha Verma (Therapist & Mental Health Advocate)",
      content: "TherapAI helps normalize mental health conversations, especially among younger demographics, by making support accessible and conversational."
    },
    {
      name: "Dr. Aarav Sinha (Neuroscientist, Mental Wellness Consultant)",
      content: "By combining neuroscience and AI, TherapAI offers a scalable approach to mental wellness that’s both adaptive and personalized."
    },
    {
      name: "Dr. Meera Iyer (Counseling Psychologist)",
      content: "Platforms like TherapAI empower users with on-demand tools for self-reflection, emotional regulation, and resilience building."
    },
    {
      name: "Dr. Kabir Anand (Organizational Psychologist)",
      content: "TherapAI supports mental well-being in workplaces, helping organizations foster a healthier, more empathetic culture."
    },
    {
      name: "Dr. Sana Malik (Digital Mental Health Specialist)",
      content: "With proper ethical design, TherapAI can revolutionize how underserved populations receive mental health care, especially in remote areas."
    },
    {
      name: "Dr. Ishaan Roy (Behavioral Therapist)",
      content: "The beauty of TherapAI lies in its ability to listen without judgment and guide users through evidence-based therapeutic frameworks."
    }
  ];

  return (
    <div className="w-full max-w-[80%]  mx-auto grid grid-cols-1 gap-6 mb-20 relative">

      {/* <div className="absolute bg-gradient-to-t top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 from-blue-600/70 to-transparent opacity-80 h-[400px] w-[400px] rounded-full  rotate-15  z-[-1] blur-[60px]"></div> */}



      {/* Top element - full width */}
      <div className="w-full h-[400px] bg-black/70 rounded-2xl border-4 border-gray-700/20 shadow-lg overflow-hidden relative">
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
          <SocialGrowthComponent />

        </div>
      </div>

      {/* Bottom row with 60-40 ratio */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* 60% width element */}
        <div className="md:col-span-3 h-[400px] bg-black/40 rounded-2xl border-2 border-white/10 shadow-lg overflow-hidden relative">
          <div className='flex flex-col justify-start items-start absolute bottom-6 left-6 right-6 z-50'>
            <h1 style={{ fontFamily: 'Audiowide', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }} className='text-white text-4xl justify-start font-medium'>Mental Health <span style={{ textShadow: '0 0px 8px rgba(168,85,247,0.5)' }} className='text-purple-500'>Experts</span></h1>
            <p className='text-white/60 text-lg font-light mt-2'>See what professionals say about AI-powered therapy.</p>
          </div>
          <div className="relative flex h-full w-full flex-col items-center justify-center ">
            <InfiniteScroll
              items={items}
              isTilted={true}
              tiltDirection='left'
              autoplay={true}
              autoplaySpeed={0.5}
              autoplayDirection="down"
              pauseOnHover={true}
            />
          </div>
        </div>

        {/* 40% width element */}
        <div className="md:col-span-2 flex justify-center items-center relative h-[400px] bg-black/40 flex-col p-8 rounded-2xl border border-white/10 shadow-lg overflow-hidden">
          <div className="w-[100%] h-[100%] rounded-full z-[-1] absolute bottom-0 translate-y-[63%] opacity-70 bg-[radial-gradient(circle,_white,_#e9d5ff,_#a855f7,_#7e22ce,_#4c1d95,_transparent,transparent)] blur-[54px]" />

          <div className='flex flex-col justify-start items-start absolute top-8 left-6 right-6 '>
            <h1 style={{ fontFamily: 'Audiowide', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }} className='text-white text-4xl justify-start font-medium'><span style={{ textShadow: '0 0px 8px rgba(168,85,247,0.5)' }} className='text-purple-500'>24/7</span>Available</h1>
            <p className='text-white/60 text-lg font-light mt-3'>Your mental health doesn't wait for office hours. TherapAI is always here.</p>
          </div>
          <div className='absolute flex items-center z-10 justify-center w-full h-full top-1/2 '>
            <OrbitingCircles iconSize={40} radius={160} col={"fill-black/30"} className='grayscale-50 brightness-50'>
              <img src="/Linkedin.svg" alt="LinkedIn" width={40} height={40} />
              <img src="/X.svg" alt="LinkedIn" width={40} height={40} className='invert-75' />
              <img src="/Reddit.svg" alt="LinkedIn" width={40} height={40} />
              <img src="/discord.svg" alt="LinkedIn" width={40} height={40} />
              <img src="/ph.svg" alt="LinkedIn" width={40} height={40} />
              <img src="/threads.png" alt="LinkedIn" width={40} height={40} />

            </OrbitingCircles>
            <OrbitingCircles iconSize={30} radius={100} reverse speed={2} className='brightness-75 grayscale-25' col={"fill-black/40"} >
              <img src="/Linkedin.svg" alt="LinkedIn" />
              <img src="/X.svg" alt="LinkedIn" className='invert-75' />
              <img src="/Reddit.svg" alt="LinkedIn" />
              <img src="/discord.svg" alt="LinkedIn" />
              <img src="/ph.svg" alt="LinkedIn" />
            </OrbitingCircles>

            <OrbitingCircles iconSize={30} radius={50} speed={1.4} col={"fill-black/50"} >
              <img src="/Linkedin.svg" alt="LinkedIn" />
              <img src="/X.svg" alt="LinkedIn" className='invert-75' />
              <img src="/Reddit.svg" alt="LinkedIn" />
              <img src="/discord.svg" alt="LinkedIn" />
            </OrbitingCircles>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Gridcomponent