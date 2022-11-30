import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as MessageStore from "../../../../store/Message";
import { Form, Row, Col, Button } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";
import { VwMessage } from "../../../../model/viewModel/VwMessage";
import { stateBase } from "../../../../model/general/stateBase";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TButton from "../../../../components/TButton";
import TAutoComplete from "../../../../components/TAutoComplete";
import TTitle from "../../../../components/TTitle";
import { Directions } from "../../../../model/general";
import TTabs, { ComponentColumns } from "../../../../components/TTabs";

type MessageProps = stateBase<VwMessage> &
  typeof MessageStore.actionCreators &
  RouteComponentProps<{}>;

class MessageEdit extends React.PureComponent<MessageProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Backward = this.Backward.bind(this);
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwMessage;
    this.props.saveData(senddata);
  };
  Backward = (event: any) => {
    // const { history } = this.props;
    // history.goBack();
    this.props.ChangeTab("", "MessageEdit", "Message");
  };

  gotoBackPage = () => {
    this.props.ChangeTab("", "MessageEdit", "Message");
  };
  public render() {
    const columnStructure = [
      { key: "messagelang", name: "messagelang" },
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
        <div className={"form-container"+Rtl} >
          <Row>
            <Col md={12} className="T-header">
              <TTitle {...{ name: "Message.EditForm" }} />
            </Col>
            <Col md={1}>
              <Button variant="outline-dark" onClick={this.Backward}>
                <FontAwesomeIcon icon={faBackward} />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form className="edit-form">
                <Row>
                  <InputBox
                    {...{
                      name: "Message.EditForm.id",
                      type: typeComponent.hidden,
                      value: this.props.edit.id,
                    }}
                  />
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Message.EditForm.Sign",
                        type: typeComponent.text,
                        value: this.props.edit.sign,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Message.EditForm.Code",
                        type: typeComponent.text,
                        value: this.props.edit.code,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        lable: "MessageType",
                        controller: "HcMessageType",
                        action: "GetHcList",
                        selectName: "sign",
                        valueId: this.props.edit.hcmessageType,
                        name: "Message.EditForm.HcmessageType",
                        valueName: this.props.edit.mtsign,
                      }}
                    />
                  </Col>
                  <Col md={6}></Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Message.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>

                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Message.EditForm.Description",
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
                        name: "Message.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "Message.EditForm.updater",
                        size: 6,
                        value: this.props.edit.updater,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={1}>
                    {this.props.saveLoading === true ? (
                      <TButton
                        {...{
                          name: "Message.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "Message.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "Message.EditForm.BTN_Back",
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
                typeForm: "message",
              }}
            />
          ) : null}
          {/* {this.props.edit.id !== "" ? (
            <div>
              <MessageLang {...{ pId: this.props.edit.id }} />
            </div>
          ) : null} */}
        </div>
        {/* <Document  {...{ parentId: this.props.edit.id }}  /> */}
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.messages, // Selects which state properties are merged into the component's props
  MessageStore.actionCreators // Selects which action creators are merged into the component's props
)(MessageEdit as any);
