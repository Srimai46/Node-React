import * as service from '../services/transactionService.js';

export const list = async (req, res, next) => {
  try {
    const items = await service.listByUser(req.user.userId);
    res.json(items);
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const created = await service.create(req.user.userId, req.body);
    req.app.get('io').to(`user:${req.user.userId}`).emit('transaction:created', created);
    res.status(201).json(created);
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const updated = await service.update(req.user.userId, Number(req.params.id), req.body);
    req.app.get('io').to(`user:${req.user.userId}`).emit('transaction:updated', updated);
    res.json(updated);
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const deleted = await service.remove(req.user.userId, Number(req.params.id));
    req.app.get('io').to(`user:${req.user.userId}`).emit('transaction:deleted', { id: deleted.id });
    res.json({ success: true });
  } catch (err) { next(err); }
};
