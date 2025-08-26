import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessage('¡Hola Mundo desde React!');
  }, []);

  const fetchBackendData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/hello');
      const data = await response.json();
      setBackendData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setBackendData({ message: 'Error conectando con el backend', error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎙️ Radiobook</h1>
        <p className="frontend-message">{message}</p>
        
        <div className="backend-section">
          <button 
            onClick={fetchBackendData} 
            disabled={loading}
            className="fetch-button"
          >
            {loading ? 'Cargando...' : 'Conectar con Backend'}
          </button>
          
          {backendData && (
            <div className={`backend-response ${backendData.error ? 'error' : ''}`}>
              <h3>Respuesta del Backend:</h3>
              <p>{backendData.message}</p>
              {backendData.timestamp && (
                <small>Timestamp: {backendData.timestamp}</small>
              )}
              {backendData.server && (
                <small>Servidor: {backendData.server}</small>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
