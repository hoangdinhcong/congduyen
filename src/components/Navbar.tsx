"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Home, MapPin, Images, Gift, Heart } from "lucide-react";
import Link from "next/link";

const MOBILE_BREAKPOINT = 768

// Custom hook for mobile detection
const useIsMobile = () => {
  // Initialize with null instead of undefined
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    // Set initial value immediately
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Return null during SSR
  if (typeof window === 'undefined') return null

  return isMobile
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't render anything until we know which navbar to show
  if (isMobile === null) {
    return null;
  }

  // Mobile floating bottom navigation
  const MobileNavbar = () => (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 rounded-full bg-white/90 shadow-lg backdrop-blur-md py-3 px-6">
      <div className="flex items-center justify-between">
        <Link href="/#home" className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors">
          <Home size={20} />
          <span className="text-xs mt-1">Trang Chủ</span>
        </Link>
        <Link href="/#location" className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors">
          <MapPin size={20} />
          <span className="text-xs mt-1">Địa Điểm</span>
        </Link>
        <Link href="/#gallery" className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors">
          <Images size={20} />
          <span className="text-xs mt-1">Hình Ảnh</span>
        </Link>
        <Link href="/#gifts" className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors">
          <Gift size={20} />
          <span className="text-xs mt-1">Quà Tặng</span>
        </Link>
        <Link href="/#rsvp" className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors">
          <Heart size={20} />
          <span className="text-xs mt-1">Xác Nhận</span>
        </Link>
      </div>
    </nav>
  );

  // Desktop navigation bar
  const DesktopNavbar = () => (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled
          ? "py-3 bg-white/90 shadow-md backdrop-blur-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center space-x-8 md:space-x-10">
          <Link href="/#home" className="text-sm font-medium hover:text-primary transition-colors">
            Trang Chủ
          </Link>
          <Link href="/#location" className="text-sm font-medium hover:text-primary transition-colors">
            Địa Điểm
          </Link>
          <Link href="/" className="font-serif text-lg tracking-wide text-gray-800 px-4">
            Hoàng Công & Mỹ Duyên
          </Link>
          <Link href="/#gallery" className="text-sm font-medium hover:text-primary transition-colors">
            Hình Ảnh
          </Link>
          <Link href="/#gifts" className="text-sm font-medium hover:text-primary transition-colors">
            Quà Tặng
          </Link>
          <Link href="/#rsvp" className="text-sm font-medium hover:text-primary transition-colors">
            Xác Nhận
          </Link>
        </div>
      </div>
    </nav>
  );

  return isMobile ? <MobileNavbar /> : <DesktopNavbar />;
};

export default Navbar;
