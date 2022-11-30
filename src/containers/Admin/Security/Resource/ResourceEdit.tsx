import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as TreeResourceStore from '../../../../store/TreeResource';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { stateBase } from '../../../../model/general/stateBase';
import TAutoComplete from '../../../../components/TAutoComplete';
import TButton from '../../../../components/TButton';
import UploadIcon from '../../../../components/UploadIcon';
import TTitle from '../../../../components/TTitle';
import { VwResource } from '../../../../model/viewModel/VwResource';
import SelectList from '../../../../components/SelectList';
import TTabs from '../../../../components/TTabs';
import { Directions } from '../../../../model/general';



type ResourceAttributeProps =
    stateBase<VwResource> &
    typeof TreeResourceStore.actionCreators &
    RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };

class ResourceEdit extends React.PureComponent<ResourceAttributeProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit(event: any) {
        event.preventDefault();

        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwResource;
        this.props.saveData(senddata);

        this.props.closeModal();
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

        const columnStructure2 = [
            { key: "resourcelang", name: "resourcelang" },
            { key: "rolepermission", name: "rolepermission" },

        ]
        let Rtl = "";
        if (this.props.dir === Directions.RTL) {
            Rtl = " Rtl";
        }
        if (this.props.edit === undefined) {
            return null;
        }
        return (

            <React.Fragment>
                {this.props.isEditLoad === true ? <div className="overlayTreeView">
                    <div>
                        <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>
                </div>
                    :
                    <Container className={"form-container"+Rtl}>

                        <Row>
                            <Col md={12}>
                                <Form className="edit-form">
                                    <InputBox {...{ name: 'Resource.EditForm.Id', type: typeComponent.hidden, value: this.props.edit.id }} />
                                    {/* <InputBox {...{ name: 'Resource.EditForm.parentId', type: typeComponent.hidden, value: this.props.parentId }} /> */}
                                    <Row>
                                        <Col md={6}>
                                            <InputBox {...{ name: 'Resource.EditForm.Code', type: typeComponent.text, value: this.props.edit.code }} />
                                        </Col>
                                        <Col md={6}>
                                            <InputBox  {...{ name: 'Resource.EditForm.Sign', type: typeComponent.text, value: this.props.edit.sign }} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <InputBox {...{ name: 'Resource.EditForm.orderBy', type: typeComponent.number, value: this.props.edit.orderBy }} />
                                        </Col>
                                        <Col md={6}>
                                            <UploadIcon {...{ name: "Resource.EditForm.Icon", value: this.props.edit.icon }} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <InputBox {...{ name: 'Resource.EditForm.area', type: typeComponent.text, value: this.props.edit.area }} />
                                        </Col>
                                        <Col md={6}>
                                            <InputBox {...{ name: 'Resource.EditForm.controller', type: typeComponent.text, value: this.props.edit.controller }} />
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <InputBox {...{ name: 'Resource.EditForm.action', type: typeComponent.text, value: this.props.edit.action }} />
                                        </Col>
                                        <Col md={6}>
                                            <TAutoComplete {...{ controller: "HCResourceType", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcresourceTypeId, name: "Resource.EditForm.hcresourceTypeId", valueName: this.props.edit.resourceTypeSign }} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <SelectList {...{ label: "Parent name", valueId: this.props.edit.parentId, valueName: this.props.edit.parentName, name: "Resource.EditForm.parentId", entityName: "resourcesl", noselectId: this.props.edit.id }} />
                                        </Col>
                                        <Col md={6}>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <InputBox  {...{ name: 'Resource.EditForm.description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                        </Col>
                                        <Col md={6}>
                                            <InputBox  {...{ name: 'Resource.EditForm.isActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}><TTitle {...{ name: "Resource.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                        <Col md={6}><TTitle {...{ name: "Resource.EditForm.updator", size: 6, value: this.props.edit.updator }} /></Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <hr />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={2} >
                                              {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "Resource.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "Resource.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                        </Col>
                                        <Col md={2} >
                                            <TButton {...{ name: "Resource.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        <hr></hr>
                        {this.props.edit.id !== '' ?
                            <TTabs {...{ component: columnStructure2, editId: this.props.edit.id, defaultKey: "resourceLang", folder: "resourceLang" }} />
                            : null}
                    </Container>
                }
            </React.Fragment>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.treeresources,
    TreeResourceStore.actionCreators
)(ResourceEdit as any);