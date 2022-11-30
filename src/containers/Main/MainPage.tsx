import React, { Component } from 'react'
import UserLogin from '../User/UserLogin'
import SignUp from '../User/SignUp'

class MainPage extends Component {
    constructor(props:any) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <h1 className="text-center">
                Main Page
                </h1>
                <h1 className="text-center">
                    <a href="/adminlogin">
                    Admin Page
                    </a>
                </h1>
                <div className="row">
                    <div className="col">
                    <UserLogin />
                    </div>
                    <div className="col">
                    <SignUp />
                    </div>
                </div>
                
                
            </div>
        )
    }
}

export default MainPage
