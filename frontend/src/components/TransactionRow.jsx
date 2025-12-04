import { useState } from 'react';
import Layout from './Layout';

export default function TransactionRow({ item, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    type: item.type,
    category: item.category,
    amount: item.amount,
    note: item.note || '',
    date: item.date?.slice(0, 10),
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    onSave(item.id, { ...form, amount: Number(form.amount) });
    setEditing(false);
  };

  return (
    <tr>
      <td>
        {editing ? (
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="income">income</option>
            <option value="expense">expense</option>
          </select>
        ) : item.type}
      </td>
      <td>
        {editing ? (
          <input name="category" value={form.category} onChange={handleChange} />
        ) : item.category}
      </td>
      <td>
        {editing ? <input name="amount" type="number" value={form.amount} onChange={handleChange} /> : item.amount}
      </td>
      <td>
        {editing ? <input name="note" value={form.note} onChange={handleChange} /> : item.note}
      </td>
      <td>
        {editing ? <input name="date" type="date" value={form.date} onChange={handleChange} /> : new Date(item.date).toLocaleDateString()}
      </td>
      <td style={{ display: 'flex', gap: 8 }}>
        {editing ? (
          <>
            <button onClick={save}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete(item.id)}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
}
