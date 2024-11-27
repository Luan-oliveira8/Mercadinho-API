import { User } from "../models/user";

export type MongoUser = Omit<User, "id">;

export const transformMongoObject = <T extends { _id: any }>(
  mongoObject: T
): Omit<T, "_id"> & { id: string } => {
  const { _id, ...rest } = mongoObject;
  return { id: _id.toHexString(), ...rest };
};

export const transformMongoArray = <T extends { _id: any }>(
  mongoArray: T[]
): (Omit<T, "_id"> & { id: string })[] => {
  return mongoArray.map(({ _id, ...rest }) => ({
    ...rest,
    id: _id.toHexString(),
  }));
};
