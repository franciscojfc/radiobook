const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hola Mundo desde el Backend!' });
});

app.get('/api/hello', (req, res) => {
  res.json({ 
    message: 'Hola Mundo desde la API!',
    timestamp: new Date().toISOString(),
    server: 'Express.js'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
