import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as ZoneHardConditionStore from "../../../../store/ZoneHardCondition";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";
import { VwZoneHardCondition } from "../../../../model/viewModel/VwZoneHardCondition";
import { stateBase } from "../../../../model/general/stateBase";
import TButton from "../../../../components/TButton";
import TAutoComplete from "../../../../components/TAutoComplete";
import SelectList from "../../../../components/SelectList";
import DateTime from "../../../../components/DateTime";
import { Directions } from "../../../../model/general";

type ZoneHardConditionProps = stateBase<VwZoneHardCondition> &
  typeof ZoneHardConditionStore.actionCreators &
  RouteComponentProps<{}> & {
    closeModal: any;
    refreshGrid: any;
    parentId: string;
  };
class ZoneHardConditionEdit extends React.PureComponent<ZoneHardConditionProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwZoneHardCondition;
    if ((senddata as any).ID) {
      this.props.saveData(senddata);
    } else {
      this.props.saveData(senddata);
      this.props.closeModal();
    }
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
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col md={12} className={"form-container"+Rtl} >
              
              <Form>
                <InputBox
                  {...{
                    name: "ZoneHardCondition.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <InputBox {...{ name: 'ZoneHardCondition.EditForm.ZoneId', type: typeComponent.hidden, value: this.props.edit.depId?this.props.edit.depId:this.props.edit.parentId }} />
                <Row>
                  <Col md={6}>
                  <SelectList {...{ label: "ZoneId name", valueId: this.props.edit.zoneId, valueName: this.props.edit.zoneSign, name: "ZoneHardCondition.EditForm.ZoneId", entityName: "zonesl" }} />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCHardCondition",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hchardConditionId,
                        name: "ZoneHardCondition.EditForm.HCHardConditionId",
                        valueName: this.props.edit.hcHardConditionSign,
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "ZoneHardCondition.EditForm.FromDate",
                        type: typeComponent.text,
                        value: this.props.edit.fromDate,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "ZoneHardCondition.EditForm.ToDate",
                        type: typeComponent.text,
                        value: this.props.edit.toDate,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ZoneHardCondition.EditForm.Temprature",
                        type: typeComponent.number,
                        value: this.props.edit.temprature,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ZoneHardCondition.EditForm.Dust",
                        type: typeComponent.number,
                        value: this.props.edit.dust,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ZoneHardCondition.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ZoneHardCondition.EditForm.Description",
                        type: typeComponent.text,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "ZoneHardCondition.EditForm.BTN_Save",
                        submit: this.handleSubmit,
                      }}
                    />
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "ZoneHardCondition.EditForm.BTN_Back",
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
  (state: ApplicationState) => state.zonehardcondition,
  ZoneHardConditionStore.actionCreators
)(ZoneHardConditionEdit as any);
