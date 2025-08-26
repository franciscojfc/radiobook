const express = require('express');
const cors = require('cors');
const { initDatabase, getAllStories, getRandomStory, getStoryById, createStory } = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// Inicializar base de datos
initDatabase();

// Middleware
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware de logging para debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', req.headers.origin);
  next();
});

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

// Rutas para historias
app.get('/api/stories', (req, res) => {
  try {
    const stories = getAllStories();
    res.json({
      success: true,
      count: stories.length,
      data: stories
    });
  } catch (error) {
    console.error('Error obteniendo historias:', error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo historias',
      error: error.message
    });
  }
});

app.get('/api/stories/random', (req, res) => {
  try {
    const story = getRandomStory();
    if (story) {
      res.json({
        success: true,
        data: story
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No se encontraron historias'
      });
    }
  } catch (error) {
    console.error('Error obteniendo historia aleatoria:', error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo historia aleatoria',
      error: error.message
    });
  }
});

app.get('/api/stories/:id', (req, res) => {
  try {
    const { id } = req.params;
    const story = getStoryById(parseInt(id));
    
    if (story) {
      res.json({
        success: true,
        data: story
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Historia no encontrada'
      });
    }
  } catch (error) {
    console.error('Error obteniendo historia:', error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo historia',
      error: error.message
    });
  }
});

app.post('/api/stories', (req, res) => {
  try {
    const { publication_year, author, title, content } = req.body;
    
    if (!publication_year || !author || !title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }
    
    const result = createStory({ publication_year, author, title, content });
    res.status(201).json({
      success: true,
      message: 'Historia creada correctamente',
      data: { id: result.lastInsertRowid }
    });
  } catch (error) {
    console.error('Error creando historia:', error);
    res.status(500).json({
      success: false,
      message: 'Error creando historia',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
