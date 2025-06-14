import { useNavigate } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    const navigate = useNavigate();

    return (
        <>
            <nav role="navigation" aria-label="Main navigation">
                <div class="brand" tabindex="0">RenyHijab</div>
                <div class="nav-links" id="navLinks">
                    <a onClick={() => navigate('/')} tabindex="0">Beranda</a>
                    <a onClick={() => navigate('/product')} tabindex="0">Produk</a>
                    <a onClick={() => navigate('/transaction')} tabindex="0">Transaksi</a>
                    <a onClick={() => navigate('/customer')} tabindex="0">Pelanggan</a>
                </div>
            </nav><br />
        </>
    )
}

export default Navigation