import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as DepWeekWorkTimeStore from '../../../../store/DepWeekWorkTime';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwDepWeekWorkTime } from '../../../../model/viewModel/VwDepWeekWorkTime';
import { stateBase } from '../../../../model/general/stateBase';
import TButton from '../../../../components/TButton';
import TAutoComplete from '../../../../components/TAutoComplete';
import DateTime from '../../../../components/DateTime';
import Time from '../../../../components/Time';
import { Directions } from '../../../../model/general';


type DepWeekWorkTimeProps =
    stateBase<VwDepWeekWorkTime> & typeof DepWeekWorkTimeStore.actionCreators & RouteComponentProps<{}> &  { closeModal: any, refreshGrid: any, parentId: string };
class DepWeekWorkTimeEdit extends React.PureComponent<DepWeekWorkTimeProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwDepWeekWorkTime;
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
        // const { history } = this.props;
        // history.goBack();
        this.props.ChangeTab('', 'DepWeekWorkTimeEdit', 'DepWeekWorkTime');

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
                            {/* <Col md={12} className="T-header">
                                <TTitle {...{ name: "DepWeekWorkTime.EditForm" }} />
                            </Col> */}
                            <Form >
                                <InputBox {...{ name: 'DepWeekWorkTime.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'DepWeekWorkTime.EditForm.DepId', type: typeComponent.hidden, value:this.props.edit.depId?this.props.edit.depId: this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'DepWeekWorkTime.EditForm.FromDateTime', value: this.props.edit.fromDateTime }} />
                                    </Col>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'DepWeekWorkTime.EditForm.ToDateTime', value: this.props.edit.toDateTime }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCWeekDay", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcweekDayId, name: "DepWeekWorkTime.EditForm.HCWeekDayId", valueName: this.props.edit.sign }} />
                                    </Col>
                                </Row>



                                <Row>
                                    <Col md={6}>
                                        <Time {...{ name: 'DepWeekWorkTime.EditForm.FromTime', value: this.props.edit.fromTime }} />
                                    </Col>
                                    <Col md={6}>
                                        <Time {...{ name: 'DepWeekWorkTime.EditForm.ToTime', value: this.props.edit.toTime }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepWeekWorkTime.EditForm.NoneWorkingDay', type: typeComponent.check, value: this.props.edit.noneWorkingDay }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepWeekWorkTime.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepWeekWorkTime.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "DepWeekWorkTime.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "DepWeekWorkTime.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "DepWeekWorkTime.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.depweekworktime,
    DepWeekWorkTimeStore.actionCreators
)(DepWeekWorkTimeEdit as any);