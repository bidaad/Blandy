import React, { Component } from 'react';
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { Form, InputGroup } from 'react-bootstrap';
import * as UserInfoStore from '../store/UserInfo';
import { autocompleteModel } from '../model/general/autocompleteModel';
import { responseModel } from '../model/general/responseModel';
import { projectStrong } from '../helper/projectStrong';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery"
import { ApplicationState } from '../store';
import * as UserInfo from '../store/UserInfo';
import { connect } from 'react-redux';
import { VwPermisionResource } from '../model/viewModel/VwPermisionResource';

var Typeahead = require('react-bootstrap-typeahead').Typeahead;
interface autoCompleteState { select: any; list: any; loading: boolean, hvalue: any, idc?: any };
//ddd

type UserProps =
    UserInfoStore.UserInfoState &
    typeof UserInfoStore.actionCreators & autocompleteModel;
class TAutoComplete extends Component<UserProps, autoCompleteState> {
    private stepDiv: React.RefObject<HTMLDivElement>;
    private stepInput: React.RefObject<any>;
    constructor(props: any) {
        super(props);
        this.handleChange.bind(this);
        this.stepDiv = React.createRef();
        this.stepInput = React.createRef();
        console.log("Val : " + this.props.valueId);

    }
    componentDidMount = () => {
        var startState: autoCompleteState = { list: undefined, select: [{ id: this.props.valueId, [this.props.selectName]: this.props.valueName }], loading: true, hvalue: this.props.valueId, idc: Math.floor(Math.random() * 800000) };
        this.setState(startState);
        console.log('url=' + projectStrong.info.url);
        if (this.props.token && this.props.apiUrl && this.props.controller && this.props.action) {

            fetch(this.props.apiUrl + '/' + this.props.controller + '/' + this.props.action + '?lang=', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.props.token,
                    // 'Content-Type': 'application/json;charset=UTF-8',
                }
            })
                .then(response => response.json() as responseModel | any)
                .then(mr => {
                    
                    if ((mr as responseModel).messageCode === 0) {

                        var data = (mr as responseModel).data;
                        if (this.props.valueId !== undefined) {
                            var au_state: autoCompleteState = { list: data, select: [{ id: (this.props.valueId === undefined || this.props.valueId === null ? '' : this.props.valueId), [this.props.selectName]: (this.props.valueName === undefined || this.props.valueName === null ? '' : this.props.valueName) }], loading: false, hvalue: this.props.valueId === undefined || this.props.valueId === null ? '' : this.props.valueId };
                            this.setState(au_state);
                        }
                        else {
                            var au_state: autoCompleteState = { list: data, select: [{ id: "", [this.props.selectName]: "" }], loading: false, hvalue: '' };
                            this.setState(au_state);
                        }
                        // dispatch({ type: 'AUTO_COMPLETE_ACTION', list: data });
                    }
                }).catch(
                    error => {
                        console.log(error);
                    }
                );
        }


        //  this.props.AutoCompleteAction(this.props.controller,this.props.action);
    }
    handleChange = (e: any) => {

        if (e.length === 0) {
            if ($("input[aria-owns=" + this.state.idc + "]").val()) {
                var au_state: autoCompleteState = { list: this.state.list, select: [{ id: this.state.select[0].id, [this.props.selectName]: $("input[aria-owns=" + this.state.idc + "]").val() }], loading: false, hvalue: '' };
                this.setState(au_state);
            }
            else {
                var au_state: autoCompleteState = { list: this.state.list, select: [{ id: "", [this.props.selectName]: "" }], loading: false, hvalue: '' };
                this.setState(au_state);
                return;
            }
        }
        if (e[0] !== undefined) {
            var au_state: autoCompleteState = { list: this.state.list, select: [{ id: e[0].id, [this.props.selectName]: e[0][this.props.selectName + ""] }], loading: false, hvalue: e[0].id };
            this.setState(au_state);
            return;
        }





    }
    handleClick = async () => {

        if (this.stepDiv.current !== null) {
            
            this.stepDiv.current.click();
            await this.setState({ select: [{ id: "", [this.props.selectName]: "" }] });
            await $(this.stepDiv.current).find("input").click();
        }
    }
    handleMouseEnter=()=>
    {
     this.setState({ select: [{ id: "", [this.props.selectName]: "" }] });
    }
    
    render() {
        let isRequired = "";
        var isLbl = false;
        if (this.props.hasLable === undefined || this.props.hasLable === null) {
            isLbl = true;
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
                    //if (!myResource.actionTypes.toUpperCase().includes("E"))

                }
            }
            if (myResource.resourceNullable === false) {
                isRequired = 'required';
            }
        }

        const isLoading = (this.state === undefined || this.state === null) ? true : this.state.loading;
        if (projectStrong.info.url === undefined || projectStrong.info.token === undefined) {
            return null;
        }
        if (isLbl) {

            if (isLoading) {
                return (
                    <div>
                        <Form.Label>{myResource.resourceLanguageName}</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend className="input-group-prepend-awesome"><div className="spinner-grow spinner-grow-sm text-danger" role="status"><span className="sr-only">Loading...</span>      </div></InputGroup.Prepend>
                        </InputGroup>
                    </div>
                );
            }
            return (
                <div>
                    <Form.Label>{myResource.resourceLanguageName}</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend onClick={this.handleClick} className="input-group-prepend-awesome"><FontAwesomeIcon icon={faListAlt} /></InputGroup.Prepend>
                        <div ref={this.stepDiv} >
                            <Typeahead ref={this.stepInput} className={isRequired + " acomplete"}  {...{ id: this.state.idc }}
                                labelKey={this.props.selectName}
                                options={(this.state) ? this.state.list : this.state}
                                onChange={this.handleChange}
                                selected={(this.state) ? this.state.select : this.state}
                                onFocus={this.handleMouseEnter.bind(this)}    
                            />
                        </div>


                        <input type="hidden" name={this.props.name.split('.')[2]} value={this.state ? this.state.hvalue : null}></input>
                    </InputGroup>
                </div>
            );
        }
        if (isLoading) {
            return (
                <div>
                    <InputGroup>
                        <InputGroup.Prepend className="input-group-prepend-awesome"><div className="spinner-grow spinner-grow-sm text-danger" role="status"><span className="sr-only">Loading...</span>      </div></InputGroup.Prepend>
                    </InputGroup>
                </div>
            );
        }
        return (
            <InputGroup>
                <InputGroup.Prepend onClick={this.handleClick} className="input-group-prepend-awesome"><FontAwesomeIcon icon={faListAlt} /></InputGroup.Prepend>
                <Typeahead className={isRequired + " acomplete"} {...{ id: this.state.idc }}
                    labelKey={this.props.selectName}
                    options={(this.state) ? this.state.list : this.state}
                    onChange={this.handleChange}
                    selected={(this.state) ? this.state.select : this.state}
                />
                <input type="hidden" name={this.props.name.split('.')[2]} value={this.state ? this.state.hvalue : ''}></input>
            </InputGroup>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(TAutoComplete as any);
