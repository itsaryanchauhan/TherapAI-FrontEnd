import React from 'react';
import Sidebar from '@/components/Sidebar';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100 max-w-screen overflow-hidden">
      {/* <div className='w-[10vw]'>
        <Sidebar /> 
      </div>
      <div className='flex-1'> */}
        {children}
      {/* </div> */}
    </div>
  );
}
