import React, { useState, useEffect } from 'react'
import { VwContact } from '../../model/viewModel/VwContact';
import { APIUrl } from '../../helper/config';
import { responseModel } from '../../model/general/responseModel';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as UserInfo from '../../store/UserInfo';
import changeEnc from '../../helper/changeEnc';
import { useHistory } from 'react-router';


type UserInfoProps =
    UserInfo.UserInfoState &
    { match: any, location: any, history: any } &
    typeof UserInfo.actionCreators;

const UserSmallInfo = (props: UserInfoProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [UserAddresses, setUserAddresses] = useState<VwContact[]>([])
    let history = useHistory();

    

    const gotoUserProfile = () => {
        history.push('/user/profile')
    }

    useEffect(() => {
        const getUserAddress = async () => {
            fetch(APIUrl + '/Contact/GetAddress?PersonId=' + props.personId, {
                method: 'GET',
                headers: {
                    'ut':'1',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token,
                }
            })
                .then(response => { props.checkStatus(response); return response })
                .then(response => response.json() as Promise<responseModel>)
                .then(responseModel => {
                    if (responseModel.messageCode === 0) {
                        setUserAddresses(responseModel.data as VwContact[])
                    }
                    setIsLoading(false);
    
                })
                .catch(
                    error => {
                        console.log(error);
                        setIsLoading(false);
                    }
                );
        }
        
        getUserAddress();
    }, []);
    return (
        isLoading ?
            <div className="spinner-grow text-danger" role="status"><span className="sr-only">Loading...</span></div>
            :
            <div>
                <div className="user-small-info">
                    <img src={require("../../img/user/user-full.png")} alt="basket" className="" />&nbsp;
            اطلاعات شخصی
            <div className="line w-100"></div>
                    <div className="row parcel-receiver">
                        <div className="col">
                            <i className="fs-1 ml-2 mr-1 fa fa-user"></i>
                            {props.firstName + ' ' + props.lastName}
                        </div>
                        <div className="col">
                            <i className="fs-1 ml-2 mr-1 fa fa-mobile"></i>
                            {props.mobile !== null ? changeEnc(props.mobile.toString()) : ''}

                        </div>
                    </div>
                    <div className="row mt-1">

                        <div className="col">
                            {UserAddresses.filter((item, i) => i === 0).map(item =>
                                <div key={item.id}>
                                    <i className="fs-1 ml-2 mr-1 fa fa-map-marker"></i>
                                    {item.continentName} {item.cityName} {item.value} پلاک {item.buildingLicensePlate} واحد {item.apartmentLicensePlate} کد پستی {item.postCode}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div onClick={gotoUserProfile} className="gray-box">
                    <i className="fs-1 ml-2 mr-1 fa fa-edit"></i>
                    ویرایش اطلاعات شخصی
                </div>
            </div>

    )
}

export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(UserSmallInfo as any);
