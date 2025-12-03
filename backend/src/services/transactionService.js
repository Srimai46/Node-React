import prisma from '../db/prismaClient.js';

export const listByUser = async (userId) => {
  return prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: 'desc' }
  });
};

export const create = async (userId, data) => {
  return prisma.transaction.create({
    data: { ...data, userId }
  });
};

export const update = async (userId, id, data) => {
  const existing = await prisma.transaction.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) throw new Error('Not found or unauthorized');
  return prisma.transaction.update({ where: { id }, data });
};

export const remove = async (userId, id) => {
  const existing = await prisma.transaction.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) throw new Error('Not found or unauthorized');
  return prisma.transaction.delete({ where: { id } });
};
