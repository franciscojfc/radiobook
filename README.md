# Radiobook - Full Stack Hello World

Una aplicación full-stack simple que muestra "Hola Mundo" con un backend en Node.js/Express y un frontend en React.

## Estructura del Proyecto

```
radiobook/
├── backend/          # API con Express.js
│   ├── package.json
│   └── server.js
├── frontend/         # Aplicación React
│   ├── package.json
│   ├── public/
│   └── src/
├── package.json      # Scripts para manejar ambos proyectos
└── README.md
```

## Instalación

1. **Instalar dependencias de ambos proyectos:**
   ```bash
   npm run install-all
   ```

   O instalar por separado:
   ```bash
   # Backend
   npm run install-backend
   
   # Frontend
   npm run install-frontend
   ```

## Ejecución

### Opción 1: Ejecutar ambos simultáneamente (Recomendado)
```bash
npm run dev
```

### Opción 2: Ejecutar por separado

1. **Iniciar el backend (Terminal 1):**
   ```bash
   npm run start-backend
   ```
   El backend estará disponible en: http://localhost:3001

2. **Iniciar el frontend (Terminal 2):**
   ```bash
   npm run start-frontend
   ```
   El frontend estará disponible en: http://localhost:3000

## Funcionalidades

- **Frontend (React)**: Muestra una historia aleatoria de la base de datos con información del autor, año y contenido
- **Backend (Express)**: API REST con base de datos SQLite para gestionar historias
- **Base de Datos**: SQLite local con tabla de historias que incluye datos fake
- **Comunicación**: El frontend obtiene historias aleatorias del backend a través de la API

## API Endpoints

- `GET /` - Mensaje de bienvenida
- `GET /api/hello` - Endpoint de prueba que retorna datos JSON
- `GET /api/stories` - Obtener todas las historias
- `GET /api/stories/random` - Obtener una historia aleatoria
- `GET /api/stories/:id` - Obtener una historia específica por ID
- `POST /api/stories` - Crear una nueva historia

## Base de Datos

El proyecto incluye una base de datos SQLite local (`backend/radiobook.db`) con la siguiente estructura:

### Tabla: stories
- `id` - Identificador único (INTEGER PRIMARY KEY AUTOINCREMENT)
- `created_at` - Fecha de creación (DATETIME DEFAULT CURRENT_TIMESTAMP)
- `publication_year` - Año de publicación (INTEGER NOT NULL)
- `author` - Autor de la historia (TEXT NOT NULL)
- `title` - Título de la historia (TEXT NOT NULL)
- `content` - Contenido de la historia (TEXT NOT NULL)

La base de datos se inicializa automáticamente con 8 historias de ejemplo de autores latinoamericanos reconocidos.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js, CORS, SQLite3, Better-SQLite3
- **Frontend**: React, Create React App
- **Base de Datos**: SQLite (local)
- **Desarrollo**: Nodemon, Concurrently

## Próximos Pasos

Este es un proyecto base que puedes extender con:
- Base de datos (MongoDB, PostgreSQL)
- Autenticación y autorización
- Más rutas y componentes
- Estado global (Redux, Context API)
- Testing
- Deployment

## Subir a GitHub

Para subir este proyecto a tu GitHub personal:

1. **Crear un nuevo repositorio en GitHub:**
   - Ve a https://github.com/new
   - Nombre: `radiobook` (o el nombre que prefieras)
   - Descripción: "Full-stack Hello World app with Node.js/Express backend and React frontend"
   - Mantén el repositorio como público o privado según prefieras
   - **NO** marques "Add a README file", "Add .gitignore", o "Choose a license" (ya los tenemos)

2. **Conectar y subir el proyecto:**
   ```bash
   git remote add origin https://github.com/TU_USUARIO/radiobook.git
   git branch -M main
   git push -u origin main
   ```

   Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.

3. **Verificar que se subió correctamente:**
   - Ve a tu repositorio en GitHub
   - Deberías ver todos los archivos del proyecto
   - El README.md se mostrará automáticamente en la página principal
