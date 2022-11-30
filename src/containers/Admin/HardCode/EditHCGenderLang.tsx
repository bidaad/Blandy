import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../store";
import * as HCGenderLangStore from "../../../store/HCGenderLang";

import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../components/InputBox";
import { typeComponent } from "../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../helper/serialize";
import { VwHCGenderLang } from "../../../model/viewModel/VwHCGenderLang";
import { stateBase } from "../../../model/general/stateBase";
import TButton from "../../../components/TButton";
import TTitle from "../../../components/TTitle";
import TAutoComplete from "../../../components/TAutoComplete";
import { Directions } from "../../../model/general";

type HCGenderLangProps = stateBase<VwHCGenderLang> &
  typeof HCGenderLangStore.actionCreators &
  RouteComponentProps<{}> & {
    closeModal: any;
    refreshGrid: any;
    parentId: string;
  };
class EditHCGenderLang extends React.PureComponent<HCGenderLangProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwHCGenderLang;
    this.props.saveData(senddata);
  }

  getLabel = (label: string) => {
    return label;
  };
  getAccess = (label: string) => {
    return label;
  };

  gotoBackPage = () => {
    this.props.closeModal();
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
                <TTitle {...{ name: "HCGenderLang.EditForm" }} />
              </Col>
              <Form className="edit-form">
                <InputBox
                  {...{
                    name: "HCGenderLang.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <InputBox
                  {...{
                    name: "HCGenderLang.EditForm.HCGenderId",
                    type: typeComponent.hidden,
                    value: this.props.parentId,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCGenderLang.EditForm.Name",
                        type: typeComponent.text,
                        value: this.props.edit.name,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCGenderLang.EditForm.Description",
                        type: typeComponent.textArea,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "Language",
                        action: "GetList",
                        selectName: "sign",
                        valueId: this.props.edit.languageId,
                        name: "HCGenderLang.EditForm.LanguageId",
                        valueName: this.props.edit.sign,
                      }}
                    />
                  </Col>

                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "HCGenderLang.EditForm.IsActive",
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
                        name: "HCGenderLang.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "HCGenderLang.EditForm.updator",
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
                          name: "HCGenderLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "HCGenderLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "HCGenderLang.EditForm.BTN_Back",
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
  (state: ApplicationState) => state.hcgenderlang,
  HCGenderLangStore.actionCreators
)(EditHCGenderLang as any);
