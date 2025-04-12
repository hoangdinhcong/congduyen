"use client";

import React from "react";
import { Home, MapPin, Images, Gift, Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const SMALL_SCREEN_BREAKPOINT = 380;

// Custom hook for small screen detection
const useIsSmallScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    // Set initial value immediately
    setIsSmallScreen(window.innerWidth < SMALL_SCREEN_BREAKPOINT);

    const mql = window.matchMedia(`(max-width: ${SMALL_SCREEN_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsSmallScreen(window.innerWidth < SMALL_SCREEN_BREAKPOINT);
    };

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Return null during SSR
  if (typeof window === 'undefined') return null;

  return isSmallScreen;
};

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isSmallScreen = useIsSmallScreen();

  // Handle navigation with hash
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    
    // Special case for home section
    if (section === 'home') {
      router.push('/');
      return;
    }
    
    // For other sections, navigate to the section on the current page
    if (pathname === '/') {
      // If on home page, just scroll to the section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, keep the current path and add the hash
      // This is what fixes the issue - we're using the current pathname
      window.location.href = `${pathname}#${section}`;
    }
  };

  // Don't render anything until we know screen size
  if (isSmallScreen === null) {
    return null;
  }

  // Floating bottom navigation
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 rounded-full bg-white/90 shadow-lg backdrop-blur-md py-3 px-6">
      <div className="flex items-center justify-between">
        <a href="#home" onClick={(e) => handleNavigation(e, 'home')} className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors">
          <Home size={20} />
          {!isSmallScreen && <span className="text-xs mt-1">Trang Chủ</span>}
        </a>
        <a href="#location" onClick={(e) => handleNavigation(e, 'location')} className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors">
          <MapPin size={20} />
          {!isSmallScreen && <span className="text-xs mt-1">Địa Điểm</span>}
        </a>
        <a href="#gallery" onClick={(e) => handleNavigation(e, 'gallery')} className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors">
          <Images size={20} />
          {!isSmallScreen && <span className="text-xs mt-1">Hình Ảnh</span>}
        </a>
        <a href="#gifts" onClick={(e) => handleNavigation(e, 'gifts')} className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors">
          <Gift size={20} />
          {!isSmallScreen && <span className="text-xs mt-1">Quà Tặng</span>}
        </a>
        <a href="#rsvp" onClick={(e) => handleNavigation(e, 'rsvp')} className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors">
          <Heart size={20} />
          {!isSmallScreen && <span className="text-xs mt-1">Xác Nhận</span>}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
