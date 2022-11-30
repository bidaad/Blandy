import React, { Component } from 'react';
import { ApplicationState } from '../store';
import * as UserInfo from '../store/UserInfo';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { VwPermisionResource } from '../model/viewModel/VwPermisionResource';

type InputProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    RouteComponentProps<{}> &
    { name: string, size?: number, click?: any, value?: any };
class TTitle extends Component<InputProps> {

    render() {

        var myResource: VwPermisionResource | undefined;
        if (!this.props.name) {
            return null;
        }
        
        if (this.props.resources) {
            let Resources = this.props.resources as VwPermisionResource[];
            if (Resources) {
                myResource = Resources.find(c => c.resourceCode === this.props.name.toString().toUpperCase() && c.lang === this.props.lang.abr.toUpperCase());
            }
        }
        if (myResource === undefined) {
            return null;
        }
        // else {
        //     if (myResource) {
        //         if (myResource.actionTypes) {
        //             if (!myResource.actionTypes.toUpperCase().includes("V"))
        //                 return null;
        //         }
        //     }
        // }
        return (

            <div>
                {this.props.size === 6 ?
                    <div>
                         {/* onClick={(e) => { this.props.click(e) }} */}
                        <h6>
                            {myResource.resourceLanguageName}

                        </h6>
                        <p>
                            {(this.props.value) ? this.props.value : null}
                        </p>
                    </div>

                    : 
                    <div>
                        {/* onClick={(e) => { this.props.click(e) }} */}
                    <h3 >
                        {myResource.resourceLanguageName}
                        {(this.props.value) ? this.props.value : null}
                        <p>
                            {(this.props.value) ? this.props.value : null}
                        </p>
                    </h3>
                    </div>
                    }
            </div>


        );
    }
}

export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(TTitle as any);