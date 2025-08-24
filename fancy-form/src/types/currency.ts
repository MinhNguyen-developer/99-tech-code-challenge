export interface CurrencyPrice {
  currency: string;
  date: string;
  price: number;
}

export interface CurrencyOption {
  value: string;
  label: string;
  icon: string;
  price: number;
}

export interface SwapFormData {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
}

export interface SwapFormErrors {
  fromCurrency?: string;
  toCurrency?: string;
  fromAmount?: string;
  toAmount?: string;
}
