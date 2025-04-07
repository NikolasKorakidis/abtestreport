# A/B Test Reports

A modern web application for creating, viewing, and exporting A/B test reports with a polished Material Design interface.

## Features

- 📊 Create and manage A/B test reports
- 🎨 Modern Material UI design with Google's brand colors
- 📱 Responsive layout for all devices
- 📈 Rich data visualization with charts
- 📄 PDF export functionality
- 🔄 Support for both manual and integrated data entry
- 🎯 Target audience segmentation
- 📊 Traffic split configuration
- 📅 Date range selection
- 📝 Detailed test documentation

## Tech Stack

- React 18
- TypeScript
- Material UI
- React Router
- Recharts for data visualization
- React PDF for report exports
- Date-fns for date handling
- Vite for development and building

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/abtestreport.git
   cd abtestreport
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── theme/         # Material UI theme configuration
  ├── types/         # TypeScript type definitions
  ├── utils/         # Utility functions
  ├── hooks/         # Custom React hooks
  ├── assets/        # Static assets
  ├── App.tsx        # Main app component
  └── main.tsx       # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
