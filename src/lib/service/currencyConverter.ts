import { Currency } from '@/domain/models/expense.model';

const API_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${process.env.CURRENCY_API_KEY}`;

export const getCurrencyRate = async (defaultCurrency: Currency = 'EUR'): Promise<number> => {
  // At the moment the api does not accept base currency (free trial)
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data: CurrencyConverterRateResponse = await response.json();
  return data.rates[defaultCurrency] || 1;
};

export const getConvertedValue = async (
  currentCurrency: Currency,
  currentAmount: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultCurrency: Currency = 'EUR'
) => {
  const rate = await getCurrencyRate();
  return currentAmount * rate;
};

export interface CurrencyConverterRateResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: Date;
  rates: { [key: string]: number };
}
