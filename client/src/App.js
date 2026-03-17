import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'https://fb-insights.onrender.com';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [insights, setInsights] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    window.location.href = `${API}/auth/facebook`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
      setToken(accessToken);
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(`${API}/user?access_token=${token}`)
        .then((res) => setUser(res.data))
        .catch(() => setError('Failed to fetch user'));

      axios
        .get(`${API}/pages?access_token=${token}`)
        .then((res) => setPages(res.data.data))
        .catch(() => setError('Failed to fetch pages'));
    }
  }, [token]);

  const getInsights = async () => {
    if (!selectedPage) {
      setError('Please select a page');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.get(`${API}/insights`, {
        params: {
          page_id: selectedPage.id,
          page_token: selectedPage.access_token,
          since: '2024-01-01',
          until: '2024-01-30',
        },
      });

      setInsights(res.data.data);
    } catch (err) {
      setError('Failed to fetch insights');
    } finally {
      setLoading(false);
    }
  };

  const btn = {
    padding: '10px 20px',
    margin: '10px',
    borderRadius: '8px',
    border: 'none',
    background: loading ? '#999' : '#1877f2',
    color: 'white',
    cursor: loading ? 'not-allowed' : 'pointer',
  };

  const select = {
    padding: '10px',
    borderRadius: '8px',
    marginRight: '10px',
  };

  const cardContainer = {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  };

  const card = {
    padding: '20px',
    borderRadius: '12px',
    background: '#f0f2f5',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    minWidth: '150px',
    textAlign: 'center',
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1> Facebook Insights Dashboard</h1>

      {!token && (
        <button onClick={handleLogin} style={btn}>
          Login
        </button>
      )}

      {user && (
        <div>
          <h3>{user.name}</h3>
          <img
            src={user.picture.data.url}
            alt=""
            style={{ borderRadius: '50%' }}
          />
        </div>
      )}

      {pages.length > 0 && (
        <div>
          <select
            onChange={(e) =>
              setSelectedPage(pages.find((p) => p.id === e.target.value))
            }
            style={select}
          >
            <option>Select Page</option>
            {pages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.name}
              </option>
            ))}
          </select>

          <button onClick={getInsights} style={btn}>
            {loading ? 'Loading...' : 'Get Insights'}
          </button>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={cardContainer}>
        {insights.map((item, index) => (
          <div key={index} style={card}>
            <h4>{item.name}</h4>
            <h2>{item.values[0]?.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
