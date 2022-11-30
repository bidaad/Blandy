import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as AssetOperStatusStore from '../../../../store/AssetOperStatus';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwAssetOperStatus } from '../../../../model/viewModel/VwAssetOperStatus';
import { stateBase } from '../../../../model/general/stateBase';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import TAutoComplete from '../../../../components/TAutoComplete';
import DateTime from '../../../../components/DateTime';
import { Directions } from '../../../../model/general';


type AssetOperStatusProps =
    stateBase<VwAssetOperStatus> & typeof AssetOperStatusStore.actionCreators & RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };
class AssetOperStatusEdit extends React.PureComponent<AssetOperStatusProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwAssetOperStatus;
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
                                <TTitle {...{ name: "AssetOperStatus.EditForm" }} />
                            </Col> */}
                            <Form >
                                <InputBox {...{ name: 'AssetOperStatus.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'AssetOperStatus.EditForm.AssetId', type: typeComponent.hidden, value: this.props.edit.assetId ? this.props.edit.assetId : this.props.edit.parentId }} />
                                <Row>

                                    <Col md={12}>
                                        <TAutoComplete {...{ controller: "HCOperationStatus", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcoperationStatusId, name: "AssetOperStatus.EditForm.HCOperationStatusId", valueName: this.props.edit.operationStatusSign }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'AssetOperStatus.EditForm.FromDate', value: this.props.edit.fromDate }} />
                                    </Col>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'AssetOperStatus.EditForm.ToDate', value: this.props.edit.toDate }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetOperStatus.EditForm.Reason', type: typeComponent.textArea, value: this.props.edit.reason }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetOperStatus.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetOperStatus.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "AssetOperStatus.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "AssetOperStatus.EditForm.updator", size: 6, value: this.props.edit.updator }} /></Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col md={1}>
                                        <TButton {...{ name: "AssetOperStatus.EditForm.BTN_Save", submit: this.handleSubmit }} />
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "AssetOperStatus.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.assetoperstatus,
    AssetOperStatusStore.actionCreators
)(AssetOperStatusEdit as any);