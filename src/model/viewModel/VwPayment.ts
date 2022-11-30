import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwPayment {
    id: string;
    depId: string;
    userId: string;
    bankId: string;
    referenceCode: string;
    bookingId: string;
    time: Date;
    hCpaymentTypeId: string;
    hCPaymentStatusId: string;
    hCCurrencyId: string;
    detail: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    accountId: string;
    debt: string;
    credit: string;
    creator: string;
    updater: string;
    paymentTypeSign: string;
    paymentStatusSign: string;
    currencySign: string;
}

export const columnStructure = [
    { key: "userFullName", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "departmentSign", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "bankSign", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "credit", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "debt", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "description", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "detail", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "currencySign", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "paymentStatusSign", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "paymentTypeSign", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "isActive", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "referenceCode", type: typeColumn.text, caption: "", showWhenSelected: true },
    { key: "time", type: typeColumn.text, caption: "", showWhenSelected: true },

] as gridColumns[];
