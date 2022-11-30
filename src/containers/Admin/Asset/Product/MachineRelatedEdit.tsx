import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as MachineRelatedStore from '../../../../store/MachineRelated';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwMachineRelated } from '../../../../model/viewModel/VwMachineRelated';
import { stateBase } from '../../../../model/general/stateBase';
import SelectList from '../../../../components/SelectList';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import DateTime from '../../../../components/DateTime';
import { Directions } from '../../../../model/general';


type MachineRelatedProps =
    stateBase<VwMachineRelated> & typeof MachineRelatedStore.actionCreators & RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };
;
class MachineRelatedEdit extends React.PureComponent<MachineRelatedProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwMachineRelated;
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
                            <Form >
                                <InputBox {...{ name: 'MachineRelated.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'MachineRelated.EditForm.ProductId', type: typeComponent.hidden, value: this.props.edit.productId?this.props.edit.productId:this.props.edit.parentId }} />

                                <Row>
                                    <Col
                                     md={11}>
                                         <SelectList {...{ label: "MachineId name", valueId: this.props.edit.machineId, valueName: this.props.edit.machinSign, name: "MachineRelated.EditForm.MachineId", entityName: "productsl" , valuefiltersl: "Machine:true:2;" }} />
                                        {/* <SelectList {...{ label: "MachineId name", valueId: this.props.edit.machineId, valueName: this.props.edit.machinSign, name: "MachineRelated.EditForm.MachineId", entityName: "brand", valuefiltersl: "Machine:true:2;sl" }} /> */}
                                    </Col>


                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'MachineRelated.EditForm.fromManufactureDate', value: this.props.edit.fromManufactureDate, timePicker: false }} />
                                    </Col>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'MachineRelated.EditForm.toManufactureDate', value: this.props.edit.toManufactureDate, timePicker: false }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'MachineRelated.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'MachineRelated.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>

                                </Row>
                                <hr />
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "MachineRelated.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "MachineRelated.EditForm.updator", size: 6, value: this.props.edit.updator }} /></Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "MachineRelated.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "MachineRelated.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "MachineRelated.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.machinerelated,
    MachineRelatedStore.actionCreators
)(MachineRelatedEdit as any);