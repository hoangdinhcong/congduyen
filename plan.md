# Wedding Invitation Website Implementation Plan

This document outlines the steps to build the elegant wedding invitation website with personalized links and an admin panel.

1.  **Project Setup & Basic Layout:**
    *   Ensure Next.js project with App Router is set up.
    *   Integrate Supabase client configuration securely using environment variables.
    *   Install and configure Tailwind CSS according to the design spec (colors, fonts).
    *   Establish the basic folder structure (`app`, `components`, `lib`, `api` or Route Handlers).
    *   Create the main `layout.tsx` including font loading.
    *   **Status:** Done

2.  **Database Setup (Supabase):**
    *   Define and create the `guests` table in Supabase using the specified schema (`id`, `name`, `side`, `tags`, `unique_invite_id`, `rsvp_status`, `created_at`, `updated_at`).
    *   **Status:** Done

3.  **Static Content Pages & Base Views:**
    *   Implement the single-page structure (`app/page.tsx`, `app/bride/page.tsx`, `app/groom/page.tsx`).
    *   Create reusable components for each content section (Hero with Timer, Invitation, Parents, Event Details with Maps, Schedule, Gallery, Gift Info, Contact).
    *   Populate sections with placeholder content and apply initial styling.
    *   Implement the logic for the base views (`/`, `/bride`, `/groom`) to show the main content and the "Use personalized link to RSVP" message.
    *   **Status:** Done

4.  **Admin Panel - Authentication:**
    *   Create the route group `app/(admin)/host`.
    *   Implement a login page/component within the `/host` route.
    *   Create a Route Handler or API route for handling login. Use `bcrypt` to compare the submitted password against a securely stored hash (environment variable).
    *   Implement middleware or route protection to secure all routes under `/host`.
    *   Manage authentication state (e.g., using cookies or a simple state management solution).
    *   **Status:** Done

5.  **Admin Panel - Dashboard:**
    *   Create the dashboard page (`app/(admin)/host/page.tsx`).
    *   Develop a Route Handler to fetch aggregate RSVP statistics (`total`, `attending`, `declined`, `pending` counts, possibly grouped by `side`) from the Supabase `guests` table.
    *   Display these statistics clearly on the dashboard, potentially using simple cards or charts.
    *   **Status:** Done

6.  **Admin Panel - Guest List Management UI:**
    *   Create the guest management page (`app/(admin)/host/guests/page.tsx`).
    *   Design the UI including:
        *   A table to display guests with columns (Name, Side, Tags, RSVP Status, Link).
        *   Filtering controls (by Side, Tag, Status).
        *   Sorting options (by Name, Status).
        *   A "Copy Link" button for each guest.
        *   An "Add Guest" button/modal trigger.
        *   A CSV import section/button.
    *   **Status:** Done

7.  **Admin Panel - Guest List API & Logic:**
    *   Create Route Handlers for:
        *   `GET /api/guests`: Fetch guests with filtering/sorting parameters.
        *   `POST /api/guests`: Add a new guest (auto-generate `unique_invite_id`).
        *   `PUT /api/guests/[id]`: Update guest details (Name, Tags).
        *   `PATCH /api/guests/[id]/rsvp`: Update only the RSVP status.
        *   `POST /api/guests/import`: Handle CSV upload, parse data, validate, and insert new guests (auto-generating `unique_invite_id`). Provide a downloadable template link/info.
    *   Implement the client-side logic to interact with these endpoints for displaying, adding, editing, updating RSVP, and importing guests.
    *   **Status:** Done

8.  **Personalized Invitation Route & Greeting:**
    *   Create the dynamic route `app/invite/[uniqueGuestId]/page.tsx`.
    *   Implement server-side data fetching (`getServerSideProps` or equivalent in App Router) to retrieve guest data from Supabase based on the `uniqueGuestId` parameter. Handle cases where the ID is invalid.
    *   Display the personalized welcome message (e.g., "Welcome, [Guest Name]!") before showing the main invitation content. A modal could work well here.
    *   Pass guest data down to the RSVP component.
    *   **Status:** Done

9.  **Personalized RSVP Component & Logic:**
    *   Create a specific RSVP component displayed only on the `/invite/[uniqueGuestId]` page.
    *   This component should display the guest's name and the "Attend" / "Decline" buttons.
    *   Create a Route Handler (`PATCH /api/rsvp/[uniqueGuestId]`) to receive the RSVP choice ('attending' or 'declined') and update the corresponding guest record in Supabase.
    *   Implement client-side logic to handle button clicks, call the API endpoint, and provide immediate visual feedback (success/error messages, updating the UI state).
    *   **Status:** Done

10. **Styling, Polish & Refinement:**
    *   Apply the final elegant styling using Tailwind CSS, adhering strictly to the color palette, typography, and layout guidelines.
    *   Ensure mobile-first responsiveness across all pages and components.
    *   Add subtle animations (e.g., fade-ins on scroll) and interaction feedback (hover/active states).
    *   Optimize all images (format, size).
    *   Implement the countdown timer. - **Done** (via HeroSection integration)
    *   Embed interactive maps.
    *   Ensure the QR code for gifts is displayed correctly if applicable.
    *   **Status:** In Progress

11. **UI/UX Improvements:**
    *   Remove the "both" option from GuestSide to simplify guest categorization.
    *   Replace all alert() calls with elegant toast notifications for better user experience.
    *   Ensure consistent feedback for user actions across the application.
    *   **Status:** Done

12. **Guest Management Enhancements:**
    *   Implement bulk actions for guest list management:
        *   Add multi-select functionality with checkboxes
        *   Add bulk delete option for selected guests
        *   Add bulk update for guest side and RSVP status
    *   Improve toast notifications:
        *   Use color-coded toasts based on status (red for errors, green for success)
        *   Position toasts in the bottom-right corner for better visibility
    *   **Status:** Done

13. **UI Refinements & Visual Enhancements:**
    *   Implement nicer confirmation dialogs to replace standard browser confirmations
    *   Add smooth table animations for guest list operations (add, update, delete)
    *   Replace default loading indicators with elegant, branded loading spinners
    *   Update the favicon with a heart icon to match the wedding theme
    *   **Status:** Done

14. **Testing, Accessibility & Deployment:**
    *   Conduct thorough testing:
        *   Guest flow (receiving link, viewing info, RSVPing).
        *   Admin flow (login, dashboard stats, adding, importing, editing, filtering guests).
        *   Responsiveness on various devices.
        *   Error handling.
    *   Perform accessibility checks (WCAG 2.1 AA) - color contrast, keyboard navigation, semantic HTML, alt text.
    *   Deploy the application to Vercel.
    *   Configure environment variables (Supabase keys, login password hash) in Vercel.
    *   Final performance checks.
    *   **Status:** Pending

15. **Vietnamese Localization & Content Updates:**
    *   Update all invitation information with Vietnamese text
    *   Replace bride and groom names with correct Vietnamese names
    *   Update venue information with correct Vietnamese address
    *   Update parents' information with correct Vietnamese names
    *   Remove Wedding Day Schedule and Registry sections
    *   Translate remaining sections (RSVP, Contact Us, etc.) to Vietnamese
    *   Update venue name to "Trung Tâm Tiệc Cưới Nguyên Đình"
    *   **Status:** Done

16. **Media & Visual Improvements:**
    *   Update gallery section with images from /public/gallery folder
    *   Replace frontpage hero image with hero.jpg
    *   Add floating RSVP button for quick response without scrolling
    *   Add a schedule/timeline section. - **Done**
    *   Add a photo gallery section. - **Done**
    *   **Status:** In Progress

17. **UI/UX Enhancements & Responsive Design:**
   *   Set max-width for popular screen sizes while maintaining mobile-first approach
   *   Display invitation header only in development mode, not in production
   *   Update Gift section:
       *   Remove cash option and update subtitle
       *   Add copy info button functionality to copy account number
   *   Add 3 fixed floating buttons in bottom center:
       *   Response: Show RSVP modal instead of scrolling down
       *   Send gift: Show modal with banking QR code and info
       *   Send reaction: Create party popper animation from left and right
   *   **Status:** Done

18. **Floating Button Improvements:**
   *   Remove the old floating RSVP button to avoid duplication with the new action buttons
   *   Enhance responsive design for floating action buttons:
       *   Display only icons on small screens to save space
       *   Show icon and text on larger screens
   *   **Status:** Done

19. **Anonymous RSVP Feature:**
   *   Create a new component for anonymous RSVP submissions
   *   Add form fields for guest name, email, and RSVP status
   *   Implement backend API endpoint to handle anonymous RSVP submissions
   *   Update database schema to flag anonymous submissions
   *   Add anonymous RSVP option to the main invitation page
   *   Implement validation for anonymous RSVP submissions
   *   Update admin dashboard to display anonymous RSVPs separately
   *   Create dedicated page for anonymous RSVP submissions at /rsvp
   *   Add functionality to convert anonymous RSVPs to regular guests
   *   **Status:** Completed

20. **Mobile-Optimized Gallery:**
   *   Implement horizontal scrolling for the gallery on mobile devices
   *   Add swipe gestures for easier navigation
   *   Optimize image loading with lazy loading and proper sizing
   *   Add visual indicators for horizontal scrolling (arrows or dots)
   *   Implement touch-friendly image viewing experience
   *   Add smooth scrolling animations between images
   *   **Status:** In Progress

21. **Bride/Groom Specific Sections:**
   *   Create conditional rendering for Gift Info section:
       *   Show bride-specific gift information on /bride route
       *   Show groom-specific gift information on /groom route
   *   Create conditional rendering for Contact section:
       *   Show bride contact details on /bride route
       *   Show groom contact details on /groom route
   *   Implement route-based content switching
   *   Add visual indicators to show which perspective is being viewed
   *   **Status:** Done

22. **Google Calendar Integration:**
   *   Create "Add to Calendar" button with Google Calendar link
   *   Generate calendar event URL with wedding details (date, time, location)
   *   Add event description with wedding details
   *   Implement proper URL encoding for calendar parameters
   *   Add visual calendar icon for the integration
   *   Test calendar integration across different devices
   *   **Status:** Done

23. **Footer Removal and Layout Adjustments:**
   *   Remove the existing footer component from all pages
   *   Adjust bottom spacing on all pages to compensate for removed footer
   *   Ensure floating buttons have proper positioning after footer removal
   *   Update layout components to remove footer references
   *   Test all pages to ensure proper layout after footer removal
   *   **Status:** Done

24. **UI Simplification and Mobile Optimization:**
   *   Remove monogram from all pages for a cleaner interface
   *   Optimize bride and groom name display for mobile:
       *   Add line break between names in mobile view (e.g., "Công & Duyên" becomes "Công\n&\nDuyên")
   *   Remove countdown timer functionality and related files to simplify UI
   *   Streamline contact section:
       *   Remove redundant "Note" section
       *   Remove Zalo reference (since phone numbers already support Zalo)
   *   Improve RSVP experience:
       *   Display RSVP form directly without redirect button
       *   Remove email input field for simpler form submission
   *   **Status:** Completed

25. **Centralized Data Integration:**
    *   Create `data.json` to store all configuration and content. - **Done**
    *   Refactor components to dynamically load data from `data.json`:
        *   `HeroSection`: Names, Date Display, Background Image, Countdown Timer - **Done**
        *   `InvitationSection`: Titles, Messages, Names, Parents' Names, Event Details - **Done**
        *   `EventDetailsSection`: Date, Time, Location, Calendar Link - **Done**
        *   `GiftInfoSection`: Titles, Subtitles, Bank Info (Perspective-based), QR Code - **Done**
        *   `ContactSection`: Titles, Subtitles, Name, Phone (Perspective-based) - **Done**
        *   `CountdownTimer`: (Indirectly via `HeroSection`) - **Done**
        *   `GallerySection`: Title, Subtitle, Image Grid - **Done**
        *   `ScheduleSection`: Title, Subtitle, Timeline - **Done**
        *   Other components - **Pending**
    *   **Status:** In Progress
