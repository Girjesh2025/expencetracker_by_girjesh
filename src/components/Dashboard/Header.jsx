import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, User, DollarSign, Settings as SettingsIcon } from 'lucide-react';
import Settings from './Settings';

export default function Header({ dateFilter, setDateFilter }) {
  const { currentUser, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const { currentCurrency, currencies } = useCurrency();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">ExpenseTracker</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {currencies[currentCurrency]?.symbol} {currencies[currentCurrency]?.name}
                </p>
              </div>
            </div>

            {/* Date Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={dateFilter.start}
                  onChange={(e) => setDateFilter(prev => ({ ...prev, start: e.target.value }))}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Start date"
                />
                <span className="text-gray-400">to</span>
                <input
                  type="date"
                  value={dateFilter.end}
                  onChange={(e) => setDateFilter(prev => ({ ...prev, end: e.target.value }))}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="End date"
                />
                {(dateFilter.start || dateFilter.end) && (
                  <button
                    onClick={() => setDateFilter({ start: '', end: '' })}
                    className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{currentUser?.email}</span>
              </div>
              
              <button
                onClick={() => setShowSettings(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                title="Settings"
              >
                <SettingsIcon className="h-4 w-4" />
                <span className="hidden sm:ml-1 sm:inline">Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      <Settings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </>
  );
} 