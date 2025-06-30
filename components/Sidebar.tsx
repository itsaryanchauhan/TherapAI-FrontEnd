"use client"

import React from 'react'
import Link from 'next/link'
import { Twitter, Linkedin, MessageSquare, Send, LogOut } from 'lucide-react'
import { useUser, useClerk } from "@clerk/nextjs"
import { useRouter } from 'next/navigation';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink = ({ href, icon, label }: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 py-2 px-4 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
    >
      <span className="text-white/80">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

const SidebarComponent = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  
  const menuItems = [
    { label: "Twitter", icon: <Twitter size={18} />, href: "/dashboard?platform=twitter" },
    { label: "LinkedIn", icon: <Linkedin size={18} />, href: "/dashboard?platform=linkedin" },
    { label: "Reddit", icon: <MessageSquare size={18} />, href: "/dashboard?platform=reddit" },
    { label: "Discord", icon: <Send size={18} />, href: "/dashboard?platform=discord" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/'); // Redirect to home page after sign out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="h-screen fixed top-0 left-0 w-[10vw] bg-black flex flex-col">
      {/* User Profile */}
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt={user.fullName || "User"} className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-white text-sm">
              {user?.firstName?.charAt(0) || "U"}
            </span>
          )}
        </div>
        <span className="text-white text-sm font-medium">
          {user?.fullName || "User"}
        </span>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 py-4">
        {menuItems.map((item, index) => (
          <SidebarLink 
            key={index} 
            href={item.href} 
            icon={item.icon} 
            label={item.label} 
          />
        ))}
      </div>
      
      {/* Logout */}
      <div 
        className="p-4 border-t border-white/10 text-white/70 hover:text-white hover:bg-red-500/10 cursor-pointer flex items-center gap-3"
        onClick={handleSignOut}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default SidebarComponent;