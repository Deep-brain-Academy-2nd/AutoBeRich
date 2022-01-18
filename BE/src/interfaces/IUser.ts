export interface IUser {
  name: string;
  email: string;
  password: string;
  date: Date;
  secretKey: string;
  accessKey: string;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
  date?: Date;
  secretKey: string;
  accessKey: string;
}

export interface userUniqueSearchInput {
  email: string;
}
