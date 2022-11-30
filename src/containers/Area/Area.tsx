import * as React from 'react';
import { Route } from 'react-router';
import '../../styles/main.css'

import UserLayout from '../../components/UserLayout';


import { LayoutTypes } from '../../model/general';
import UserPanel from '../User/UserPanel';
import UserProfile from '../User/UserProfile';
import ChangePassword from '../User/ChangePassword';
import UserCar from '../User/UserCar';
import ProductMain from '../Admin/Asset/Asset/AssetMain';

import UserAddress from '../User/UserAddress';
import Basket from '../User/Basket';
import Shopping from '../User/Shopping';
import Payment from '../User/Payment';
import Invite from '../User/Invite';
import AssetMain from '../Admin/Asset/Asset/AssetMain';
import AssetList from '../Admin/Asset/Asset/AssetList';
import AssetDetail from '../Admin/Asset/Asset/AssetDetail';
import AboutUs from '../User/AboutUs';
import ContactUs from '../User/ContactUs';
import UserFAQ from '../User/UserFAQ';
import UserOrders from '../User/UserOrders';
import UserComments from '../User/UserComments';
import UserMessages from '../User/UserMessages';
import UserFavourites from '../User/UserFavourites';
import PaymentCallback from '../User/PaymentCallback';
import CarUsage from '../User/CarUsage';
import CarMaintenance from '../User/CarMaintenance';
import SellerMain from '../User/SellerMain';
import Sellerassets from '../User/Sellerassets';
import SellerAssetEdit from '../User/SellerAssetEdit';
//import SellerLogin from '../User/SellerLogin';
import ProductCompare from '../Admin/Asset/Asset/ProductCompare';

export const MainArea = () => (
    <UserLayout {...{ typeLayout: LayoutTypes.Main }} >
        <Route path='/' component={ProductMain} />
        {/* <Route path='/aboutus' component={AboutUs} /> */}
        <Route path='/contactus' component={ContactUs} />
    </UserLayout>
);

export const UserArea = () => (

    <UserLayout {...{ typeLayout: LayoutTypes.User }} >
        <Route path='/user/panel' component={UserPanel} />
        <Route path='/user/profile' component={UserProfile} />
        <Route path='/user/changepass' component={ChangePassword} />
        <Route path='/user/cars' component={UserCar} />
        <Route path='/user/addresses' component={UserAddress} />
        <Route path='/user/invite' component={Invite} />

        <Route path='/user/faq' component={UserFAQ} />
        <Route path='/user/orders' component={UserOrders} />
        <Route path='/user/comments' component={UserComments} />
        <Route path='/user/messages' component={UserMessages} />
        <Route path='/user/favs' component={UserFavourites} />
        <Route path='/user/car' component={CarUsage} />
        <Route path='/user/maintenance' component={CarMaintenance} />
    </UserLayout>



);

export const UserFullPage = () => (
    <UserLayout {...{ typeLayout: LayoutTypes.Main }} >
        <Route path='/shopping/basket' component={Basket} />
        <Route path='/shopping/shopping' component={Shopping} />
        <Route path='/shopping/payment' component={Payment} />
        <Route path='/shopping/PaymentCallback' component={PaymentCallback} />
        {/* <Route path='/aboutus' component={AboutUs} />
        <Route path='/contactus' component={ContactUs} /> */}
    </UserLayout>
);


export const AssetArea = () => (
    <UserLayout {...{ typeLayout: LayoutTypes.Product }} >
        <Route path='/Asset/main' component={AssetMain} />
        <Route path='/Asset/Category' component={AssetList} />
        <Route path='/Asset/Car' component={AssetList} />
        <Route path='/Asset/Search' component={AssetList} />
        <Route path='/Asset/brand' component={AssetList} />
        <Route path='/Asset/Products' component={AssetList} />
        <Route path='/Asset/Compare' component={ProductCompare} />
        <Route path='/product' component={AssetDetail} />
        <Route path='/Asset/aboutus' component={AboutUs} />
    </UserLayout>
);

export const SellerArea = () => (
    <UserLayout {...{ typeLayout: LayoutTypes.Seller }} >
        <Route path='/seller/main' component={SellerMain} />
        <Route path='/seller/assetlist' component={Sellerassets} />
        <Route path='/seller/newasset' component={SellerAssetEdit} />
        <Route path='/seller/editSellerAsset' component={SellerAssetEdit} />
        
    </UserLayout>
);
