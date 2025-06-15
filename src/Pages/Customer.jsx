import '../App.css'
import Navigation from '../Components/Navigation';

function Customer() {
  return (
    <>
      <Navigation />

      <div class="container">
        <div class="card">
          <h2>Daftar Customer</h2>
          <table>
            <thead>
              <tr>
                <th>ID_cust</th>
                <th>Nama Customer</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CUST001</td>
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