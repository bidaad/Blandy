import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as BookingReturnStore from '../../../store/BookingReturn';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwBookingReturn } from '../../../model/viewModel/VwBookingReturn';
import { stateBase } from '../../../model/general/stateBase';
import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import TAutoComplete from '../../../components/TAutoComplete';
import SelectList from '../../../components/SelectList';
import DateTime from '../../../components/DateTime';
import { Directions } from '../../../model/general';


type BookingReturnProps =
    stateBase<VwBookingReturn> & typeof BookingReturnStore.actionCreators & RouteComponentProps<{}> & { closeModal: any, refreshGrid: any, parentId: string };
class BookingReturnEdit extends React.PureComponent<BookingReturnProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwBookingReturn;
        if (((senddata) as any).ID) {
            this.props.saveData(senddata);
        }
        else {
            this.props.saveData(senddata);
            this.props.closeModal();
        }

    }

    getLabel = (label: string) => {
        return label;
    }
    getAccess = (label: string) => {
        return label;
    }

    gotoBackPage = () => {
        this.props.closeModal();

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
                                <TTitle {...{ name: "BookingReturn.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'BookingReturn.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'BookingReturn.EditForm.BookingId', type: typeComponent.hidden, value: this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        
                                    </Col>
                                    <Col md={6}>
                                        {this.props.edit.bookingAssetSign}
                                    </Col>
                                </Row>                                
                                <Row>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'BookingReturn.EditForm.ReturnDate', type: typeComponent.text, value: this.props.edit.returnDate }} />
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "ReturnerUserId name", valueId: this.props.edit.returnerUserId, valueName: this.props.edit.returnUserSign, name: "BookingReturn.EditForm.ReturnerUserId", entityName: "usersl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BookingReturn.EditForm.ReturnerUserReason', type: typeComponent.text, value: this.props.edit.returnerUserReason }} />
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "ExpertUserId name", valueId: this.props.edit.expertUserId, valueName: this.props.edit.expertUserSign, name: "BookingReturn.EditForm.ExpertUserId", entityName: "usersl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BookingReturn.EditForm.ExpertComment', type: typeComponent.text, value: this.props.edit.expertComment }} />
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCBookingReturnStatus", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcbookingReturnStatusId, name: "BookingReturn.EditForm.HCBookingReturnStatusId", valueName: this.props.edit.hcBookingReturnStatusSign }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BookingReturn.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BookingReturn.EditForm.Description', type: typeComponent.text, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                        <TButton {...{ name: "BookingReturn.EditForm.BTN_Save", submit: this.handleSubmit }} />
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "BookingReturn.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.bookingreturn,
    BookingReturnStore.actionCreators
)(BookingReturnEdit as any);