import { User } from "../../models/user";

export interface ILoginUserRepository {
  login(email: string, password: string): Promise<User>;
}
