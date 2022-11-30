import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as BillOLBKShipStatusStore from '../../../store/BillOLBKShipStatus';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwBillOLBKShipStatus } from '../../../model/viewModel/VwBillOLBKShipStatus';
import { stateBase } from '../../../model/general/stateBase';
import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import TAutoComplete from '../../../components/TAutoComplete';
import DateTime from '../../../components/DateTime';
import { Directions } from '../../../model/general';


type BillOLBKShipStatusProps =
    stateBase<VwBillOLBKShipStatus> & typeof BillOLBKShipStatusStore.actionCreators & RouteComponentProps<{}>;
class BillOLBKShipStatusEdit extends React.PureComponent<BillOLBKShipStatusProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwBillOLBKShipStatus;
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
                                <TTitle {...{ name: "BillOLBKShipStatus.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'BillOLBKShipStatus.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'BillOLBKShipStatus.EditForm.billOlbookingId', type: typeComponent.hidden, value: this.props.edit.billOfLadingId ? this.props.edit.billOfLadingId : this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                    </Col>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'BillOLBKShipStatus.EditForm.Time', value: this.props.edit.time }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCShipStatus", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcshippingStatusId, name: "BillOLBKShipStatus.EditForm.HCShippingStatusId", valueName: this.props.edit.hcshippingStatussign }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBKShipStatus.EditForm.ShippingStatusDetail', type: typeComponent.text, value: this.props.edit.shippingStatusDetail }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBKShipStatus.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BillOLBKShipStatus.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "BillOLBKShipStatus.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "BillOLBKShipStatus.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "BillOLBKShipStatus.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.billolbkshipstatus,
    BillOLBKShipStatusStore.actionCreators
)(BillOLBKShipStatusEdit as any);