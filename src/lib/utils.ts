/**
 * Utility functions for the wedding invitation website
 */

import { v4 as uuidv4 } from 'uuid';
import { GuestSide, RSVPStatus } from './types';

/**
 * Generate a unique invitation ID
 * @returns A unique 8-character string
 */
export function generateUniqueInviteId(): string {
  return uuidv4().slice(0, 8);
}

/**
 * Format a date for display
 * @param date Date to format
 * @param format Format style ('long' | 'short')
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, format: 'long' | 'short' = 'long'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'long') {
    return dateObj.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  return dateObj.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

/**
 * Get the color class for RSVP status
 * @param status RSVP status
 * @returns Tailwind CSS color class
 */
export function getRSVPStatusColor(status: RSVPStatus): string {
  switch (status) {
    case 'attending':
      return 'text-green-600';
    case 'declined':
      return 'text-red-600';
    case 'pending':
    default:
      return 'text-gray-500';
  }
}

/**
 * Get the background color class for RSVP status
 * @param status RSVP status
 * @returns Tailwind CSS background color class
 */
export function getRSVPStatusBgColor(status: RSVPStatus): string {
  switch (status) {
    case 'attending':
      return 'bg-green-100 text-green-800';
    case 'declined':
      return 'bg-red-100 text-red-800';
    case 'pending':
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

/**
 * Get the display text for a guest side
 * @param side Guest side
 * @returns Display text
 */
export function getGuestSideText(side: GuestSide): string {
  switch (side) {
    case 'bride':
      return 'Bride';
    case 'groom':
      return 'Groom';
    default:
      return 'Unknown';
  }
}

/**
 * Get the display text for RSVP status
 * @param status RSVP status
 * @returns Display text
 */
export function getRSVPStatusText(status: RSVPStatus): string {
  switch (status) {
    case 'attending':
      return 'Attending';
    case 'declined':
      return 'Declined';
    case 'pending':
      return 'Pending';
    default:
      return 'Unknown';
  }
}

/**
 * Copy text to clipboard
 * @param text Text to copy
 * @returns Promise that resolves when text is copied
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback: Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
  }
}

/**
 * Generate Google Calendar URL for an event
 * @param params Event parameters
 * @returns Google Calendar URL
 */
export function generateGoogleCalendarUrl(params: {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
}): string {
  const { title, description, location, startDate, endDate } = params;
  
  // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ)
  const formatDateForGCal = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };
  
  const startDateStr = formatDateForGCal(startDate);
  const endDateStr = formatDateForGCal(endDate);
  
  // Encode parameters
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedLocation = encodeURIComponent(location);
  
  // Build URL
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startDateStr}/${endDateStr}&details=${encodedDescription}&location=${encodedLocation}&sf=true&output=xml`;
}

/**
 * Parse CSV data into an array of objects
 * @param csvText CSV text content
 * @returns Array of objects with headers as keys
 */
export function parseCSV<T>(csvText: string): T[] {
  // Split by lines
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  
  if (lines.length < 2) {
    return [];
  }
  
  // Extract headers
  const headers = lines[0].split(',').map(header => header.trim());
  
  // Parse data rows
  const results: T[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(value => value.trim());
    const obj: Record<string, any> = {};
    
    // Map values to headers
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[j] || '';
    }
    
    results.push(obj as T);
  }
  
  return results;
}

/**
 * Check if the code is running on the client side
 * @returns True if running on client side
 */
export const isClient = typeof window !== 'undefined';

/**
 * Check if the code is running in development mode
 * @returns True if in development mode
 */
export const isDevelopment = process.env.NODE_ENV === 'development';
