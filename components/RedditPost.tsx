"use client"

import { ArrowUp, ArrowDown, MessageSquare, Share } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function RedditPost() {
  const [votes, setVotes] = useState(65);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const handleUpvote = () => {
    if (userVote === 'up') {
      setVotes(votes - 1);
      setUserVote(null);
    } else {
      setVotes(userVote === 'down' ? votes + 2 : votes + 1);
      setUserVote('up');
    }
  };

  const handleDownvote = () => {
    if (userVote === 'down') {
      setVotes(votes + 1);
      setUserVote(null);
    } else {
      setVotes(userVote === 'up' ? votes - 2 : votes - 1);
      setUserVote('down');
    }
  };

  return (
    <div className="w-full max-w-2xl h-fit mx-auto bg-white rounded-md border border-gray-200 shadow-sm">
      {/* Post Header */}
      <div className="flex items-center p-2">
        <div className="flex-shrink-0">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full overflow-hidden">
            <Image width={48} height={48} src="https://pbs.twimg.com/media/FZkPOq4XkAEETq8.jpg:large" alt="User avatar" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="ml-2 flex items-center text-xs sm:text-sm">
          <span className="font-medium text-gray-900">u/WinLaptop</span>
          <span className="mx-1 text-gray-500">•</span>
          <span className="text-gray-500">8 hr. ago</span>
        </div>
        <div className="ml-auto">
          <button className="text-gray-500 hover:bg-gray-100 cursor-pointer rounded-full p-1">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Post Title and Content */}
      <div className="px-3 pb-2">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">What is the best therapy web app ever?</h2>
        <p className="text-sm sm:text-base text-gray-800 mb-2">
          Yo, shoutout to the creators of TherapAI — a really promising AI-driven mental wellness tool. ❤️‍🩹 We need more tech like this that genuinely cares about people’s emotional health.\n\nMight be a great resource for our community too. Has anyone else tried it yet? Thoughts?
        </p>

        {/* Tag */}
        <div className="mb-3">
          <span className="inline-block bg-red-500 text-white text-xs font-medium px-2 py-1 sm:px-3 rounded-full">Suggestions</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex flex-wrap items-center px-2 pb-2 gap-2">
        {/* Voting */}
        <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
          <button
            className={`p-1 sm:p-2 ${userVote === 'up' ? 'text-orange-500' : 'text-gray-700'} hover:text-orange-500 cursor-pointer hover:bg-gray-200`}
            onClick={handleUpvote}
          >
            <ArrowUp size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
          <span className="px-1 text-sm font-medium text-gray-900">{votes}</span>
          <button
            className={`p-1 sm:p-2 ${userVote === 'down' ? 'text-purple-500' : 'text-gray-700'} hover:text-purple-500 cursor-pointer hover:bg-gray-200`}
            onClick={handleDownvote}
          >
            <ArrowDown size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>

        {/* Comments */}
        <button className="flex items-center px-2 py-1 sm:px-3 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 cursor-pointer text-xs sm:text-sm">
          <MessageSquare size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="ml-1 font-medium">36</span>
        </button>

        {/* Award */}
        <button className="p-1 sm:p-2 rounded-full text-gray-700 hover:bg-gray-200 cursor-pointer">
          <svg aria-hidden="true" fill="currentColor" height="14" width="14" className="sm:h-4 sm:w-4" icon-name="award-outline" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="m18.66 15.36-2.593-3.885A6.997 6.997 0 1 0 3 8c0 1.22.322 2.42.932 3.476l-2.582 3.87a.961.961 0 0 0-.05 1.017c.168.315.525.51.88.483l2.177-.087.741 1.993c.108.333.41.59.756.64a.994.994 0 0 0 .947-.422l2.67-3.997c.35.026.708.026 1.059 0l2.678 4.01a.98.98 0 0 0 .794.418c.388 0 .761-.255.889-.621l.75-2.022 2.155.086a.976.976 0 0 0 .903-.481.955.955 0 0 0-.039-1.003ZM6.143 17.256c-.208-.557-.343-1.488-.871-1.85-.543-.37-1.485-.126-2.092-.101l1.7-2.547a7.009 7.009 0 0 0 2.992 1.909l-1.73 2.589ZM4.5 8a5.5 5.5 0 1 1 5.5 5.5A5.507 5.507 0 0 1 4.5 8Zm10.241 7.393c-.54.354-.675 1.302-.883 1.863l-1.73-2.59a7.007 7.007 0 0 0 2.992-1.908l1.7 2.547c-.601-.024-1.537-.268-2.079.088Z"></path>
          </svg>
        </button>

        {/* Share */}
        <button className="flex items-center px-2 py-1 sm:px-3 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 cursor-pointer text-xs sm:text-sm">
          <Share size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="ml-1 font-medium">Share</span>
        </button>
      </div>
    </div>
  );
}