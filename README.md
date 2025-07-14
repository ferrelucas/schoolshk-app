# Hong Kong Schools Information App

A React application that provides comprehensive information about schools in Hong Kong, including location mapping and detailed school data.

## Features

- **Interactive Map View**: View all schools on a Google Maps interface with clickable markers
- **Table View**: Browse schools in a sortable table format
- **Advanced Filtering**: Filter schools by:
  - Level (Primary/Secondary)
  - Category (Government/Aided/Private)
  - District
- **Real-time Data**: Consumes data from the Hong Kong government's School Location and Information API
- **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Maps API key (for map functionality)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd schoolshk-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Google Maps API key:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

4. **Get a Google Maps API Key**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Maps JavaScript API
   - Create credentials (API Key)
   - Copy the API key to your `.env` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## Data Source

This application uses the "School Location and Information" dataset from the Hong Kong government's open data portal (data.gov.hk). The data is updated monthly and includes:

- School names and contact information
- Geographic coordinates for mapping
- School categories and levels
- District information
- Website and contact details

API Endpoint: `https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.json`

## Project Structure

```
src/
├── components/          # React components
│   ├── FilterPanel.tsx  # School filtering controls
│   ├── Navigation.tsx   # Navigation bar
│   ├── SchoolMap.tsx    # Google Maps integration
│   └── SchoolTable.tsx  # Table view of schools
├── hooks/               # Custom React hooks
│   └── useSchools.ts    # Hook for fetching school data
├── pages/               # Page components
│   ├── Home.tsx         # Homepage
│   └── Schools.tsx      # Schools listing page
├── services/            # API and data services
│   └── schoolService.ts # School data fetching service
├── types/               # TypeScript type definitions
│   └── school.ts        # School data types
└── App.tsx              # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 18** with TypeScript
- **React Router** for navigation
- **Google Maps API** for mapping functionality
- **Vite** as build tool
- **CSS3** for styling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).