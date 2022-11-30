import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as ContractStore from '../../../store/Contract';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwContract } from '../../../model/viewModel/VwContract';
import { stateBase } from '../../../model/general/stateBase';
import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import DateTime from '../../../components/DateTime';
import SelectList from '../../../components/SelectList';
import { Directions } from '../../../model/general';

type ContractProps =
    stateBase<VwContract> & typeof ContractStore.actionCreators & RouteComponentProps<{}> & { closeModal: any, refreshGrid: any, parentId: string };
class ContractEdit extends React.PureComponent<ContractProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwContract;
        if (((senddata) as any).ID) {
            this.props.saveData(senddata);
        }
        else {
            this.props.saveData(senddata)
                //this.props.closeModal();
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
                                <TTitle {...{ name: "Contract.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'Contract.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Contract.EditForm.Code', type: typeComponent.text, value: this.props.edit.code }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Contract.EditForm.Subject', type: typeComponent.text, value: this.props.edit.subject }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'Contract.EditForm.IssueDate', type: typeComponent.text, value: this.props.edit.issueDate }} />
                                    </Col>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'Contract.EditForm.StartDate', type: typeComponent.text, value: this.props.edit.startDate }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'Contract.EditForm.FinishDate', type: typeComponent.text, value: this.props.edit.finishDate }} />
                                    </Col>
                                    <Col md={6}>
                                        
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "FristSidePersonId name", valueId: this.props.edit.fristSidePersonId, valueName: this.props.edit.firstSidePerson, name: "Contract.EditForm.FristSidePersonId", entityName: "personsl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "FristSideDepId name", valueId: this.props.edit.fristSideDepId, valueName: this.props.edit.firstSideDepSign, name: "Contract.EditForm.FristSideDepId", entityName: "departmentsl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "SecondSidePersonId name", valueId: this.props.edit.secondSidePersonId, valueName: this.props.edit.secondSidePerson, name: "Contract.EditForm.SecondSidePersonId", entityName: "personsl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "SecondSideDepId name", valueId: this.props.edit.secondSideDepId, valueName: this.props.edit.secondSideDepSign, name: "Contract.EditForm.SecondSideDepId", entityName: "departmentsl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                   
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Contract.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "ParentId name", valueId: this.props.edit.parentId, valueName: this.props.edit.parentContractSubject, name: "Contract.EditForm.ParentId", entityName: "contractsl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Contract.EditForm.Description', type: typeComponent.text, value: this.props.edit.description }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                    <InputBox {...{ name: 'Contract.EditForm.Detail', type: typeComponent.textArea , value: this.props.edit.detail }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                        <TButton {...{ name: "Contract.EditForm.BTN_Save", submit: this.handleSubmit }} />
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "Contract.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.contract,
    ContractStore.actionCreators
)(ContractEdit as any);