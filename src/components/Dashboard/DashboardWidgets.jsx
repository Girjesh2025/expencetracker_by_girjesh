import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, TrendingUp, TrendingDown, DollarSign, PieChart, Calendar, Target } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';

// Sortable Widget Component
function SortableWidget({ id, children, title }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 ${
        isDragging ? 'opacity-50 shadow-xl scale-105' : 'hover:shadow-md'
      }`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-600 cursor-grab active:cursor-grabbing"
      >
        <h3 className="font-medium text-gray-900 dark:text-white text-sm">{title}</h3>
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>
      
      {/* Widget Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

// Individual Widget Components
function IncomeWidget({ transactions }) {
  const { formatCurrency } = useCurrency();
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const monthlyIncome = transactions
    .filter(t => {
      const date = new Date(t.date);
      return t.type === 'income' && 
             date.getMonth() === thisMonth && 
             date.getFullYear() === thisYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <TrendingUp className="h-5 w-5 text-green-500" />
        <span className="text-sm text-gray-600 dark:text-gray-300">Total Income</span>
      </div>
      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
        {formatCurrency(totalIncome)}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        This month: {formatCurrency(monthlyIncome)}
      </div>
    </div>
  );
}

function ExpenseWidget({ transactions }) {
  const { formatCurrency } = useCurrency();
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const monthlyExpenses = transactions
    .filter(t => {
      const date = new Date(t.date);
      return t.type === 'expense' && 
             date.getMonth() === thisMonth && 
             date.getFullYear() === thisYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <TrendingDown className="h-5 w-5 text-red-500" />
        <span className="text-sm text-gray-600 dark:text-gray-300">Total Expenses</span>
      </div>
      <div className="text-2xl font-bold text-red-600 dark:text-red-400">
        {formatCurrency(totalExpenses)}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        This month: {formatCurrency(monthlyExpenses)}
      </div>
    </div>
  );
}

function BalanceWidget({ transactions }) {
  const { formatCurrency } = useCurrency();
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <DollarSign className="h-5 w-5 text-blue-500" />
        <span className="text-sm text-gray-600 dark:text-gray-300">Net Balance</span>
      </div>
      <div className={`text-2xl font-bold ${
        balance >= 0 
          ? 'text-green-600 dark:text-green-400' 
          : 'text-red-600 dark:text-red-400'
      }`}>
        {formatCurrency(balance)}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {balance >= 0 ? 'Surplus' : 'Deficit'}
      </div>
    </div>
  );
}

function TopCategoriesWidget({ transactions }) {
  const { formatCurrency } = useCurrency();
  const categoryTotals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const topCategories = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <PieChart className="h-5 w-5 text-purple-500" />
        <span className="text-sm text-gray-600 dark:text-gray-300">Top Categories</span>
      </div>
      <div className="space-y-2">
        {topCategories.map(([category, amount], index) => (
          <div key={category} className="flex justify-between items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
              {category}
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {formatCurrency(amount)}
            </span>
          </div>
        ))}
        {topCategories.length === 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400">No expenses yet</p>
        )}
      </div>
    </div>
  );
}

function RecentTransactionsWidget({ transactions }) {
  const { formatCurrency } = useCurrency();
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Calendar className="h-5 w-5 text-orange-500" />
        <span className="text-sm text-gray-600 dark:text-gray-300">Recent Activity</span>
      </div>
      <div className="space-y-2">
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                {transaction.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
            <span className={`text-sm font-medium ${
              transaction.type === 'income' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
            </span>
          </div>
        ))}
        {recentTransactions.length === 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400">No transactions yet</p>
        )}
      </div>
    </div>
  );
}

function SavingsGoalWidget() {
  const { formatCurrency } = useCurrency();
  const goal = 5000; // Example goal
  const saved = 1250; // Example saved amount
  const progress = (saved / goal) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Target className="h-5 w-5 text-indigo-500" />
        <span className="text-sm text-gray-600 dark:text-gray-300">Savings Goal</span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Progress</span>
          <span className="font-medium text-gray-900 dark:text-white">{progress.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{formatCurrency(saved)} saved</span>
          <span>{formatCurrency(goal)} goal</span>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Widgets Component
export default function DashboardWidgets({ transactions }) {
  const [widgets, setWidgets] = useState([
    { id: 'balance', title: 'Net Balance', component: BalanceWidget },
    { id: 'income', title: 'Income', component: IncomeWidget },
    { id: 'expenses', title: 'Expenses', component: ExpenseWidget },
    { id: 'categories', title: 'Top Categories', component: TopCategoriesWidget },
    { id: 'recent', title: 'Recent Transactions', component: RecentTransactionsWidget },
    { id: 'savings', title: 'Savings Goal', component: SavingsGoalWidget },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load saved widget order from localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem('dashboardWidgetOrder');
    if (savedOrder) {
      try {
        const orderIds = JSON.parse(savedOrder);
        const reorderedWidgets = orderIds
          .map(id => widgets.find(w => w.id === id))
          .filter(Boolean);
        
        // Add any new widgets that weren't in saved order
        const newWidgets = widgets.filter(w => !orderIds.includes(w.id));
        setWidgets([...reorderedWidgets, ...newWidgets]);
      } catch (error) {
        console.error('Failed to load widget order:', error);
      }
    }
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        const newOrder = arrayMove(items, oldIndex, newIndex);
        
        // Save to localStorage
        localStorage.setItem('dashboardWidgetOrder', JSON.stringify(newOrder.map(w => w.id)));
        
        return newOrder;
      });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard Overview</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">Drag widgets to reorder</p>
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {widgets.map((widget) => {
              const WidgetComponent = widget.component;
              return (
                <SortableWidget key={widget.id} id={widget.id} title={widget.title}>
                  <WidgetComponent transactions={transactions} />
                </SortableWidget>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
} 