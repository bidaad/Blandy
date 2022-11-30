import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwBooking {
    id: string;
    code: string;
    userId: string;
    time: Date;
    hCBookingStatusId: string;
    productSearchId: string;
    totalAmount: number;
    discount: string;
    tax: string;
    hCCurrencyId: string;
    tempBooking: string;
    isActive: boolean;
    description: string;
    createUserID: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    assetAmountSum: string;
    shippingAmountSum: string;
    bookingStatusSign: string;
    orderTime: string;
    sign: string;
    creator: string;
    updater: string;
    assetCount: number;
    assetSigns:string;
    assetIdies: string;
    orderTimeOnly: string;
    deliveryTitle:string;
    pDate:string;
    bookingStatusCode:string;
    personNationalCode:string;
    personMobile:string;
    personName:string;
    paymentStatus:string;
    shipStatus:string;
}

export const columnStructure = [
    { key: "paymentStatus", type: typeColumn.text, showWhenSelected: false },
    { key: "code", type: typeColumn.text, showWhenSelected: true },
    { key: "orderTime", type: typeColumn.text, showWhenSelected: false },
    { key: "personName", type: typeColumn.text, showWhenSelected: false },
    { key: "personMobile", type: typeColumn.text, showWhenSelected: false },
    { key: "personNationalCode", type: typeColumn.text, showWhenSelected: false },
    { key: "bookingStatusSign", type: typeColumn.text, showWhenSelected: false },
    { key: "shipStatus", type: typeColumn.text, showWhenSelected: false },
    { key: "assetSigns", type: typeColumn.text, showWhenSelected: true },

    { key: "assetAmountSum", type: typeColumn.number, showWhenSelected: false },
    { key: "totalAmount", type: typeColumn.number, showWhenSelected: false },
    { key: "discount", type: typeColumn.text, showWhenSelected: false },
    { key: "shippingAmountSum", type: typeColumn.text, showWhenSelected: false },
    { key: "tax", type: typeColumn.text, showWhenSelected: false },
    { key: "tempBooking", type: typeColumn.text, showWhenSelected: false },

    { key: "description", type: typeColumn.text, showWhenSelected: false },
    { key: "isActive", type: typeColumn.check, showWhenSelected: false },
] as gridColumns[];