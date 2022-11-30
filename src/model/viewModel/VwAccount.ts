import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwAccount {
    id: string;

    depId: string;
    personId: string;
    accountNo: string;
    bankId: string;
    hCAccountTypeId: string;
    isActive: boolean;
    description: string;
    creator: string;
    updater: string;
    sign: string;
    firstName: string;
    midName: string;
    lastName: string;

}

export const columnStructure = [
    { key: "departmentSign", caption: "DepId", type: typeColumn.text, showWhenSelected: true },
    { key: "personFullName", caption: "PersonId", type: typeColumn.text, showWhenSelected: true },
    { key: "accountNo", caption: "AccountNo", type: typeColumn.text, showWhenSelected: true },
    { key: "bankSign", caption: "BankId", type: typeColumn.text, showWhenSelected: true },
    { key: "AccountTypeSign", caption: "HCAccountTypeId", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },
    { key: "sign", caption: "Sign", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];