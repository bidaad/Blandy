import React, { Component } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { typeComponent } from '../model/general/typeComponent';
import { faTextHeight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApplicationState } from '../store';
import * as UserInfo from '../store/UserInfo';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { VwPermisionResource } from '../model/viewModel/VwPermisionResource';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';



type InputProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    RouteComponentProps<{}> &
    { hasLable?: boolean, name: string, value: any, type: typeComponent, pholder?: string };
class TextEditorBox extends Component<InputProps, { value: any }> {
    constructor(props: any) {
        super(props);

        this.state = { value: this.props.value};

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (event: any) => {
        
        this.setState({ value: event });
    }

    render() {
        

        //var isRequired = '';
        var isLbl = true;
        //var disbaled = false;
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
                    // if (!myResource.actionTypes.toUpperCase().includes("E"))
                    //     disbaled = true;

                }
            }
            // if (myResource.resourceNullable === false) {
            //     isRequired = 'required';
            // }
        }


        if (isLbl) {

            return (
                <div>
                    <Form.Label>{myResource.resourceLanguageName}</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend className="input-group-prepend-awesome"><FontAwesomeIcon icon={faTextHeight} /></InputGroup.Prepend>

                        <SunEditor setContents={this.state.value} disable={false}  onChange={this.handleChange} 
                            setOptions={{
                                height:'500px',
                                buttonList:[
                                    [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
                                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],['fontColor', 'hiliteColor', 'textStyle'],['undo', 'redo'],['font', 'align'], ['image'], ['align', 'horizontalRule', 'list', 'lineHeight'], ['removeFormat'],
                                ['outdent', 'indent'],[ '-left','table','link']]
                            }}
                            lang="en" showToolbar={true}  />
                            <Form.Control hidden={true}  name={this.props.name.split('.')[2]+'__htmleditor'} value={this.state.value} onChange={this.handleChange}  type='text'  />
                    </InputGroup>
                </div>
            );

        }
        else {
            return (
                <div>
                    <InputGroup>
                        <InputGroup.Prepend className="input-group-prepend-awesome"><FontAwesomeIcon icon={faTextHeight} /></InputGroup.Prepend>
                        {/* <FroalaEditorComponent model={this.state.value} onChange={this.handleChange} placeholder={this.props.pholder} /> */}
                    </InputGroup>
                </div>
            );

        }
    }

}

export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(TextEditorBox as any);