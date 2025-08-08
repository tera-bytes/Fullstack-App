/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "./Avatar";
import Pagination from "./Pagination";
import { useEmployees } from "../context/employeesProvider";


export default function EmployeeTable({
  onEdit, onDelete
}: { onEdit: (id: number) => void; onDelete: (id: number) => void }) {
  const { items, loading, error, page, pageSize, totalItems, setQuery } = useEmployees();

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  return (
    <>
      <table width="100%" cellPadding={6} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name / Email</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Active</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map(e => (
            <tr key={e.id}>
              <td><Avatar email={e.email} /></td>
              <td>
                <div>{e.name}</div>
                <small>{e.email}</small>
              </td>
              <td>{e.jobTitle ?? "-"}</td>
              <td>{e.company.companyName}</td>
              <td>{e.isActive ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => onEdit(e.id)}>Edit</button>{" "}
                <button onClick={() => onDelete(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        page={page} pageSize={pageSize} total={totalItems}
        onChange={(p: any) => setQuery({ page: p })}
      />
    </>
  );
}
