import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../store";
import * as HCAttributeTitleStore from "../../../store/HCAttributeTitle";

import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../components/InputBox";
import { typeComponent } from "../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../helper/serialize";
import { VwHCAttributeTitle } from "../../../model/viewModel/VwHCAttributeTitle";
import { stateBase } from "../../../model/general/stateBase";
import TButton from "../../../components/TButton";
import TTitle from "../../../components/TTitle";
import UploadIcon from "../../../components/UploadIcon";
import TTabs, { ComponentColumns } from "../../../components/TTabs";
import { Directions } from "../../../model/general";

const tabStructure = [
  { key: "hcattributetitlelang", name: "hcattributetitlelang" },
] as ComponentColumns[];

type HCAttributeTitleProps = stateBase<VwHCAttributeTitle> &
  typeof HCAttributeTitleStore.actionCreators &
  RouteComponentProps<{}>;
class EditHCAttributeTitle extends React.PureComponent<HCAttributeTitleProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwHCAttributeTitle;
    this.props.saveData(senddata);
  }

  getLabel = (label: string) => {
    return label;
  };
  getAccess = (label: string) => {
    return label;
  };

  gotoBackPage = () => {
    this.props.ChangeTab("", "EditHCAttributeTitle", "HCAttributeTitle");
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
                <TTitle {...{ name: "HCAttributeTitle.EditForm" }} />
              </Col>
              <Form className="edit-form">
                <InputBox
                  {...{
                    name: "HCAttributeTitle.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCAttributeTitle.EditForm.Code",
                        type: typeComponent.text,
                        value: this.props.edit.code,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCAttributeTitle.EditForm.Sign",
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
                        name: "HCAttributeTitle.EditForm.Icon",
                        value: this.props.edit.icon,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCAttributeTitle.EditForm.OrderBy",
                        type: typeComponent.number,
                        value: this.props.edit.orderBy,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCAttributeTitle.EditForm.Description",
                        type: typeComponent.text,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCAttributeTitle.EditForm.IsActive",
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
                        name: "HCAttributeTitle.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "HCAttributeTitle.EditForm.updator",
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
                          name: "HCAttributeTitle.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "HCAttributeTitle.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "HCAttributeTitle.EditForm.BTN_Back",
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
                component: tabStructure,
                editId: this.props.edit.id,
                defaultKey: tabStructure[0].key,
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.hcattributetitle,
  HCAttributeTitleStore.actionCreators
)(EditHCAttributeTitle as any);
