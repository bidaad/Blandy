import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as BookingWorkStore from '../../../store/BookingWork';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwBookingWork } from '../../../model/viewModel/VwBookingWork';
import { stateBase } from '../../../model/general/stateBase';
import SelectList from '../../../components/SelectList';
import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import TAutoComplete from '../../../components/TAutoComplete';
import { Directions } from '../../../model/general';


type BookingWorkProps =
    stateBase<VwBookingWork> & typeof BookingWorkStore.actionCreators & RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };
class BookingWorkEdit extends React.PureComponent<BookingWorkProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwBookingWork;
        this.props.saveData(senddata);

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
                                <TTitle {...{ name: "BookingWork.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'BookingWork.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'BookingAsset.EditForm.BookingId', type:typeComponent.hidden, value:this.props.edit.bookingId?this.props.edit.bookingId:this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "WorkOrderId name", valueId: this.props.edit.workOrderId, valueName: this.props.edit.code, name: "BookingWork.EditForm.WorkOrderId", entityName: "workordersl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BookingWork.EditForm.WorkDescription', type: typeComponent.textArea, value: this.props.edit.workDescription }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BookingWork.EditForm.WorkPrice', type: typeComponent.number, value: this.props.edit.workPrice }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCCurrency", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hccurrencyId, name: "BookingWork.EditForm.HCCurrencyId", valueName: this.props.edit.currencySign }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BookingWork.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BookingWork.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "BookingWork.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "BookingWork.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "BookingWork.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.bookingwork,
    BookingWorkStore.actionCreators
)(BookingWorkEdit as any);