import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Product from './Pages/Product.jsx'
import Transaction from './Pages/Transaction.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </Router>
  )
}

export default App