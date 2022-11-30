import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as DocumentStore from '../../../store/Document';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { stateBase } from '../../../model/general/stateBase';
import { VwDocument } from '../../../model/viewModel/VwDocument';
import UploadFile from '../../../components/UploadFile';
import TButton from '../../../components/TButton';
import { Directions } from '../../../model/general';


type DocumentProps =
    stateBase<VwDocument> &
    typeof DocumentStore.actionCreators &
    RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };

class DocumentEdit extends React.PureComponent<DocumentProps, { parentId: string }> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.state = {
        //     parentId: this.props.parentId,
        // }
    }
    componentDidMount() {

    }
    handleSubmit(event: any) {

        event.preventDefault();
        let folder = "";
        let currentLocation = window.location.pathname;
        if (currentLocation.indexOf('/') !== -1) {
            var route = currentLocation.split('/');
            if (route.length === 3) {
                folder = route[2];
                folder = folder.toUpperCase();
                if (folder.indexOf('EDIT') !== -1) {
                    folder = folder.replace('EDIT', '');
                }
            }

        }
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwDocument;


        if (((senddata) as any).ID) {
            this.props.saveData(senddata);
        }
        else {
            this.props.saveData(senddata);
            this.props.closeModal();
        }



    }

    getLabel = (label: string) => {
        return label;
    }
    getAccess = (label: string) => {
        return label;
    }

    gotoBackPage = () => {
        this.props.closeModal();

    }

    public render() {
        let Rtl = "";
        if (this.props.dir === Directions.RTL) {
            Rtl = " Rtl";
        }
        if (this.props.edit === undefined) {
            return null;
        }
        return (
            <React.Fragment>
                <Container className={"form-container"+Rtl}>
                    <Row>
                        <Col md={12}>
                            <Form onSubmit={this.handleSubmit}>
                                <InputBox {...{ name: 'document.editform.entityDocId', type: typeComponent.hidden, value: this.props.edit.entityDocId }} />
                                <InputBox {...{ name: 'document.editform.ParentId', type: typeComponent.hidden, value: this.props.edit.parentId }} />
                                <InputBox  {...{ name: 'document.editform.id', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <Row>
                                    {/* <Col md={6}>
                                        <InputBox {...{ name: 'document.editform.name', type: typeComponent.text, value: this.props.edit.name }} />
                                    </Col> */}
                                    <Col md={12}>
                                        <InputBox {...{ name: 'document.editform.code', type: typeComponent.text, value: this.props.edit.code }} />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <InputBox {...{ name: 'document.editform.sign', type: typeComponent.text, value: this.props.edit.sign }} />

                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'document.editform.mainDoc', type: typeComponent.check, value: this.props.edit.mainDoc }} />
                                    </Col>

                                    <Col md={6}>
                                        <UploadFile {...{ name: "document.editform.Image", value: this.props.edit.code, size: this.props.edit.size, type: this.props.edit.type, extention: this.props.edit.extention, path: this.props.edit.filePath }} />
                                    </Col>

                                </Row>

                                <Row>

                                    <Col md={6}>
                                        <InputBox {...{ name: 'document.editform.isActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>

                                </Row>
                                <Row>
                                    <Col md={2} >
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "document.editform.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "document.editform.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={2} >
                                        <TButton {...{ name: "document.editform.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>

                </Container>
            </React.Fragment>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.documents,
    DocumentStore.actionCreators
)(DocumentEdit as any);