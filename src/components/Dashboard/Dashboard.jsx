import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from './Header';
import DashboardWidgets from './DashboardWidgets';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import Summary from './Summary';
import Charts from './Charts';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [dateFilter, setDateFilter] = useState({
    start: '',
    end: ''
  });

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      userId: currentUser.uid,
      createdAt: new Date().toISOString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
    setShowForm(false);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === updatedTransaction.id 
          ? { ...updatedTransaction, updatedAt: new Date().toISOString() }
          : t
      )
    );
    setShowForm(false);
    setEditingTransaction(null);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  // Filter transactions based on date range
  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
    const endDate = dateFilter.end ? new Date(dateFilter.end) : null;

    if (startDate && transactionDate < startDate) return false;
    if (endDate && transactionDate > endDate) return false;
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header 
        dateFilter={dateFilter} 
        setDateFilter={setDateFilter}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Widgets */}
        <DashboardWidgets transactions={filteredTransactions} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Summary and Charts */}
          <div className="lg:col-span-2 space-y-8">
            <Summary transactions={filteredTransactions} />
            <Charts transactions={filteredTransactions} />
          </div>
          
          {/* Right Column - Transactions */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
              <button
                onClick={() => {
                  setEditingTransaction(null);
                  setShowForm(true);
                }}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </button>
            </div>
            
            <TransactionList 
              transactions={filteredTransactions}
              onEdit={handleEdit}
              onDelete={deleteTransaction}
            />
          </div>
        </div>
      </main>

      {/* Transaction Form Modal */}
      {showForm && (
        <TransactionForm
          isOpen={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingTransaction(null);
          }}
          onSubmit={editingTransaction ? updateTransaction : addTransaction}
          initialData={editingTransaction}
        />
      )}
    </div>
  );
} 