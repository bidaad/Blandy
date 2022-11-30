import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as AssetPhotographyReqStore from '../../../../store/AssetPhotographyReq';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwAssetPhotographyReq } from '../../../../model/viewModel/VwAssetPhotographyReq';
import { stateBase } from '../../../../model/general/stateBase';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import TAutoComplete from '../../../../components/TAutoComplete';
import { Directions } from '../../../../model/general';


type AssetPhotographyReqProps =
    stateBase<VwAssetPhotographyReq> & typeof AssetPhotographyReqStore.actionCreators & RouteComponentProps<{}> & { closeModal: any, refreshGrid: any, parentId: string };
class AssetPhotographyReqEdit extends React.PureComponent<AssetPhotographyReqProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwAssetPhotographyReq;
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
                <Container>
                    <Row>
                        <Col md={12} className={"form-container"+Rtl} >
                            {/* <Col md={12} className="T-header">
                                <TTitle {...{ name: "AssetPhotographyReq.EditForm" }} />
                            </Col> */}
                            <Form >
                                <InputBox {...{ name: 'AssetPhotographyReq.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'AssetPhotographyReq.EditForm.AssetId', type: typeComponent.hidden, value: this.props.edit.assetId ? this.props.edit.assetId : this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCAttributeTitle", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcattributeTitleId, name: "AssetPhotographyReq.EditForm.HCAttributeTitleId", valueName: this.props.edit.attributeTitleSign }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetPhotographyReq.EditForm.Value', type: typeComponent.textArea, value: this.props.edit.value }} />
                                    </Col>
                                </Row>
                                <Row>

                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetPhotographyReq.EditForm.ShowInList', type: typeComponent.check, value: this.props.edit.showInList }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetPhotographyReq.EditForm.OrderBy', type: typeComponent.number, value: this.props.edit.orderBy }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCUnit", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcUnitId, name: "AssetPhotographyReq.EditForm.HCUnitId", valueName: this.props.edit.unitSign }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetPhotographyReq.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetPhotographyReq.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "AssetPhotographyReq.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "AssetPhotographyReq.EditForm.updator", size: 6, value: this.props.edit.updator }} /></Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "AssetPhotographyReq.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "AssetPhotographyReq.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "AssetPhotographyReq.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.assetphotographyreq,
    AssetPhotographyReqStore.actionCreators
)(AssetPhotographyReqEdit as any);