import React, { Component } from 'react';
import { ApplicationState } from '../../store';
import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Carousel } from 'react-responsive-carousel';

export interface BestSellProps { controller: string, action: string, header: string }

type InputProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    RouteComponentProps<{}> &
    BestSellProps;
class Product_Header extends Component<InputProps, { value: any }> {
    componentDidMount() {

        // if (projectStrong.info.url && projectStrong.info.token && this.props.controller && this.props.action) {

        //     fetch(projectStrong.info.url +'/'+ this.props.controller + '/' + this.props.action + '?lang=', {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': 'Bearer ' + projectStrong.info.token,
        //             // 'Content-Type': 'application/json;charset=UTF-8',
        //         }
        //     })
        //         .then(response => response.json() as responseModel | any)
        //         .then(mr => {
        //             if ((mr as responseModel).messageCode === 0) {
        //                 var data = (mr as responseModel).data;
        //             }
        //         });
        // }
    }

    public render() {
        return (
            <div>
                <div className="ltr">
                <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                    <div>
                        <img src={require('../../img/slide-01-appliance.png')} alt="" />
                        
                    </div>
                    <div>
                        <img src={require('../../img/slide-02-appliance.png')} alt="" />
                        
                    </div>
                    <div>
                        <img src={require('../../img/slide-03-appliance.png')} alt="" />
                        
                    </div>
                    </Carousel>
                    </div>
                <div className="text-center w-100 banner-container">
                    {/* <div className="slogan">
                        یادآوری سرویس های دوره ای <br />
                    انواع خودروهای سواری
                    </div>
                    <div className="button-remider">
                        ثبت یادآور
                    </div> */}

                    {/* <img alt={''} className="Product_Header_Image img-fluid" src={prImage} /> */}
                </div>
            </div>
        )
    }
}



export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(Product_Header as any);