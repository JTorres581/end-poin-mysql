const nodemailer = require('nodemailer');
const connection = require('../../db');


// Endpoint para enviar correos a todos los usuarios en la base de datos
/**
 * @swagger
 * /api/enviar-correos:
 *   post:
 *     summary: Envía correos electrónicos a todos los usuarios
 *     description: Este endpoint envía un correo electrónico a todos los usuarios registrados en la base de datos.
 *     responses:
 *       200:
 *         description: Correos electrónicos enviados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Correos electrónicos enviados correctamente a todos los usuarios.
 *       500:
 *         description: Error al enviar correos electrónicos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al enviar correos electrónicos.
 */


const enviarCorreo = async (req, res) => {
  try {
    // Obtén los usuarios de la base de datos
    const [usuarios] = await connection.promise().query('SELECT nombre, email FROM usuarios');

    // Configura el transportador de correo electrónico
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Puedes usar otros servicios como Outlook o SMTP personalizado
      auth: {
        user: 'juantpruebas1124@gmail.com', // Reemplaza con tu dirección de correo electrónico
        pass: 'yjtc ybbi muvy przs', // Reemplaza con la contraseña de tu correo electrónico o un App Password
      },
    });

    // Recorre los usuarios y envía un correo a cada uno
    for (const usuario of usuarios) {
      const mailOptions = {
        from: 'juantpruebas1124@gmail.com', // Dirección de correo del remitente
        to: usuario.email,           // Correo del usuario
        subject: 'Saludos de nuestra aplicación',
        text: `Hola ${usuario.nombre},\n\n esto es un endpoint de Juan torres desde Express con nodejs.\n\nSaludos,\nEl equipo\n mas rato le envio el login ;v`,
      };

      // Enviar el correo electrónico
      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ message: 'Correos electrónicos enviados correctamente a todos los usuarios.' });
  } catch (error) {
    console.error('Error al enviar correos:', error);
    res.status(500).json({ error: 'Error al enviar correos electrónicos.' });
  }
};

module.exports = enviarCorreo;
