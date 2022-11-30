import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwDepSkill {
    id: string;

    depId: string;
    hCSkillTitleId: string;
    brandId: string;
    categoryId: string;
    productId: string;
    fromDate: string;
    isActive: boolean;
    description: string;
    amount: string;
    dailyCapacity: number;

}

export const columnStructure = [
    { key: "fromDate", caption: "FromDate", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "amount", caption: "Amount", type: typeColumn.text, showWhenSelected: true },
    { key: "dailyCapacity", caption: "DailyCapacity", type: typeColumn.number, showWhenSelected: true },

    { key: "brandSign", caption: "brandSign", type: typeColumn.text, showWhenSelected: true },
    { key: "skillTitleSign", caption: "skillTitleSign", type: typeColumn.text, showWhenSelected: true },
    { key: "categorySign", caption: "categorySign", type: typeColumn.text, showWhenSelected: true },
    { key: "productSign", caption: "productSign", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];