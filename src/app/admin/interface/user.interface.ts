export interface User {
  id: number;
  fullName: string;
  username: string;
  email: string;
  role_type_id: number;
}

export interface RoleType {
  roleTypeId: number;
  name: string;
  code: string;
}
export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
  pages: number;
}
