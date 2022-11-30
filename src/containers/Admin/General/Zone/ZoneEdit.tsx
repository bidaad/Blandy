import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as ZoneStore from "../../../../store/Zone";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";
import { VwZone } from "../../../../model/viewModel/VwZone";
import { stateBase } from "../../../../model/general/stateBase";
import SelectList from "../../../../components/SelectList";

//import ZoneLang from './ZoneLang';
import TButton from "../../../../components/TButton";
import TTitle from "../../../../components/TTitle";
import TAutoComplete from "../../../../components/TAutoComplete";
import { Directions } from "../../../../model/general";
import TTabs, { ComponentColumns } from "../../../../components/TTabs";

type ZoneProps = stateBase<VwZone> &
  typeof ZoneStore.actionCreators &
  RouteComponentProps<{}>;
class ZoneEdit extends React.PureComponent<ZoneProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    console.log(1);

    const senddata = convertToObject(sdata) as VwZone;
    console.log(2);
    this.props.saveData(senddata);
    console.log(3);
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
    this.props.ChangeTab("", "zonelangedit", "Zone");
  };

  public render() {
    const columnStructure2 = [
      { key: "zonelang", name: "zonelang" },
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
                <TTitle {...{ name: "Zone.EditForm" }} />
              </Col>
              <Form className="edit-form">
                <InputBox
                  {...{
                    name: "Zone.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Zone.EditForm.code",
                        type: typeComponent.text,
                        value: this.props.edit.code,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Zone.EditForm.sign",
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
                        label: "Zone name",
                        valueId: this.props.edit.parentId,
                        valueName: this.props.edit.parentSign,
                        name: "Zone.EditForm.ParentId",
                        entityName: "zonesl",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Zone.EditForm.telCode",
                        type: typeComponent.text,
                        value: this.props.edit.telCode,
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCZoneType",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hczoneTypeId,
                        name: "Zone.EditForm.HCZoneTypeId",
                        valueName: this.props.edit.zoneTypeSign,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Zone.EditForm.ISOCode1",
                        type: typeComponent.text,
                        value: this.props.edit.isocode1,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Zone.EditForm.ISOCode2",
                        type: typeComponent.text,
                        value: this.props.edit.isocode2,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Zone.EditForm.ISOCode3",
                        type: typeComponent.text,
                        value: this.props.edit.isocode3,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Zone.EditForm.Latitude",
                        type: typeComponent.number,
                        value: this.props.edit.latitude,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Zone.EditForm.Longitude",
                        type: typeComponent.number,
                        value: this.props.edit.longitude,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Zone.EditForm.PostCode",
                        type: typeComponent.text,
                        value: this.props.edit.postCode,
                      }}
                    />
                  </Col>
                  <Col md={6}></Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Zone.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>

                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Zone.EditForm.Description",
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
                        name: "Zone.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "Zone.EditForm.updater",
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
                          name: "Zone.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "Zone.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "Zone.EditForm.BTN_Back",
                        variant: "outline-info",
                        submit: this.gotoBackPage,
                      }}
                    />
                  </Col>
                  <Col></Col>
                  {/* <button className="btn btn-primary m-2" type="submit">Save</button> */}
                  {/* <Button onClick={this.gotoBackPage} variant="outline-info" className=" m-2" >Back</Button> */}
                </Row>
              </Form>
            </Col>
          </Row>
          {this.props.edit.id !== "" ? (
            <TTabs
              {...{
                component: columnStructure2,
                editId: this.props.edit.id,
                defaultKey: columnStructure2[0].key,
                typeForm: "zone",
              }}
            />
          ) : null}
          {/* {this.props.edit.id !== '' ?
                        <div>
                            <Document  {...{ pId: this.props.edit.id }} />
                            <ZoneCategory  {...{ pId: this.props.edit.id }} />
                            <ZoneAttribute  {...{ pId: this.props.edit.id }} />
                        </div>
                        : null} */}
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.zones,
  ZoneStore.actionCreators
)(ZoneEdit as any);
