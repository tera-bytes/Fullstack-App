/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";

import { useEmployees } from "../context/employeesProvider";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

import { http } from "../api/http";

export default function EmployeesPage() {
  const { setQuery, create, update, remove } = useEmployees();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<number | null>(null);
  const [detail, setDetail] = useState<any>(null);
  const [err, setErr] = useState("");

  async function loadDetail(id: number) {
    setErr("");
    try {
      const d = await http.get(`/employees/${id}`);
      setDetail(d);
      setEditing(id);
    } catch (e: any) {
      setErr(e.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h2>Employees</h2>

      <div>
        <input
          placeholder="Search name/email/job title…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => setQuery({ search, page: 1 })}>Search</button>
      </div>

      {err && <div style={{ color: "crimson" }}>{err}</div>}

      <EmployeeTable
        onEdit={(id: number) => loadDetail(id)}
        onDelete={(id: number) => remove(id).catch(e => setErr(e.message))}
      />

      <h3>{editing ? "Edit employee" : "Add employee"}</h3>
      <EmployeeForm
        initial={detail}
        onSubmit={async (dto) => {
          try {
            if (editing) {
              await update(editing, dto);
            } else {
              await create(dto);
            }
            setEditing(null);
            setDetail(null);
            setQuery({}); // refresh
          } catch (e: any) {
            setErr(e.message);
          }
        }}
      />
    </div>
  );
}
