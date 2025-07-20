import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

const colorThemes = {
  blue: {
    name: 'Ocean Blue',
    primary: 'blue',
    colors: {
      50: '#eff6ff',
      100: '#dbeafe', 
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      900: '#1e3a8a'
    }
  },
  green: {
    name: 'Forest Green',
    primary: 'emerald',
    colors: {
      50: '#ecfdf5',
      100: '#d1fae5',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      900: '#064e3b'
    }
  },
  purple: {
    name: 'Royal Purple',
    primary: 'purple',
    colors: {
      50: '#faf5ff',
      100: '#f3e8ff',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      900: '#4c1d95'
    }
  },
  orange: {
    name: 'Sunset Orange',
    primary: 'orange',
    colors: {
      50: '#fff7ed',
      100: '#ffedd5',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      900: '#9a3412'
    }
  },
  pink: {
    name: 'Cherry Blossom',
    primary: 'pink',
    colors: {
      50: '#fdf2f8',
      100: '#fce7f3',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      900: '#831843'
    }
  }
};

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('blue');

  useEffect(() => {
    // Load saved preferences
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedTheme = localStorage.getItem('colorTheme') || 'blue';
    
    setIsDarkMode(savedDarkMode);
    setCurrentTheme(savedTheme);
    
    // Apply theme to document
    updateDocumentTheme(savedDarkMode, savedTheme);
  }, []);

  const updateDocumentTheme = (darkMode, theme) => {
    const root = document.documentElement;
    const themeColors = colorThemes[theme].colors;
    
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Update CSS custom properties
    root.style.setProperty('--color-primary-50', themeColors[50]);
    root.style.setProperty('--color-primary-100', themeColors[100]);
    root.style.setProperty('--color-primary-500', themeColors[500]);
    root.style.setProperty('--color-primary-600', themeColors[600]);
    root.style.setProperty('--color-primary-700', themeColors[700]);
    root.style.setProperty('--color-primary-900', themeColors[900]);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    updateDocumentTheme(newDarkMode, currentTheme);
  };

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('colorTheme', themeName);
    updateDocumentTheme(isDarkMode, themeName);
  };

  const value = {
    isDarkMode,
    currentTheme,
    colorThemes,
    toggleDarkMode,
    changeTheme,
    themeColors: colorThemes[currentTheme].colors
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
} 