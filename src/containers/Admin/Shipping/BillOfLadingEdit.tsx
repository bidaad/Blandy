import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../store";
import * as BillOfLadingStore from "../../../store/BillOfLading";
import * as BillOfLadingDepStore from "../../../store/BillOfLadingDep";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../components/InputBox";
import { typeComponent } from "../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../helper/serialize";
import { VwBillOfLading } from "../../../model/viewModel/VwBillOfLading";
import { stateBase } from "../../../model/general/stateBase";
import SelectList from "../../../components/SelectList";
import TButton from "../../../components/TButton";
import TTitle from "../../../components/TTitle";
import TTabs, { ComponentColumns } from "../../../components/TTabs";
import TAutoComplete from "../../../components/TAutoComplete";
import DateTime from "../../../components/DateTime";
import { Directions } from "../../../model/general";

type BillOfLadingProps = stateBase<VwBillOfLading> &
  typeof BillOfLadingStore.actionCreators &
  RouteComponentProps<{}> & {
    closeModal: any;
    refreshGrid: any;
    parentId: string;
    typeForm?: string;
  };
class BillOfLadingEdit extends React.PureComponent<BillOfLadingProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwBillOfLading;
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
    this.props.closeModal();
  };

  public render() {
    const columnStructure = [
      { key: "billolbooking", name: "billolbooking" },
      { key: "billolbkshipstatus", name: "billolbkshipstatus" },
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
        <Container >
          <Row>
            <Col md={12} className={"form-container"+Rtl} >
              <Col md={12} className="T-header">
                <TTitle {...{ name: "BillOfLading.EditForm" }} />
              </Col>
              <Form>
                <InputBox
                  {...{
                    name: "BillOfLading.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "BillOfLading.EditForm.Code",
                        type: typeComponent.text,
                        value: this.props.edit.code,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "BillOfLading.EditForm.Sign",
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
                        label: "IssueDepId name",
                        valueId: this.props.edit.issueDepId,
                        valueName: this.props.edit.issueDepSign,
                        name: "BillOfLading.EditForm.IssueDepId",
                        entityName: "departmentsl",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "BillOfLading.EditForm.IssueTime",
                        value: this.props.edit.issueTime,
                        timePicker: true,
                      }}
                    />
                  </Col>
                </Row>

                {this.props.typeForm === "dep" ? (
                  <Row>
                    <InputBox
                      {...{
                        name: "BillOfLading.EditForm.ShipperDepId",
                        type: typeComponent.hidden,
                        value: this.props.edit.issueDepId
                          ? this.props.edit.issueDepId
                          : this.props.edit.parentId,
                      }}
                    />
                  </Row>
                ) : (
                  <Row>
                    <Col md={6}>
                      <InputBox
                        {...{
                          name: "BillOfLading.EditForm.ShipperDepName",
                          type: typeComponent.textArea,
                          value: this.props.edit.shipperDepName,
                        }}
                      />
                    </Col>

                    <Col md={6}>
                      <SelectList
                        {...{
                          label: "ShipperDepId name",
                          valueId: this.props.edit.shipVelicleTypeSign,
                          valueName: this.props.edit.shipperDepSign,
                          name: "BillOfLading.EditForm.ShipperDepId",
                          entityName: "departmentsl",
                        }}
                      />
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "ShipperPersonId name",
                        valueId: this.props.edit.assetId,
                        valueName: this.props.edit.shipperPersonSign,
                        name: "BillOfLading.EditForm.ShipperPersonId",
                        entityName: "personsl",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "BillOfLading.EditForm.ShipperPersonName",
                        type: typeComponent.textArea,
                        value: this.props.edit.shipperPersonName,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCShipStatus",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcshipStatusId,
                        name: "BillOfLading.EditForm.HCShipStatusId",
                        valueName: this.props.edit.shipStatusSign,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "VehicleId name",
                        valueId: this.props.edit.vehicleId,
                        valueName: this.props.edit.productSign,
                        name: "BillOfLading.EditForm.VehicleId",
                        entityName: "assetsl",
                        valuefiltersl: "",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCShipType",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcshipTypeId,
                        name: "BillOfLading.EditForm.HCShipTypeId",
                        valueName: this.props.edit.shipTypeSign,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "BillOfLading.EditForm.IsActive",
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
                        name: "BillOfLading.EditForm.Description",
                        type: typeComponent.textArea,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "BillOfLading.EditForm.ShippingStatusDetail",
                        type: typeComponent.textArea,
                        value: this.props.edit.shippingStatusDetail,
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
                        name: "BillOfLading.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "BillOfLading.EditForm.updater",
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
                          name: "BillOfLading.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "BillOfLading.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "BillOfLading.EditForm.BTN_Back",
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
                defaultKey: "billolbooking",
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.billoflading,
  BillOfLadingStore.actionCreators
)(BillOfLadingEdit as any);

class BillOfLadingEditClass extends BillOfLadingEdit {}

export const BillOfLadingEditDep = connect(
  (state: ApplicationState) => state.billofladingdep,
  BillOfLadingDepStore.actionCreators
)(BillOfLadingEditClass as any);
