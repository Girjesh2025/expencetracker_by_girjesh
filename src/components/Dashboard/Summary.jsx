import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';

export default function Summary({ transactions }) {
  const { formatCurrency } = useCurrency();

  const calculateTotals = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expenses;
    
    return { income, expenses, balance };
  };

  const { income, expenses, balance } = calculateTotals();

  const summaryCards = [
    {
      title: 'Total Income',
      amount: income,
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      title: 'Total Expenses',
      amount: expenses,
      icon: TrendingDown,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800'
    },
    {
      title: 'Balance',
      amount: balance,
      icon: Wallet,
      color: balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400',
      bgColor: balance >= 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-red-50 dark:bg-red-900/20',
      borderColor: balance >= 0 ? 'border-blue-200 dark:border-blue-800' : 'border-red-200 dark:border-red-800'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summaryCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div 
            key={index}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${card.borderColor} p-6 transition-all hover:scale-105 hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  {card.title}
                </p>
                <p className={`text-2xl font-bold ${card.color}`}>
                  {formatCurrency(card.amount)}
                </p>
              </div>
              <div className={`${card.bgColor} ${card.color} p-3 rounded-full`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
            
            {/* Additional stats */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {index === 0 && `${transactions.filter(t => t.type === 'income').length} transactions`}
                {index === 1 && `${transactions.filter(t => t.type === 'expense').length} transactions`}
                {index === 2 && `${transactions.length} total transactions`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
} 