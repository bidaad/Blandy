interface ProductSuggest {
    id: string
    name: string
}
export interface AssetSearchResponse {
    categories:  ProductSuggest[];
    products:  ProductSuggest[];
}