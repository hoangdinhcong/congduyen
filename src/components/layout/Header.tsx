'use client';

import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isDevelopment, setIsDevelopment] = useState(false);
  
  useEffect(() => {
    // Check if we're in development mode
    setIsDevelopment(process.env.NODE_ENV === 'development');
  }, []);
  
  // Don't render the header in production mode
  if (!isDevelopment) return null;
  
  return (
    <header className="py-4 border-b border-gray-100">
      <div className="container-wedding flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold flex items-center gap-2">
          <span className="font-heading">C</span>
          <FaHeart className="text-primary text-sm" />
          <span className="font-heading">D</span>
        </Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/bride" className="hover:text-primary transition-colors">
                Bride
              </Link>
            </li>
            <li>
              <Link href="/groom" className="hover:text-primary transition-colors">
                Groom
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
