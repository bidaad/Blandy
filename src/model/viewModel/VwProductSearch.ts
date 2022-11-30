import { gridColumns } from "../general/stateBase";
import { typeColumn } from "../general/typeComponent";


export interface VwProductSearch {
    id: string;
    userId?: string;
    time: Date;
    brandId: string;
    categoryId: string;
    searchText: string;
    resultCount: number;
    isActive: boolean;
    description: string;
    createUserID?: string;
    createDate: Date;
    updateUserID: string;
    updateDate: Date;
    brandSign: string;
    productSign: string;
    categorySign: string;
    creator: string;
    updater: string;
    machineId: string;
    newBrand: string;
    newMachine: string;
    newCategory: string;
    machinId: string;
    newMachin: string;
    purchasable: string;
    fromAmount: string;
    toAmount: string;
    hCCurrencyId: string;
    shopId: string;
    hCAssetQualityId: string;
    hCAssetHealthStatusId: string;
    zoneId: string;
    assetId:string;
    clicked:boolean;
    IP:string
}

