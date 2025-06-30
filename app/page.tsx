import HeroSection from "@/components/HeroSection";
import { Suspense } from 'react'

export default function Home() {  

  return (
    <div className="w-full min-h-screen ">
      <Suspense fallback={<div>Loading...</div>}>
      <HeroSection />
      </Suspense>
    </div>
  );
}

