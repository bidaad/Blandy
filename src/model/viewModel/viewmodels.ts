import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwUser {
    ID: string;
    Username: string;
    PasswordSalt: string;
    Password: string;
    FirstName: string;
    MidName: string;
    LastName: string;
    PersonId: string;
    Email: string;
}

export interface VwBrand {
    ID: string;
    Code: string;
    Sign: string;
    Logo: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
