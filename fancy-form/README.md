# Currency Swap Application

A modern, responsive currency swap interface built with React, TypeScript, and Ant Design. This application allows users to swap between different cryptocurrencies using real-time price data.

## Features

- **Real-time Currency Prices**: Fetches live currency prices from the Switcheo API
- **Token Icons**: Displays currency icons for better visual identification
- **Form Validation**: Comprehensive validation for all form inputs
- **Auto-calculation**: Automatically calculates swap rates and output amounts
- **Currency Switching**: Easy switching between "from" and "to" currencies
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful gradient background with glass-morphism effects

## Technologies Used

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Ant Design** - UI component library
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd fancy-form
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── SwapForm.tsx          # Main swap form component
│   └── CurrencySelect.tsx    # Custom currency select with icons
├── types/
│   └── currency.ts           # TypeScript type definitions
├── utils/
│   ├── currencyUtils.ts      # Currency data fetching and processing
│   └── tokenIcons.ts         # Token icon utilities
├── assets/
│   └── tokens/               # SVG token icons
├── App.tsx                   # Main application component
└── main.tsx                  # Application entry point
```

## API Integration

The application integrates with the Switcheo prices API:
- **Endpoint**: `https://interview.switcheo.com/prices.json`
- **Data Format**: JSON array of currency price objects
- **Update Frequency**: Real-time price updates

## Supported Currencies

The application supports the following currencies (based on available token icons and API data):

- BLUR, bNEO, BUSD, USD, ETH, GMX, STEVMOS, LUNA, RATOM, STRD
- EVMOS, IBCX, IRIS, ampLUNA, KUJI, STOSMO, USDC, axlUSDC, ATOM
- STATOM, OSMO, rSWTH, STLUNA, LSI, OKB, OKT, SWTH, USC, WBTC
- wstETH, YieldUSD, ZIL

## Form Validation

The application includes comprehensive validation:

- **Required Fields**: Both currencies and amount must be selected/entered
- **Same Currency**: Cannot swap to the same currency
- **Amount Validation**: Amount must be greater than 0 and less than 1,000,000
- **Real-time Validation**: Errors are displayed as users type

## Features in Detail

### Currency Selection
- Dropdown with currency icons and current prices
- Search functionality for easy currency finding
- Visual indicators for selected currencies

### Amount Input
- Numeric input with comma formatting
- Precision up to 6 decimal places
- Real-time calculation of output amount

### Swap Rate Display
- Shows current exchange rate between selected currencies
- Updates automatically when currencies or amounts change

### Switch Functionality
- One-click currency switching
- Preserves amounts when switching

## Styling

The application features:
- Gradient background with purple/blue theme
- Glass-morphism card effects
- Smooth animations and transitions
- Responsive design for all screen sizes
- Custom Ant Design theme integration

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Currencies

To add new currencies:

1. Add the currency code to the `AVAILABLE_CURRENCIES` array in `currencyUtils.ts`
2. Add the corresponding SVG icon to `src/assets/tokens/`
3. Update the `AVAILABLE_TOKEN_ICONS` array in `tokenIcons.ts`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of the 99tech code challenge.
