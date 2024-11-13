const Joi = require('joi');
const connection = require('../../db');

const userSchema = Joi.object({
  nombre: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
});

// Endpoint para actualizar un usuario en la base de datos
/**
 * @swagger
 * /api/actualizar-datos/{id}:
 *   patch:
 *     summary: Actualiza los datos de un usuario en la base de datos
 *     description: Este endpoint permite actualizar el nombre y el email de un usuario específico en la tabla "usuarios" usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
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
 *                 example: Juan Perez Actualizado
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: juan.perez.actualizado@example.com
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario actualizado correctamente
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
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error al actualizar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al actualizar el usuario
 */



const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { nombre, email } = req.body;

  try {
    const [result] = await connection.promise().query(
      'UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?',
      [nombre, email, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

module.exports = actualizarUsuario;
