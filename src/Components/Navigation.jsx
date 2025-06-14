import './Navigation.css';

function Navigation() {
    return (
        <>
            <nav role="navigation" aria-label="Main navigation">
                <div class="brand" tabindex="0">RenyHijab</div>
                <div class="nav-links" id="navLinks">
                    <a href="/" tabindex="0">Home</a>
                    <a href="/product" tabindex="0">Product</a>
                    <a href="/transaction" tabindex="0">Transaction</a>
                    <a href="#" tabindex="0">Customer</a>
                </div>
            </nav><br /><br />
        </>
    )
}

export default Navigation