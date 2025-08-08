
//use dtos for employees and company as backend
export type CompanyDto = {
  id: number; companyName: string; domain: string;
  industry?: string | null; website?: string | null;
};

export type EmployeeListItemDto = {
  id: number; name: string; email: string; phone?: string | null;
  jobTitle?: string | null; isActive: boolean; createdAt: string;
  company: CompanyDto;
};

export type EmployeeDetailDto = EmployeeListItemDto & { companyID: number };

export type EmployeeCreateDto = {
  name: string; email: string; phone?: string | null;
  jobTitle?: string | null; companyID: number; isActive: boolean;
};

export type EmployeeUpdateDto = EmployeeCreateDto;

export type Pagination<T> = {
  items: T[]; page: number; pageSize: number; totalItems: number;
};
