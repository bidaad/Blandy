import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as AssignmentDetailStore from '../../../../store/AssignmentDetail';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwAssignmentDetail } from '../../../../model/viewModel/VwAssignmentDetail';
import { stateBase } from '../../../../model/general/stateBase';
import SelectList from '../../../../components/SelectList';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import TAutoComplete from '../../../../components/TAutoComplete';
import { Directions } from '../../../../model/general';


type AssignmentDetailProps =
    stateBase<VwAssignmentDetail> & typeof AssignmentDetailStore.actionCreators & RouteComponentProps<{}>&
    { closeModal: any, refreshGrid: any, parentId: string };
class AssignmentDetailEdit extends React.PureComponent<AssignmentDetailProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwAssignmentDetail;
        this.props.saveData(senddata);

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
                            <Col md={12} className="T-header">
                                <TTitle {...{ name: "AssignmentDetail.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'AssignmentDetail.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'AssignmentDetail.EditForm.AssignmentId', type: typeComponent.hidden, value:this.props.edit.assignmentId?this.props.edit.assignmentId:this.props.edit.parentId  }} />

                                {/* <Row>
                                    <Col md={6}>
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "ProductId name", valueId: this.props.edit.productId, valueName: this.props.edit.productSign, name: "AssignmentDetail.EditForm.ProductId", entityName: "productsl" }} />
                                    </Col>
                                </Row> */}
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "AssetId name", valueId: this.props.edit.assetId, valueName: this.props.edit.productSign, name: "AssignmentDetail.EditForm.AssetId", entityName: "assetsl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssignmentDetail.EditForm.QTY', type: typeComponent.number, value: this.props.edit.qty }} />
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssignmentDetail.EditForm.Amount', type: typeComponent.number, value: this.props.edit.amount }} />
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCCurrency", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hccurrencyId, name: "AssignmentDetail.EditForm.HCCurrencyId", valueName: this.props.edit.currencysign }} />
                                    </Col>
                                </Row> */}
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCAssetHealthStatus", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcassetHealthStatusId, name: "AssignmentDetail.EditForm.HCAssetHealthStatusId", valueName: this.props.edit.assetHealthStatusSign }} />
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCPriority", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcpriorityId, name: "AssignmentDetail.EditForm.HCPriorityId", valueName: this.props.edit.prioritySign }} />
                                    </Col>
                                </Row>
                                <Row>
                                    {/* <Col md={6}>
                                        <SelectList {...{ label: "WorkOrderId name", valueId: this.props.edit.workOrderId, valueName: this.props.edit.workOrderCode, name: "AssignmentDetail.EditForm.WorkOrderId", entityName: "workordersl" }} />
                                    </Col> */}
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssignmentDetail.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssignmentDetail.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "AssignmentDetail.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "AssignmentDetail.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "AssignmentDetail.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.assignmentdetail,
    AssignmentDetailStore.actionCreators
)(AssignmentDetailEdit as any);