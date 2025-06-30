import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Check, X } from 'lucide-react'
import { Option, TweetOptionsProps } from '@/lib/types'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const tones = [
  { id: 'professional', name: 'Professional', description: 'Formal and business-like tone' },
  { id: 'casual', name: 'Casual', description: 'Relaxed and friendly tone' },
  { id: 'humorous', name: 'Humorous', description: 'Fun and witty tone' },
  { id: 'inspirational', name: 'Inspirational', description: 'Motivating and uplifting tone' },
  { id: 'educational', name: 'Educational', description: 'Informative and teaching tone' },
  { id: 'storytelling', name: 'Storytelling', description: 'Narrative and engaging tone' },
  { id: 'controversial', name: 'Controversial', description: 'Thought-provoking tone' },
  { id: 'emotional', name: 'Emotional', description: 'Heartfelt and personal tone' },
  { id: 'technical', name: 'Technical', description: 'Detailed and precise tone' },
  { id: 'sarcastic', name: 'Sarcastic', description: 'Ironic and witty tone' }
];

const ToneSelector: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelect: (tone: string) => void;
  selectedTone?: string;
}> = ({ isOpen, onClose, onSelect, selectedTone }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[1119]"
          onClick={onClose}
        >
          <motion.div
            layoutId="toneSelector"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ 
              layout: { duration: 0.5, ease: "easeInOut" },
              default: { 
                type: "spring",
                stiffness: 500,
                damping: 30
              }
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white/95 backdrop-blur-sm rounded-2xl border border-dashed border-gray-400 p-4 pb-0 shadow-lg z-[1120]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center relative mb-4">
              <motion.div
                className="text-lg text-gray-800 font-semibold bg-gray-200 rounded-md p-2"
                layoutId="tone-personalized-tone"
                transition={{ 
                  layout: { duration: 0.5, ease: "easeInOut" }
                }}
              >
                Personalized Tone
              </motion.div>
              <motion.button 
                onClick={onClose} 
                className="p-1 hover:bg-gray-100 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ 
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 max-h-[400px] mask-[linear-gradient(to_top,transparent,black,black,black)] pb-10 overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>
                {tones.map(tone => (
                  <motion.button
                    key={tone.id}
                    onClick={() => onSelect(tone.id)}
                    className={`p-3 rounded-xl border border-dashed text-left cursor-pointer transition-all ${
                      selectedTone === tone.id 
                        ? 'border-blue-500 bg-blue-50/80 backdrop-blur-sm' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { 
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        delay: 0.03 * tones.findIndex(t => t.id === tone.id)
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.9,
                      transition: { 
                        duration: 0.2,
                        delay: 0.02 * tones.findIndex(t => t.id === tone.id)
                      }
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      transition: { 
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }
                    }}
                  >
                    <h4 style={{ fontFamily: "montserrat" }} className="font-semibold text-gray-800 mb-1">
                      {tone.name}
                    </h4>
                    <p style={{ fontFamily: "montserrat" }} className="text-xs text-gray-500">
                      {tone.description}
                    </p>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const OptionButton: React.FC<{
  item: Option;
  isSelected: boolean;
  styleMimicLoading: boolean;
  styleMimicSuccess: boolean;
  onClick: () => void;
  selectedTone?: string;
  showToneSelector: boolean;
  setShowToneSelector: (show: boolean) => void;
  onToneSelect: (tone: string | undefined) => void;
}> = ({ 
  item, 
  isSelected, 
  styleMimicLoading, 
  styleMimicSuccess, 
  onClick,
  selectedTone,
  showToneSelector,
  setShowToneSelector,
  onToneSelect 
}) => {
  const getBackgroundColor = () => {
    if (item.name === "Style Mimic") {
      if (styleMimicLoading) return "#fbbf24";
      if (styleMimicSuccess) return "#86efac";
      return isSelected ? "#86efac" : "#ffffff";
    }
    return isSelected ? "#86efac" : "#ffffff";
  };

  const handleClick = () => {
    if (item.name === "Personalized Tone") {
      setShowToneSelector(true);
    } else {
      onClick();
    }
  };

  const handleToneSelect = (tone: string) => {
    if (selectedTone === tone) {
      onToneSelect(undefined);
    } else {
      onToneSelect(tone);
    }
    setShowToneSelector(false);
  };

  return (
    <>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <motion.div 
            layoutId={item.name === "Personalized Tone" ? "toneSelector" : undefined}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98, padding: "0.5px" }}
            onClick={handleClick}
            transition={{ 
              layout: { duration: 0.5, ease: "easeInOut" },
              default: { 
                type: "spring",
                stiffness: 500,
                damping: 30
              }
            }}
            className={`w-[40%] cursor-pointer h-[40%] bg-white relative flex items-center shadow-[0px_0px_3px_0px_rgba(0,0,0,0.1)] ${
              isSelected ? "" : "shadow-gray-400"
            } justify-center p-1 border border-gray-400 border-dashed rounded-2xl`}
          >
            <motion.div 
              style={{ fontFamily: "montserrat" }} 
              layoutId={item.name === "Personalized Tone" ? "tone-personalized-tone" : undefined}
              transition={{ 
                layout: { duration: 0.5, ease: "easeInOut" }
              }}
              className='w-full h-full bg-gray-200 rounded-xl flex items-center justify-center font-bold text-md'
            >
              {item.name}
            </motion.div>
            <AnimatePresence mode="wait">
              {item.name === "Personalized Tone" && showToneSelector ? null : (
                <motion.div 
                  style={{ fontFamily: "Audiowide" }} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isSelected ? 1.1 : 1,
                    backgroundColor: getBackgroundColor(),
                  }}
                  exit={{ 
                    opacity: 0,
                    scale: 0.8,
                    transition: { 
                      duration: 0.3,
                      ease: "easeInOut"
                    }
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                  className='absolute top-1 -translate-y-1/2 translate-x-1/2 right-1 w-6 h-6 border border-dashed border-gray-400 z-70 rounded-full flex items-center justify-center font-medium text-black text-[10px]'
                >
                  <AnimatePresence mode="wait">
                    {item.name === "Style Mimic" && styleMimicLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ 
                          opacity: 0, 
                          scale: 0,
                          transition: { duration: 0.2 }
                        }}
                        transition={{ 
                          type: "spring",
                          stiffness: 500,
                          damping: 30
                        }}
                        className="flex items-center justify-center"
                      >
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      </motion.div>
                    ) : isSelected ? (
                      <motion.div
                        key="check"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ 
                          opacity: 0, 
                          scale: 0,
                          transition: { duration: 0.2 }
                        }}
                        transition={{ 
                          type: "spring",
                          stiffness: 500,
                          damping: 30
                        }}
                        className="flex items-center justify-center"
                      >
                        <Check className='w-4 h-4'/>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="price"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ 
                          opacity: 0, 
                          scale: 0,
                          transition: { duration: 0.2 }
                        }}
                        transition={{ 
                          type: "spring",
                          stiffness: 500,
                          damping: 30
                        }}
                        className="flex items-center justify-center"
                      >
                        {item.price}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent 
          className="z-[1220] bg-white/95 backdrop-blur-sm text-gray-800 border border-gray-400 shadow-lg rounded-lg px-3 py-2"
          sideOffset={5}
        >
          <p className="text-xs font-medium">{item.description}</p>
        </TooltipContent>
      </Tooltip>

      {item.name === "Personalized Tone" && (
        <ToneSelector
          isOpen={showToneSelector}
          onClose={() => setShowToneSelector(false)}
          onSelect={handleToneSelect}
          selectedTone={selectedTone}
        />
      )}
    </>
  );
};

const InfoPanel: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, filter: "blur(10px)" }}
    animate={{ opacity: 1, filter: "blur(0px)" }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    style={{ maskImage: "linear-gradient(to bottom,transparent 0%,black, transparent 100%)" }}
    className="w-[40%] flex-col p-2 border-l relative border-dashed h-full border-gray-400 flex items-center justify-center font-bold text-md"
  >
    <motion.div
      style={{ fontFamily: "montserrat" }}
      animate={{
        marginBottom: ["65%", "20%", "-25%", "-70%", "-25%", "20%", "65%"],
      }}
      transition={{
        duration: 15,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        times: [0, 0.2, 0.4, 0.6, 1, 0.8, 0.6, 0.4, 0.2, 0],
      }}
      className='w-full ml-4 text-xs text-gray-800 font-medium p-2 flex flex-col gap-8'
    >
      <p>- Twitter Inspiration helps analyze tweets from your favorite accounts.</p>
      <p>- User Interests option personalizes content based on your selected topics.</p>
      <p>- Recent Trends keeps your tweets relevant with current discussions.</p>
      <p>- Custom Input lets you add your own specific content ideas.</p>
    </motion.div>
  </motion.div>
);

const TweetOptions: React.FC<TweetOptionsProps> = ({    
  options,
  selectedOptions,
  handleClick,
  styleMimicLoading,
  styleMimicSuccess,
  selectedTone,
  showToneSelector,
  setShowToneSelector,
  onToneSelect
}) => {
  return (
    <div className='h-full w-[70%] bg-white -[0_0_20px_rgba(0,0,0,0.25)] z-[70] relative rounded-bl-none rounded-2xl border border-dashed border-gray-400'>
      <div className='w-full h-full flex items-center absolute rounded-2xl px-4 p-2'>
        <div className='w-[60%] h-[80%] gap-4 items-center justify-center flex flex-wrap'>
          {options.map((item, index) => (
            <OptionButton
              key={index}
              item={item}
              isSelected={selectedOptions.some(i => i.id === item.name)}
              styleMimicLoading={styleMimicLoading}
              styleMimicSuccess={styleMimicSuccess}
              onClick={() => handleClick(item.name, item.price)}
              selectedTone={selectedTone}
              showToneSelector={showToneSelector}
              setShowToneSelector={setShowToneSelector}
              onToneSelect={onToneSelect}
            />
          ))}
        </div>
        <InfoPanel />
      </div>
      
      <div className='w-[223px] h-[38%] top-full relative z-70 -[0px_20px_15px_rgba(0,0,0,0.1)] border-t-0 -translate-x-[1px] border-dashed rounded-t-none flex items-center justify-center bg-white rounded-2xl border border-gray-400'>
        <h1 
          style={{ fontFamily: "Audiowide" }} 
          className='text-2xl mb-5 scale-110 rounded-md text-gray-600 font-bold max-w-full text-center flex items-center justify-center'
        >
          Personalize Your Tweet
        </h1>
        <div className='absolute bg-transparent border-l border-t border-dashed border-gray-400 rounded-tl-[20px] shadow-[-0.375rem_-0.375rem_white] overflow-hidden w-4 h-4 top-0 right-0 translate-x-full z-70' />
      </div>
    </div>
  );
};

export default TweetOptions;