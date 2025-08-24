// Dynamic import for token icons
export const getTokenIcon = (currency: string): string => {
  try {
    // For Vite, we need to use the public path
    return `/src/assets/tokens/${currency}.svg`;
  } catch (error) {
    // Fallback to a default icon or empty string
    return '';
  }
};

// List of available token icons (based on the files in the tokens directory)
export const AVAILABLE_TOKEN_ICONS = [
  'DPX', 'IP', 'AI16Z', 'MORPHO', 'HT', 'STRD', 'dGLP', 'ELA', 'SET', 'SHD',
  'KBONK', 'cbETH', 'COOK', 'NGM', 'PLY', 'EUT', 'USDY', 'GAS', 'NKN', 'TRAXX',
  'IOV', 'USDC.grv', 'wKAS', 'LSK', 'LUNC', 'BRKL', 'CHSB', 'stDYDX', 'BAKE',
  'CANTO', 'WRX', 'GRASS', 'OXY', 'POLY', 'LAYER', 'GM', 'ONT', 'cUSD', 'GAMBIT',
  'dATOM', 'NEIROETH', 'ANY', 'TWT', 'DPL', 'FIL', 'JPT', 'DROP', 'MIAW', 'KPEPE',
  'MNT', 'AXT', 'CAT', 'CELO', 'ATOM', 'ENJ', 'ARCH', 'MATH', 'WETH', 'ANKR',
  'BERA', 'USK', 'USUAL', 'LUNA', 'LSI', 'SAYVE', 'ONDO', 'STRAX', 'WIF',
  'YieldUSD', 'LBTC', 'C98', 'TAO', 'ZCH', 'VIRTUAL', 'WAVE', 'CETH',
  'PTberaSTONE_10APR2025', 'PAXG', 'SOLETH', 'ALT', 'AMP', 'XMR', 'DKT',
  'PUDGY', 'AAVE', 'APOLLO', 'M87', 'IXO', 'KSHIB', 'PAX', 'INT', 'IOST',
  'LUNR', 'ELF', 'NTRN', 'TFUEL', 'TLM', 'DYDX', 'OMI', 'mETH'
];
