//page setup for list views
export default function Pagination({
  page, pageSize, total, onChange
}: { page: number; pageSize: number; total: number; onChange: (p: number) => void }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div style={{ marginTop: 12 }}>
      <button disabled={page <= 1} onClick={() => onChange(page - 1)}>Prev</button>
      <span style={{ margin: "0 8px" }}>Page {page} / {pages}</span>
      <button disabled={page >= pages} onClick={() => onChange(page + 1)}>Next</button>
    </div>
  );
}
