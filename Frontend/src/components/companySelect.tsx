import { useCompanies } from "../context/companiesProvider";

export default function CompanySelect({
  value, onChange, disabled
}: { value?: number; onChange: (v: number) => void; disabled?: boolean }) {
  const { companies, loading } = useCompanies();
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
      disabled={disabled || loading}
    >
      <option value="" disabled>Select a company…</option>
      {companies.map(c => (
        <option key={c.id} value={c.id}>{c.companyName}</option>
      ))}
    </select>
  );
}
