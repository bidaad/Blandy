import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwCurrencyExchange {
    id: string;

    depId: string;
    refrenceDepId: string;
    firstCurrencyId: string;
    secondCurrencyId: string;
    rate: string;
    time: string;
    isActive: boolean;
    description: string;
    departmentSign: string;
    firstCurreency: string;
    secondCurrency: string;
    creator: string;
    updater: string;

}

export const columnStructure = [
    { key: "departmentSign", caption: "departmentSign", type: typeColumn.text, showWhenSelected: true },
    { key: "refrenceDepSign", caption: "refrenceDepSign", type: typeColumn.text, showWhenSelected: true },
    { key: "firstCurreency", caption: "firstCurreency", type: typeColumn.text, showWhenSelected: true },
    { key: "secondCurrency", caption: "secondCurrency", type: typeColumn.text, showWhenSelected: true },
    { key: "rate", caption: "Rate", type: typeColumn.text, showWhenSelected: true },
    { key: "time", caption: "Time", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];