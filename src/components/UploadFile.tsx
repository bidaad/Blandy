import React, { Component } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApplicationState } from '../store';
import * as UserInfo from '../store/UserInfo';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { VwPermisionResource } from '../model/viewModel/VwPermisionResource';
import { APIImage } from '../helper/config';
import { FileExist } from '../helper/file';
import Image from './Image';
type TextBoxProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    RouteComponentProps<{}> &
    { value: any, pholder?: string, name: string, fileUpload?: any, size: number, type: string, extention: string, path: any };

type uploadState =
    { value: any, size: number, type: string, extention: string, loading: boolean, data: any };
//Upload
class UploadFile extends Component<TextBoxProps, uploadState> {
    private stepInput: React.RefObject<HTMLInputElement>;
    constructor(props: any) {
        super(props);
        this.state = { value: '', size: this.props.size, type: this.props.type, extention: this.props.extention, loading: false, data: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.stepInput = React.createRef();
    }
    toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    handleChange = (event: any) => {
 
        if (event.target.files.length === 1) {
            if (event.target.files[0].name) {
                const size = event.target.files[0].size;
                const names = event.target.files[0].name.split(".");
                const name = names[0];
                const suffix = names[1];
                const type = event.target.files[0].type;
                this.toBase64(event.target.files[0]).then(
                    data => {
                        this.setState({
                            data: data, value: name, size: Number(size), type: type, extention: suffix, loading: false
                        });
                    }
                );
            }

        }
        else {
            let start = { ...this.state };
            start.loading = false;
            this.setState(start);
        }

    }
    handleClick = (event: any) => {

        let start = { ...this.state };
        start.loading = true;
        this.setState(start);

        if (this.stepInput.current !== null) {
            this.stepInput.current.click();
        }
    }
    render() {
        let disbaled = false;

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
        }


        const isLoading = (this.state === undefined || this.state === null) ? true : this.state.loading;
        let curentImage = undefined
        if (this.props.path !== "" && this.props.path !== undefined && this.props.path !== null) {
            curentImage = APIImage  + this.props.path;
            if (FileExist(curentImage)===false) {
                curentImage = APIImage + 'default.png';
            }
        }
        return (
            <div>
                <Form.Label>{myResource.resourceLanguageName}</Form.Label> 
                <InputGroup>
                    {
                        isLoading ?
                            <InputGroup.Prepend className="input-group-prepend-awesome"><div className="spinner-grow spinner-grow-sm text-danger" role="status"><span className="sr-only">Loading...</span>      </div></InputGroup.Prepend>
                            :
                            <InputGroup.Prepend className="input-group-prepend-awesome"><FontAwesomeIcon icon={faImage} color="green" onClick={this.handleClick} /></InputGroup.Prepend>

                    }
                    <Form.Control value={this.state.value} disabled={disbaled} onClick={this.handleClick} type='text' placeholder={this.props.pholder} />
                    <div className="imgUploadComponent">
                        {curentImage !== undefined ?
                          <Image fallbackSrc={APIImage + '/default.png'} alt={''} src={curentImage} /> :
                            <div></div>
                        }


                    </div>


                    <input name={this.props.name.split('.')[2]} type="hidden" value={this.state.data} />
                    <input ref={this.stepInput} className="uploader" onChange={this.handleChange} type='file' />
                    <input type="number" className="uploader" name="size__number" value={this.state.size} />
                    <input type="hidden" name="type" value={this.state.type} />
                    <input type="hidden" name="extention" value={this.state.extention} />
                </InputGroup>
            </div>
        );

    }

}
export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(UploadFile as any);
