import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../store";
import * as SurveySubjectStore from "../../../store/SurveySubject";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../components/InputBox";
import { typeComponent } from "../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../helper/serialize";
import { VwSurveySubject } from "../../../model/viewModel/VwSurveySubject";
import { stateBase } from "../../../model/general/stateBase";
import TButton from "../../../components/TButton";
import TTitle from "../../../components/TTitle";
import TTabs, { ComponentColumns } from "../../../components/TTabs";
import TAutoComplete from "../../../components/TAutoComplete";
import DateTime from "../../../components/DateTime";
import { Directions } from "../../../model/general";

type SurveySubjectProps = stateBase<VwSurveySubject> &
  typeof SurveySubjectStore.actionCreators &
  RouteComponentProps<{}>;
class SurveySubjectEdit extends React.PureComponent<SurveySubjectProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwSurveySubject;
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
    this.props.ChangeTab("", "SurveySubjectEdit", "SurveySubject");
  };

  public render() {
    if (this.props.edit === undefined) {
      console.log("ddddddddd");
      return null;
    }

    const columnStructure = [
      { key: "surveysubjectparameter", name: "surveysubjectparameter" },
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
                <TTitle {...{ name: "SurveySubject.EditForm" }} />
              </Col>
              <Form>
                <InputBox
                  {...{
                    name: "SurveySubject.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "SurveySubject.EditForm.Code",
                        type: typeComponent.text,
                        value: this.props.edit.code,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "SurveySubject.EditForm.Sign",
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
                        controller: "HCSurveyDomain",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcSurveyDomainId,
                        name: "SurveySubject.EditForm.HCSurveyDomainId",
                        valueName: this.props.edit.surveyDomain,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "SurveySubject.EditForm.FromDate",
                        value: this.props.edit.fromDate,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "SurveySubject.EditForm.ToDate",
                        value: this.props.edit.toDate,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "SurveySubject.EditForm.IsActive",
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
                        name: "SurveySubject.EditForm.Description",
                        type: typeComponent.textArea,
                        value: this.props.edit.description,
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
                        name: "SurveySubject.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "SurveySubject.EditForm.updater",
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
                          name: "SurveySubject.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "SurveySubject.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "SurveySubject.EditForm.BTN_Back",
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
                defaultKey: "surveysubjectparameter",
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.surveysubject,
  SurveySubjectStore.actionCreators
)(SurveySubjectEdit as any);
