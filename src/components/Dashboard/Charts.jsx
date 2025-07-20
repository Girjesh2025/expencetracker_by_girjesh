import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, subMonths } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Charts({ transactions }) {
  // Category breakdown for expenses
  const getCategoryData = () => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = {};
    
    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
      '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF',
      '#4BC0C0', '#FF6384'
    ];

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors.slice(0, labels.length),
          borderColor: colors.slice(0, labels.length).map(color => color + '80'),
          borderWidth: 2,
        },
      ],
    };
  };

  // Daily spending/income trend for the last 30 days
  const getTrendData = () => {
    const endDate = new Date();
    const startDate = subMonths(endDate, 1);
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    const dailyData = days.map(day => {
      const dayString = format(day, 'yyyy-MM-dd');
      const dayTransactions = transactions.filter(t => 
        format(new Date(t.date), 'yyyy-MM-dd') === dayString
      );
      
      const income = dayTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = dayTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        date: format(day, 'MMM dd'),
        income,
        expenses,
        balance: income - expenses
      };
    });

    return {
      labels: dailyData.map(d => d.date),
      datasets: [
        {
          label: 'Income',
          data: dailyData.map(d => d.income),
          borderColor: '#10B981',
          backgroundColor: '#10B981',
          tension: 0.4,
          fill: false,
        },
        {
          label: 'Expenses',
          data: dailyData.map(d => d.expenses),
          borderColor: '#EF4444',
          backgroundColor: '#EF4444',
          tension: 0.4,
          fill: false,
        }
      ],
    };
  };

  const categoryData = getCategoryData();
  const trendData = getTrendData();

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: $${context.parsed.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Income vs Expenses (Last 30 Days)',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value;
          }
        }
      }
    },
  };

  if (transactions.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Expense Categories</h3>
          <p className="text-gray-500">Add some expenses to see category breakdown</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Trends</h3>
          <p className="text-gray-500">Add transactions to see trends over time</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Category Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Categories</h3>
        {categoryData.labels.length > 0 ? (
          <div style={{ height: '300px' }}>
            <Doughnut data={categoryData} options={doughnutOptions} />
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No expense data to display</p>
          </div>
        )}
      </div>

      {/* Trend Analysis */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Income vs Expenses Trend</h3>
        <div style={{ height: '300px' }}>
          <Line data={trendData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
} 