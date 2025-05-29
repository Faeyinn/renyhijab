import { useState } from 'react'
import renyhijab from './assets/renyhijab.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav role="navigation" aria-label="Main navigation">
        <div class="brand" tabindex="0">RenyHijab</div>
        <div class="nav-links" id="navLinks">
          <a href="#" tabindex="0">About</a>
          <a href="#" tabindex="0">Product</a>
          <a href="#" tabindex="0">Contact</a>
          <a href="#" tabindex="0">Home</a>
        </div>
      </nav>

      <div>
        <a href="https://instagram.com/jaaeyia" target="_blank">
          <img src={renyhijab} className="logo" alt="Vite logo" />
        </a>
      </div>

      <h1>Reny Hijab Database</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        <em>Copyright © 2025 Reny Hijab. All rights reserved.</em>
      </p>
    </>
  )
}

export default App
