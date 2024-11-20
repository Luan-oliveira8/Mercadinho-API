import { User } from "../../models/user";
import { HttpResponse } from "../protocols";

export interface IGetUsersController {
  handle(): Promise<HttpResponse<User[]>>;
}

export interface IUsersRepository {
  getUsers(): Promise<User[]>;
}

// export default IGetUsersController;
