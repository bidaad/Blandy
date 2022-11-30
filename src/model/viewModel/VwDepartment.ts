import { gridColumns } from "../general/stateBase";

export interface VwDepartment {
    code: string;
    sign: string;
    latitude: string;
    longitude: string;
    registerNumber: string;
    registerDate: Date;
    economicCode: string;
    nationalCode: string;
    isActive: boolean;
    description: string;
    hCDepTypeId: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    creator:string;
    updater:string;
    parentId: string;
    id: string;
    //name: string;
    parentCode: string;
    depTypeName: string;
    parentName: string;
}


export const columnStructure = [
    { key: "sign", caption: "", showWhenSelected: true },
    { key: "code", caption: "", showWhenSelected: true },
    { key: "nationalCode", caption: "", showWhenSelected: false },
    { key: "registerNumber", caption: "", showWhenSelected: false },
    { key: "depTypeName", caption: "", showWhenSelected: false },
    { key: "parentName", caption: "", showWhenSelected: false },
    { key: "isActive", caption: "", showWhenSelected: false },
] as gridColumns[];
