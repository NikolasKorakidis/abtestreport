# A/B Test Reports

A modern web application for managing and analyzing A/B tests, built with React, TypeScript, and Material UI.

## Features

- **Dashboard**: View all A/B tests in a grid layout
- **New Test Creation**: Comprehensive form for setting up tests
- **Test Details**: View and analyze test results
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Material Design with Google's brand colors

## Technical Stack

- **Frontend**: React 18 + TypeScript
- **UI Library**: Material UI (MUI)
- **Routing**: React Router
- **Date Handling**: date-fns
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Main application pages
├── theme/         # Material UI theme configuration
├── types/         # TypeScript type definitions
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

## Key Components

### 1. Layout (`Layout.tsx`)

- Top navigation bar
- "New Test" button
- Responsive container
- Consistent styling

### 2. Dashboard (`Dashboard.tsx`)

- Grid layout of test cards
- Each card shows:
  - Test name and description
  - Status (Active/Completed)
  - Date range
  - Target audience
  - Traffic split
  - Quick actions

### 3. New Test Form (`NewTest.tsx`)

- Multi-section form:
  - Basic Information
  - Date Range
  - Data Source
  - Target Audience
  - Traffic Split
  - Variant Details

## Data Structure

```typescript
interface ABTest {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  testUrl: string;
  dataSource: "manual" | "integration";
  targetAudience: string[];
  trafficSplit: {
    variantA: number;
    variantB: number;
  };
  variants: {
    A: Variant;
    B: Variant;
  };
  results?: {
    variantA: TestResults;
    variantB: TestResults;
  };
}
```

## Getting Started

1. **Prerequisites**

   - Node.js (v14 or higher)
   - npm or yarn

2. **Installation**

   ```bash
   # Clone the repository
   git clone [repository-url]

   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

3. **Building for Production**
   ```bash
   npm run build
   ```

## Usage

1. **Creating a New Test**

   - Click "New Test" in the top navigation
   - Fill in test details
   - Configure variants
   - Set traffic split
   - Save the test

2. **Viewing Tests**

   - Dashboard shows all tests
   - Click on a test to view details
   - Use quick actions for common tasks

3. **Analyzing Results**
   - View test metrics
   - Compare variant performance
   - Export reports

## Development

- **TypeScript**: For type safety
- **ESLint**: For code quality
- **Vite**: For fast development
- **Hot Module Replacement**: For instant updates

## Future Enhancements

- PDF export functionality
- Advanced analytics visualization
- Test result comparison
- User authentication
- API integration
- Test scheduling
- Automated reporting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
