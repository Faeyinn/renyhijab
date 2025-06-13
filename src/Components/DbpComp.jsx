import './DbpComp.css'

function DbpComp() {
  return (
    <>
        <header>
            <nav>
                <div class="brand" tabindex="0">RenyHijab</div>
                <a href="/">Home</a>
                <a href="/dbpage">Produk</a>
                <a href="#">Pelanggan</a>
                <a href="#">Transaksi</a>
            </nav>
        </header>

        <div class="container">
            <div class="card">
            <h2>Daftar Produk</h2>
            <table>
                <thead>
                <tr>
                    <th>Nama Produk</th>
                    <th>Stok</th>
                    <th>Harga</th>
                    <th>Aksi</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Hijab Instan Polos</td>
                    <td>25</td>
                    <td>Rp45.000</td>
                    <td>
                    <button class="btn btn-primary">Edit</button>
                    <button class="btn btn-secondary">Hapus</button>
                    </td>
                </tr>
                <tr>
                    <td>Pashmina Ceruty</td>
                    <td>15</td>
                    <td>Rp55.000</td>
                    <td>
                    <button class="btn btn-primary">Edit</button>
                    <button class="btn btn-secondary">Hapus</button>
                    </td>
                </tr>
                <tr>
                    <td>Kaos Kaki</td>
                    <td>20</td>
                    <td>Rp12.000</td>
                    <td>
                    <button class="btn btn-primary">Edit</button>
                    <button class="btn btn-secondary">Hapus</button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </>
  );
}

export default DbpComp