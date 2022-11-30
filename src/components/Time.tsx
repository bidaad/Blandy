import React, { Component } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import * as UserInfo from '../store/UserInfo';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import { VwPermisionResource } from '../model/viewModel/VwPermisionResource';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

type InputProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    RouteComponentProps<{}> &
    { hasLable?: boolean, name: string, value: any, pholder?: string, isGregorian?: boolean, timePicker: boolean };
class Time extends Component<InputProps, { value: any }> {

    constructor(props: any) {
        super(props);
        this.state = { value: undefined };
        if (this.props.value !== null && this.props.value !== undefined) {
            const vl = moment("2017-03-13" + ' ' + this.props.value).clone();
            this.state = { value: vl };
        }
    }


    render() {
        //const { value } = this.state;
        let isRequired = '';
        var isLbl = true;
        let disbaled = false;
        let classrtl="rtl_TimePicker";
        if(this.props.dir===2)
        {
            classrtl="ltr_TimePicker";
        }
        if (this.props.hasLable === false) {
            isLbl = false;
        }
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
        else {
            if (myResource) {
                if (myResource.actionTypes) {
                    if (!myResource.actionTypes.toUpperCase().includes("V"))
                        return null;
                    if (!myResource.actionTypes.toUpperCase().includes("E"))
                        disbaled = true;

                }
            }
            if (myResource.resourceNullable === false) {
                isRequired = 'required';
            }
        }
        if (isLbl) {

            return (
                <span>
                    <Form.Label>
                        {myResource.resourceLanguageName}
                    </Form.Label>
                    <div >
                        <InputGroup>
                            <InputGroup.Prepend className="input-group-prepend-awesome"><FontAwesomeIcon icon={faClock} /></InputGroup.Prepend>
                            <TimePicker {...disbaled} clearIcon="x" className={classrtl} defaultValue={this.state.value} showSecond={true} name={this.props.name.split('.')[2] + '__time'} />
                        </InputGroup>

                    </div>

                </span>
            );

        }
        else {
            return (
                <span>
                    <div >
                        <InputGroup>
                            <InputGroup.Prepend className="input-group-prepend-awesome"><FontAwesomeIcon icon={faClock} /></InputGroup.Prepend>
                            <TimePicker {...disbaled} clearIcon="x" className={classrtl} defaultValue={this.state.value} showSecond={true} name={this.props.name.split('.')[2] + '__time'} />
                        </InputGroup>

                    </div>
                </span>
            );
        }
    }

}
export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(Time as any);