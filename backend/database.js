const Database = require('better-sqlite3');
const path = require('path');

// Crear o conectar a la base de datos SQLite
const db = new Database(path.join(__dirname, 'radiobook.db'));

// Crear tabla stories si no existe
const createStoriesTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS stories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      publication_year INTEGER NOT NULL,
      author TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    )
  `;
  
  try {
    db.exec(sql);
    console.log('✅ Tabla stories creada o ya existía');
  } catch (error) {
    console.error('❌ Error creando tabla stories:', error);
  }
};

// Insertar datos fake si la tabla está vacía
const insertFakeData = () => {
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM stories');
  const result = countStmt.get();
  
  if (result.count === 0) {
    console.log('📚 Insertando datos fake...');
    
    const fakeStories = [
      {
        publication_year: 2020,
        author: 'Gabriel García Márquez',
        title: 'El último viaje del Coronel',
        content: 'En un pueblo olvidado del Caribe, el Coronel esperaba una pensión que nunca llegó, mientras los recuerdos de la guerra se desvanecían como la bruma matutina...'
      },
      {
        publication_year: 2019,
        author: 'Isabel Allende',
        title: 'La casa de los susurros',
        content: 'Clara sabía que las paredes de la casa antigua guardaban secretos. Cada noche, los susurros de generaciones pasadas le contaban historias que el tiempo había intentado borrar...'
      },
      {
        publication_year: 2021,
        author: 'Jorge Luis Borges',
        title: 'El jardín de senderos que se bifurcan',
        content: 'En el laberinto infinito de posibilidades, cada decisión crea un nuevo universo. El protagonista se encontró frente a un jardín donde cada sendero llevaba a una realidad diferente...'
      },
      {
        publication_year: 2018,
        author: 'Octavio Paz',
        title: 'El espejo de obsidiana',
        content: 'El espejo reflejaba no solo el rostro, sino también los pensamientos más profundos. En su superficie negra, las verdades ocultas emergían como burbujas en agua oscura...'
      },
      {
        publication_year: 2022,
        author: 'Mario Vargas Llosa',
        title: 'La ciudad y los perros de la memoria',
        content: 'Lima se extendía como un mapa de recuerdos fragmentados. Cada calle contaba una historia, cada esquina guardaba un secreto que solo los vientos del Pacífico conocían...'
      },
      {
        publication_year: 2020,
        author: 'Laura Esquivel',
        title: 'Recetas para el alma',
        content: 'En la cocina de la abuela, cada ingrediente tenía poder mágico. Las especias no solo daban sabor a la comida, sino que también sanaban corazones rotos y almas perdidas...'
      },
      {
        publication_year: 2021,
        author: 'Carlos Fuentes',
        title: 'El tiempo circular',
        content: 'En México, el tiempo no es lineal sino circular. El pasado y el presente se encuentran en cada pirámide, en cada ritual, en cada día que nace y muere bajo el mismo sol azteca...'
      },
      {
        publication_year: 2019,
        author: 'Elena Poniatowska',
        title: 'Voces en la penumbra',
        content: 'Las mujeres de la revolución hablaban en susurros, pero sus voces resonaban más fuerte que los cañones. En la penumbra de la historia, sus historias esperaban ser contadas...'
      }
    ];
    
    const insertStmt = db.prepare(`
      INSERT INTO stories (publication_year, author, title, content)
      VALUES (?, ?, ?, ?)
    `);
    
    for (const story of fakeStories) {
      try {
        insertStmt.run(story.publication_year, story.author, story.title, story.content);
      } catch (error) {
        console.error('❌ Error insertando historia:', error);
      }
    }
    
    console.log(`✅ ${fakeStories.length} historias insertadas correctamente`);
  } else {
    console.log(`📖 La base de datos ya tiene ${result.count} historias`);
  }
};

// Funciones para interactuar con la base de datos
const getAllStories = () => {
  const stmt = db.prepare('SELECT * FROM stories ORDER BY created_at DESC');
  return stmt.all();
};

const getRandomStory = () => {
  const stmt = db.prepare('SELECT * FROM stories ORDER BY RANDOM() LIMIT 1');
  return stmt.get();
};

const getStoryById = (id) => {
  const stmt = db.prepare('SELECT * FROM stories WHERE id = ?');
  return stmt.get(id);
};

const createStory = (storyData) => {
  const stmt = db.prepare(`
    INSERT INTO stories (publication_year, author, title, content)
    VALUES (?, ?, ?, ?)
  `);
  return stmt.run(storyData.publication_year, storyData.author, storyData.title, storyData.content);
};

// Inicializar base de datos
const initDatabase = () => {
  createStoriesTable();
  insertFakeData();
};

module.exports = {
  db,
  initDatabase,
  getAllStories,
  getRandomStory,
  getStoryById,
  createStory
};
