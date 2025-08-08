import { Outlet } from "react-router-dom";

//default layout of ui
export default function Layout() {
  return (
    <div style={{ padding: 16, maxWidth: 1000, margin: "0 auto" }}>
      <header style={{ display: "flex", gap: 16, marginBottom: 16 }}>
      </header>
      <Outlet />
    </div>
  );
}


