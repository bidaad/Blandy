import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwPersonBrand {
    id: string;
    parentId: string;
    brandId: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    sign: string;
    creator: string;
    updater: string;
}
export const columnStructure = [
    { key: "name", caption: "نام", showWhenSelected: false },
    { key: "sign", caption: "علامت", showWhenSelected: true },

] as gridColumns[];