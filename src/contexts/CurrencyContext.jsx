import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export function useCurrency() {
  return useContext(CurrencyContext);
}

const currencies = {
  USD: { symbol: '$', name: 'US Dollar', code: 'USD' },
  EUR: { symbol: '€', name: 'Euro', code: 'EUR' },
  GBP: { symbol: '£', name: 'British Pound', code: 'GBP' },
  JPY: { symbol: '¥', name: 'Japanese Yen', code: 'JPY' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', code: 'CAD' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', code: 'AUD' },
  CHF: { symbol: 'Fr', name: 'Swiss Franc', code: 'CHF' },
  CNY: { symbol: '¥', name: 'Chinese Yuan', code: 'CNY' },
  INR: { symbol: '₹', name: 'Indian Rupee', code: 'INR' },
  BRL: { symbol: 'R$', name: 'Brazilian Real', code: 'BRL' },
  RUB: { symbol: '₽', name: 'Russian Ruble', code: 'RUB' },
  KRW: { symbol: '₩', name: 'South Korean Won', code: 'KRW' },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', code: 'SGD' },
  HKD: { symbol: 'HK$', name: 'Hong Kong Dollar', code: 'HKD' }
};

// Mock exchange rates - in a real app, you'd fetch from an API
const mockExchangeRates = {
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0,
  CAD: 1.25,
  AUD: 1.35,
  CHF: 0.92,
  CNY: 6.45,
  INR: 74.5,
  BRL: 5.2,
  RUB: 75.0,
  KRW: 1180.0,
  SGD: 1.35,
  HKD: 7.8
};

export function CurrencyProvider({ children }) {
  const [currentCurrency, setCurrentCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState(mockExchangeRates);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Load saved currency preference
    const savedCurrency = localStorage.getItem('preferredCurrency') || 'USD';
    setCurrentCurrency(savedCurrency);
    
    // In a real app, you would fetch exchange rates from an API
    // fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      // Example API call (you'd need to get an API key)
      // const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
      // const data = await response.json();
      // setExchangeRates(data.rates);
      // setLastUpdated(new Date());
      
      // For now, we'll use mock data
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
    }
  };

  const changeCurrency = (currencyCode) => {
    setCurrentCurrency(currencyCode);
    localStorage.setItem('preferredCurrency', currencyCode);
  };

  const convertAmount = (amount, fromCurrency, toCurrency = currentCurrency) => {
    if (fromCurrency === toCurrency) return amount;
    
    // Convert to USD first, then to target currency
    const usdAmount = amount / exchangeRates[fromCurrency];
    const convertedAmount = usdAmount * exchangeRates[toCurrency];
    
    return convertedAmount;
  };

  const formatCurrency = (amount, currencyCode = currentCurrency, options = {}) => {
    const currency = currencies[currencyCode];
    const {
      showSymbol = true,
      showCode = false,
      decimals = 2
    } = options;

    const formattedAmount = Number(amount).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });

    let result = '';
    if (showSymbol) {
      result = `${currency.symbol}${formattedAmount}`;
    } else {
      result = formattedAmount;
    }
    
    if (showCode) {
      result += ` ${currencyCode}`;
    }
    
    return result;
  };

  const getCurrencyOptions = () => {
    return Object.entries(currencies).map(([code, data]) => ({
      value: code,
      label: `${data.symbol} ${data.name} (${code})`,
      symbol: data.symbol,
      name: data.name
    }));
  };

  const value = {
    currentCurrency,
    currencies,
    exchangeRates,
    lastUpdated,
    changeCurrency,
    convertAmount,
    formatCurrency,
    getCurrencyOptions,
    refreshRates: fetchExchangeRates
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
} 