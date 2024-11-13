// pages/api-docs.js
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swagger';

export default function handler(req, res) {
  swaggerUi.setup(swaggerSpec)(req, res);
}
