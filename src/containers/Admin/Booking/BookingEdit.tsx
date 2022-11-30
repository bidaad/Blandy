import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../store";
import * as BookingStore from "../../../store/Booking";
import * as BookingForAssetStore from "../../../store/BookingForAsset";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../components/InputBox";
import { typeComponent } from "../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../helper/serialize";
import { VwBooking } from "../../../model/viewModel/VwBooking";
import { stateBase } from "../../../model/general/stateBase";
import SelectList from "../../../components/SelectList";
import TButton from "../../../components/TButton";
import TTitle from "../../../components/TTitle";
import TTabs, { ComponentColumns } from "../../../components/TTabs";
import TAutoComplete from "../../../components/TAutoComplete";
import DateTime from "../../../components/DateTime";
import { Directions } from "../../../model/general";

type BookingProps = stateBase<VwBooking> &
  typeof BookingStore.actionCreators &
  RouteComponentProps<{}> & { closeModal: any };
class BookingEdit extends React.PureComponent<BookingProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwBooking;
    this.props.saveData(senddata);
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
    const columnStructure = [
      { key: "bookingasset", name: "bookingasset" },
      { key: "bookingwork", name: "bookingwork" },
      { key: "bookingreturn", name: "bookingreturn" },
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
            <Col md={12} className={"form-container" + Rtl}>
              <Col md={12} className="T-header">
                <TTitle {...{ name: "Booking.EditForm" }} />
              </Col>
              <Col md={12} className="T-header">
                <Row>
                  <Col md={3}>
                    <TTitle
                      {...{
                        name: "Booking.EditForm.personName",
                        value: this.props.edit.personName,
                        size: 6,
                      }}
                    />
                  </Col>
                  <Col md={3}>
                    <TTitle
                      {...{
                        name: "Booking.EditForm.bookingStatusSign",
                        value: this.props.edit.bookingStatusSign,
                        size: 6,
                      }}
                    />
                  </Col>
                  <Col md={3}>
                    <TTitle
                      {...{
                        name: "Booking.EditForm.shipStatus",
                        value: this.props.edit.shipStatus,
                        size: 6,
                      }}
                    />
                  </Col>
                  <Col md={3}>
                    <TTitle
                      {...{
                        name: "Booking.EditForm.paymentStatus",
                        value: this.props.edit.paymentStatus,
                        size: 6,
                      }}
                    />
                  </Col>
                </Row>
                {/* <Row>
                <Col md={3}>
                    <TTitle
                      {...{
                        name: "Booking.EditForm.personMobile",
                        value: this.props.edit.personMobile,
                        size: 6,
                      }}
                    />
                  </Col>
                  <Col md={3}>
                    <TTitle
                      {...{
                        name: "Booking.EditForm.personNationalCode",
                        value: this.props.edit.personNationalCode,
                        size: 6,
                      }}
                    />
                  </Col>
                  <Col md={3}>
                  </Col>
                  <Col md={3}>
                  </Col>
                  </Row> */}
              </Col>
              <Form>
                <InputBox
                  {...{
                    name: "Booking.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Booking.EditForm.Code",
                        type: typeComponent.text,
                        value: this.props.edit.code,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "User",
                        valueId: this.props.edit.userId,
                        valueName: this.props.edit.nikName,
                        name: "Booking.EditForm.UserId",
                        entityName: "usersl",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "Booking.EditForm.Time",
                        value: this.props.edit.time,
                        timePicker: true,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCBookingStatus",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcbookingStatusId,
                        name: "Booking.EditForm.HCBookingStatusId",
                        valueName: this.props.edit.bookingStatusSign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}></Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Booking.EditForm.TotalAmount",
                        type: typeComponent.number,
                        value: this.props.edit.totalAmount,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Booking.EditForm.Discount",
                        type: typeComponent.number,
                        value: this.props.edit.discount,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Booking.EditForm.Tax",
                        type: typeComponent.number,
                        value: this.props.edit.tax,
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
                        name: "Booking.EditForm.HCCurrencyId",
                        valueName: this.props.edit.hccurrencysign,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Booking.EditForm.TempBooking",
                        type: typeComponent.check,
                        value: this.props.edit.tempBooking,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Booking.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Booking.EditForm.Description",
                        type: typeComponent.textArea,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Booking.EditForm.AssetAmountSum",
                        type: typeComponent.number,
                        value: this.props.edit.assetAmountSum,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Booking.EditForm.ShippingAmountSum",
                        type: typeComponent.number,
                        value: this.props.edit.shippingAmountSum,
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
                        name: "Booking.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "Booking.EditForm.updater",
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
                          name: "Booking.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "Booking.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "Booking.EditForm.BTN_Back",
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
                defaultKey: "bookingasset",
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.booking,
  BookingStore.actionCreators
)(BookingEdit as any);

class BookingForAssetEditClass extends BookingEdit {}

export const BookingForAssetEdit = connect(
  (state: ApplicationState) => state.bookingforasset,
  BookingForAssetStore.actionCreators
)(BookingForAssetEditClass as any);
