import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Navigation.css';

function Navigation() {
    const navigate = useNavigate();
    const { username, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <nav role="navigation" aria-label="Main navigation">
                <div className="brand" tabIndex="0">RenyHijab</div>
                <div className="nav-links" id="navLinks">
                    <a onClick={() => navigate('/dashboard')} tabIndex="0">Dashboard</a>
                    <a onClick={() => navigate('/product')} tabIndex="0">Produk</a>
                    <a onClick={() => navigate('/transaction')} tabIndex="0">Transaksi</a>
                    <a onClick={() => navigate('/customer')} tabIndex="0">Pelanggan</a>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ 
                            color: '#7f4660', 
                            fontSize: '0.9rem',
                            fontWeight: '500'
                        }}>
                            Halo, {username}
                        </span>
                        <button 
                            onClick={handleLogout}
                            style={{
                                background: 'transparent',
                                border: '1px solid #F497B6',
                                color: '#F497B6',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                fontWeight: '500',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#F497B6';
                                e.target.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#F497B6';
                            }}
                        >
                            Keluar
                        </button>
                    </div>
                </div>
            </nav><br />
        </>
    )
}

export default Navigation