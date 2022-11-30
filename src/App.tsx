import * as React from 'react';
import { Route, Router } from 'react-router';
import './styles/main.css'
import './styles/user/styles.css'
import './styles/user/Blandy.css'
import './styles/user/Blandy2.css'
import './styles/treeView.css'
import Admin from './containers/Admin/Admin';
import SignUp from './containers/User/SignUp';
import UserLogin from './containers/User/UserLogin';
import Login from './components/Login';
import { UserArea, AssetArea, MainArea, UserFullPage, SellerArea } from './containers/Area/Area';
import history from './history';
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-xxxxxx'
};

TagManager.initialize(tagManagerArgs)

export default () => (
    <div>
        <Router history={history}>
        {/* <Route path='/' exact component={Main} /> */}
        <Route path='/' exact component={MainArea} />
        <Route path='/contactus' exact component={UserFullPage} />
        <Route path='/admin' component={Admin} />
        <Route path='/signup' component={SignUp} />
        <Route path='/user' component={UserArea} />
        <Route path='/shopping' component={UserFullPage} />
        <Route path='/asset' component={AssetArea} />
        <Route path='/product' component={AssetArea} />
        <Route path='/userlogin' component={UserLogin} />
        <Route path='/adminlogin' component={Login} />
        <Route path='/seller' component={SellerArea} />
        </Router>
    </div>
);
