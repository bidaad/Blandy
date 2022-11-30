import React, { useEffect, useState } from 'react'
import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { APIUrl, APIImage } from '../../helper/config';
import { responseModel } from '../../model/general/responseModel';
import formatAndEncCurrency from '../../helper/formatCurrency';
import { VwUserProductSearch } from '../../model/viewModel/VwUserAssetSearch';
import Image from '../../components/Image';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

type AssetSuggestionProps =
    UserInfo.UserInfoState &
    { match: any, location: any, history: any } &
    typeof UserInfo.actionCreators;

const AssetSuggestion = (props: AssetSuggestionProps) => {

    const [isLoading, setIsLoading] = useState(true)
    const [SuggestedAssets, setSuggestedAssets] = useState<VwUserProductSearch[]>([])

    

    useEffect(() => {
        function getSuggestedAssets() {
            fetch(APIUrl + '/AssetSelectionType/GetSelectedAssets/?SelectionTypeCode=5', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token,
                    lang: props.lang.abr,
                },
    
            }).then(response => response.json() as Promise<responseModel>).then(responseModel => {
                setIsLoading(false)
                setSuggestedAssets(responseModel.data);
            }).catch(
                error => {
                    console.log(error);
                }
            );
        }
        
        getSuggestedAssets();
    }, []);




    return (
        <div>
            {
                isLoading ?
                    <div className="spinner-grow text-danger" role="status"><span className="sr-only">Loading...</span></div>
                    :
                    <div>
                        <div className="suggested-products">
                            <div className="caption-suggested-products">
                                <img src={require("../../img/user/basket.png")} alt="basket" className="" />&nbsp;
                            محصولات پیشنهادی
                            </div>
                            <div className="divider3" />
                            {SuggestedAssets.map(item =>
                                <div className="row">
                                    <div className="col-lg-4">
                                        {item.mainPic ?
                                            <div className="asset-image-conatiner">
                                                <NavLink tag={Link} to={"/Asset/detail/" + item.assetId}>
                                                <Image fallbackSrc={APIImage + '/default.png'} alt={''} src={APIImage + item.mainPic} />
                                                </NavLink>
                                            </div> : null}
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="asset-title ">
                                            {item.sign}
                                        </div>
                                        <div className=" mt-2 mb-4">
                                            {formatAndEncCurrency(item.currentPrice.toString())} تومان
                                        </div>
                                        

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
            }


        </div>
    )
}


export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(AssetSuggestion as any);
