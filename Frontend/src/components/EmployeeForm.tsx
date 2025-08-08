import React, { useState } from "react";
import type { EmployeeCreateDto, EmployeeUpdateDto, EmployeeDetailDto } from "../types";
import CompanySelect from "./companySelect";
import { required, validateEmail } from "../utils/validation";

type Props = {
  initial?: EmployeeDetailDto | null;
  onSubmit: (dto: EmployeeCreateDto | EmployeeUpdateDto) => Promise<void>;
};

export default function EmployeeForm({ initial, onSubmit }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [jobTitle, setJobTitle] = useState(initial?.jobTitle ?? "");
  const [companyID, setCompanyID] = useState<number>(initial?.companyID ?? 0);
  const [isActive, setIsActive] = useState<boolean>(initial?.isActive ?? true);
  const [err, setErr] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Client validation
    if (!required(name)) return setErr("Name is required.");
    if (!validateEmail(email)) return setErr("Valid email is required.");
    if (!companyID) return setErr("Company is required.");
    setErr("");

    await onSubmit({ name, email, phone, jobTitle, companyID, isActive });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 480 }}>
      {err && <div style={{ color: "crimson" }}>{err}</div>}
      <label>Name<input value={name} onChange={e => setName(e.target.value)} /></label>
      <label>Email<input value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>Phone<input value={phone ?? ""} onChange={e => setPhone(e.target.value)} /></label>
      <label>Job Title<input value={jobTitle ?? ""} onChange={e => setJobTitle(e.target.value)} /></label>
      <label>Company
        <CompanySelect value={companyID} onChange={setCompanyID} />
      </label>
      <label>
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
        Active
      </label>
      <button type="submit">{initial ? "Save" : "Create"}</button>
    </form>
  );
}
