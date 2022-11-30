import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../store";
import * as HCShipVelicleTypeStore from "../../../store/HCShipVelicleType";

import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../components/InputBox";
import { typeComponent } from "../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../helper/serialize";
import { VwHCShipVelicleType } from "../../../model/viewModel/VwHCShipVelicleType";
import { stateBase } from "../../../model/general/stateBase";
import TButton from "../../../components/TButton";
import TTitle from "../../../components/TTitle";
import UploadIcon from "../../../components/UploadIcon";
import TAutoComplete from "../../../components/TAutoComplete";
import { Directions } from "../../../model/general";

type HCShipVelicleTypeProps = stateBase<VwHCShipVelicleType> &
  typeof HCShipVelicleTypeStore.actionCreators &
  RouteComponentProps<{}>;
class EditHCShipVelicleType extends React.PureComponent<HCShipVelicleTypeProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwHCShipVelicleType;
    this.props.saveData(senddata);
  }

  getLabel = (label: string) => {
    return label;
  };
  getAccess = (label: string) => {
    return label;
  };

  gotoBackPage = () => {
    this.props.ChangeTab("", "EditHCShipVelicleType", "HCShipVelicleType");
  };

  public render() {
    let Rtl = "";
    if (this.props.dir === Directions.RTL) {
      Rtl = " Rtl";
    }
    if (this.props.edit === undefined) {
      return null;
    }
    if (this.props.edit === undefined) {
      return null;
    }
    return (
      <React.Fragment>
        <Container className={"form-container" + Rtl}>
          <Row>
            <Col md={12} className="T-container">
              <Col md={12} className="T-header">
                <TTitle {...{ name: "HCShipVelicleType.EditForm" }} />
              </Col>
              <Form className="edit-form">
                <InputBox
                  {...{
                    name: "HCShipVelicleType.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCShipVelicleType.EditForm.Code",
                        type: typeComponent.text,
                        value: this.props.edit.code,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCShipVelicleType.EditForm.Sign",
                        type: typeComponent.text,
                        value: this.props.edit.sign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <UploadIcon
                      {...{
                        name: "HCShipVelicleType.EditForm.Icon",
                        value: this.props.edit.icon,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCShipVelicleType.EditForm.OrderBy",
                        type: typeComponent.number,
                        value: this.props.edit.orderBy,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "Category",
                        action: "GetList",
                        selectName: "sign",
                        valueId: this.props.edit.shipingVehicleId,
                        name: "HCShipVelicleType.EditForm.ShipingVehicleId",
                        valueName: this.props.edit.vehicleSing,
                      }}
                    />
                    {/* <InputBox {...{ name: 'HCShipVelicleType.EditForm.ShipingVehicleId', type: typeComponent.text, value: this.props.edit.shipingVehicleId }} /> */}
                  </Col>
                  <Col md={6}></Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCShipVelicleType.EditForm.Description",
                        type: typeComponent.textArea,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCShipVelicleType.EditForm.IsActive",
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
                        name: "HCShipVelicleType.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "HCShipVelicleType.EditForm.updator",
                        size: 6,
                        value: this.props.edit.updator,
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={1}>
                    {this.props.saveLoading === true ? (
                      <TButton
                        {...{
                          name: "HCShipVelicleType.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "HCShipVelicleType.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "HCShipVelicleType.EditForm.BTN_Back",
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
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.hcshipvelicletype,
  HCShipVelicleTypeStore.actionCreators
)(EditHCShipVelicleType as any);
