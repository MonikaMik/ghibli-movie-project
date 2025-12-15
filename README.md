# Studio Ghibli Films App

A React application that displays Studio Ghibli films and their characters using
the [Ghibli API](https://ghibliapi.vercel.app/).

## Features

- 📽️ Browse all Studio Ghibli films
- 👥 View characters from each film
- 📱 Responsive design (mobile dialog, desktop table)
- ⚡ Built with React, TypeScript, Redux Toolkit Query, and Vite

## Tech Stack

- **React 19** with TypeScript
- **Redux Toolkit** for state management (RTK Query for API calls)
- **React Router** for navigation
- **CSS Modules** for styling
- **Vitest** for testing

## Getting Started

### Installation

```bash
git clone https://github.com/MonikaMik/ghibli-movie-project.git
```

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Run Tests

```bash
npm test
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components (About, Films)
├── services/       # API configuration (RTK Query)
├── hooks/          # Custom React hooks
├── types/          # TypeScript interfaces
└── tests/          # Component tests
```

## API

This app uses the [Studio Ghibli API](https://ghibliapi.vercel.app/) to fetch
film and character data.

## Testing

Minimal tests included to verify core components render correctly:

- FilmCard component
- PeopleTable component
- Navigation (Aside component)
