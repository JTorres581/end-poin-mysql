// pages/api/swagger.js
import { swaggerSpec } from '../../server';
import swaggerUi from 'swagger-ui-express';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).send(swaggerSpec);
  }
}
