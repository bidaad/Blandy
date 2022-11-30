
export interface AdminModelRequest
{
    pageNo:number;
    pageSize:number;
    filter:string;
    resourceName:string;
    isSelected:boolean;
    sort?:string
    sortKey?:string
    parentId:string;
    filtersl:string
    noselectId:string;
}
