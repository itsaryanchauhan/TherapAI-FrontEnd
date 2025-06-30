"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react'

function TwitterPost({ loading = false, profileData, onMainScreen = false, tweet }: { loading?: boolean, profileData?: any, onMainScreen?: boolean, tweet: string | null }) {
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const defaultPost = {
    text: "Just discovered TherapAI — a new platform using AI for mental health support. It’s a cool concept that actually feels thoughtful, not gimmicky. Especially love the idea of making therapy less intimidating for first-timers.\n\nWould recommend giving it a try or following their journey if you’re into AI + mental health solutions.",
    likes: "2345",
    retweets: "150",
    views: "245",
    replies: "12",
    timestamp: "2025-05-05T10:18:31.000Z"
  };

  const post = profileData?.topPosts?.[0] || defaultPost;

  const [likeCount, setLikeCount] = useState(parseInt(post.likes) || 2345);
  const [retweetCount, setRetweetCount] = useState(parseInt(post.retweets) || 150);
  const [replyCount, setReplyCount] = useState(parseInt(post.replies) || 12);
  const [viewCount, setViewCount] = useState(parseInt(post.views) || 245);

  const avatar = tweet ? profileData?.twitter_data[0]?.pfp_url : "https://pbs.twimg.com/media/FZkPOq4XkAEETq8.jpg:large";
  const name = tweet ? profileData?.twitter_data[0]?.username : "Random Dude";
  const username = tweet ? profileData?.twitter_handle : "randomuser";
  const isVerified = tweet ? profileData?.twitter_data[0]?.isVerified : false;

  useEffect(() => {
    if (profileData) {
      setLikeCount(parseInt(post.likes) || 2345);
      setRetweetCount(parseInt(post.retweets) || 150);
      setReplyCount(parseInt(post.replies) || 12);
      setViewCount(parseInt(post.views) || 245);
    }
  }, [profileData, post.likes, post.retweets, post.replies, post.views]);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleRetweet = () => {
    if (retweeted) {
      setRetweetCount(retweetCount - 1);
    } else {
      setRetweetCount(retweetCount + 1);
    }
    setRetweeted(!retweeted);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className={`w-full max-w-xl bg-black ${onMainScreen ? "" : 'min-w-[570px] min-h-[195px]'} rounded-xl border h-fit border-gray-800 p-3 sm:p-4 text-white`}>
      {loading ? (
        <div className="animate-pulse">
          {/* Skeleton User Info Section */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-600 animate-shimmer"></div>
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <div className="h-4 w-24 bg-gray-600 rounded animate-shimmer"></div>
                <div className="h-4 w-16 bg-gray-600 rounded animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Skeleton Post Content */}
          <div className="mb-3 sm:mb-4 space-y-2">
            <div className="h-4 bg-gray-600 rounded w-full animate-shimmer"></div>
            <div className="h-4 bg-gray-600 rounded w-3/4 animate-shimmer"></div>
            <div className="h-4 bg-gray-600 rounded w-1/2 animate-shimmer"></div>
          </div>

          {/* Skeleton Engagement Stats */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-800">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-6 w-12 bg-gray-600 rounded animate-shimmer"></div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* User Info Section */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 overflow-hidden">
              <Image
                src={avatar}
                alt="User avatar"
                className="w-full h-full object-cover"
                width={48}
                height={48}
              />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-1 sm:gap-2">
                <h4 className="font-bold text-white text-sm sm:text-base">{name}</h4>
                {isVerified && (
                  <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-4 h-4 text-blue-500 fill-current">
                    <g>
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                    </g>
                  </svg>
                )}
                <span className="text-gray-400 text-xs sm:text-sm">@{username}</span>
                <span className="text-gray-400 text-xs sm:text-sm hidden xs:inline">· 2h</span>
                <div className="ml-auto flex items-center gap-1 sm:gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 32" aria-hidden="true" className="w-6 sm:w-7 hover:text-blue-400 transition-colors hover:bg-blue-900/30 rounded-full p-1 cursor-pointer">
                    <g>
                      <path d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466" fill="currentColor"></path>
                    </g>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 sm:w-7 sm:h-7 hover:text-blue-400 transition-colors hover:bg-blue-900/30 rounded-full p-1 cursor-pointer">
                    <g>
                      <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill="currentColor"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="mb-3 sm:mb-4">
            <p className="text-white text-sm min-h-[40px] sm:text-base">
              {tweet ? tweet : post?.text}
            </p>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center justify-between text-gray-400 pt-2 border-t border-gray-800 text-xs sm:text-sm">
            <button className="flex items-center gap-1 sm:gap-2 hover:text-blue-400 transition-colors">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 sm:w-7 sm:h-7 hover:text-blue-400 transition-colors hover:bg-blue-900/30 rounded-full p-1">
                <g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" fill="currentColor" /></g>
              </svg>
              <span>{replyCount}</span>
            </button>

            <button
              className={`flex items-center gap-1 sm:gap-2 ${retweeted ? 'text-green-400' : ''} hover:text-green-400 transition-colors`}
              onClick={handleRetweet}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 sm:w-7 sm:h-7 hover:text-green-400 transition-colors hover:bg-green-900/30 rounded-full p-1">
                <g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" fill="currentColor" /></g>
              </svg>
              <span>{retweetCount}</span>
            </button>

            <button
              className={`flex items-center gap-1 sm:gap-2 ${liked ? 'text-pink-400' : ''} hover:text-pink-400 transition-colors`}
              onClick={handleLike}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 sm:w-7 sm:h-7 hover:text-pink-400 transition-colors hover:bg-pink-900/30 rounded-full p-1" >
                <g><path d={liked ? "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91z" : "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"} fill="currentColor" /></g>
              </svg>
              <span>{likeCount}</span>
            </button>

            <button className="flex items-center gap-1 sm:gap-2 hover:text-blue-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 sm:w-7 sm:h-7 hover:text-blue-400 transition-colors hover:bg-blue-900/30 rounded-full p-1">
                <g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" fill="currentColor" /></g>
              </svg>
              <span>{viewCount}</span>
            </button>

            <div className='flex items-center gap-1 sm:gap-2'>
              <button
                className={`flex items-center ${bookmarked ? 'text-blue-400' : ''} hover:text-blue-400 transition-colors`}
                onClick={handleBookmark}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 sm:w-7 sm:h-7 hover:text-blue-400 transition-colors hover:bg-blue-900/30 rounded-full p-1">
                  <g><path d={bookmarked ? "M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z" : "M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"} fill="currentColor" /></g>
                </svg>
              </button>
              <button className="flex items-center hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 sm:w-7 sm:h-7 hover:text-blue-400 transition-colors hover:bg-blue-900/30 rounded-full p-1">
                  <g><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" fill="currentColor" /></g>
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TwitterPost
