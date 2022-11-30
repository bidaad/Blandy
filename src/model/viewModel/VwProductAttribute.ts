import { gridColumns } from "../general/stateBase";

export interface VwProductAttribute {
       id: string;
       productId: string;
       hcattributeTitleId: string;
       value: string;
       isActive: boolean;
       description: string;
       createUserID: string;
       createDate: Date;
       updateUserID: string;
       updateDate: Date;
       sign: string;
       creator: string;
       updater: string;
       attributeCode: string;
}


export const columnStructure = [
       { key: "sign", caption: "علامت", showWhenSelected: true },
       { key: "value", caption: "نام", showWhenSelected: true },
       { key: "isActive", caption: "فعال", showWhenSelected: true }
       ,
] as gridColumns[];
