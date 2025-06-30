import React, { useState } from "react";
import { ImageUp } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from "framer-motion";

interface TweetAnalysisProps {
  onAnalysisComplete?: (result: string) => void;
}

const TweetAnalysis: React.FC<TweetAnalysisProps> = ({ onAnalysisComplete }) => {
  const [tweetInputMode, setTweetInputMode] = useState<"text" | "image">("image");
  const [tweetText, setTweetText] = useState<string>("");
  const [tweetImage, setTweetImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      let textToAnalyze = tweetText;

      // If image mode, extract text first
      if (tweetInputMode === 'image' && tweetImage) {
        const formData = new FormData();
        formData.append('file', tweetImage);
        formData.append('apikey', 'K83690111788957');
        formData.append('language', 'eng');

        const response = await fetch('https://api.ocr.space/parse/image', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.OCRExitCode === 1 && data.ParsedResults && data.ParsedResults.length > 0) {
          const parsedText = data.ParsedResults[0].ParsedText;
          textToAnalyze = parsedText
            .split('\n')
            .map((line: string) => line?.trim())
            .filter((line: string) => line)
            .join('\n');
          setExtractedText(textToAnalyze);
        } else {
          setAnalysisResult('Failed to extract text from image');
          setIsAnalyzing(false);
          return;
        }
      }

      // Analyze with Gemini
      try {
        const genAI = new GoogleGenerativeAI("AIzaSyC3D7YqkkEM-XBhY3caz3TtkAjnFWausEQ");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `Analyze this tweet and provide insights about its tone, sentiment, and potential impact. how can i replicate this type of tweet in upto 20 words, yeah the whole thing i want from you should be in 20 words, not even 21 words: ${textToAnalyze}`;

        const result = await model.generateContent(prompt);
        const analysis = result.response.text();
        setAnalysisResult(analysis);
        onAnalysisComplete?.(analysis);
      } catch (error: any) {
        if (error.message?.includes('429')) {
          setAnalysisResult('Rate limit exceeded. Please try again in a minute.');
        } else {
          setAnalysisResult('Error analyzing tweet');
        }
        console.error('AI Error:', error);
      }
    } catch (error) {
      setAnalysisResult('Error processing request');
      console.error('Error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult("");
    setTweetText("");
    setTweetImage(null);
    setExtractedText("");
  };

  return (
    <motion.div
      className="relative w-[40%] bg-white border gap-2 border-gray-400 border-dashed translate-y-4 rounded-[20px] rounded-tl-none flex flex-col z-60 items-center justify-start h-[270px] pt-4 pb-4"    >
      {/* Toggle Switch on the left, black when on */}
      <motion.div
        className="flex items-center gap-2 mb-3 self-start ml-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className={`text-xs font-semibold ${tweetInputMode === 'text' ? 'text-black' : 'text-gray-400'}`}>Text</span>
        <motion.button
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${tweetInputMode === 'image' ? 'bg-black' : 'bg-gray-300'}`}
          onClick={() => setTweetInputMode(tweetInputMode === 'text' ? 'image' : 'text')}
          style={{ outline: 'none', border: 'none', padding: 0 }}
          type="button"
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
            animate={{
              x: tweetInputMode === 'image' ? 24 : 0,
              boxShadow: tweetInputMode === 'image'
                ? "0px 2px 8px 0px rgba(0,0,0,0.18)"
                : "0px 1px 4px 0px rgba(0,0,0,0.10)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.button>
        <span className={`text-xs font-semibold ${tweetInputMode === 'image' ? 'text-black' : 'text-gray-400'}`}>Image</span>
      </motion.div>

      {/* Main Space: Show result if available, else show input/upload */}
      <div className="flex-1 flex flex-col w-full items-center justify-center">
        <AnimatePresence mode="wait">
          {analysisResult ? (
            <motion.div
              key="result"
              className="flex flex-col items-center overflow-hidden w-full h-full justify-center"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <motion.div
                className="mt-2 p-4 h-fit bg-gray-100 overflow-hidden rounded-lg w-4/5 max-h-[120px]"
                initial={{ scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 180, damping: 18 }}
              >
                <h3 className="text-sm font-semibold mb-2">Analysis Result:</h3>
                <motion.p
                  className="text-sm text-gray-700 whitespace-pre-line"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                >
                  {analysisResult}
                </motion.p>
              </motion.div>
              <motion.button
                style={{ fontFamily: "fantasy" }}
                className="w-2/5 h-10 bg-black shadow-lg shadow-gray-400/50 font-light rounded-[20px] text-white text-xl mt-4"
                onClick={handleReset}
                disabled={isAnalyzing}
                whileHover={{ scale: 1.04, backgroundColor: "#222" }}
                whileTap={{ scale: 0.97 }}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze More"}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="input"
              className="flex flex-col w-full items-center justify-center"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              style={{ fontFamily: "montserrat" }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <AnimatePresence mode="wait">
                {tweetInputMode === 'text' ? (
                  <motion.div
                    key="text"
                    className="w-4/5 rounded-md h-7/10 min-h-[140px] bg-gray-200 border border-gray-400 border-dashed flex items-center justify-center p-2 mb-3"
                    initial={{ opacity: 0, x: -20, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  >
                    <textarea
                      className="w-full h-full bg-transparent resize-none outline-none border-none text-gray-800 p-2 rounded-md"
                      placeholder="Paste or type tweet text here..."
                      value={tweetText}
                      onChange={e => setTweetText(e.target.value)}
                      style={{ fontFamily: "inherit", fontSize: "1rem" }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="image"
                    className="w-4/5 rounded-lg h-7/10 min-h-[140px] bg-gray-200 border border-gray-400 border-dashed flex flex-col items-center justify-center p-2 mb-3"
                    initial={{ opacity: 0, x: 20, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  >
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0.7 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        <ImageUp className="mb-2" />
                      </motion.div>
                      <span  style={{fontFamily: "montserrat"}} className="text-xs text-gray-500 mb-1">Upload Tweet Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        style={{ fontFamily: "montserrat" }}
                        onChange={e => {
                          if (e.target.files && e.target.files[0]) {
                            setTweetImage(e.target.files[0]);
                          }
                        }}
                      />
                      <AnimatePresence>
                        {tweetImage && (
                          <motion.span
                            className="text-xs text-gray-700 mt-1"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18 }}
                          >
                            {tweetImage.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                style={{ fontFamily: "fantasy" }}
                className="w-2/5 h-10 bg-black/85 shadow-lg shadow-gray-400/50 font-light rounded-md text-white text-xl mt-auto mb-2"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                whileHover={{ scale: 1.04, backgroundColor: "#111" }}
                whileTap={{ scale: 0.97 }}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Tweet"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute top-0 left-0 -translate-y-[99%] -translate-x-[0.5px] border-gray-400 border-dashed border border-b-0 bg-white rounded-t-[20px] z-70 w-[226px] h-[28%]"
      >
        <div className="w-full h-full relative flex items-center justify-center">
          <motion.h1
            style={{ fontFamily: "Audiowide" }}
            className="text-2xl rounded-md font-bold text-gray-600"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.22, type: "spring", stiffness: 180, damping: 18 }}
          >
            Tweet Analysis
          </motion.h1>
          <motion.div
            className="bottom-0 right-0 translate-x-full absolute z-70 bg-transparent h-4 w-4 border-b border-l border-dashed rounded-bl-[20px] border-gray-400 shadow-[-0.375rem_0.375rem_white]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.28, type: "spring", stiffness: 180, damping: 18 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TweetAnalysis; 