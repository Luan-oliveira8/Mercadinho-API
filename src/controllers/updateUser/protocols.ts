import { User } from "../../models/user";

export interface UpdateUserParams {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}