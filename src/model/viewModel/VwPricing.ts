import { typeColumn } from "../general/typeComponent";

export interface VwPricing {
    id:string;
    fromDateTime:Date;
    // fromAmount:string;
    // toAmount:string;
    price:number;
    hCCurrencyId:string;
    isActive:boolean;
    description:string;
    createUserID:string;
    createDate:string;
    updateUserID:string;
    updateDate:string;
    assetId:string;
    // toDateTime:Date;
    sign:string;
    creator:string;
    updator:string;
    persianFromAmount:string;
    }
    export const columnStructure = [
        { key: "price", showWhenSelected: true ,type:typeColumn.number },
         { key: "persianFromAmount", showWhenSelected: true },
         { key: "fromDateTime", showWhenSelected: true },
        // { key: "toAmount", showWhenSelected: true },
        // { key: "fromDateTime", showWhenSelected: true },
        // { key: "toDateTime", showWhenSelected: true },
        { key: "sign", type: typeColumn.text, caption: "", showWhenSelected: true },
         { key: "isActive", showWhenSelected: true ,type:typeColumn.check},

    ]