import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';
import '../App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validasi sederhana (dalam implementasi nyata, gunakan autentikasi yang lebih aman)
    if (username === 'renyhijab' && password === 'adminrenyhijab') {
      login(username);
      navigate('/dashboard');
    } else {
      setError('Username atau password salah!');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fff0f6 0%, #ffe2ee 100%)'
    }}>
      <div className="card" style={{ maxWidth: '400px', margin: 0 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            color: '#8b3750',
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5rem',
            marginBottom: '0.5rem'
          }}>
            RenyHijab
          </h1>
          <p style={{ color: '#7f4660', fontSize: '1.1rem' }}>
            Silakan login untuk mengakses sistem
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="username"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#5a2a3f',
                fontWeight: '600'
              }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #f8cddf',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#F497B6'}
              onBlur={(e) => e.target.style.borderColor = '#f8cddf'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#5a2a3f',
                fontWeight: '600'
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #f8cddf',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#F497B6'}
              onBlur={(e) => e.target.style.borderColor = '#f8cddf'}
            />
          </div>

          {error && (
            <div style={{
              color: '#dc3545',
              marginBottom: '1rem',
              textAlign: 'center',
              padding: '0.5rem',
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c6cb',
              borderRadius: '4px'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="cta-button"
            style={{
              width: '100%',
              fontSize: '1.1rem',
              padding: '0.875rem'
            }}
          >
            Masuk
          </button>
        </form>

        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: '#fff0f6',
          borderRadius: '8px',
          border: '1px solid #f8cddf'
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f4660' }}>
            <strong>Demo Login:</strong><br />
            Username: renyhijab<br />
            Password: adminrenyhijab
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;