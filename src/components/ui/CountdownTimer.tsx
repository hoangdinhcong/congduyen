'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

type CountdownTimerProps = {
  targetDate: string; // ISO date string
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isFlipping, setIsFlipping] = useState<Record<string, boolean>>({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });
  
  // Use ref to keep track of previous values without triggering re-renders
  const previousTimeLeftRef = useRef<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  // Store isFlipping in a ref to avoid dependency issues
  const isFlippingRef = useRef(isFlipping);
  
  // Update the ref whenever isFlipping changes
  useEffect(() => {
    isFlippingRef.current = isFlipping;
  }, [isFlipping]);
  
  // Memoize the flip animation trigger to avoid recreating it on each render
  const triggerFlipAnimation = useCallback((key: string) => {
    setTimeout(() => {
      setIsFlipping(prev => ({ ...prev, [key]: false }));
    }, 600); // Duration of flip animation
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        const newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };

        // Check which values have changed to trigger flip animation
        const newIsFlipping = { ...isFlippingRef.current };
        let shouldUpdateFlipping = false;
        
        Object.keys(newTimeLeft).forEach((key) => {
          const typedKey = key as keyof TimeLeft;
          if (newTimeLeft[typedKey] !== previousTimeLeftRef.current[typedKey]) {
            newIsFlipping[key] = true;
            shouldUpdateFlipping = true;
            
            // Schedule resetting the flip state
            triggerFlipAnimation(key);
          }
        });

        // Only update isFlipping state if something changed
        if (shouldUpdateFlipping) {
          setIsFlipping(newIsFlipping);
        }
        
        setTimeLeft(newTimeLeft);
        previousTimeLeftRef.current = { ...newTimeLeft };
      } else {
        // If the date has passed, set all values to 0
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Then update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Clean up on unmount
    return () => clearInterval(timer);
  }, [targetDate, triggerFlipAnimation]); // triggerFlipAnimation is memoized so it won't cause re-renders

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days, key: 'days' },
    { label: 'Hours', value: timeLeft.hours, key: 'hours' },
    { label: 'Minutes', value: timeLeft.minutes, key: 'minutes' },
    { label: 'Seconds', value: timeLeft.seconds, key: 'seconds' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {timeBlocks.map((block) => (
        <div key={block.key} className="flex flex-col items-center">
          <div 
            className={`bg-white border-2 border-primary-light rounded-lg shadow-md p-3 md:p-4 min-w-[70px] md:min-w-[90px] text-center 
              ${isFlipping[block.key] ? 'animate-flip' : ''} 
              transition-all duration-300 hover:shadow-lg hover:border-primary`}
          >
            <div className="text-2xl md:text-3xl font-bold text-secondary">
              {block.value.toString().padStart(2, '0')}
            </div>
          </div>
          <div className="text-xs md:text-sm mt-2 text-gray-600 font-medium">
            {block.label}
          </div>
        </div>
      ))}
    </div>
  );
}
