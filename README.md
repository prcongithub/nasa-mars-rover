# Mars Rover Gallery 🚀

A beautiful React application that fetches and displays the latest images from NASA's Mars rovers using the NASA API.

## Features

- 🎨 **Beautiful Gallery View**: Modern, responsive grid layout with glassmorphism effects
- 🤖 **Multiple Rovers**: Browse images from Curiosity, Opportunity, Spirit, and Perseverance
- 📅 **Sol Day Selection**: Choose specific Martian days (sols) to view images
- 🖼️ **Image Modal**: Click any image for a detailed full-screen view
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⏳ **Load More**: Infinite scrolling with load more functionality
- 🔄 **Real-time Loading States**: Smooth loading animations and error handling

## Tech Stack

- **React** with TypeScript
- **Vite** for fast development and building
- **NASA Mars Rover Photos API**
- **CSS3** with modern effects (glassmorphism, gradients, animations)

## Getting Started

### Prerequisites

- Node.js (v20.19+ recommended, or v22.12+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mars-rover-gallery
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the provided local URL (usually http://localhost:5173)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

Or use any static file server:
```bash
npx http-server dist -p 3333
```

## Current Status

The app is currently running on port 3333. You can access it at:
- http://localhost:3333

## API Configuration

The app currently uses NASA's DEMO_KEY for the API. For production use, you should:

1. Get your own API key from [NASA API Portal](https://api.nasa.gov/)
2. Update the `NASA_API_KEY` in `src/services/nasa-api.ts`

## Usage

1. **Select a Rover**: Use the dropdown to choose between different Mars rovers
2. **Choose Sol Day**: Enter a sol (Martian day) number to view images from that day
3. **Browse Images**: Scroll through the gallery grid
4. **View Details**: Click on any image to see it in full screen with additional details
5. **Load More**: Click the "Load More" button at the bottom to fetch additional images

## Features Breakdown

### Rover Selection
- Curiosity (max sol: ~4000)
- Opportunity (max sol: 5111)
- Spirit (max sol: 2208)  
- Perseverance (max sol: ~1000)

### Image Information
Each image displays:
- Rover name
- Camera used
- Sol day
- Earth date
- Full resolution image

## Styling

The app features a modern dark theme with:
- Gradient backgrounds
- Glassmorphism effects
- Smooth transitions and animations
- Responsive grid layout
- Mobile-optimized design

## Troubleshooting

If you encounter issues with Node.js version compatibility:
1. Consider using nvm to manage Node versions
2. Install Node.js v20.19+ or v22.12+
3. Or use the production build which works with older Node versions

## License

This project uses NASA's public API. Please refer to NASA's terms of use for the images and data.
