import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../store";
import * as ShipRuleStore from "../../../store/ShipRule";
import * as ShipRuleDepStore from "../../../store/ShipRuleDep";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../components/InputBox";
import { typeComponent } from "../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../helper/serialize";
import { VwShipRule } from "../../../model/viewModel/VwShipRule";
import { stateBase } from "../../../model/general/stateBase";
import SelectList from "../../../components/SelectList";
import TButton from "../../../components/TButton";
import TAutoComplete from "../../../components/TAutoComplete";
import DateTime from "../../../components/DateTime";
import TTitle from "../../../components/TTitle";
import { Directions } from "../../../model/general";
import TTabs, { ComponentColumns } from "../../../components/TTabs";

type ShipRuleProps = stateBase<VwShipRule> &
  typeof ShipRuleStore.actionCreators &
  RouteComponentProps<{}> & {
    closeModal: any;
    refreshGrid: any;
    parentId: string;
    typeForm?: string;
  };
class ShipRuleEdit extends React.PureComponent<ShipRuleProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwShipRule;
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
    // const { history } = this.props;
    // history.goBack();
        this.props.closeModal();
  };

  public render() {
    const columnStructure2 = [
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
              <Form>
                <InputBox
                  {...{
                    name: "ShipRule.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ShipRule.EditForm.Code",
                        type: typeComponent.text,
                        value: this.props.edit.code,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    {this.props.typeForm === "dep" ? (
                      <InputBox
                        {...{
                          name: "ShipRule.EditForm.DepId",
                          type: typeComponent.hidden,
                          value: this.props.edit.depId
                            ? this.props.edit.depId
                            : this.props.edit.parentId,
                        }}
                      />
                    ) : (
                      <SelectList
                        {...{
                          label: "Department name",
                          valueId: this.props.edit.depId,
                          valueName: this.props.edit.departmentSign,
                          name: "ShipRule.EditForm.DepId",
                          entityName: "departmentsl",
                        }}
                      />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "ShipRule.EditForm.FromDate",
                        type: typeComponent.text,
                        value: this.props.edit.fromDate,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "ShipRule.EditForm.ToDate",
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
                        name: "ShipRule.EditForm.Sign",
                        type: typeComponent.text,
                        value: this.props.edit.sign,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HcshipType",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcshipTypeId,
                        name: "ShipRule.EditForm.HcshipTypeId",
                        valueName: this.props.edit.shipTypeSign,
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ShipRule.EditForm.FromDistance",
                        type: typeComponent.number,
                        value: this.props.edit.fromDistance,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ShipRule.EditForm.ToDistance",
                        type: typeComponent.number,
                        value: this.props.edit.toDistance,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ShipRule.EditForm.FromLoadWeight",
                        type: typeComponent.number,
                        value: this.props.edit.fromLoadWeight,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ShipRule.EditForm.ToLoadWeight",
                        type: typeComponent.number,
                        value: this.props.edit.toLoadWeight,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ShipRule.EditForm.FromLoadPrice",
                        type: typeComponent.number,
                        value: this.props.edit.fromLoadPrice,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ShipRule.EditForm.ToLoadPrice",
                        type: typeComponent.number,
                        value: this.props.edit.toLoadPrice,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ShipRule.EditForm.FromLoadVolume",
                        type: typeComponent.number,
                        value: this.props.edit.fromLoadVolume,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ShipRule.EditForm.ToLoadVolume",
                        type: typeComponent.number,
                        value: this.props.edit.toLoadVolume,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "Category name",
                        valueId: this.props.edit.categoryId,
                        valueName: this.props.edit.categorysign,
                        name: "ShipRule.EditForm.CategoryId",
                        entityName: "categorysl",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "Zone name",
                        valueId: this.props.edit.zoneId,
                        valueName: this.props.edit.zoneSign,
                        name: "ShipRule.EditForm.ZoneId",
                        entityName: "zonesl",
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "Product name",
                        valueId: this.props.edit.productId,
                        valueName: this.props.edit.productSign,
                        name: "ShipRule.EditForm.ProductId",
                        entityName: "productsl",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "Asset name",
                        valueId: this.props.edit.assetId,
                        valueName: this.props.edit.assetSign,
                        name: "ShipRule.EditForm.AssetId",
                        entityName: "assetsl",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ShipRule.EditForm.FixPrice",
                        type: typeComponent.number,
                        value: this.props.edit.fixPrice,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ShipRule.EditForm.LoadPricePercent",
                        type: typeComponent.number,
                        value: this.props.edit.loadPricePercent,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ShipRule.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ShipRule.EditForm.Description",
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
                        name: "ShipRule.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "ShipRule.EditForm.updater",
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
                          name: "ShipRule.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "ShipRule.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "ShipRule.EditForm.BTN_Back",
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
                component: columnStructure2,
                editId: this.props.edit.id,
                defaultKey: columnStructure2[0].key,
                typeForm: "zone",
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.shiprule,
  ShipRuleStore.actionCreators
)(ShipRuleEdit as any);

class ShipRuleDepEditClass extends ShipRuleEdit {}

export const ShipRuleDepEdit = connect(
  (state: ApplicationState) => state.shipruledep,
  ShipRuleDepStore.actionCreators
)(ShipRuleDepEditClass as any);
