# Riyal AI SaaS - Twitter Analytics Platform

## Overview
Riyal AI SaaS is a comprehensive Twitter analytics platform that provides insights into Twitter profiles and posts. The platform consists of a modern frontend built with Next.js and a robust backend built with Node.js, Express, and various other technologies.

## Technologies

### Frontend
- **Next.js 15**: The main React framework used for routing, SSR, and app structure.
- **React 19**: The UI library powering all components.
- **TypeScript**: Used throughout the codebase for type safety.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Clerk**: For authentication and user management (`@clerk/nextjs`).
- **Framer Motion**: For advanced animations and transitions.
- **Radix UI**: Used for accessible UI primitives (e.g., tooltips).
- **Lucide React**: Icon library for modern SVG icons.
- **Zustand**: State management library for global state.
- **Axios**: For HTTP requests to the backend.
- **GSAP**: For complex animations.
- **Swiper**: For touch sliders and carousels.
- **Matter.js**: For physics-based UI effects.
- **@studio-freight/lenis**: For smooth scrolling effects.

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **Docker**: Containerization
- **Playwright**: Web scraping and automation
- **BullMQ**: Job queue for background processing
- **Google GenAI**: AI-powered text generation
- **Redis**: Queueing
- **Supabase**: Database and authentication
- **Supabase**: PostgreSQL database for data storage
- **Supabase Edge Functions**: Serverless functions for backend logic at the edge
- **Drizzle ORM**: Type-safe database queries and schema management

### Not Used (contrary to previous README draft)
- **No React Query, React Hook Form, Next Auth, Next Themes, React Markdown, React Syntax Highlighter, React Copy to Clipboard, or Shadcn UI** in the current codebase.

### UI/UX Patterns
- **Custom UI Components**: Many components are custom-built, with some leveraging Radix UI primitives for accessibility.
- **Google Fonts**: Multiple Google fonts are loaded and used for branding.
- **Responsive Design**: Layouts and components are responsive and mobile-friendly.
- **Animation-Heavy**: Extensive use of Framer Motion, GSAP, and custom animation utilities for a modern, interactive feel.
- **Authentication**: All auth flows are handled via Clerk.

### Project Structure
- `app/`: Next.js app directory (routing, layout, main pages)
- `components/`: All UI components, including custom UI, modals, dashboard, and animation utilities
- `lib/`: Utility functions and custom hooks
- `public/`: Static assets
- `config/`: (Empty, reserved for future configuration)
- `node_modules/`, `package.json`, `tsconfig.json`: Standard project setup

## Architecture
The backend is built with a modular architecture, consisting of:
- **Routes**: Define API endpoints for different functionalities
- **Controllers**: Handle business logic and data processing
- **Queue**: Manage background jobs for scraping and processing
- **Database**: Store user data, Twitter profiles, and analytics

## Features
- **User Management**:
  - Create and update user profiles
  - Store user preferences and settings
  - Manage user authentication

- **Twitter Scraping**:
  - Scrape Twitter profiles and posts
  - Extract user information, bio, and statistics
  - Handle rate limiting and retries
  - Store scraped data in the database

- **Analytics**:
  - Process and analyze Twitter data
  - Generate insights and trends
  - Provide data visualization

- **Background Processing**:
  - Queue-based job processing
  - Handle long-running tasks
  - Ensure reliability and scalability

## API Endpoints
- **User Routes**:
  - `POST /user`: Create a new user
  - `PUT /user`: Update user information
  - `POST /user/copy`: Copy a user profile
  - `POST /user/prominent`: Get prominent users

- **Scraping Routes**:
  - `POST /scrap/profile`: Scrape a Twitter profile
  - `POST /scrap/posts`: Scrape Twitter posts

- **Trending Routes**:
  - `GET /trending`: Get trending topics

## Getting Started

### Frontend Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=your_api_url
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   TWITTER_USERNAME=your_twitter_username
   TWITTER_PASSWORD=your_twitter_password
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. The server will start on port 3001

### Docker Deployment
The backend can be deployed using Docker:
1. Build the Docker image:
   ```bash
   docker build -t riyal-ai-saas-backend .
   ```
2. Run the container:
   ```bash
   docker run -p 3001:3001 riyal-ai-saas-backend
   ```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.
