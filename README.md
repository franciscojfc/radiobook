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

- **Frontend (React)**: Muestra un mensaje "Hola Mundo" y permite conectar con el backend
- **Backend (Express)**: API REST que retorna mensajes en formato JSON
- **Comunicación**: El frontend puede hacer peticiones al backend a través de la API

## API Endpoints

- `GET /` - Mensaje de bienvenida
- `GET /api/hello` - Endpoint principal que retorna datos JSON

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js, CORS
- **Frontend**: React, Create React App
- **Desarrollo**: Nodemon, Concurrently

## Próximos Pasos

Este es un proyecto base que puedes extender con:
- Base de datos (MongoDB, PostgreSQL)
- Autenticación y autorización
- Más rutas y componentes
- Estado global (Redux, Context API)
- Testing
- Deployment
