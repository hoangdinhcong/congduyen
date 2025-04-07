import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
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
  }, [targetDate]);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-6">
      {timeBlocks.map((block) => (
        <div key={block.label} className="flex flex-col items-center">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 md:p-4 min-w-[70px] md:min-w-[80px] text-center">
            <div className="text-2xl md:text-3xl font-bold text-secondary">
              {block.value.toString().padStart(2, '0')}
            </div>
          </div>
          <div className="text-xs md:text-sm mt-2 text-gray-600">
            {block.label}
          </div>
        </div>
      ))}
    </div>
  );
}
