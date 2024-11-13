const connection = require('../../db');

// Endpoint para obtener todos los usuarios de la base de datos
/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios de la base de datos
 *     description: Este endpoint permite obtener todos los registros de la tabla "usuarios".
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Juan Perez
 *                   email:
 *                     type: string
 *                     example: juan.perez@example.com
 *       500:
 *         description: Error al obtener los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener los usuarios
 */

const Usuarios = async (req, res) => {
  try {
    const [rows] = await connection.promise().query('SELECT * FROM usuarios');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

module.exports = Usuarios;
