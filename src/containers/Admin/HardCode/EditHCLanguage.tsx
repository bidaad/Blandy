import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../store";
import * as HCLanguageStore from "../../../store/HCLanguage";

import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../components/InputBox";
import { typeComponent } from "../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../helper/serialize";
import { VwHCLanguage } from "../../../model/viewModel/VwHCLanguage";
import { stateBase } from "../../../model/general/stateBase";
import TButton from "../../../components/TButton";
import TTitle from "../../../components/TTitle";
import UploadIcon from "../../../components/UploadIcon";
import { Directions } from "../../../model/general";

type HCLanguageProps = stateBase<VwHCLanguage> &
  typeof HCLanguageStore.actionCreators &
  RouteComponentProps<{}>;
class EditHCLanguage extends React.PureComponent<HCLanguageProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwHCLanguage;
    this.props.saveData(senddata);
  }

  getLabel = (label: string) => {
    return label;
  };
  getAccess = (label: string) => {
    return label;
  };

  gotoBackPage = () => {
    this.props.ChangeTab("", "EditHCLanguage", "HCLanguage");
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
                <TTitle {...{ name: "HCLanguage.EditForm" }} />
              </Col>
              <Form className="edit-form">
                <InputBox
                  {...{
                    name: "HCLanguage.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCLanguage.EditForm.Sign",
                        type: typeComponent.text,
                        value: this.props.edit.sign,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCLanguage.EditForm.RightToLeft",
                        type: typeComponent.check,
                        value: this.props.edit.rightToLeft,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCLanguage.EditForm.ISOCode1",
                        type: typeComponent.text,
                        value: this.props.edit.iSOCode1,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCLanguage.EditForm.ISOCode2",
                        type: typeComponent.text,
                        value: this.props.edit.iSOCode2,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCLanguage.EditForm.NameEn",
                        type: typeComponent.text,
                        value: this.props.edit.nameEn,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCLanguage.EditForm.NameFa",
                        type: typeComponent.text,
                        value: this.props.edit.nameFa,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCLanguage.EditForm.OrderBy",
                        type: typeComponent.number,
                        value: this.props.edit.orderBy,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <UploadIcon
                      {...{
                        name: "HCLanguage.EditForm.Icon",
                        value: this.props.edit.icon,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCLanguage.EditForm.LocalName",
                        type: typeComponent.text,
                        value: this.props.edit.localName,
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCLanguage.EditForm.Description",
                        type: typeComponent.text,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCLanguage.EditForm.IsActive",
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
                        name: "HCLanguage.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "HCLanguage.EditForm.updator",
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
                          name: "HCLanguage.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "HCLanguage.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "HCLanguage.EditForm.BTN_Back",
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
  (state: ApplicationState) => state.hclanguage,
  HCLanguageStore.actionCreators
)(EditHCLanguage as any);
