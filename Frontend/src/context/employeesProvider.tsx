/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo, useState } from "react";
import { useApi, invalidate } from "../api/useApi";
import type { EmployeeListItemDto, Pagination, EmployeeCreateDto, EmployeeUpdateDto } from "../types";
import { http } from "../api/http";

type EmployeesState = {
  items: EmployeeListItemDto[];
  page: number;
  pageSize: number;
  totalItems: number;
  loading: boolean;
  error?: string;
  setQuery: (q: { search?: string; page?: number; pageSize?: number }) => void;
  create: (dto: EmployeeCreateDto) => Promise<void>;
  update: (id: number, dto: EmployeeUpdateDto) => Promise<void>;
  remove: (id: number) => Promise<void>;
};

const EmployeesContext = createContext<EmployeesState>({
  items: [], page: 1, pageSize: 10, totalItems: 0, loading: false,
  setQuery: () => {}, create: async () => {}, update: async () => {}, remove: async () => {}
});

export function EmployeesProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const key = `/Employees?search=${encodeURIComponent(search)}&page=${page}&pageSize=${pageSize}`;
  const { data, loading, error } = useApi<Pagination<EmployeeListItemDto>>(key);

  async function create(dto: EmployeeCreateDto) {
    await http.post("/Employees", dto);
    invalidate("/Employees");
  }

  async function update(id: number, dto: EmployeeUpdateDto) {
    await http.put(`/Employees/${id}`, dto);
    invalidate("/Employees");
  }

  async function remove(id: number) {
    await http.del(`/Employees/${id}`);
    invalidate("/Employees");
  }

  function setQuery(q: { search?: string; page?: number; pageSize?: number }) {
    if (q.search !== undefined) setSearch(q.search);
    if (q.page !== undefined) setPage(q.page);
    if (q.pageSize !== undefined) setPageSize(q.pageSize);
  }

  const value = useMemo(() => ({
    items: data?.items ?? [],
    page: data?.page ?? page,
    pageSize: data?.pageSize ?? pageSize,
    totalItems: data?.totalItems ?? 0,
    loading, error, setQuery, create, update, remove
  }), [data, page, pageSize, loading, error]);

  return <EmployeesContext.Provider value={value}>{children}</EmployeesContext.Provider>;
}

export function useEmployees() {
  return useContext(EmployeesContext);
}
