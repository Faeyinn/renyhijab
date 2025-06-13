import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Dbpage from './Pages/Dbpage.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dbpage" element={<Dbpage />} />
      </Routes>
    </Router>
  )
}

export default App