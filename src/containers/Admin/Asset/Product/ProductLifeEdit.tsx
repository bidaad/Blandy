import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as ProductLifeStore from "../../../../store/ProductLife";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";
import { VwProductLife } from "../../../../model/viewModel/VwProductLife";
import { stateBase } from "../../../../model/general/stateBase";
import SelectList from "../../../../components/SelectList";
import TButton from "../../../../components/TButton";
import TAutoComplete from "../../../../components/TAutoComplete";
import { Directions } from "../../../../model/general";

type ProductLifeProps = stateBase<VwProductLife> &
  typeof ProductLifeStore.actionCreators &
  RouteComponentProps<{}>;
class ProductLifeEdit extends React.PureComponent<ProductLifeProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwProductLife;
    this.props.saveData(senddata);
  }

  getLabel = (label: string) => {
    return label;
  };
  getAccess = (label: string) => {
    return label;
  };

  gotoBackPage = () => {
    const { history } = this.props;
    history.goBack();
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
            <Col md={12} className={"form-container" + Rtl}>
              {/* <Col md={12} className="T-header">
                                <TTitle {...{ name: "ProductLife.EditForm" }} />
                            </Col> */}
              <Form>
                <InputBox
                  {...{
                    name: "ProductLife.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ProductLife.EditForm.Sign",
                        type: typeComponent.text,
                        value: this.props.edit.sign,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "ProductId name",
                        valueId: this.props.edit.productId,
                        valueName: this.props.edit.productSign,
                        name: "ProductLife.EditForm.ProductId",
                        entityName: "productsl",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "UseOnProductId name",
                        valueId: this.props.edit.useOnProductId,
                        valueName: this.props.edit.useOnProductSign,
                        name: "ProductLife.EditForm.UseOnProductId",
                        entityName: "useonproduct",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCPlanTitle",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcplanTitleId,
                        name: "ProductLife.EditForm.HCPlanTitleId",
                        valueName: this.props.edit.hcplanTitlesign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ProductLife.EditForm.Value",
                        type: typeComponent.number,
                        value: this.props.edit.value,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ProductLife.EditForm.PositiveTolerance",
                        type: typeComponent.number,
                        value: this.props.edit.positiveTolerance,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ProductLife.EditForm.NegativeTolerance",
                        type: typeComponent.number,
                        value: this.props.edit.negativeTolerance,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCUnit",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcunitId,
                        name: "ProductLife.EditForm.HCUnitId",
                        valueName: this.props.edit.hcunitsign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ProductLife.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "ProductLife.EditForm.Description",
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
                        name: "ProductLife.EditForm.BTN_Save",
                        submit: this.handleSubmit,
                      }}
                    />
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "ProductLife.EditForm.BTN_Back",
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
  (state: ApplicationState) => state.productlife,
  ProductLifeStore.actionCreators
)(ProductLifeEdit as any);
