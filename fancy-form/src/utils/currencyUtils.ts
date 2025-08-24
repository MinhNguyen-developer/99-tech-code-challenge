import type { CurrencyPrice, CurrencyOption } from "../types/currency";
import { getTokenIcon, AVAILABLE_TOKEN_ICONS } from "./tokenIcons";

// Available token currencies (matching the prices.json data and available icons)
const AVAILABLE_CURRENCIES = [
  "BLUR",
  "bNEO",
  "BUSD",
  "USD",
  "ETH",
  "GMX",
  "STEVMOS",
  "LUNA",
  "RATOM",
  "STRD",
  "EVMOS",
  "IBCX",
  "IRIS",
  "ampLUNA",
  "KUJI",
  "STOSMO",
  "USDC",
  "axlUSDC",
  "ATOM",
  "STATOM",
  "OSMO",
  "rSWTH",
  "STLUNA",
  "LSI",
  "OKB",
  "OKT",
  "SWTH",
  "USC",
  "WBTC",
  "wstETH",
  "YieldUSD",
  "ZIL",
].filter((currency) => AVAILABLE_TOKEN_ICONS.includes(currency));

export const getLatestPrices = (
  prices: CurrencyPrice[]
): Map<string, number> => {
  const latestPrices = new Map<string, number>();

  prices.forEach((price) => {
    const existing = latestPrices.get(price.currency);
    if (!existing || new Date(price.date) > new Date(existing.toString())) {
      latestPrices.set(price.currency, price.price);
    }
  });

  return latestPrices;
};

export const createCurrencyOptions = (
  prices: Map<string, number>
): CurrencyOption[] => {
  return Array.from(prices.entries()).map(([currency, price]) => ({
    value: currency,
    label: currency,
    icon: getTokenIcon(currency),
    price,
  }));
};

export const calculateSwapAmount = (
  fromAmount: number,
  fromPrice: number,
  toPrice: number
): number => {
  if (fromPrice === 0) return 0;
  return (fromAmount * fromPrice) / toPrice;
};

export const validateSwapForm = (data: {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!data.fromCurrency) {
    errors.fromCurrency = "Please select a currency to swap from";
  }

  if (!data.toCurrency) {
    errors.toCurrency = "Please select a currency to swap to";
  }

  if (
    data.fromCurrency &&
    data.toCurrency &&
    data.fromCurrency === data.toCurrency
  ) {
    errors.toCurrency = "Cannot swap to the same currency";
  }

  if (!data.fromAmount || data.fromAmount <= 0) {
    errors.fromAmount = "Please enter a valid amount greater than 0";
  }

  if (data.fromAmount && data.fromAmount > 1000000) {
    errors.fromAmount = "Amount cannot exceed 1,000,000";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
