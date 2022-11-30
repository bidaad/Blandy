import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as WorkOrderStore from '../../../store/WorkOrder';
import * as WorkOrderAssetStore from '../../../store/WorkOrderAsset';
import * as WorkOrderJobcardStore from '../../../store/WorkOrderJobcard';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwWorkOrder } from '../../../model/viewModel/VwWorkOrder';
import { stateBase } from '../../../model/general/stateBase';
import SelectList from '../../../components/SelectList';
import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import TTabs, { ComponentColumns } from '../../../components/TTabs';
import TAutoComplete from '../../../components/TAutoComplete';
import DateTime from '../../../components/DateTime';
import { Directions } from '../../../model/general';

type WorkOrderProps =
    stateBase<VwWorkOrder> & typeof WorkOrderStore.actionCreators & RouteComponentProps<{}>
    & { closeModal: any, refreshGrid: any, parentId: string, typeForm?: string };
class WorkOrderEdit extends React.PureComponent<WorkOrderProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
         
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwWorkOrder;
        if (((senddata) as any).ID) {
            this.props.saveData(senddata);
            this.props.closeModal();
        }
        else {
            this.props.saveData(senddata);
            //this.props.closeModal();
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
        // this.props.ChangeTab('', 'WorkOrderEdit', 'WorkOrder');
    }

    public render() {

        const columnStructure = [
            { key: "workorderlang", name: "workorderlang" },
            { key: "document", name: "document" }
        ] as ComponentColumns[];
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
                                <TTitle {...{ name: "WorkOrder.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'WorkOrder.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "ParentId name", valueId: this.props.edit.parentIdWorkOrder, valueName: this.props.edit.parentCode, name: "WorkOrder.EditForm.ParentIdWorkOrder", entityName: "workordersl", noselectId: this.props.edit.id }} />
                                    </Col>
                                    {this.props.typeForm === "asset" ?
                                        <InputBox {...{ name: "WorkOrder.EditForm.AssetId", type: typeComponent.hidden, value: this.props.edit.assetId ? this.props.edit.assetId : this.props.edit.parentId }} />
                                        : this.props.typeForm === "jobcard" ?
                                            <Col md={6}>
                                                <SelectList {...{ label: "AssetId name", valueId: this.props.edit.assetId, valueName: this.props.edit.productSign, name: "WorkOrder.EditForm.AssetId", entityName: "assetsl" }} />
                                            </Col>
                                            :
                                            <Col md={6}>
                                                <SelectList {...{ label: "AssetId name", valueId: this.props.edit.assetId, valueName: this.props.edit.productSign, name: "WorkOrder.EditForm.AssetId", entityName: "assetsl" }} />
                                            </Col>
                                    }

                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'WorkOrder.EditForm.Code', type: typeComponent.text, value: this.props.edit.code }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'WorkOrder.EditForm.InternalCode', type: typeComponent.text, value: this.props.edit.internalCode }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'WorkOrder.EditForm.IssueTime', value: this.props.edit.issueTime }} />
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "IssuePersonId name", valueId: this.props.edit.issuePersonId, valueName: this.props.edit.issueNikName, name: "WorkOrder.EditForm.IssuePersonId", entityName: "personsl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "AssetDefectId name", valueId: this.props.edit.assetDefectId, valueName: this.props.edit.assetDefectSign, name: "WorkOrder.EditForm.AssetDefectId", entityName: "assetdefect", valuefiltersl: "AssetID:2:FA314484-0607-455E-9CA2-0E51C84E1124;sl" }} />
                                    </Col>
                                    <Col md={6}>
                                        {this.props.typeForm === "asset" ?
                                            <SelectList {...{ label: "JobCardId name", valueId: this.props.edit.jobCardId, valueName: this.props.edit.jobCardSign, name: "WorkOrder.EditForm.JobCardId", entityName: "jobcardsl" }} />
                                            : this.props.typeForm === "jobcard" ?
                                                <InputBox {...{ name: "WorkOrder.EditForm.JobCardId", type: typeComponent.hidden, value: this.props.edit.jobCardId ? this.props.edit.jobCardId : this.props.edit.parentId }} />
                                                : <SelectList {...{ label: "JobCardId name", valueId: this.props.edit.jobCardId, valueName: this.props.edit.jobCardSign, name: "WorkOrder.EditForm.JobCardId", entityName: "jobcardsl" }} />

                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'WorkOrder.EditForm.Detail', type: typeComponent.text, value: this.props.edit.detail }} />
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "IssueDepId name", valueId: this.props.edit.issueDepId, valueName: this.props.edit.issueDepSign, name: "WorkOrder.EditForm.IssueDepId", entityName: "departmentsl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "ShopId name", valueId: this.props.edit.shopId, valueName: this.props.edit.shopSign, name: "WorkOrder.EditForm.ShopId", entityName: "departmentsl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'WorkOrder.EditForm.SchStart', value: this.props.edit.schStart }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'WorkOrder.EditForm.SchFinish', value: this.props.edit.schFinish }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'WorkOrder.EditForm.Duration', type: typeComponent.number, value: this.props.edit.duration }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'WorkOrder.EditForm.ActualStart', value: this.props.edit.actualStart }} />
                                    </Col>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'WorkOrder.EditForm.ActualFinish', value: this.props.edit.actualFinish }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'WorkOrder.EditForm.DeadLine', value: this.props.edit.deadLine }} />
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCPlanType", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcPlanTypeId, name: "WorkOrder.EditForm.HCPlanTypeId", valueName: this.props.edit.planTypeSign }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'WorkOrder.EditForm.PercentComplete', type: typeComponent.number, value: this.props.edit.percentComplete }} />
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCWOStatus", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcwostatusId, name: "WorkOrder.EditForm.HCWOStatusId", valueName: this.props.edit.wostatusSign }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'WorkOrder.EditForm.WOStatusTime', value: this.props.edit.wOStatusTime }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'WorkOrder.EditForm.ExpertDescription', type: typeComponent.text, value: this.props.edit.expertDescription }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "ExpertPersonId name", valueId: this.props.edit.expertPersonId, valueName: this.props.edit.expertNikName, name: "WorkOrder.EditForm.ExpertPersonId", entityName: "personsl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'WorkOrder.EditForm.WBSCode', type: typeComponent.text, value: this.props.edit.wbscode }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'WorkOrder.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'WorkOrder.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "JCIntervaIId name", valueId: this.props.edit.jcIntervaIId, valueName: this.props.edit.jcIntervalSign, name: "WorkOrder.EditForm.JCIntervaIId", entityName: "jcintervalsl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCPriority", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcPriorityId, name: "WorkOrder.EditForm.HCPriorityId", valueName: this.props.edit.prioritySign }} />
                                    </Col>
                                </Row>
                                <Row>
                  <Col md={12}>
                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "WorkOrder.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "WorkOrder.EditForm.updater",
                        size: 6,
                        value: this.props.edit.updater,
                      }}
                    />
                  </Col>
                </Row>

                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "WorkOrder.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "WorkOrder.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "WorkOrder.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    
                    {this.props.edit.id !== '' ?
                        <TTabs {...{ component: columnStructure, editId: this.props.edit.id, defaultKey: "workorderlang", folder: "workorderlang" }} />
                        : null}

                </Container>
            </React.Fragment>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.workorder,
    WorkOrderStore.actionCreators
)(WorkOrderEdit as any);


class WorkOrderEditClass extends WorkOrderEdit {
}

export const WorkOrderAssetEdit = connect(
    (state: ApplicationState) => state.workorderasset,
    WorkOrderAssetStore.actionCreators
)(WorkOrderEditClass as any);

class WorkOrderJCEditClass extends WorkOrderEdit {
}

export const WorkOrderJobcardEdit = connect(
    (state: ApplicationState) => state.workorderjobcard,
    WorkOrderJobcardStore.actionCreators
)(WorkOrderJCEditClass as any);