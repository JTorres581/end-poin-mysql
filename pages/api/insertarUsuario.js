const Joi = require('joi');
const connection = require('../../db');

const userSchema = Joi.object({
  nombre: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
});

// Endpoint para insertar un usuario en la base de datos
/**
 * @swagger
 * /api/insertar-datos:
 *   post:
 *     summary: Inserta un nuevo usuario en la base de datos
 *     description: Este endpoint permite insertar un usuario proporcionando un nombre y un email. Los datos son validados antes de ser insertados en la tabla "usuarios".
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: Juan Perez
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: juan.perez@example.com
 *     responses:
 *       200:
 *         description: Usuario insertado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario insertado correctamente
 *       400:
 *         description: Error en la validación de los datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El nombre es requerido"
 *       500:
 *         description: Error al insertar los datos en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al insertar los datos"
 */



const insertarUsuario = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { nombre, email } = req.body;

  try {
    await connection.promise().query(
      'INSERT INTO usuarios (nombre, email) VALUES (?, ?)',
      [nombre, email]
    );
    res.status(200).json({ message: 'Usuario insertado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al insertar los datos' });
  }
};

module.exports = insertarUsuario;
