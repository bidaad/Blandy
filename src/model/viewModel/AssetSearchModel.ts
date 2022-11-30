export interface AssetSearchModel {
    titleKeyword?: string;
    keyword?: string;
    mainFactoryPN?: string;
    manufactureId?: string;
    brandId?: string;
    barCode?: string;
    model?: string;
    machine?: string;
    parentId?: string;
    internalFactoryPN?: string;
    hCUnitId?: string;
    languageId?: string;
    lang?: string;
    brandName?: string;
    categoryCode?: string[];
    startPrice?: number;
    endPrice?: number;
    codeType?: string;
    currentStock?:boolean;
    brandList?:string[];
    discountPrice?:boolean;
    categoryId?:string;
    car?:string;
    productName?:string;
    machineId?:string;
    productId?:string;
    Expensive?:boolean;
}