import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../store";
import * as GuaranteeStore from "../../../store/Guarantee";
import * as GuaranteeDepStore from "../../../store/GuaranteeDep";
import * as GuaranteeAssetStore from "../../../store/GuaranteeAsset";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../components/InputBox";
import { typeComponent } from "../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../helper/serialize";
import { VwGuarantee } from "../../../model/viewModel/VwGuarantee";
import { stateBase } from "../../../model/general/stateBase";
import SelectList from "../../../components/SelectList";
import TButton from "../../../components/TButton";
import TAutoComplete from "../../../components/TAutoComplete";
import DateTime from "../../../components/DateTime";
import TTitle from "../../../components/TTitle";
import { Directions } from "../../../model/general";
import TTabs, { ComponentColumns } from "../../../components/TTabs";

type GuaranteeProps = stateBase<VwGuarantee> &
  typeof GuaranteeStore.actionCreators &
  RouteComponentProps<{}> & {
    closeModal: any;
    refreshGrid: any;
    parentId: string;
    typeForm?: string;
  };
class GuaranteeEdit extends React.PureComponent<GuaranteeProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwGuarantee;
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
    // this.props.ChangeTab("", "GuaranteeEdit", "Guarantee");
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
              {/* <Col md={12} className="T-header">
                                <TTitle {...{ name: "Guarantee.EditForm" }} />
                            </Col> */}
              <Form>
                <InputBox
                  {...{
                    name: "Guarantee.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "Guarantee.EditForm.FromDate",
                        value: this.props.edit.fromDate,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "Guarantee.EditForm.ToDate",
                        value: this.props.edit.toDate,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Guarantee.EditForm.Code",
                        type: typeComponent.text,
                        value: this.props.edit.code,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Guarantee.EditForm.Sign",
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
                        controller: "HCGuaranteeType",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcguaranteeTypeId,
                        name: "Guarantee.EditForm.HCGuaranteeTypeId",
                        valueName: this.props.edit.guaranteeTypeSign,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    {this.props.typeForm === "dep" ? (
                      <InputBox
                        {...{
                          name: "Guarantee.EditForm.GuaranteeDepId",
                          type: typeComponent.hidden,
                          value: this.props.edit.guaranteeDepId
                            ? this.props.edit.guaranteeDepId
                            : this.props.edit.parentId,
                        }}
                      />
                    ) : this.props.typeForm === "product" ? (
                      <InputBox
                        {...{
                          name: "Guarantee.EditForm.ProductId",
                          type: typeComponent.hidden,
                          value: this.props.edit.ProductId
                            ? this.props.edit.ProductId
                            : this.props.edit.parentId,
                        }}
                      />
                    ) : this.props.typeForm === "asset" ? (
                      <InputBox
                        {...{
                          name: "Guarantee.EditForm.assetId",
                          type: typeComponent.hidden,
                          value: this.props.edit.assetId
                            ? this.props.edit.assetId
                            : this.props.edit.parentId,
                        }}
                      />
                    ) : (
                      <SelectList
                        {...{
                          label: "GuaranteeDepId name",
                          valueId: this.props.edit.guaranteeDepId,
                          valueName: this.props.edit.departmentSign,
                          name: "Guarantee.EditForm.GuaranteeDepId",
                          entityName: "departmentsl",
                        }}
                      />
                    )}
                  </Col>
                </Row>

                {this.props.typeForm !== "dep" &&
                this.props.typeForm !== "product" &&
                this.props.typeForm !== "asset" ? (
                  <Row>
                    <Col md={6}>
                      <SelectList
                        {...{
                          label: "ProductId name",
                          valueId: this.props.edit.productId,
                          valueName: this.props.edit.productSign,
                          name: "Guarantee.EditForm.ProductId",
                          entityName: "productsl",
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <SelectList
                        {...{
                          label: "AssetId name",
                          valueId: this.props.edit.assetId,
                          valueName: this.props.edit.assetSign,
                          name: "Guarantee.EditForm.AssetId",
                          entityName: "assetsl",
                        }}
                      />
                    </Col>
                  </Row>
                ) : null}

                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Guarantee.EditForm.ToUsage",
                        type: typeComponent.number,
                        value: this.props.edit.toUsage,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCUnit",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.unitId,
                        name: "Guarantee.EditForm.UnitId",
                        valueName: this.props.edit.unitSign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Guarantee.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Guarantee.EditForm.Description",
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
                        name: "Guarantee.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "Guarantee.EditForm.updater",
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
                          name: "Guarantee.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "Guarantee.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "Guarantee.EditForm.BTN_Back",
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
                typeForm: "guarantee",
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.guarantee,
  GuaranteeStore.actionCreators
)(GuaranteeEdit as any);

class GuaranteeEditClass extends GuaranteeEdit {}

export const GuaranteeDepEdit = connect(
  (state: ApplicationState) => state.guaranteedep,
  GuaranteeDepStore.actionCreators
)(GuaranteeEditClass as any);

class GuaranteeAssetEditClass extends GuaranteeEdit {}

export const GuaranteeAssetEdit = connect(
  (state: ApplicationState) => state.guaranteeasset,
  GuaranteeAssetStore.actionCreators
)(GuaranteeAssetEditClass as any);
