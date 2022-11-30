import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../store";
import * as CurrencyExchangeStore from "../../../store/CurrencyExchange";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../components/InputBox";
import { typeComponent } from "../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../helper/serialize";
import { VwCurrencyExchange } from "../../../model/viewModel/VwCurrencyExchange";
import { stateBase } from "../../../model/general/stateBase";
import SelectList from "../../../components/SelectList";
import TButton from "../../../components/TButton";
import TTitle from "../../../components/TTitle";
import TAutoComplete from "../../../components/TAutoComplete";
import DateTime from "../../../components/DateTime";
import { Directions } from "../../../model/general";

type CurrencyExchangeProps = stateBase<VwCurrencyExchange> &
  typeof CurrencyExchangeStore.actionCreators &
  RouteComponentProps<{}>;
class CurrencyExchangeEdit extends React.PureComponent<CurrencyExchangeProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwCurrencyExchange;
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
    this.props.ChangeTab("", "CurrencyExchangeEdit", "CurrencyExchange");
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
              <Col md={12} className="T-header">
                <TTitle {...{ name: "CurrencyExchange.EditForm" }} />
              </Col>
              <Form>
                <InputBox
                  {...{
                    name: "CurrencyExchange.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "DepId name",
                        valueId: this.props.edit.depId,
                        valueName: this.props.edit.departmentSign,
                        name: "CurrencyExchange.EditForm.DepId",
                        entityName: "departmentsl",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "RefrenceDepId name",
                        valueId: this.props.edit.refrenceDepId,
                        valueName: this.props.edit.refrenceDepSign,
                        name: "CurrencyExchange.EditForm.RefrenceDepId",
                        entityName: "departmentsl",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCCurrency",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.firstCurrencyId,
                        name: "CurrencyExchange.EditForm.FirstCurrencyId",
                        valueName: this.props.edit.firstCurreency,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCCurrency",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.secondCurrencySign,
                        name: "CurrencyExchange.EditForm.SecondCurrencyId",
                        valueName: this.props.edit.secondCurrency,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "CurrencyExchange.EditForm.Rate",
                        type: typeComponent.number,
                        value: this.props.edit.rate,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "CurrencyExchange.EditForm.Time",
                        value: this.props.edit.time,
                        timePicker: true,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "CurrencyExchange.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "CurrencyExchange.EditForm.Description",
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
                        name: "CurrencyExchange.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "CurrencyExchange.EditForm.updater",
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
                          name: "CurrencyExchange.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "CurrencyExchange.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "CurrencyExchange.EditForm.BTN_Back",
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
  (state: ApplicationState) => state.currencyexchange,
  CurrencyExchangeStore.actionCreators
)(CurrencyExchangeEdit as any);
