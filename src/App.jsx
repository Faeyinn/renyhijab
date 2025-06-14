import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './Components/AuthContext.jsx'
import Login from './Pages/Login.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Product from './Pages/Product.jsx'
import Transaction from './Pages/Transaction.jsx'
import Customer from './Pages/Customer.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route untuk login */}
          <Route path="/" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/product" element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          } />
          
          <Route path="/transaction" element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          } />
          
          <Route path="/customer" element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          } />
          
          {/* Redirect semua route lain ke login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App