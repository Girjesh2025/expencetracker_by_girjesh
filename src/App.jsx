import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <Router>
          <AuthProvider>
            <div className="App min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
          </AuthProvider>
        </Router>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
