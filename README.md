# Movie Booking App

A React Native movie booking application built with Expo, featuring upcoming movies from TMDB API, movie details, trailer playback, and seat booking functionality.

## Features

- **Movie List**: Browse upcoming movies from TMDB API
- **Movie Details**: View detailed information about movies
- **Trailer Playback**: Watch movie trailers in full-screen mode
- **Search**: Search for movies with category browsing
- **Seat Booking**: Interactive seat selection with pricing
- **Responsive Design**: Works on all screen sizes and orientations
- **Redux State Management**: Using RTK Query and Redux Persist

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Redux Toolkit** with RTK Query for state management
- **Redux Persist** for state persistence
- **Expo Router** for navigation
- **Expo AV** for video playback
- **Expo Linear Gradient** for UI effects

## Project Structure

```
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation screens
│   ├── movie-detail.tsx   # Movie detail screen
│   ├── search.tsx         # Search screen
│   ├── booking.tsx        # Booking screen
│   └── payment.tsx        # Payment screen
├── components/            # Reusable components
│   ├── common/           # Common UI components
│   └── screens/          # Screen components
├── constants/            # App constants and theme
├── store/               # Redux store configuration
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie-booking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your device

## API Configuration

The app uses TMDB API for movie data. The API key is configured in `utils/api.ts`. You can get your own API key from [TMDB](https://www.themoviedb.org/settings/api).

## Key Features Implementation

### Redux RTK Query
- Centralized API calls for movie data
- Automatic caching and state management
- Optimistic updates and error handling

### Responsive Design
- Adaptive layouts for different screen sizes
- Landscape and portrait mode support
- Flexible grid systems

### TypeScript
- Comprehensive type definitions
- Type-safe API responses
- Strict type checking throughout the app

### Navigation
- Tab-based navigation for main sections
- Stack navigation for detailed screens
- Deep linking support

## Screens

1. **Movie List Screen**: Displays upcoming movies in a grid layout
2. **Movie Detail Screen**: Shows movie information with trailer playback
3. **Search Screen**: Search functionality with category browsing
4. **Booking Screen**: Date, time, and seat selection
5. **Payment Screen**: Booking confirmation and payment

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is licensed under the MIT License.
