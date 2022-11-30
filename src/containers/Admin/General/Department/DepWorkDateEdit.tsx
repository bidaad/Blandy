import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as DepWorkDateStore from '../../../../store/DepWorkDate';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwDepWorkDate } from '../../../../model/viewModel/VwDepWorkDate';
import { stateBase } from '../../../../model/general/stateBase';
import TButton from '../../../../components/TButton';
import DateTime from '../../../../components/DateTime';
import { Directions } from '../../../../model/general';


type DepWorkDateProps =
    stateBase<VwDepWorkDate> & typeof DepWorkDateStore.actionCreators & RouteComponentProps<{}> &  { closeModal: any, refreshGrid: any, parentId: string };
class DepWorkDateEdit extends React.PureComponent<DepWorkDateProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwDepWorkDate;
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
        this.props.ChangeTab('', 'DepWorkDateEdit', 'DepWorkDate');
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
                                <TTitle {...{ name: "DepWorkDate.EditForm" }} />
                            </Col> */}
                            <Form >
                                <InputBox {...{ name: 'DepWorkDate.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'DepWorkDate.EditForm.DepId', type: typeComponent.hidden, value: this.props.edit.depId?this.props.edit.depId: this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'DepWorkDate.EditForm.FromDateTime', value: this.props.edit.fromDateTime }} />
                                    </Col>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'DepWorkDate.EditForm.ToDateTime', value: this.props.edit.toDateTime }} />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepWorkDate.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepWorkDate.EditForm.NoneWorkingDate', type: typeComponent.check, value: this.props.edit.noneWorkingDate }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepWorkDate.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>

                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "DepWorkDate.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "DepWorkDate.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "DepWorkDate.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.depworkdate,
    DepWorkDateStore.actionCreators
)(DepWorkDateEdit as any);