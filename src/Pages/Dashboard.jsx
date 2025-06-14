import { useNavigate } from 'react-router-dom';
import '../App.css';
import Navigation from '../Components/Navigation';

function Dashboard() {
  const navigate = useNavigate()

  return (
    <>
      <Navigation />

      <h1>RenyHijab Database</h1>

      <div className="card">
        <button class="cta-button" onClick={() => navigate('/product')}>Kelola Database</button>
        <p>
          <em>"Tampil Anggun dan Syar'i Bersama Kami"</em>
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
        <em>Email: info@renyhijab.com</em>
      </p>
    </>
  )
}

export default Dashboard