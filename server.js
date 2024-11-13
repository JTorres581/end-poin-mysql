const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const insertarUsuario = require('./pages/api/insertarUsuario');
const eliminarUsuario = require('./pages/api/eliminarUsuario');
const actualizarUsuario = require('./pages/api/actualizarUsuario');
const verUsuarios = require('./pages/api/usuarios');
const Usuarios = require('./pages/api/usuarios');
const enviarCorreo = require('./pages/api/enviarCorreo');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios',
      version: '1.0.0',
      description: 'API para gestionar usuarios en una base de datos MySQL',
    },
  },
  apis: ['./server.js','./pages/api/*.js'], // O puedes añadir rutas específicas de tus archivos en apis
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas de la API
app.get('/api/usuarios', Usuarios);
app.post('/api/insertar-datos', insertarUsuario);
app.delete('/api/eliminar-datos/:id', eliminarUsuario);
app.patch('/api/actualizar-datos/:id', actualizarUsuario);
app.post('/api/enviar-correos', enviarCorreo);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
