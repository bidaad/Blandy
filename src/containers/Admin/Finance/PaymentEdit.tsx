import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../store";
import * as PaymentStore from "../../../store/Payment";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../components/InputBox";
import { typeComponent } from "../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../helper/serialize";
import { VwPayment } from "../../../model/viewModel/VwPayment";
import { stateBase } from "../../../model/general/stateBase";
import SelectList from "../../../components/SelectList";
import TButton from "../../../components/TButton";
import TTitle from "../../../components/TTitle";
import TAutoComplete from "../../../components/TAutoComplete";
import DateTime from "../../../components/DateTime";
import { Directions } from "../../../model/general";
import TTabs, { ComponentColumns } from "../../../components/TTabs";

type PaymentProps = stateBase<VwPayment> &
  typeof PaymentStore.actionCreators &
  RouteComponentProps<{}> &{closeModal:any};
class PaymentEdit extends React.PureComponent<PaymentProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwPayment;
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

		this.props.ChangeTab('','PaymentEdit','Payment');
    // this.props.closeModal();
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
              <Col md={12} className="T-header">
                <TTitle {...{ name: "Payment.EditForm" }} />
              </Col>
              <Form>
                <InputBox
                  {...{
                    name: "Payment.EditForm.ID",
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
                        name: "Payment.EditForm.DepId",
                        entityName: "departmentsl",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "UserId name",
                        valueId: this.props.edit.userId,
                        valueName: this.props.edit.userFullName,
                        name: "Payment.EditForm.UserId",
                        entityName: "usersl",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "BankId name",
                        valueId: this.props.edit.bankId,
                        valueName: this.props.edit.bankSign,
                        name: "Payment.EditForm.BankId",
                        entityName: "departmentsl",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Payment.EditForm.ReferenceCode",
                        type: typeComponent.text,
                        value: this.props.edit.referenceCode,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "BookingId name",
                        valueId: this.props.edit.bookingId,
                        valueName: this.props.edit.bookingSign,
                        name: "Payment.EditForm.BookingId",
                        entityName: "bookingsl",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "Payment.EditForm.Time",
                        value: this.props.edit.time,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCpaymentType",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcpaymentTypeId,
                        name: "Payment.EditForm.HCpaymentTypeId",
                        valueName: this.props.edit.paymentTypeSign,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCPaymentStatus",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcpaymentStatusId,
                        name: "Payment.EditForm.HCPaymentStatusId",
                        valueName: this.props.edit.paymentStatusSign,
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
                        valueId: this.props.edit.hccurrencyId,
                        name: "Payment.EditForm.HCCurrencyId",
                        valueName: this.props.edit.currencySign,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Payment.EditForm.Detail",
                        type: typeComponent.textArea,
                        value: this.props.edit.detail,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Payment.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Payment.EditForm.Description",
                        type: typeComponent.textArea,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "AccountId name",
                        valueId: this.props.edit.accountId,
                        valueName: this.props.edit.accountSign,
                        name: "Payment.EditForm.AccountId",
                        entityName: "accountsl",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Payment.EditForm.Debt",
                        type: typeComponent.number,
                        value: this.props.edit.debt,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Payment.EditForm.Credit",
                        type: typeComponent.number,
                        value: this.props.edit.credit,
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
                        name: "Payment.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "Payment.EditForm.updater",
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
                          name: "Payment.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "Payment.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "Payment.EditForm.BTN_Back",
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
                typeForm: "payment",
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.payment,
  PaymentStore.actionCreators
)(PaymentEdit as any);
