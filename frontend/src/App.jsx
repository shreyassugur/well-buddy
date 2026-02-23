import './App.css'
import { Routes, Route, Navigate } from "react-router"
import HomePage from './pages/HomePage.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'

import Dashboard from './pages/Dashboard.jsx'
import Habits from './pages/Habits.jsx'
import Workouts from './pages/Workouts.jsx'
import Challenges from './pages/Challenges.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import Profile from './pages/Profile.jsx'
import Chat from './pages/Chat.jsx'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Auth Routes */}
        <Route path="/users/signup" element={<SignUp />} />
        <Route path="/users/login" element={<Login />} />

        {/* Protected App Routes */}
        <Route path="/app" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="habits" element={<Habits />} />
          <Route path="workouts" element={<Workouts />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chat" element={<Chat />} />
        </Route>

        {/* Catch all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
