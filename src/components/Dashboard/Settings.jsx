import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { X, Moon, Sun, Palette, DollarSign, RefreshCw } from 'lucide-react';

export default function Settings({ isOpen, onClose }) {
  const { isDarkMode, currentTheme, colorThemes, toggleDarkMode, changeTheme } = useTheme();
  const { currentCurrency, getCurrencyOptions, changeCurrency, lastUpdated, refreshRates } = useCurrency();
  const [activeTab, setActiveTab] = useState('appearance');

  if (!isOpen) return null;

  const currencyOptions = getCurrencyOptions();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('appearance')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'appearance'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <Palette className="h-4 w-4 inline mr-2" />
            Appearance
          </button>
          <button
            onClick={() => setActiveTab('currency')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'currency'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <DollarSign className="h-4 w-4 inline mr-2" />
            Currency
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {isDarkMode ? (
                    <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  )}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Eye-friendly nighttime interface</p>
                  </div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Color Themes */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Color Theme</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(colorThemes).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => changeTheme(key)}
                      className={`relative p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        currentTheme === key
                          ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.colors[500] }}
                        />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {theme.name}
                        </span>
                      </div>
                      {currentTheme === key && (
                        <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Preview</h5>
                <div className="space-y-2">
                  <div 
                    className="h-8 rounded"
                    style={{ backgroundColor: `var(--color-primary-500)` }}
                  />
                  <div className="flex space-x-2">
                    <div 
                      className="flex-1 h-4 rounded"
                      style={{ backgroundColor: `var(--color-primary-100)` }}
                    />
                    <div 
                      className="flex-1 h-4 rounded"
                      style={{ backgroundColor: `var(--color-primary-200)` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'currency' && (
            <div className="space-y-6">
              {/* Currency Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Preferred Currency
                </label>
                <select
                  value={currentCurrency}
                  onChange={(e) => changeCurrency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {currencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Exchange Rates Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Exchange Rates
                    </h5>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Last updated: {lastUpdated.toLocaleDateString()} {lastUpdated.toLocaleTimeString()}
                    </p>
                  </div>
                  <button
                    onClick={refreshRates}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 rounded-lg transition-colors"
                    title="Refresh exchange rates"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Currency Preview */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Preview</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Sample amount:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {currencyOptions.find(c => c.value === currentCurrency)?.symbol}1,234.56
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Currency code:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{currentCurrency}</span>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>💡 Note: In a production app, exchange rates would be fetched from a real-time API like ExchangeRate-API or CurrencyAPI.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 