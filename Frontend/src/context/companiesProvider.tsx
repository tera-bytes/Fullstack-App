/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo } from "react";
import { useApi } from "../api/useApi";
import type { CompanyDto } from "../types";

type CompaniesState = {
  companies: CompanyDto[];
  loading: boolean;
  error?: string;
};

const CompaniesContext = createContext<CompaniesState>({ companies: [], loading: false });

export function CompaniesProvider({ children }: { children: React.ReactNode }) {
  const { data, loading, error } = useApi<CompanyDto[]>("/companies");

  const value = useMemo(
    () => ({ companies: data ?? [], loading, error }),
    [data, loading, error]
  );

  return <CompaniesContext.Provider value={value}>{children}</CompaniesContext.Provider>;
}

export function useCompanies() {
  return useContext(CompaniesContext);
}
