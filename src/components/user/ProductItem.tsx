import React from 'react';
import { ApplicationState } from '../../store';
import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import ProductCard from './ProductCard';
import { VwUserProductSearch } from '../../model/viewModel/VwUserAssetSearch';
export interface Product_ItemProps { controller: string, action: string, header: string, codeType: number, selectedProduct: VwUserProductSearch[] }

type ProductItemProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    RouteComponentProps<{}> &
    Product_ItemProps;
const ProductItem = (props: ProductItemProps) => {
    if(props.selectedProduct === undefined || props.selectedProduct === null)
        return null;
    
        return (
        <div className="">
            <div className="text-center list-header">
            <h2>
                {props.header}
            </h2>
            </div>
            <div className="Product_Card_LIst">
                {
                
                props.selectedProduct.map( (item:VwUserProductSearch) => 
                    <ProductCard key={item.assetId} {...{ assetId: item.assetId, id: item.productId, star: item.star, header: item.sign, text: item.sign, price: item.currentPrice, image: item.mainPic ,previousPrice:item.previousPrice,discount:item.discountPercent,stock:item.currentStock,isstock: true  }} />
                        )}
            </div>

        </div>


    )
}



export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(ProductItem as any);