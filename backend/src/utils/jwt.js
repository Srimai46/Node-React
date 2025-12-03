import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const signToken = (payload, options = {}) =>
  jwt.sign(payload, config.jwtSecret, { expiresIn: '1d', ...options });

export const verifyToken = (token) =>
  jwt.verify(token, config.jwtSecret);
