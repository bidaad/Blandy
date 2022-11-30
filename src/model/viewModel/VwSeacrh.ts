export interface VwSeacrh {
    id: string;
    name: string;
    code:string;
    type:typeSearch;
    mid:string;
    mName:string;
}

export type typeSearch ="ASSET"|"CATEGORY"|"MACHINE" |"َALL" |"NONE";