import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as DepartmentStore from "../../../../store/Department";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";
import { VwDepartment } from "../../../../model/viewModel/VwDepartment";
import { stateBase } from "../../../../model/general/stateBase";
import SelectList from "../../../../components/SelectList";
import TButton from "../../../../components/TButton";
import TTitle from "../../../../components/TTitle";
import TTabs, { ComponentColumns } from "../../../../components/TTabs";
import { Directions } from "../../../../model/general";

type DepartmentProps = stateBase<VwDepartment> &
  typeof DepartmentStore.actionCreators &
  RouteComponentProps<{}> & {closeModal:any};
class DepartmentEdit extends React.PureComponent<DepartmentProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwDepartment;
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
    // this.props.ChangeTab("", "DepartmentEdit", "Department");
    this.props.closeModal();
  };

  public render() {
    const columnStructure = [
      { key: "departmentlang", name: "departmentlang" },
      { key: "contactdep", name: "contact" },
      { key: "departmentdeptype", name: "departmentdeptype" },
      { key: "depactiveinzone", name: "depactiveinzone" },
      { key: "depbrand", name: "depbrand" },
      { key: "depcategory", name: "depcategory" },
      { key: "deppolicy", name: "deppolicy" },
      { key: "assetdep", name: "asset" },
      { key: "guaranteedep", name: "guarantee" },
      { key: "depworkdate", name: "depworkdate" },
      { key: "depweekworktime", name: "depweekworktime" },
      { key: "loaddeliverytimetitle", name: "loaddeliverytimetitle" },
      { key: "shipruledep", name: "shiprule" },
      { key: "billofladingdep", name: "billoflading" },
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
                <TTitle {...{ name: "Department.EditForm" }} />
              </Col>
              <Form>
                <InputBox
                  {...{
                    name: "Department.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Department.EditForm.Code",
                        type: typeComponent.text,
                        value: this.props.edit.code,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Department.EditForm.Sign",
                        type: typeComponent.text,
                        value: this.props.edit.sign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "ParentId name",
                        valueId: this.props.edit.parentId,
                        valueName: this.props.edit.parentName,
                        name: "Department.EditForm.ParentId",
                        entityName: "departmentsl",
                        noselectId: this.props.edit.id,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Department.EditForm.latitude",
                        type: typeComponent.number,
                        value: this.props.edit.latitude,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Department.EditForm.Longitude",
                        type: typeComponent.number,
                        value: this.props.edit.longitude,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Department.EditForm.RegisterNumber",
                        type: typeComponent.text,
                        value: this.props.edit.registerNumber,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Department.EditForm.RegisterDate",
                        type: typeComponent.text,
                        value: this.props.edit.registerDate,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Department.EditForm.EconomicCode",
                        type: typeComponent.text,
                        value: this.props.edit.economicCode,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Department.EditForm.NationalCode",
                        type: typeComponent.text,
                        value: this.props.edit.nationalCode,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Department.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Department.EditForm.Description",
                        type: typeComponent.textArea,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Department.EditForm.ExpertConfirm",
                        type: typeComponent.check,
                        value: this.props.edit.expertConfirm,
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
                        name: "Department.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "Department.EditForm.updater",
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
                          name: "Department.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "Department.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "Department.EditForm.BTN_Back",
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
                typeForm: "dep",
                isTabDetail: true,
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.departments,
  DepartmentStore.actionCreators
)(DepartmentEdit as any);
