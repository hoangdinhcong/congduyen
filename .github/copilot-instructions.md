# Project Technical Guidelines

## Core Framework
- This is a Next.js 15 project - always use the latest Next.js features and follow official best practices
- Utilize App Router architecture with React Server Components where appropriate
- Implement proper data fetching strategies (Server Components, React Server Actions, etc.)
- Follow the recommended project structure and conventions from Next.js documentation

## Tech Stack Requirements
- React: Use React 19+ features including hooks, concurrent mode, and server components
- Supabase: Implement latest client SDK with proper type safety and edge runtime compatibility
- TailwindCSS: Follow utility-first approach with proper responsive design patterns
- Shadcn/UI: Use the component library with proper customization through the theming system
- Radix UI: Leverage for accessible primitives when custom components are needed
- Next.js: Utilize built-in image optimization, font optimization, and metadata API

## Application Purpose & Design
- Wedding Invitation Application: All features should support the core purpose of inviting and managing wedding guests
- Beautiful & Consistent UI: Implement elegant design patterns appropriate for wedding aesthetics
- Responsive Design: Ensure perfect display across all devices (mobile, tablet, desktop)
- Animation & Transitions: Use subtle animations to enhance the user experience without being distracting
- Typography: Implement proper font hierarchy with wedding-appropriate typefaces
- Color Scheme: Maintain a consistent color palette that aligns with wedding theme

## User Experience Considerations
- Guest-Focused: Prioritize ease of use for non-technical wedding guests
- Performance: Ensure fast load times and smooth interactions for optimal user experience
- Accessibility: Make the application usable by guests of all abilities
- Multilingual Support: Consider implementation for guests who speak different languages
- Offline Capabilities: Implement PWA features for guests with limited connectivity

## Feature Requirements
- RSVP System: Implement intuitive guest response mechanism
- Guest Management: Track invitations, responses, and guest details
- Event Details: Display wedding information, timeline, and location details
- Photo Gallery: Showcase engagement or wedding photos with optimized loading
- Gift Registry: Optional integration with registry services
- Interactive Elements: Consider maps, countdowns, or other engaging features

## Code Quality Standards
- TypeScript: Use strict type checking with proper interfaces and type definitions
- Component Architecture: Follow atomic design principles with clear separation of concerns
- State Management: Use React Context, Server Components, or Zustand for state management
- Performance: Implement proper code splitting, image optimization, and performance best practices
- Accessibility: Ensure WCAG compliance with proper semantic HTML and ARIA attributes

## Development Workflow
- Follow modern ESLint and Prettier configurations
- Implement proper error handling and loading states
- Use environment variables appropriately for configuration
- Follow proper Git workflow with meaningful commit messages