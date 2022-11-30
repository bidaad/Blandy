import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwPersonSkill {
    id: string;
    personId: string;

    skillSign: string;
    brandSign: string;
    categorySign: string;
    productSign: string;

    hCSkillTitleId: string;
    brandId: string;
    categoryId: string;
    productId: string;
    fromDate: string;
    isActive: boolean;
    description: string;

}

export const columnStructure = [
    { key: "skillSign", caption: "skillSign", type: typeColumn.text, showWhenSelected: true },
    { key: "brandSign", caption: "brandSign", type: typeColumn.text, showWhenSelected: true },
    { key: "categorySign", caption: "categorySign", type: typeColumn.text, showWhenSelected: true },
    { key: "productSign", caption: "productSign", type: typeColumn.text, showWhenSelected: true },
    { key: "fromDate", caption: "FromDate", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];