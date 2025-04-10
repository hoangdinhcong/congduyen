/**
 * Utility functions for calendar integrations
 */

/**
 * Generate a Google Calendar event URL with the provided event details
 * 
 * @param title Event title
 * @param description Event description
 * @param location Event location
 * @param startDate Event start date (ISO string)
 * @param endDate Event end date (ISO string)
 * @returns URL string for Google Calendar event creation
 */
export function generateGoogleCalendarUrl(
  title: string,
  description: string,
  location: string,
  startDate: string,
  endDate: string
): string {
  // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ)
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  // Encode parameters for URL
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    location: location,
    dates: `${formattedStartDate}/${formattedEndDate}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
