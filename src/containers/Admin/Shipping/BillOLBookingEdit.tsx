import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as BillOLBookingStore from '../../../store/BillOLBooking';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwBillOLBooking } from '../../../model/viewModel/VwBillOLBooking';
import { stateBase } from '../../../model/general/stateBase';
import SelectList from '../../../components/SelectList';
import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import DateTime from '../../../components/DateTime';
import { Directions } from '../../../model/general';


type BillOLBookingProps =
    stateBase<VwBillOLBooking> & typeof BillOLBookingStore.actionCreators & RouteComponentProps<{}>;
class BillOLBookingEdit extends React.PureComponent<BillOLBookingProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwBillOLBooking;
        this.props.saveData(senddata);

    }

    getLabel = (label: string) => {
        return label;
    }
    getAccess = (label: string) => {
        return label;
    }

    gotoBackPage = () => {
        const { history } = this.props;
        history.goBack();

    }

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
                                <TTitle {...{ name: "BillOLBooking.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'BillOLBooking.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'BillOLBooking.EditForm.BillOfLadingId', type: typeComponent.hidden, value: this.props.edit.billOfLadingId ? this.props.edit.billOfLadingId : this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBooking.EditForm.Code', type: typeComponent.text, value: this.props.edit.code }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBooking.EditForm.Sign', type: typeComponent.text, value: this.props.edit.sign }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "BookingId name", valueId: this.props.edit.bookingId, valueName: this.props.edit.bookingCode, name: "BillOLBooking.EditForm.BookingId", entityName: "bookingsl" }} />
                                    </Col>
                                    <Col md={6}>
                                    <DateTime {...{ name: 'BillOLBooking.EditForm.LoadDeliveryRequestDate', value: this.props.edit.loadDeliveryRequestDate }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "ShippingRuleId name", valueId: this.props.edit.shippingRuleId, valueName: this.props.edit.shippingRuleCode, name: "BillOLBooking.EditForm.ShippingRuleId", entityName: "shiprulesl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "LoadDeliveryTTWeekDay name", valueId: this.props.edit.loadDeliveryTTWeekDay, valueName: this.props.edit.loadDeliveryTTWeekDaySign, name: "BillOLBooking.EditForm.LoadDeliveryTTWeekDay", entityName: "loaddeliveryttweekdaysl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "DestContactId name", valueId: this.props.edit.destContactId, valueName: this.props.edit.destContactSign, name: "BillOLBooking.EditForm.DestContactId", entityName: "contactperson" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBooking.EditForm.DestRecipientName', type: typeComponent.textArea, value: this.props.edit.destRecipientName }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBooking.EditForm.DestRecipientMobile', type: typeComponent.text, value: this.props.edit.destRecipientMobile }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBooking.EditForm.DestLatitude', type: typeComponent.number, value: this.props.edit.destLatitude }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBooking.EditForm.DestLongitude', type: typeComponent.number, value: this.props.edit.destLongitude }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBooking.EditForm.FullAddress', type: typeComponent.textArea, value: this.props.edit.fullAddress }} />
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "OrigContactId name", valueId: this.props.edit.origContactId, valueName: this.props.edit.origContactSign, name: "BillOLBooking.EditForm.OrigContactId", entityName: "contactperson" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBooking.EditForm.OrigRecipientName', type: typeComponent.textArea, value: this.props.edit.origRecipientName }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBooking.EditForm.OrigRecipientMobile', type: typeComponent.text, value: this.props.edit.origRecipientMobile }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBooking.EditForm.OrigLatitude', type: typeComponent.number, value: this.props.edit.origLatitude }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBooking.EditForm.OrigLongitude', type: typeComponent.number, value: this.props.edit.origLongitude }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBooking.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBooking.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "DeliveryRangeTimeId name", valueId: this.props.edit.deliveryRangeTimeId, valueName: this.props.edit.deliveryRangeTimeSign, name: "BillOLBooking.EditForm.DeliveryRangeTimeId", entityName: "deliveryrangetimesl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBooking.EditForm.ExpressDelivery', type: typeComponent.check, value: this.props.edit.expressDelivery }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "BillOLBooking.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "BillOLBooking.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "BillOLBooking.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.billolbooking,
    BillOLBookingStore.actionCreators
)(BillOLBookingEdit as any);