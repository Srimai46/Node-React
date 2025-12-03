export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateRows: '60px 1fr' }}>
      <header style={{ display: 'flex', alignItems: 'center', padding: '0 16px', borderBottom: '1px solid #eee' }}>
        <h3 style={{ margin: 0 }}>Income-Expense</h3>
      </header>
      <main style={{ padding: 16 }}>{children}</main>
    </div>
  );
}
