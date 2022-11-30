export interface baseAccess{
    enable:boolean;
    view:boolean;
    label:string;
}

export interface baseResource{
    label?:string;
    name?:string;
    access?:baseAccess;
}
