import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../store";
import * as JobCardStore from "../../../store/JobCard";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../components/InputBox";
import { typeComponent } from "../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../helper/serialize";
import { VwJobCard } from "../../../model/viewModel/VwJobCard";
import { stateBase } from "../../../model/general/stateBase";
import SelectList from "../../../components/SelectList";
import TButton from "../../../components/TButton";
import TTitle from "../../../components/TTitle";
import TTabs, { ComponentColumns } from "../../../components/TTabs";
import TAutoComplete from "../../../components/TAutoComplete";
import DateTime from "../../../components/DateTime";
import { Directions } from "../../../model/general";

type JobCardProps = stateBase<VwJobCard> &
  typeof JobCardStore.actionCreators &
  RouteComponentProps<{}> &{closeModal:any};
class JobCardEdit extends React.PureComponent<JobCardProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwJobCard;
    this.props.saveData(senddata);
  }

  getLabel = (label: string) => {
    return label;
  };
  getAccess = (label: string) => {
    return label;
  };

  gotoBackPage = () => {
    // const { history } = this.props;
    // history.goBack();
    // this.props.ChangeTab("", "JobCardEdit", "JobCard");
    this.props.closeModal();
  };

  public render() {
    console.log("Job Card Edit");

    const columnStructure = [
      { key: "jobcardlang", name: "jobcardlang" },
      { key: "jcinterval", name: "jcinterval" },
      { key: "jceffectonproduct", name: "jceffectonproduct" },
      { key: "jceffectoncategory", name: "jceffectoncategory" },
      { key: "jceffectonassetforjobcard", name: "jceffectonasset" },
      { key: "jcneedproduct", name: "jcneedproduct" },
      { key: "jcneedcategory", name: "jcneedcategory" },
      { key: "jcuserrejectjobcard", name: "jcuserreject" },
      { key: "workorderjobcard", name: "workorder" },
      { key: "document", name: "document" },
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
                <TTitle {...{ name: "JobCard.EditForm" }} />
              </Col>
              <Form>
                <InputBox
                  {...{
                    name: "JobCard.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "JobCard.EditForm.Code",
                        type: typeComponent.text,
                        value: this.props.edit.code,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "JobCard.EditForm.Sign",
                        type: typeComponent.text,
                        value: this.props.edit.sign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HcjobCardType",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcjobCardTypeId,
                        name: "JobCard.EditForm.HcjobCardTypeId",
                        valueName: this.props.edit.jobCardTypeSign,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCJCOperationType",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcjcoperationTypeId,
                        name: "JobCard.EditForm.HcjcoperationTypeId",
                        valueName: this.props.edit.jcoperationTypeSign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCOperationStatus",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcOperationStatusId,
                        name: "JobCard.EditForm.HCOperationStatusId",
                        valueName: this.props.edit.operationStatusSign,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HcassetHealthStatus",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcassetHealthStatusId,
                        name: "JobCard.EditForm.HcassetHealthStatusId",
                        valueName: this.props.edit.assetHealthStatusSign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "JobCard.EditForm.ExpireDate",
                        value: this.props.edit.expireDate,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "JobCard.EditForm.EffectiveDate",
                        value: this.props.edit.effectiveDate,
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "JobCard.EditForm.Duration",
                        type: typeComponent.number,
                        value: this.props.edit.duration,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCUnit",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.durationUnitId,
                        name: "JobCard.EditForm.DurationUnitId",
                        valueName: this.props.edit.unitSign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "JobCard.EditForm.JCWork",
                        type: typeComponent.number,
                        value: this.props.edit.jcwork,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCPriority",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcPriorityId,
                        name: "JobCard.EditForm.HCPriorityId",
                        valueName: this.props.edit.prioritySign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "JobCard.EditForm.ReferenceNo",
                        type: typeComponent.textArea,
                        value: this.props.edit.referenceNo,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "JobCard.EditForm.Version",
                        type: typeComponent.text,
                        value: this.props.edit.version,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={11}>
                    <SelectList
                      {...{
                        label: "JobCard name",
                        valueId: this.props.edit.jobcardParentId,
                        valueName: this.props.edit.jobcardParent,
                        name: "JobCard.EditForm.JobcardParentId",
                        entityName: "jobcardsl",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <InputBox
                      {...{
                        name: "JobCard.EditForm.saftyInstruction",
                        type: typeComponent.textArea,
                        value: this.props.edit.saftyInstruction,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <InputBox
                      {...{
                        name: "JobCard.EditForm.technicalDescription",
                        type: typeComponent.textArea,
                        value: this.props.edit.technicalDescription,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <InputBox
                      {...{
                        name: "JobCard.EditForm.saftyInstruction",
                        type: typeComponent.textArea,
                        value: this.props.edit.saftyInstruction,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "JobCard.EditForm.Description",
                        type: typeComponent.textArea,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "JobCard.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
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
                        name: "JobCard.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "JobCard.EditForm.updater",
                        size: 6,
                        value: this.props.edit.updater,
                      }}
                    />
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={1}>
                    {this.props.saveLoading === true ? (
                      <TButton
                        {...{
                          name: "JobCard.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "JobCard.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "JobCard.EditForm.BTN_Back",
                        variant: "outline-info",
                        submit: this.gotoBackPage,
                      }}
                    />
                  </Col>
                  <Col></Col>
                </Row>
              </Form>
            </Col>
          </Row>
          {this.props.edit.id !== "" ? (
            <TTabs
              {...{
                component: columnStructure,
                editId: this.props.edit.id,
                defaultKey: columnStructure[0].key,
                typeForm: "jobcard",
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.jobcard,
  JobCardStore.actionCreators
)(JobCardEdit as any);
