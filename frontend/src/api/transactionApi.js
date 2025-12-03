import client from './axiosClient';

export const fetchTransactions = async () => {
  const { data } = await client.get('/transactions');
  return data;
};

export const createTransaction = async (payload) => {
  const { data } = await client.post('/transactions', payload);
  return data;
};

export const updateTransaction = async (id, payload) => {
  const { data } = await client.put(`/transactions/${id}`, payload);
  return data;
};

export const deleteTransaction = async (id) => {
  const { data } = await client.delete(`/transactions/${id}`);
  return data;
};
