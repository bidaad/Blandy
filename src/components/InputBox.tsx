import React, { Component } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { typeComponent } from '../model/general/typeComponent';
import {  faSortNumericUp ,faTextHeight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApplicationState } from '../store';
import * as UserInfo from '../store/UserInfo';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { VwPermisionResource } from '../model/viewModel/VwPermisionResource';


type InputProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    RouteComponentProps<{}> &
    { hasLable?: boolean, name: string, value: any, type: typeComponent, pholder?: string };
class InputBox extends Component<InputProps, { value: any, count: number }> {
    constructor(props: any) {
        super(props);
        
        this.state = { value: this.props.value, count: 0 };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    }
    handleChange=(event: any)=> {

        this.setState({ value: event.target.value });
        this.setState({ count: event.target.value.length });
    }
    handleCheckBoxChange = (event: any) => {
        this.setState({ value: event.target.checked });

    }
    render() {
        let isRequired = '';
        var isLbl = true;
        let disbaled = false;
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

        if (this.props.type === typeComponent.hidden) {
            return (
                <div>
                    <Form.Control name={this.props.name.split('.')[2]} value={this.state.value} onChange={this.handleChange} type='hidden' placeholder={this.props.pholder} />
                </div>
            );
        }

        if (isLbl) {

            if (this.props.type === typeComponent.text) {
                return (
                    <div>
                        <Form.Label>{myResource.resourceLanguageName}</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend className="input-group-prepend-awesome"><FontAwesomeIcon icon={faTextHeight} /></InputGroup.Prepend>
                            <Form.Control className={isRequired} name={this.props.name.split('.')[2]} value={this.state.value !== null ? this.state.value : ''} disabled={disbaled} onChange={this.handleChange} type='text' placeholder={this.props.pholder} />
                            {this.state.count <= 0 ? null :
                                <InputGroup.Prepend className="input-group-prepend-awesome-counter">{this.state.count}</InputGroup.Prepend>
                            }
                        </InputGroup>
                    </div>
                );
            }
            else if (this.props.type === typeComponent.textArea) {
                return (
                    <div>
                        <Form.Label>{myResource.resourceLanguageName}</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend className="input-group-prepend-awesome"><FontAwesomeIcon icon={faTextHeight} /></InputGroup.Prepend>
                            <Form.Control as="textarea" rows="1" className={isRequired} name={this.props.name.split('.')[2]} value={this.state.value} disabled={disbaled} onChange={this.handleChange}  type='textArea' placeholder={this.props.pholder} />
                            {this.state.count <= 0 ? null :
                                <InputGroup.Prepend className="input-group-prepend-awesome-counter">{this.state.count}</InputGroup.Prepend>
                            }
                        </InputGroup>
                    </div>
                );
            }
            else if (this.props.type === typeComponent.password) {
                return (
                    <div>
                        <Form.Label>{myResource.resourceLanguageName}</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend className="input-group-prepend-awesome"><FontAwesomeIcon icon={faTextHeight} /></InputGroup.Prepend>
                            <Form.Control className={isRequired} name={this.props.name.split('.')[2]} value={this.state.value} disabled={disbaled} onChange={this.handleChange} type='password' placeholder={this.props.pholder} />
                            {this.state.count <= 0 ? null :
                                <InputGroup.Prepend className="input-group-prepend-awesome-counter">{this.state.count}</InputGroup.Prepend>
                            }
                        </InputGroup>
                    </div>
                );
            }
            else if (this.props.type === typeComponent.number) {
                return (
                    <div>
                        <Form.Label>{myResource.resourceLanguageName}</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend className="input-group-prepend-awesome"><FontAwesomeIcon icon={faSortNumericUp} color="blue" /></InputGroup.Prepend>
                            <Form.Control className={isRequired} name={this.props.name.split('.')[2] + '__number'} disabled={disbaled} value={this.state.value !== null? this.state.value : ''} onChange={this.handleChange} type='number' placeholder={this.props.pholder} />
                        </InputGroup>
                    </div>
                );
            }
            else if (this.props.type === typeComponent.check) {
                return (
                    <div>
                        <Form.Label>{myResource.resourceLanguageName}</Form.Label>
                        <Form.Group>
                            <Form.Check name={this.props.name.split('.')[2]} disabled={disbaled} checked={this.state.value} value={this.state.value !== null ? this.state.value : false} onChange={this.handleCheckBoxChange} placeholder={this.props.pholder} />
                        </Form.Group>
                    </div>
                );
            }

        }
        else {
            if (this.props.type === typeComponent.text) {
                return (
                    <div>
                        <InputGroup>
                            <InputGroup.Prepend className="input-group-prepend-awesome"><FontAwesomeIcon icon={faTextHeight} /></InputGroup.Prepend>
                            <Form.Control className={isRequired} name={this.props.name.split('.')[2]} disabled={disbaled} value={this.state.value} onChange={this.handleChange} type='text' placeholder={this.props.pholder} />
                            {this.state.count <= 0 ? null :
                                <InputGroup.Prepend className="input-group-prepend-awesome-counter">{this.state.count}</InputGroup.Prepend>
                            }
                        </InputGroup>
                    </div>
                );
            }
            else if (this.props.type === typeComponent.password) {
                return (
                    <div>
                        <InputGroup>
                            <InputGroup.Prepend className="input-group-prepend-awesome"><FontAwesomeIcon icon={faTextHeight} /></InputGroup.Prepend>
                            <Form.Control className={isRequired} name={this.props.name.split('.')[2]} disabled={disbaled} value={this.state.value} onChange={this.handleChange} type='password' placeholder={this.props.pholder} />
                            {this.state.count <= 0 ? null :
                                <InputGroup.Prepend className="input-group-prepend-awesome-counter">{this.state.count}</InputGroup.Prepend>
                            }
                        </InputGroup>
                    </div>
                );
            }
            else if (this.props.type === typeComponent.number) {
                return (
                    <div>
                        <InputGroup>
                            <InputGroup.Prepend className="input-group-prepend-awesome"><FontAwesomeIcon icon={faSortNumericUp} /></InputGroup.Prepend>
                            <Form.Control className={isRequired} name={this.props.name.split('.')[2]} disabled={disbaled} value={this.state.value} onChange={this.handleChange} type='number' placeholder={this.props.pholder} />
                        </InputGroup>
                    </div>
                );
            }
            else if (this.props.type === typeComponent.check) {
                return (
                    <div>
                        <Form.Group>
                            <Form.Check name={this.props.name.split('.')[2]} disabled={disbaled} checked={this.state.value} value={this.state.value} onChange={this.handleCheckBoxChange} placeholder={this.props.pholder} />
                        </Form.Group>
                    </div>
                );
            }
        }
    }

}

export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(InputBox as any);