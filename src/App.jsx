import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav role="navigation" aria-label="Main navigation">
        <div class="brand" tabindex="0">RenyHijab</div>
        <div class="nav-links" id="navLinks">
          <a href="#" tabindex="0">Home</a>
          <a href="#" tabindex="0">About</a>
          <a href="#" tabindex="0">Product</a>
          <a href="https://wa.me/62895600077007" tabindex="0">Contact</a>
        </div>
      </nav><br /><br />

      <h1>RenyHijab Database</h1>

      <div className="card">
        <a href="#produk" class="cta-button">Kelola Database</a>
        <p>
          "Tampil Anggun dan Syar'i Bersama Kami"
        </p>
      </div>

      <section class="keunggulan-section">
        <h3>Kenapa Belanja di RenyHijab?</h3>
        <div class="keunggulan-grid">
          <div>
            <p class="judul">✅ Berkualitas</p>
            <p>Bahan pilihan dan nyaman dipakai</p>
          </div>
          <div>
            <p class="judul">💸 Murah</p>
            <p>Harga terjangkau dan ramah kantong</p>
          </div>
          <div>
            <p class="judul">🔄 Tukar Ukuran</p>
            <p>Garansi tukar jika tidak pas</p>
          </div>
          <div>
            <p class="judul">🛡️ Aman</p>
            <p>Pembayaran aman & terpercaya</p>
          </div>
        </div>
      </section>

      <p className="read-the-docs">
        <em>Copyright © 2025 Reny Hijab. All rights reserved.</em><br />
        <em>Email: info@renyhijab.com | WhatsApp: 0123-4567-8999</em>
      </p>
    </>
  )
}

export default App
