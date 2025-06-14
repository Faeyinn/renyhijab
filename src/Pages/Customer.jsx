import '../App.css'
import Navigation from '../Components/Navigation';

function Customer() {
  return (
    <>
      <Navigation />

      <div class="container">
        <div class="card">
          <h2>Daftar Pelanggan</h2>
          <table>
            <thead>
              <tr>
                <th>Nama Pelanggan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Shaza</td>
                <td>
                  <button class="btn btn-primary">Edit</button>
                  <button class="btn btn-secondary">Hapus</button>
                </td>
              </tr>
              <tr>
                <td>Fajar</td>
                <td>
                  <button class="btn btn-primary">Edit</button>
                  <button class="btn btn-secondary">Hapus</button>
                </td>
              </tr>
              <tr>
                <td>Nisa</td>
                <td>
                  <button class="btn btn-primary">Edit</button>
                  <button class="btn btn-secondary">Hapus</button>
                </td>
              </tr>
              <tr>
                <td>Hapis</td>
                <td>
                  <button class="btn btn-primary">Edit</button>
                  <button class="btn btn-secondary">Hapus</button>
                </td>
              </tr>
              <tr>
                <td>Ucup</td>
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

export default Customer