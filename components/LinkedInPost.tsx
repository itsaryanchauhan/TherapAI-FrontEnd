"use client"

import { MessageSquare, Send, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function LinkedInPost() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow overflow-hidden border border-gray-200 h-fit pb-4">
      {/* Post Header */}
      <div className="flex items-start p-3 sm:p-4">
        <div className="flex-shrink-0">
          <Image
            src="https://pbs.twimg.com/media/FZkPOq4XkAEETq8.jpg:large"
            alt="Profile"
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer hover:opacity-80"
          />
        </div>
        <div className="ml-2 sm:ml-3 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm sm:text-base text-gray-900 hover:text-blue-600 cursor-pointer">John Smith</p>
              <p className="text-xs sm:text-sm text-gray-500">Tech Enthusiast | Software Developer</p>
              <p className="text-xs sm:text-sm text-gray-500">2h ago</p>
            </div>
            <button className="text-gray-400 hover:bg-gray-100 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full">
              <span className="font-bold text-xl sm:text-2xl">...</span>
            </button>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-3 sm:px-4 pb-2 text-gray-800">
        <p className="mb-3 text-sm sm:text-base">
          🧠 Just came across TherapAI — an AI-powered mental health platform that feels like a real breakthrough. Making therapy more accessible and stigma-free is the kind of innovation we need. Huge respect to the team behind this! #AIforGood #MentalHealthMatters
        </p>

        <p className="text-blue-600 mb-3 cursor-pointer text-xs sm:text-sm">
          <span className="hover:bg-blue-50 inline-block">#AI</span>{" "}
          <span className="hover:bg-blue-50 inline-block">#Innovation</span>{" "}
          <span className="hover:bg-blue-50 inline-block">#Tech</span>{" "}
          <span className="hover:bg-blue-50 inline-block">#Development</span>
        </p>
      </div>

      {/* Reactions & Stats */}
      <div className="px-3 sm:px-4 py-2 border-t border-gray-200">
        <div className="flex items-center mb-2">
          <div className="flex -space-x-1">
            <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full flex items-center justify-center">
              <img
                src="https://static.licdn.com/aero-v1/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                alt="like"
                width={20}
                height={20}
                className="w-full h-full"
              />
            </div>
          </div>
          <span className="text-gray-500 text-xs sm:text-sm ml-2 hover:text-blue-600 cursor-pointer">127</span>
          <div className="ml-auto flex text-gray-500 text-xs sm:text-sm">
            <span className="hover:text-blue-600 cursor-pointer">8 comments</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex border-t border-gray-200 pt-2 sm:pt-3">
        <button
          className={`flex items-center justify-center py-1 sm:py-2 flex-1 hover:bg-gray-100 transition-colors ${liked ? 'text-blue-600' : 'text-gray-500'}`}
          onClick={() => setLiked(!liked)}
        >
          <ThumbsUp size={18} className={liked ? 'fill-blue-600' : ''} />
          <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium">Like</span>
        </button>

        <button className="flex items-center justify-center py-1 sm:py-2 flex-1 text-gray-500 hover:bg-gray-100 transition-colors">
          <MessageSquare size={18} />
          <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium">Comment</span>
        </button>

        <button className="flex items-center justify-center py-1 sm:py-2 flex-1 text-gray-500 hover:bg-gray-100 transition-colors">
          <Send size={18} />
          <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium">Share</span>
        </button>
      </div>
    </div>
  );
}