import { useState } from 'react';
import TransactionRow from './TransactionRow';

export default function TransactionTable({ items, onCreate, onUpdate, onDelete, user }) {
  const [newItem, setNewItem] = useState({
    type: 'income',
    category: '',
    amount: '',
    note: '',
    date: new Date().toISOString().slice(0, 10),
  });

  const changeNew = (e) => setNewItem({ ...newItem, [e.target.name]: e.target.value });

  
  const add = () => {
  if (!newItem.category || !newItem.amount) return;

  //onsole.log('Creating transaction with userId:', user?.id); // ✅ ใส่ตรงนี้

  onCreate({
    ...newItem,
    amount: Number(newItem.amount),
    userId: user?.id   // ✅ ส่ง userId ไปด้วย
  });

  setNewItem({ ...newItem, category: '', amount: '', note: '' });
};





  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <select name="type" value={newItem.type} onChange={changeNew}>
          <option value="income">income</option>
          <option value="expense">expense</option>
        </select>
        <input placeholder="Category" name="category" value={newItem.category} onChange={changeNew} />
        <input placeholder="Amount" type="number" name="amount" value={newItem.amount} onChange={changeNew} />
        <input placeholder="Note" name="note" value={newItem.note} onChange={changeNew} />
        <input type="date" name="date" value={newItem.date} onChange={changeNew} />
        <button onClick={add}>Add</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Note</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <TransactionRow
              key={item.id}
              item={item}
              onSave={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
