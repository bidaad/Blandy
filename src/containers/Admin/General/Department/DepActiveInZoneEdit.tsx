import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as DepActiveInZoneStore from '../../../../store/DepActiveInZone';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwDepActiveInZone } from '../../../../model/viewModel/VwDepActiveInZone';
import { stateBase } from '../../../../model/general/stateBase';
import SelectList from '../../../../components/SelectList';
import TButton from '../../../../components/TButton';
import { Directions } from '../../../../model/general';

type DepActiveInZoneProps =
    stateBase<VwDepActiveInZone> & typeof DepActiveInZoneStore.actionCreators & RouteComponentProps<{}>&  { closeModal: any, refreshGrid: any, parentId: string };
class DepActiveInZoneEdit extends React.PureComponent<DepActiveInZoneProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwDepActiveInZone;
        if(((senddata) as any).ID)
        {
            this.props.saveData(senddata);
        }
        else
        {
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
                            <Form >
                                <InputBox {...{ name: 'DepActiveInZone.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'DepActiveInZone.EditForm.DepId', type: typeComponent.hidden, value:this.props.edit.parentId }} />
                                <Row>
                                    <Col md={12}>
                                        <SelectList {...{ label: "ZoneId name", valueId: this.props.edit.zoneId, valueName: this.props.edit.zoneSign, name: "DepActiveInZone.EditForm.ZoneId", entityName: "zonesl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepActiveInZone.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepActiveInZone.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "DepActiveInZone.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "DepActiveInZone.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "DepActiveInZone.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.depactiveinzone,
    DepActiveInZoneStore.actionCreators
)(DepActiveInZoneEdit as any);