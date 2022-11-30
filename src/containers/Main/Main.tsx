import React, { Component } from 'react'
import UserLogin from '../User/UserLogin'
import { Route } from 'react-router';
import MainPage from './MainPage';
import ProductMain from '../Admin/Asset/Asset/AssetMain';

class Main extends Component {
    constructor(props:any) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <input autoComplete="false" name="hidden" type="text" ></input>
                <Route path='/' exact component={ProductMain} />
                <Route path='/login' component={UserLogin} />
                <Route path='/test'   component={MainPage} />
            </div>
        )
    }
}

export default Main
