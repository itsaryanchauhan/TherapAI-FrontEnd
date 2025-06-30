"use client"

import { useEffect, useState } from "react";
import { useSignUp, useSignIn, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, Mail, Lock, User, AlertCircle } from "lucide-react";


interface AuthModalProps {
  onClose?: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (isAuthModalOpen: boolean) => void;
  auth: string | null;
}

const AuthModal = ({ isAuthModalOpen, setIsAuthModalOpen }: AuthModalProps) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const [isSignInView, setIsSignInView] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams()
  const user = useUser()
  let auth = null


  useEffect(() => {
    auth = searchParams.get('auth');
    if (auth === '2') {
      setIsSignInView(false);
      setError("You need to create an account first");
    } else {
      setIsSignInView(true);
      setError("");
    }
  }, [searchParams]);


  if (!isLoaded || !isSignInLoaded || !isAuthModalOpen) {
    return null;
  }




  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLoaded) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await signUp.create({
        emailAddress,
        password,
      });
      await signUp.update({
        unsafeMetadata: { name }
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      console.error("Sign-up error:", err);
      setError(err?.errors?.[0]?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isSignInLoaded) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete" && result.createdSessionId) {
        await setActive?.({ session: result.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Sign-in error:", err);
      setError(err?.errors?.[0]?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerification(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        const session = signUp.createdSessionId;
        if (session) {
          await setActive?.({ session });
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err?.errors?.[0]?.message || "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  }

  const signUpWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError('');

      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: `${window.location.origin}/dashboard`,
      });
    } catch (err: any) {
      console.error("Google sign-up error:", err);
      setError(err?.errors?.[0]?.message || "Failed to sign up with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError('');

      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: `${window.location.origin}/dashboard`,
      });
    } catch (err: any) {
      console.error("Google sign-in error:", err);
      if (err?.errors?.[0]?.message?.includes("not found")) {
        setError("Account not found. Please sign up first.");
        setIsSignInView(false);
      } else {
        setError(err?.errors?.[0]?.message || "Failed to sign in with Google");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    router.push(window.location.pathname);
    setIsAuthModalOpen(false);
  };


  if (user?.user?.emailAddresses[0]?.emailAddress) {
    return null
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-[5px] flex items-center justify-center z-40"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        exit={{ scale: 0.95, opacity: 0, filter: "blur(10px)" }}
        className="bg-gradient-to-br overflow-hidden from-[#1a1a1a] to-[#0d0d0d] p-6 rounded-3xl relative max-w-md w-full 
                 shadow-[20px_20px_60px_#0a0a0a,-20px_-20px_60px_#262626]
                 border border-white/10 z-50"
        onClick={e => e.stopPropagation()}
      >
        <div id="clerk-captcha" className="hidden" />

        <div className={`absolute  ${isSignInView ? "-top-[20vw] -right-[30vw]" : "-top-[10vw] -left-[30vw]"} w-[50vw] h-[40vw] z-[1] rounded-full opacity-50 blur-[84px] transition-all duration-300`}
          style={{
            background: isSignInView ?
              'radial-gradient(circle, white, #e9d5ff, #a855f7, #7e22ce, #4c1d95, transparent, transparent)' :
              'radial-gradient(circle, white, #dbeafe, #3b82f6, #1d4ed8, #1e3a8a, transparent, transparent)'
          }}
        />

        <div className="flex justify-between items-center mb-8 z-[60] relative">
          <div style={{ fontFamily: 'Audiowide, sans-serif' }} className="text-xl text-gray-300 font-bold relative group">
            <span style={{ textShadow: isSignInView ? "0 0 4px #a855f7" : "0 0 4px #000" }} className="inline-block transition-colors duration-300 ease-out group-hover:text-white">
              TherapAI
            </span>
          </div>
          {!pendingVerification && (
            <button
              onClick={() => setIsSignInView(!isSignInView)}
              className="text-sm cursor-pointer text-gray-400 hover:text-white transition-colors"
            >
              {isSignInView ? (
                <>Need an account? <span className="text-purple-500">Sign Up</span></>
              ) : (
                <>Already have an account? <span className="text-blue-500">Sign In</span></>
              )}
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3 z-[60] relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => isSignInView ? signInWithGoogle() : signUpWithGoogle()}
            className="w-full flex items-center justify-center gap-3 bg-[#1a1a1a] text-white p-3 rounded-2xl
                     transition-all duration-300 shadow-[inset_4px_4px_8px_#0a0a0a,inset_-4px_-4px_8px_#2a2a2a]"
            disabled={isLoading}
          >
            <img src="/google.png" alt="Google" className="w-6 h-5" />
            <span className="font-medium">Continue with Google</span>
          </motion.button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-b from-[#1a1a1a] rounded-full to-[#0d0d0d] text-gray-500 font-medium">
                or continue with email
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!pendingVerification ? (
              <motion.form
                key="auth-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={isSignInView ? handleSignIn : handleSignUp}
                className="space-y-4"
              >
                {!isSignInView && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="block text-gray-300 text-sm font-medium mb-1.5">Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full  bg-[#1a1a1a] p-3 pl-11 rounded-xl text-white 
                                 shadow-[inset_4px_4px_8px_#0a0a0a,inset_-4px_-4px_8px_#2a2a2a]
                                 focus:shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#2a2a2a]
                                 border border-white/5 focus:border-0 transition-all outline-none"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full bg-[#1a1a1a] p-3 pl-11 rounded-xl text-white 
                               shadow-[inset_4px_4px_8px_#0a0a0a,inset_-4px_-4px_8px_#2a2a2a]
                               focus:shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#2a2a2a]
                               border border-white/5 focus:border-0 transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#1a1a1a] p-3 pl-11 pr-12 rounded-xl text-white
                               shadow-[inset_4px_4px_8px_#0a0a0a,inset_-4px_-4px_8px_#2a2a2a]
                               focus:shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#2a2a2a]
                               border border-white/5 focus:border-0 transition-all outline-none"
                      required
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      <motion.div
                        animate={{ rotate: showPassword ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </motion.div>
                    </motion.button>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm font-medium flex items-center gap-2"
                  >
                    <AlertCircle className="h-5 w-5" />
                    {error}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  style={{
                    background: isSignInView ?
                      'linear-gradient(to bottom, black, #4c1d95)' :
                      'linear-gradient(to bottom, black, #1e3a8a)'
                  }}
                  className={`w-full text-white p-3 rounded-xl
                            transition-all font-medium text-sm
                           shadow-lg  disabled:opacity-70 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2 mt-6 ${isSignInView ? "shadow-purple-500/20" : "shadow-blue-600/20"}`}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                  {isSignInView ? "Sign In" : "Sign Up"}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="verification-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleVerification}
                className="space-y-4"
              >
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Verification Code</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full bg-[#1a1a1a] p-3 pl-11 rounded-xl text-white
                               shadow-[inset_4px_4px_8px_#0a0a0a,inset_-4px_-4px_8px_#2a2a2a]
                               focus:shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#2a2a2a]
                               border border-white/5 focus:border-0 transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm font-medium flex items-center gap-2"
                  >
                    <AlertCircle className="h-5 w-5" />
                    {error}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  style={{
                    background: 'linear-gradient(to bottom, black, #1e3a8a)'
                  }}
                  className="w-full text-white p-3 rounded-xl
                           transition-all font-medium text-sm
                           shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2 mt-6"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                  Complete Sign Up
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;
