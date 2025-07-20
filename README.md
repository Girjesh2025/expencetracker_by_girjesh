# 💰 Expense Tracker

A modern, responsive expense tracking web application built with React, Firebase, and Tailwind CSS. Track your income and expenses with beautiful visualizations and real-time data.

## ✨ Features

- **🔐 Authentication**: Secure login and signup with Firebase Auth
- **📊 Dashboard**: Clean, intuitive dashboard with expense overview
- **💳 Transaction Management**: Add, edit, and delete income/expense transactions
- **📈 Data Visualization**: Interactive charts showing spending patterns and trends
- **🏷️ Categories**: Organized expense categories (Food, Transportation, etc.)
- **📅 Date Filtering**: Filter transactions by date range
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **💡 Real-time Updates**: Instant updates across all components

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Routing**: React Router v6

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Get your Firebase configuration

4. **Environment Variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your Firebase configuration in the `.env` file:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

5. **Update Firebase Config**
   Update `src/config/firebase.js` with your actual Firebase configuration.

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

### Getting Started
1. **Sign Up**: Create a new account with your email and password
2. **Login**: Access your personal expense tracker
3. **Add Transactions**: Click "Add Transaction" to record income or expenses
4. **View Analytics**: Monitor your spending patterns with interactive charts
5. **Filter by Date**: Use date filters to view specific time periods

### Features Overview

#### Transaction Management
- **Add**: Record new income or expense transactions
- **Edit**: Modify existing transactions
- **Delete**: Remove unwanted transactions
- **Categorize**: Assign categories for better organization

#### Analytics & Insights
- **Summary Cards**: View total income, expenses, and balance
- **Category Breakdown**: Pie chart showing expense distribution
- **Trend Analysis**: Line chart displaying daily income vs expenses
- **Date Filtering**: Filter data by custom date ranges

#### Categories
**Expense Categories:**
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Healthcare
- Education
- Travel
- Other

**Income Categories:**
- Salary
- Freelance
- Investment
- Gift
- Business
- Other

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── Dashboard/
│   │   ├── Dashboard.jsx
│   │   ├── Header.jsx
│   │   ├── Summary.jsx
│   │   ├── Charts.jsx
│   │   ├── TransactionForm.jsx
│   │   └── TransactionList.jsx
│   └── ProtectedRoute.jsx
├── contexts/
│   └── AuthContext.jsx
├── config/
│   └── firebase.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Netlify/Vercel
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in your deployment platform

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Firebase Connection Issues:**
- Verify your Firebase configuration in `.env`
- Ensure Firestore rules allow read/write for authenticated users
- Check if Authentication is enabled in Firebase Console

**Build Errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for missing dependencies
- Verify Node.js version compatibility

**Charts Not Displaying:**
- Ensure Chart.js is properly imported
- Check browser console for JavaScript errors
- Verify transaction data structure

## 📞 Support

If you encounter any issues or have questions, please [open an issue](../../issues) on GitHub.

---

Built with ❤️ using React and Firebase
