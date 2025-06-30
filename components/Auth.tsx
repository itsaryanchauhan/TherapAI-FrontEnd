"use client"

import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[90%] max-w-md bg-black/30 border border-purple-500/30 rounded-2xl p-8 shadow-[0_0_35px_rgba(168,85,247,0.2)] relative overflow-hidden">
        
        {/* Background effects */}
        <div className="absolute bg-gradient-to-t from-purple-500/20 to-transparent opacity-50 h-[400px] w-[100px] rounded-full top-0 -translate-y-1/4 rotate-45 left-1/3 blur-[40px]" />
        <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-transparent via-purple-500/5 to-purple-800/20 [mask-image:linear-gradient(350deg,black,transparent,transparent,black)]" />

        <h2 className="text-2xl font-bold text-white/90 mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form className="space-y-4">
          <div className="space-y-2">
            <input 
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-purple-500/30 text-white/80 placeholder:text-white/40 focus:outline-none focus:border-purple-500/60"
            />
          </div>

          <div className="space-y-2">
            <input 
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-purple-500/30 text-white/80 placeholder:text-white/40 focus:outline-none focus:border-purple-500/60"
            />
          </div>

          <button className="w-full bg-white text-black font-medium py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-white/90 transition-colors">
            {isLogin ? "Sign In" : "Sign Up"}
            <ArrowRight className="w-4 h-4 text-purple-500" />
          </button>
        </form>

        <p className="text-white/60 text-sm text-center mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-400 hover:text-purple-300"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Auth