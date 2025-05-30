function Dbpage() {
  return (
    <>
        <header>
            <h1>Toko Hijab Admin</h1>
            <nav>
            <a href="#">Dashboard</a>
            <a href="#">Produk</a>
            <a href="#">Pelanggan</a>
            <a href="#">Transaksi</a>
            <a href="#">Logout</a>
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
                </tbody>
            </table>
            </div>
        </div>
    </>
  );
}

export default Dbpage