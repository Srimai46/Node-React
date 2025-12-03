import bcrypt from 'bcrypt';
import prisma from '../db/prismaClient.js';
import { signToken } from '../utils/jwt.js';

export const register = async ({ email, password }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('Email already registered');
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hash } });
  // const token = signToken({ userId: user.id, email: user.email });
  return { user: { id: user.id, email: user.email }, token };
};

export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  //console.log('Login payload:', req.body); //

  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error('Invalid credentials');
  const token = signToken({ userId: user.id, email: user.email });
  return { user: { id: user.id, email: user.email }, token };
};
