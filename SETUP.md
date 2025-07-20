# 🚀 Quick Setup Guide

## Prerequisites
- Node.js (v16+)
- Firebase account
- Code editor

## Step-by-Step Setup

### 1. Firebase Project Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Enter project name (e.g., "my-expense-tracker")
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password"
5. Click "Save"

### 3. Setup Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode"
4. Select location (closest to your users)
5. Click "Done"

### 4. Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web app" icon (`</>`)
4. Register app with a name
5. Copy the configuration object

### 5. Configure Your App
1. Create `.env` file in project root:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase config in `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-app-id
   ```

### 6. Install & Run
```bash
npm install
npm run dev
```

### 7. Open & Test
1. Open `http://localhost:5173`
2. Click "Sign up here"
3. Create an account
4. Start adding transactions!

## 🎉 You're Ready!

Your expense tracker is now fully functional with:
- ✅ User authentication
- ✅ Real-time data storage
- ✅ Beautiful charts and analytics
- ✅ Responsive design
- ✅ Category-wise expense tracking

## 🛠️ Optional: Firestore Security Rules

For production, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /transactions/{transactionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Allow users to create their own transactions
    match /transactions/{transactionId} {
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## 📱 Features to Try

1. **Add Income**: Record your salary or other income
2. **Track Expenses**: Log your daily expenses with categories
3. **View Charts**: See your spending patterns in beautiful charts
4. **Filter by Date**: Use date filters to view specific periods
5. **Edit/Delete**: Modify or remove transactions as needed

Happy expense tracking! 💰 