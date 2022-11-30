import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as LoadDeliveryTTWeekDayStore from '../../../store/LoadDeliveryTTWeekDay';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwLoadDeliveryTTWeekDay } from '../../../model/viewModel/VwLoadDeliveryTTWeekDay';
import { stateBase } from '../../../model/general/stateBase';
import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import TAutoComplete from '../../../components/TAutoComplete';
import { Directions } from '../../../model/general';


type LoadDeliveryTTWeekDayProps =
    stateBase<VwLoadDeliveryTTWeekDay> & typeof LoadDeliveryTTWeekDayStore.actionCreators & RouteComponentProps<{}>&
    { closeModal: any, refreshGrid: any, parentId: string };
class LoadDeliveryTTWeekDayEdit extends React.PureComponent<LoadDeliveryTTWeekDayProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwLoadDeliveryTTWeekDay;
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
                                <TTitle {...{ name: "LoadDeliveryTTWeekDay.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'LoadDeliveryTTWeekDay.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'LoadDeliveryTTWeekDay.EditForm.LoadDeliveryTimeTitleId', type:typeComponent.hidden, value: this.props.edit.loadDeliveryTimeTitleId?this.props.edit.loadDeliveryTimeTitleId:this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCWeekDay", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcweekDayId, name: "LoadDeliveryTTWeekDay.EditForm.HCWeekDayId", valueName: this.props.edit.hcweekDaysign }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'LoadDeliveryTTWeekDay.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'LoadDeliveryTTWeekDay.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "LoadDeliveryTTWeekDay.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "LoadDeliveryTTWeekDay.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "LoadDeliveryTTWeekDay.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.loaddeliveryttweekday,
    LoadDeliveryTTWeekDayStore.actionCreators
)(LoadDeliveryTTWeekDayEdit as any);