# Kuasar Country Explorer

A modern single-page application that combines country information display with AI-powered features. This application allows users to explore countries worldwide, get detailed information, and receive AI-assisted travel recommendations.

## Project Overview

Kuasar Country Explorer is a React-based web application that provides:
- Interactive country information display using GraphQL
- AI-powered travel assistant for personalized recommendations
- Secure authentication system
- Responsive design for all devices
- Real-time country filtering and sorting

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google OAuth credentials

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_NIM_API_KEY=your_nvidia_nim_api_key
```

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/kuasar-assessment.git
cd kuasar-assessment
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Features

### Country Information
- Display list of countries with essential information
- Search functionality by name, capital, continent, currency, or language
- Filter countries by continent
- Sort by various criteria (name, capital, continent)
- Detailed view for each country showing:
  - Basic information (capital, currency)
  - Languages spoken
  - Continental information
  - States/regions

### AI Travel Assistant
- Chat interface for travel-related queries
- Quick prompt buttons for common questions
- Context-aware responses based on selected country
- Support for custom queries
- Minimizable chat window

### Authentication
- Google OAuth integration
- Protected routes
- User profile display
- Secure session management

### User Interface
- Responsive design for mobile, tablet, and desktop
- Dark header with user profile
- Minimalistic and clean design
- Interactive UI elements with hover states
- Loading states and error handling

## Technical Decisions and Architecture

### Frontend Framework
- React with TypeScript for type safety
- Vite for fast development and building

### State Management
- React Context for authentication state
- Component-level state for UI interactions
- Apollo Client for GraphQL state management

### Styling
- Styled-components for component-based styling
- Responsive design principles
- Consistent color scheme and typography

### API Integration
- Apollo Client for GraphQL operations
- NVIDIA NIM API for AI functionality
- Google OAuth for authentication

### Project Structure
```
src/
├── components/          # UI Components
│   ├── Authentication/  # Auth-related components
│   ├── ChatInterface/   # AI Chat components
│   ├── CountryDetail/   # Country details view
│   ├── CountryList/     # Country listing
│   └── shared/          # Shared components
├── context/            # React Context providers
├── graphql/           # GraphQL queries
├── pages/             # Page components
├── routes/            # Routing configuration
│   └── layouts/       # Layout components
├── services/          # External services
│   ├── apollo/        # GraphQL client
│   ├── auth/          # Authentication
│   └── nim/           # AI service
└── types/             # Global TypeScript types
```

Each component folder follows a consistent structure with:
- Component logic files
- Styled components in styles/
- Type definitions in types/
- Constants when needed

## Future Improvements

### Features
- Add offline support with service workers
- Implement user preferences storage
- Add multi-language support
- Enhance AI capabilities with more context
- Add social sharing features

### Technical
- Implement comprehensive error boundaries
- Add unit and integration tests
- Optimize bundle size
- Add PWA capabilities
- Implement proper error logging

### User Experience
- Add skeleton loading states
- Improve mobile navigation
- Add keyboard shortcuts
- Enhance accessibility
- Add dark/light theme toggle

### Performance
- Implement data caching
- Add image lazy loading
- Optimize API calls
- Implement virtual scrolling for long lists

## Contributing

Feel free to submit issues and enhancement requests.