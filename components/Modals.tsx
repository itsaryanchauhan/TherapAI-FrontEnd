import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Check, Ban, Sparkles, X, MessageSquare } from 'lucide-react';

const transition = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
  filter: { duration: 0.2 }
};

interface ModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  modalStep: 1 | 2 | 3;
  setModalStep: (step: 1 | 2 | 3) => void;
  isModalLoading: boolean;
  modalError: string | null;
  summary: string;
  setSummary: (summary: string) => void;
  interests: string[];
  setInterests: (interests: string[]) => void;
  profileData: {
    name: string;
    twitter_handle: string;
  };
  setProfileData: (data: { name: string; twitter_handle: string }) => void;
  handleUpdateUser: () => void;
  handleSaveSummary: () => void;
  handleSaveInterests: () => void;
  handleInterestToggle: (interest: string) => void;
  INTEREST_OPTIONS: string[];
}

interface CopyModalProps {
  showCopyModal: boolean;
  setShowCopyModal: (show: boolean) => void;
  twitterIdToCopy: string;
  setTwitterIdToCopy: (id: string) => void;
  copyLoading: boolean;
  handleCopyUser: () => void;
  tweetAnalysis: any;
}

interface TrendingModalProps {
  showTrendingModal: boolean;
  setShowTrendingModal: (show: boolean) => void;
  selectedTrend: string | null;
  handleTrendSelect: (trend: string) => void;
  trendingTopics: Array<{
    original_title: string;
    reduced_title: string;
    created_at: string;
  }>;
}

interface ContentInputModalProps {
  showContentInputModal: boolean;
  setShowContentInputModal: (show: boolean) => void;
  customContent: string;
  setCustomContent: (content: string) => void;
  handleSaveContent: () => void;
  selectedOptions: {id: string, price: number}[];
  selectedTone?: string;
  minicText?: string;
  trendText?: string;
}

export const OnboardingModal: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  modalStep,
  setModalStep,
  isModalLoading,
  modalError,
  summary,
  setSummary,
  interests,
  setInterests,
  profileData,
  setProfileData,
  handleUpdateUser,
  handleSaveSummary,
  handleSaveInterests,
  handleInterestToggle,
  INTEREST_OPTIONS
}) => {
  // Track direction for animations
  const [direction, setDirection] = useState(0);
  
  // Animation variants for modal transitions
  const modalVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      filter: "blur(8px)"
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)"
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      filter: "blur(8px)"
    })
  };
  
  // Handler to update step with animation direction
  const handleStepChange = (newStep: 1 | 2 | 3) => {
    setDirection(newStep > modalStep ? 1 : -1);
    setModalStep(newStep);
  };

  // Handle key press for enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (modalStep === 1 && summary?.trim()) {
        setDirection(1);
        handleSaveSummary();
      } else if (modalStep === 2 && interests?.length > 0 && interests?.length <= 3) {
        setDirection(1);
        handleSaveInterests();
      } else if (modalStep === 3 && profileData.name?.trim() && profileData.twitter_handle?.trim()) {
        handleUpdateUser();
      }
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3}}
        className="bg-white p-8 rounded-2xl shadow-2xl w-[500px] max-w-full border border-gray-400 border-dashed relative overflow-hidden"
        onKeyPress={handleKeyPress}
        tabIndex={0}
      >
        {/* Progress indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                modalStep === step ? 'bg-blue-600 scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <AnimatePresence custom={direction} mode="popLayout">
          {modalStep === 1 && (
            <motion.div 
              className="space-y-6"
              key="step1"
              custom={direction}
              variants={modalVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <div className="text-center">
                <h2 style={{fontFamily : "Audiowide"}} className="text-2xl font-bold text-gray-800 mb-2">Tell us about yourself</h2>
                <p className="text-gray-600/60 text-sm">Write carefully - AI will use your summary to personalize your experience and generate relevant content.</p>
              </div>
              <div className="relative">
                <textarea
                  className="w-full min-h-[120px] p-4 shadow-inner bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl text-gray-800 focus:ring-none focus:ring-none focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Write a short summary about yourself..."
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                  maxLength={200}
                  onKeyPress={handleKeyPress}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {summary?.length}/200
                </div>
              </div>
              <div className="flex justify-end">
                <motion.button
                  style={{fontFamily : "Audiowide"}}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setDirection(1);
                    handleSaveSummary();
                  }}
                  disabled={!summary?.trim() || isModalLoading}
                  className="px-6 py-2.5 bg-black border border-dashed border-gray-400 cursor-pointer text-white/80 hover:text-white rounded-xl disabled:opacity-50 transition-all duration-200 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.3)] flex items-center gap-2 font-medium"
                >
                  {isModalLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Next Step
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

          {modalStep === 2 && (
            <motion.div 
              className="space-y-6"
              key="step2"
              custom={direction}
              variants={modalVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <div className="text-center">
                <h2 style={{fontFamily : "Audiowide"}} className="text-2xl font-bold text-gray-800 mb-2">Select your interests</h2>
                <p className="text-gray-600 text-sm">Pick up to 3 interests to help us recommend better content.</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {INTEREST_OPTIONS.map((opt, index) => (
                  <button
                    key={`interest-${opt}-${index}`}
                    type="button"
                    onClick={() => handleInterestToggle(opt)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium
                      ${interests.includes(opt)
                        ? "bg-blue-50 border-blue-600 text-blue-700"
                        : "bg-white border-dashed border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                      }
                      ${interests.length === 3 && !interests.includes(opt) ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                    disabled={interests.length === 3 && !interests.includes(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="flex justify-between items-center pb-3">
                <span className="text-sm text-gray-500">
                  {interests.length}/3 selected
                </span>
                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setDirection(-1);
                      setModalStep(1);
                    }}
                    className="px-3 cursor-pointer py-1.5 bg-gray-100 border border-dashed border-gray-300 text-gray-700 rounded-xl transition-all duration-200 flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    style={{fontFamily : "Audiowide"}}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setDirection(1);
                      handleSaveInterests();
                    }}
                    disabled={interests?.length === 0 || interests?.length > 3 || isModalLoading}
                    className="px-6 py-2.5 bg-black border border-dashed border-gray-400 cursor-pointer text-white/80 hover:text-white rounded-xl disabled:opacity-50 transition-all duration-200 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.3)] flex items-center gap-2 font-medium"
                  >
                    {isModalLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Next Step
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {modalStep === 3 && (
            <motion.div 
              className="space-y-6"
              key="step3"
              custom={direction}
              variants={modalVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <div className="text-center">
                <h2 style={{fontFamily : "Audiowide"}} className="text-2xl font-bold text-gray-800 mb-2">Connect your Twitter</h2>
                <p className="text-gray-600 text-sm">Enter your Twitter handle to get started with content generation.</p>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full shadow-inner p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl text-gray-800 focus:ring-none focus:ring-none focus:border-transparent transition-all duration-200"
                    placeholder="Enter your name..."
                    value={profileData.name}
                    onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={isModalLoading}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    @
                  </div>
                  <input
                    type="text"
                    className="w-full shadow-inner p-4 pl-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl text-gray-800 focus:ring-none focus:ring-none focus:border-transparent transition-all duration-200"
                    placeholder="twitter_handle"
                    value={profileData.twitter_handle}
                    onChange={e => setProfileData({ ...profileData, twitter_handle: e.target.value })}
                    disabled={isModalLoading}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>
              {modalError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {modalError}
                </div>
              )}
              <div className="flex justify-between items-center">
                {!isModalLoading && <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setDirection(-1);
                    setModalStep(2);
                  }}
                  className="px-3 py-1 cursor-pointer bg-gray-100 border border-dashed border-gray-300 text-gray-700 rounded-xl transition-all duration-200 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </motion.button>}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUpdateUser}
                  style={{fontFamily : "Audiowide"}}
                  disabled={!profileData.name?.trim() || !profileData.twitter_handle?.trim() || isModalLoading}
                  className="px-6 py-2.5 ml-auto bg-black cursor-pointer border border-dashed border-gray-400 text-white/80 hover:text-white rounded-xl disabled:opacity-50 transition-all duration-200 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.3)] flex items-center gap-2 font-medium"
                >
                  {isModalLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Save All
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export const CopyModal: React.FC<CopyModalProps> = ({
  showCopyModal,
  setShowCopyModal,
  twitterIdToCopy,
  setTwitterIdToCopy,
  copyLoading,
  handleCopyUser,
  tweetAnalysis
}) => {
  return (
    <AnimatePresence>
      {showCopyModal && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
          onClick={() => setShowCopyModal(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-2xl w-[600px] max-w-full border border-gray-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 style={{fontFamily : "Audiowide"}} className="text-2xl font-bold text-gray-800">Style Mimic</h2>
              <button
                onClick={() => setShowCopyModal(false)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Twitter ID/Handle</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={twitterIdToCopy}
                    onChange={(e) => setTwitterIdToCopy(e.target.value)}
                    className="flex-1 p-3 shadow-inner   bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl text-gray-800 focus:ring-none focus:border-transparent transition-all duration-200"
                    placeholder="Enter Twitter ID or handle"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCopyUser}
                    disabled={copyLoading}
                    className="px-6 py-3 bg-gradient-to-t from-black to-gray-700 text-white rounded-xl cursor-pointer disabled:opacity-50 transition-all duration-200 flex items-center gap-2 font-medium"
                  >
                    {copyLoading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Analyze
                        <Sparkles className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {copyLoading ? (
                <div className="flex items-center justify-center py-10">
                  <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
                  <span className="ml-3 text-gray-600">Analyzing Twitter style...</span>
                </div>
              ) : tweetAnalysis ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl">
                    <p className="whitespace-pre-line text-gray-600">{tweetAnalysis?.analysis}</p>
                  </div>

                  {tweetAnalysis?.posts && tweetAnalysis?.posts?.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium mb-3 text-gray-800">Sample Posts</h4>
                      <div className="space-y-3">
                        {tweetAnalysis?.posts?.slice(0, 3).map((post: any, index: number) => (
                          <div key={`post-${index}`} className="p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl">
                            <p className="text-gray-600">{post?.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const TrendingModal: React.FC<TrendingModalProps> = ({
  showTrendingModal,
  setShowTrendingModal,
  selectedTrend,
  handleTrendSelect,
  trendingTopics
}) => {
  return (
    <AnimatePresence>
      {showTrendingModal && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
          onClick={() => setShowTrendingModal(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='w-fit h-fit bg-white rounded-2xl shadow-2xl'>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl pb-[60px] mask-[linear-gradient(to_top,transparent,black,black,black)] shadow-2xl w-[800px] max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <h2 style={{fontFamily : "Audiowide"}} className="text-2xl font-bold mb-[60px] text-center">Trending Topics</h2>
            <div className="grid grid-cols-3 gap-4">
              {trendingTopics.map((topic, index) => (
                <motion.div
                  key={`trending-${index}`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative rounded-xl p-4 border-2 cursor-pointer transition-all
                    ${selectedTrend === topic.reduced_title 
                      ? "bg-gray-100 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]" 
                      : "bg-gray-50 border-gray-300 border-dashed hover:border-gray-400"
                    }`}
                  onClick={() => handleTrendSelect(topic.reduced_title)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-bold text-lg ${selectedTrend === topic.reduced_title ? "text-black" : "text-gray-700"}`}>
                      {topic.reduced_title}
                    </h3>
                    {selectedTrend === topic.reduced_title && (
                      <div className="bg-gray-500 rounded-full p-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {topic.original_title}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                      {new Date(topic.created_at).toLocaleDateString()}
                    </span>
                    {selectedTrend === topic.reduced_title && (
                      <span className="text-xs font-medium text-gray-600">Selected</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ContentInputModal: React.FC<ContentInputModalProps> = ({
  showContentInputModal,
  setShowContentInputModal,
  customContent,
  setCustomContent,
  handleSaveContent,
  selectedOptions,
  selectedTone,
  minicText,
  trendText
}) => {
  return (
    <AnimatePresence>
      {showContentInputModal && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
          onClick={() => setShowContentInputModal(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-2xl w-[600px] max-w-full border border-gray-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 style={{fontFamily : "Audiowide"}} className="text-2xl font-bold text-gray-800">Custom Content Input</h2>
              <button
                onClick={() => setShowContentInputModal(false)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Add your custom context for tweet generation
                </label>
                <textarea
                  className="w-full min-h-[120px] p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl text-gray-800 focus:ring-none focus:ring-none focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Add specific topics, keywords, or context you want in your tweet..."
                  value={customContent}
                  onChange={e => setCustomContent(e.target.value)}
                  maxLength={300}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {customContent?.length || 0}/300
                </div>
              </div>

              {/* Display currently selected options */}
              <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Current Settings</h3>
                <div className="space-y-2">
                  {selectedOptions.length === 0 ? (
                    <p className="text-xs text-gray-500">No options selected</p>
                  ) : (
                    <ul className="space-y-1">
                      {selectedOptions.map((option, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center">
                          <Check className="w-3 h-3 text-green-500 mr-1" />
                          <span className="font-medium">{option.id}:</span>
                          {option.id === "Style Mimic" && minicText && (
                            <span className="ml-1 text-gray-500 line-clamp-1">{minicText.substring(0, 40)}...</span>
                          )}
                          {option.id === "Personalized Tone" && selectedTone && (
                            <span className="ml-1 text-gray-500">{selectedTone}</span>
                          )}
                          {option.id === "Trending Topics" && trendText && (
                            <span className="ml-1 text-gray-500">{trendText}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveContent}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/20 flex items-center gap-2 font-medium"
              >
                Save & Generate
                <MessageSquare className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};