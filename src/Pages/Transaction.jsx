import '../App.css'
import Navigation from '../Components/Navigation';

function Transaction() {
  return (
    <>
      <Navigation />

      <div class="container">
        <div class="card">
          <h2>Daftar Transaksi</h2>
          <table>
            <thead>
              <tr>
                <th>Tanggal Transaksi</th>
                <th>Pelanggan</th>
                <th>Produk</th>
                <th>Harga Satuan</th>
                <th>Jumlah Barang</th>
                <th>Total Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>14 Juni 2025</td>
                <td>Shaza</td>
                <td>Pashmina</td>
                <td>Rp45.000</td>
                <td>2</td>
                <td>Rp90.000</td>
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

export default Transaction