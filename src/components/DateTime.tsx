import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import * as UserInfo from '../store/UserInfo';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker2";
import { VwPermisionResource } from '../model/viewModel/VwPermisionResource';

type InputProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    RouteComponentProps<{}> &
    { hasLable?: boolean, name: string, value: any, pholder?: string, isGregorian?: boolean, timePicker: boolean,IsNotResource:boolean,onChange?:any };
class DateTime extends Component<InputProps, { value: any, valueHidden: any }> {

    constructor(props: any) {
        super(props);
        this.state = { value: null, valueHidden: null };
        var momentJalaali = require('moment-jalaali');
        let isGre = this.props.lang.abr === 'Fa' ? false : true;
        if (this.props.value !== null && this.props.value !== undefined) {
            if (isGre) {

                if (this.props.timePicker) {
                    this.state = { value: momentJalaali(this.props.value, 'YYYY/M/D HH:mm:ss A'), valueHidden: this.props.value };
                }
                else {
                    this.state = { value: momentJalaali(this.props.value, 'YYYY/M/D'), valueHidden: this.props.value };
                }
            }
            else {
                if (this.props.timePicker) {
                    this.state = { value: momentJalaali(this.props.value, 'YYYY/M/D HH:mm:ss A'), valueHidden: this.props.value };
                }
                else {
                    this.state = { value: momentJalaali(this.props.value, 'YYYY/M/D'), valueHidden: this.props.value };
                }

            }

        }
    }

    handleChange = (event: any) => {
        
        try{
        let dt = event.format('YYYY/M/D hh:mm:ss A');
        dt = dt.replace('ق.ظ', 'AM');
        dt = dt.replace('ب.ظ', 'PM');
        this.setState({ valueHidden: dt })
         this.props.onChange(dt);
        }catch{}
    }
    componentWillReceiveProps(nextProps: any) {
        let isGre = this.props.lang.abr === 'Fa' ? false : true;
        var momentJalaali = require('moment-jalaali');

        if (this.props.value !== nextProps.value) {
            debugger
            if (isGre) {

                if (this.props.timePicker) {
                    this.state = { value: momentJalaali(nextProps.value, 'YYYY/M/D HH:mm:ss A'), valueHidden: this.props.value };
                }
                else {
                    this.state = { value: momentJalaali(nextProps.value, 'YYYY/M/D'), valueHidden: this.props.value };
                }
            }
            else {
                if (this.props.timePicker) {
                    this.state = { value: momentJalaali(nextProps.value, 'YYYY/M/D HH:mm:ss A'), valueHidden: this.props.value };
                }
                else {
                    this.state = { value: momentJalaali(nextProps.value, 'YYYY/M/D'), valueHidden: this.props.value };
                }

            }
        }
      }

    render() {
        // var DatePicker = require('react-datepicker2');

        let isRequired = '';
        var isLbl = true;
        let disbaled = false;
        let isG = this.props.lang.abr === 'Fa' ? false : true;
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
                myResource = Resources.find(c => c.resourceCode === this.props.name.toString().toUpperCase()&& c.lang===this.props.lang.abr.toUpperCase());
            }
        }
        if(this.props.IsNotResource!==true)
        {
            if (myResource === undefined ) {
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
        }

        if (isLbl) {

            return (
                <span>
                    <input type="hidden" disabled={disbaled} value={this.state.valueHidden} name={this.props.name.split('.')[2] + '__date'} />

                    <Form.Label>
                        {(this.props.IsNotResource!==true)?(myResource ?myResource.resourceLanguageName:''):null}
                    </Form.Label>
                    <div {... disbaled} >
                    <DatePicker

                        isGregorian={isG}
                        value={this.state.value}
                        timePicker={this.props.timePicker}
    
                        className={"form-control " + isRequired}
                        onChange={this.handleChange}
                    />
                    </div>

                </span>
            );

        }
        else {
            return (
                <span>
                    <input type="hidden" value={this.state.valueHidden} name={this.props.name.split('.')[2] + '__date'} />
                    <DatePicker
                        isGregorian={isG}
                        className={"form-control " + isRequired}
                        onChange={this.handleChange}
                    />

                </span>
            );
        }
    }

}
export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(DateTime as any);