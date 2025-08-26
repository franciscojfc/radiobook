import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [randomStory, setRandomStory] = useState(null);
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [storyLoading, setStoryLoading] = useState(true);

  // Cargar historia aleatoria al iniciar
  useEffect(() => {
    fetchRandomStory();
  }, []);

  const fetchRandomStory = async () => {
    setStoryLoading(true);
    try {
      const response = await fetch('/api/stories/random');
      const data = await response.json();
      if (data.success) {
        setRandomStory(data.data);
      } else {
        console.error('Error cargando historia:', data.message);
      }
    } catch (error) {
      console.error('Error conectando con el backend:', error);
    } finally {
      setStoryLoading(false);
    }
  };

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
        <h1>📚 Radiobook</h1>
        
        {/* Historia Aleatoria */}
        <div className="story-section">
          <h2>Historia del Día</h2>
          {storyLoading ? (
            <div className="loading">Cargando historia...</div>
          ) : randomStory ? (
            <div className="story-card">
              <h3 className="story-title">"{randomStory.title}"</h3>
              <p className="story-author">por {randomStory.author}</p>
              <p className="story-year">({randomStory.publication_year})</p>
              <p className="story-content">{randomStory.content}</p>
              <button 
                onClick={fetchRandomStory} 
                className="new-story-button"
              >
                📖 Nueva Historia
              </button>
            </div>
          ) : (
            <div className="story-error">
              <p>No se pudo cargar la historia</p>
              <button onClick={fetchRandomStory} className="retry-button">
                🔄 Reintentar
              </button>
            </div>
          )}
        </div>
        
        <div className="backend-section">
          <button 
            onClick={fetchBackendData} 
            disabled={loading}
            className="fetch-button"
          >
            {loading ? 'Cargando...' : 'Probar Conexión API'}
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
