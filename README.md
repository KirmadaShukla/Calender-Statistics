# Calendar Statistics Dashboard

A React-based dashboard that integrates React Big Calendar with interactive bar graphs to visualize date-wise statistics. This project uses Redux Toolkit for state management and follows modern React development practices.

## Features

-  Interactive calendar view (date, week, month)
-  Bar graph visualization for date-specific data
-  Responsive design using Tailwind CSS
-  State management with Redux Toolkit
-  Cross-platform compatibility
-  Fast development with Vite

## Project Structure

```
src/
├── components/
│   ├── CalendarView.jsx      # Main calendar component
│   └── BarGraphPopup.jsx     # Popup with bar graph visualization
├── store/
│   ├── index.js              # Redux store configuration
│   └── calendarSlice.js      # Calendar state slice
├── App.jsx                   # Main application component
├── main.jsx                  # Application entry point
└── index.css                 # Global styles
```

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KirmadaShukla/Calender-Statistics.git
   cd calendar-statistics
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the project for production
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint to check for code issues

## Dependencies

### Core Libraries
- `react` (^19.1.1) - UI library
- `react-dom` (^19.1.1) - React DOM rendering
- `react-big-calendar` (^1.19.4) - Calendar component
- `recharts` (^2.15.1) - Charting library
- `moment` (^2.30.1) - Date manipulation library

### State Management
- `@reduxjs/toolkit` - Modern Redux development
- `react-redux` - React bindings for Redux

### Styling
- `tailwindcss` (^4.1.13) - Utility-first CSS framework
- `@tailwindcss/vite` (^4.1.13) - Tailwind CSS plugin for Vite

### Build Tools
- `vite` (^7.1.6) - Next-generation frontend tooling
- `@vitejs/plugin-react` (^5.0.2) - React plugin for Vite

## Usage

1. Navigate through the calendar using the toolbar controls
2. Click on highlighted dates (blue events) to view statistics
3. View bar graph visualization in the popup modal
4. Close the popup to return to the calendar view

## Data Format

The application fetches data from `public/dummy.json` with the following format:

```json
{
  "01-09-2025": [
    {"user_1": 1},
    {"user_2": 2},
    {"user_3": 3},
    {"user_4": 4}
  ],
  "02-09-2025": [
    {"user_1": 2},
    {"user_2": 4},
    {"user_3": 1},
    {"user_4": 3}
  ]
}
```

Each key represents a date in DD-MM-YYYY format, and each value is an array of objects containing user data.

## Redux State Management

The application uses Redux Toolkit for state management with a single slice:

### State Structure
```javascript
{
  calendar: {
    data: {},           // Fetched calendar data
    selectedDate: null, // Currently selected date
    selectedDateData: [], // Data for selected date
    loading: false,     // Loading state
    error: null         // Error state
  }
}
```

### Actions
- `fetchCalendarData` - Async thunk to fetch data from dummy.json
- `setSelectedDate` - Sets the currently selected date
- `clearSelectedDate` - Clears the selected date

### Selectors
- `selectCalendarData` - Returns the calendar data
- `selectSelectedDate` - Returns the selected date
- `selectSelectedDateData` - Returns data for the selected date
- `selectLoading` - Returns the loading state
- `selectError` - Returns any error state
- `selectHasDataForDate` - Checks if data exists for a specific date

## UI Components

### CalendarView.jsx
The main calendar component that displays events and handles user interactions.

### BarGraphPopup.jsx
A modal popup that displays a bar graph visualization of the selected date's data using Recharts.

## Styling

The application uses Tailwind CSS for styling with some custom CSS for the calendar component. The popup modal follows the user's preferred inline width styling with a maxWidth of 448px.

## Development

### Adding New Features

1. Create new components in the `src/Components/` directory
2. Add new state slices in the `src/store/slices` directory if needed
3. Update the main App.jsx file to include new components
4. Follow the existing code style and patterns

### Customizing the Calendar

The calendar component can be customized by modifying the props passed to the `Calendar` component in CalendarView.jsx. Refer to the [react-big-calendar documentation](https://github.com/jquense/react-big-calendar) for available options.

### Modifying the Data Structure

To use a different data structure:
1. Update the `public/dummy.json` file
2. Modify the `fetchCalendarData` thunk in `src/store/slices/calendarSlice.js` to process the new structure
3. Update the data transformation logic in `BarGraphPopup.jsx`

## Deployment

To deploy the application:

1. Build the project:
   ```bash
   npm run build
   ```

2. The build output will be in the `dist/` directory, which can be deployed to any static hosting service.

## Browser Support

This project uses modern JavaScript features and is compatible with:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request



