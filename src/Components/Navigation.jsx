import { useNavigate } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    const navigate = useNavigate();

    return (
        <>
            <nav role="navigation" aria-label="Main navigation">
                <div class="brand" tabindex="0">RenyHijab</div>
                <div class="nav-links" id="navLinks">
                    <a onClick={() => navigate('/')} tabindex="0">Home</a>
                    <a onClick={() => navigate('/product')} tabindex="0">Product</a>
                    <a onClick={() => navigate('/transaction')} tabindex="0">Transaction</a>
                    <a onClick={() => navigate('/')} tabindex="0">Customer</a>
                </div>
            </nav><br /><br />
        </>
    )
}

export default Navigation