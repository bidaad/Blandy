import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../store";
import * as LoadDeliveryTimeTitleStore from "../../../store/LoadDeliveryTimeTitle";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../components/InputBox";
import { typeComponent } from "../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../helper/serialize";
import { VwLoadDeliveryTimeTitle } from "../../../model/viewModel/VwLoadDeliveryTimeTitle";
import { stateBase } from "../../../model/general/stateBase";
import TButton from "../../../components/TButton";
import DateTime from "../../../components/DateTime";
import Time from "../../../components/Time";
import TTitle from "../../../components/TTitle";
import { Directions } from "../../../model/general";

type LoadDeliveryTimeTitleProps = stateBase<VwLoadDeliveryTimeTitle> &
  typeof LoadDeliveryTimeTitleStore.actionCreators &
  RouteComponentProps<{}> & {closeModal:any};
class LoadDeliveryTimeTitleEdit extends React.PureComponent<LoadDeliveryTimeTitleProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwLoadDeliveryTimeTitle;
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
              {/* <Col md={12} className="T-header">
                                <TTitle {...{ name: "LoadDeliveryTimeTitle.EditForm" }} />
                            </Col> */}
              <Form>
                <InputBox
                  {...{
                    name: "LoadDeliveryTimeTitle.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <InputBox
                  {...{
                    name: "LoadDeliveryTimeTitle.EditForm.DepId",
                    type: typeComponent.hidden,
                    value: this.props.edit.depId
                      ? this.props.edit.depId
                      : this.props.edit.parentId,
                  }}
                />

                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "LoadDeliveryTimeTitle.EditForm.Sign",
                        type: typeComponent.text,
                        value: this.props.edit.sign,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "LoadDeliveryTimeTitle.EditForm.Code",
                        type: typeComponent.text,
                        value: this.props.edit.code,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "LoadDeliveryTimeTitle.EditForm.FromDate",
                        value: this.props.edit.fromDate,
                        timePicker: false,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "LoadDeliveryTimeTitle.EditForm.ToDate",
                        value: this.props.edit.toDate,
                        timePicker: false,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Time
                      {...{
                        name: "LoadDeliveryTimeTitle.EditForm.fromTime",
                        value: this.props.edit.fromTime,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <Time
                      {...{
                        name: "LoadDeliveryTimeTitle.EditForm.toTime",
                        value: this.props.edit.toTime,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "LoadDeliveryTimeTitle.EditForm.Description",
                        type: typeComponent.textArea,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>

                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "LoadDeliveryTimeTitle.EditForm.IsActive",
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
                        name: "LoadDeliveryTimeTitle.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "LoadDeliveryTimeTitle.EditForm.updater",
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
                          name: "LoadDeliveryTimeTitle.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "LoadDeliveryTimeTitle.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "LoadDeliveryTimeTitle.EditForm.BTN_Back",
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
  (state: ApplicationState) => state.loaddeliverytimetitle,
  LoadDeliveryTimeTitleStore.actionCreators
)(LoadDeliveryTimeTitleEdit as any);
