Enhanced Project Prompt: Elegant Wedding Invitation Website with Admin Panel & Personalized Links

1. Project Goal:
Develop a highly polished, mobile-first, single-page wedding invitation website featuring an elegant, minimalist design with pink accents. The primary functionality includes distributing personalized invitation links to guests and an admin panel for the couple to manage the guest list and track real-time RSVP responses.

1. Target Audience:

Primary: Wedding Guests (need a clear, beautiful, easy-to-use interface to get information and RSVP).
Secondary: The Couple (need a simple, functional admin panel to manage guests and view status).
3. Design & Aesthetics (Mobile-First):

Overall Style: Minimalist elegance. Focus on clean lines, generous white space, and intuitive navigation (scrolling). Ensure seamless responsiveness across all device sizes (desktop, tablet, mobile).
Layout: Single, vertical scrolling page architecture for the main invitation. The admin panel can be a separate section/route.
Color Palette:
Base: White (#FFFFFF) or a very light, warm off-white (e.g., #FAF7F5).
Primary Text: Near-black (e.g., #222222) for optimal readability.
Accent: A sophisticated soft pink. Recommendation: Choose one like Blush (#FFF0F1), Rose Quartz (#F7CAC9), or Dusty Rose (#D8BFD8). Use consistently for interactive elements (buttons, links), section headers, monogram details, and subtle graphic motifs.
Optional Secondary Accent: Consider a metallic like soft gold (#E1C699) or a neutral light grey (#E0E0E0) for borders or background nuances if needed, but use sparingly.
Action: Use a tool like Coolors.co to finalize a cohesive 3-4 color palette ensuring good contrast ratios.
Typography:
Prioritize readability and elegance. Ensure sufficient font size and line spacing, especially on mobile.
Recommendation:
Headings: Playfair Display or Cormorant Garamond (Serif for elegance).
Body Text: Lato or Open Sans (Sans-serif for clarity).
Action: Test font pairings and weights. Ensure chosen web fonts are loaded efficiently.
Visual Elements:
High-quality, optimized main couple photograph (consider professional retouching if needed).
Subtle, perhaps hand-drawn style, floral or leafy graphics as section dividers or background elements (use sparingly).
Professionally designed custom monogram (SVG format preferred for scalability).
Animation & Interaction: Implement subtle, tasteful animations (e.g., fade-in on scroll using Intersection Observer API). Buttons/links should have clear hover and active states using the accent color.
4. Content Sections (Single Scrollable Page - Guest View):
* Hero: Catchy heading (e.g., "We're Getting Married!"), Couple's Names (prominent), Wedding Date, high-resolution Couple Photo, live Countdown Timer.
* Invitation: Warm, welcoming invitation text. Clearly state who is inviting.
* Parents: Optional section listing parents' names.
* The Details:
* Clear separation between Ceremony and Reception.
* For each: Date, Time (clearly formatted), Venue Name, Full Address.
* Interactive Embedded Map (e.g., Google Maps iframe) for each venue. Include a "Get Directions" link.
* Schedule: Simple timeline of key events (e.g., Ceremony Starts, Cocktail Hour, Dinner, Dancing).
* Photo Gallery: Curated selection of 3-6 additional photos in a simple grid or carousel. Optimize images for web.
* Gift Information: Tactful wording regarding gifts (e.g., "Your presence is the greatest gift!"). If applicable, include the QR code (ensure it's high-resolution) and potentially a discreet link to a registry.
* Contact: Provide an email address or phone number for guest queries.
* RSVP: Dynamically displayed based on access method (see Functionality).

5. Functional Requirements:

A. Personalized Invitation Experience:

Unique URLs: Generate a cryptographically secure unique ID (e.g., UUID) for each guest invitation link (e.g., yourdomain.com/invite/[uniqueGuestId]).
Personalized Greeting: On accessing the unique URL, fetch guest data associated with the ID from Supabase. Display a modal/splash screen: "Welcome, [Guest Name]!" before revealing the main page.
Simplified RSVP: The RSVP section for guests arriving via unique link should:
Display their name(s) clearly.
Present only two clear buttons: "Yes, I/We Will Attend" and "Sorry, I/We Cannot Attend".
On click, send the response (updating the specific guest's status in Supabase).
Provide immediate visual feedback (e.g., "Thank you for RSVPing!" message replacing the buttons, or a subtle confirmation animation).
Handle potential errors gracefully (e.g., "Submission failed, please try again").
B. Base Invitation Views (/, /bride, /groom):

These paths should display the main invitation content but without the personalized greeting or RSVP form.
Include a note like "Please use the personalized link sent to you to RSVP."
Consider if / should perhaps redirect to /bride or /groom by default, or show a generic landing page. Define the exact difference between /bride and /groom views (e.g., minor intro text variation).
C. Admin Panel (/host):

Secure Access: Implement the hardcoded login check (bcrypt or similar hashing recommended over simple SHA for slightly better security, stored server-side or in env variables). Protect this route/section.
Dashboard: Clear visual overview:
Total Invited (Bride/Groom/Overall).
RSVP Counts: Attending / Declined / Pending (Bride/Groom/Overall).
Perhaps a visual pie chart or bar graph for responses.
Guest List Management (/host/guests - maybe unified view with filters?):
Unified table displaying all guests (Bride & Groom sides).
Columns: ID (internal DB ID), Name, Side ('Bride'/'Groom'), Tags (filterable, e.g., 'Family', 'Friend', 'Work'), RSVP Status (color-coded?), Unique Invite Link (copy-to-clipboard button).
Filtering/Sorting: Allow filtering by Side, Tag, RSVP Status. Allow sorting by Name, Status.
Add Guest: Simple form for manual entry (Name, Side, Tags). Automatically generate uniqueInviteId and link upon saving.
Import Guests: Upload CSV function. Provide clear instructions/template for CSV format (Name, Side, Tags). Handle potential import errors. Generate unique IDs/links for imported guests.
Edit Guest: Ability to correct Name/Tags.
Manual RSVP Update: Allow admin to manually change a guest's RSVP status.
Link Generation: Ensure links are generated reliably and are easily accessible/copyable.
D. Supabase Data Model (Guests Table):

id: UUID (Primary Key, auto-generated)
name: TEXT (Not Null)
side: TEXT ('bride' or 'groom', Not Null)
tags: TEXT[] (Array of text) or TEXT
unique_invite_id: UUID (Unique, Indexed, auto-generated)
rsvp_status: TEXT ('pending', 'attending', 'declined', Default: 'pending', Indexed)
created_at: TIMESTAMPTZ (Default: now())
updated_at: TIMESTAMPTZ (Default: now())
6. Technology Stack:

Framework: Next.js (using App Router recommended for modern features).
Backend/DB: Supabase (Utilize Supabase Database for guest data, consider Supabase Edge Functions or Next.js API Routes for backend logic like RSVP submission and admin actions).
Styling: Tailwind CSS (highly recommended for utility-first styling and responsiveness) or CSS Modules.
State Management: React Context API or Zustand for simple global state (like admin auth status). Avoid complex libraries unless necessary.
API: Use Next.js API Routes (/pages/api or Route Handlers in App Router) to interact securely with Supabase from the client-side, especially for write operations (RSVP, admin actions). Store Supabase keys securely using environment variables.
7. Deployment & DevOps:

Hosting: Vercel is strongly recommended for seamless Next.js deployment, integrated CI/CD, environment variable management, and serverless function hosting.
Version Control: Git (repository hosted on GitHub).
Environment Variables: Manage Supabase URL, anon key, service key (if used for admin functions), and login hash securely via Vercel environment variables.
8. Accessibility (WCAG 2.1 AA):

Ensure sufficient color contrast between text and background (use contrast checkers).
Use semantic HTML elements (<nav>, <main>, <button>, etc.).
Ensure keyboard navigability for all interactive elements.
Provide alt text for images (especially the couple photos).
9. Performance:

Optimize all images (use formats like WebP, resize appropriately).
Minimize JavaScript bundle size (code splitting is handled well by Next.js).
Leverage Next.js features for performance (static generation for parts where possible, ISR if content changes occasionally, efficient data fetching).
10. User Experience Notes:

Guest: The flow from receiving the link to RSVPing must be intuitive and frictionless. Confirmation messages are crucial. The site must load quickly.
Admin: The interface should be clean and functional. Actions like adding/importing guests and viewing RSVP status should be straightforward.