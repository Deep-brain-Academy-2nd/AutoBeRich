export interface IUser{
    name: string;
    email: string;
    password: string;
    date: Date;
}

export interface IUserInputDTO {
    name: string;
    email: string;
    password: string;
    date?: Date;
}

export interface userUniqueSearchInput {
    email : string;
}