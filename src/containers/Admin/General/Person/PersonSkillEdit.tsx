import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as PersonSkillStore from '../../../../store/PersonSkill';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwPersonSkill } from '../../../../model/viewModel/VwPersonSkill';
import { stateBase } from '../../../../model/general/stateBase';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import TAutoComplete from '../../../../components/TAutoComplete';
import SelectList from '../../../../components/SelectList';
import DateTime from '../../../../components/DateTime';
import { Directions } from '../../../../model/general';


type PersonSkillProps =
    stateBase<VwPersonSkill> & typeof PersonSkillStore.actionCreators & RouteComponentProps<{}> & { closeModal: any, refreshGrid: any, parentId: string };
class PersonSkillEdit extends React.PureComponent<PersonSkillProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwPersonSkill;
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
                                <TTitle {...{ name: "PersonSkill.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'PersonSkill.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'PersonSkill.EditForm.PersonId', type: typeComponent.hidden, value: this.props.edit.personId ? this.props.edit.personId : this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCSkillTitle", action: "GetHCList", selectName: "sign", valueId: this.props.edit.skillSign, name: "PersonSkill.EditForm.HCSkillTitleId", valueName: this.props.edit.skillSign }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "BrandId name", valueId: this.props.edit.brandId, valueName: this.props.edit.brandSign, name: "PersonSkill.EditForm.BrandId", entityName: "brandsl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "CategoryId name", valueId: this.props.edit.categoryId, valueName: this.props.edit.categorySign, name: "PersonSkill.EditForm.CategoryId", entityName: "categorysl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "ProductId name", valueId: this.props.edit.productId, valueName: this.props.edit.productSign, name: "PersonSkill.EditForm.ProductId", entityName: "productsl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'PersonSkill.EditForm.FromDate', type: typeComponent.text, value: this.props.edit.fromDate }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'PersonSkill.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'PersonSkill.EditForm.Description', type: typeComponent.text, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                        <TButton {...{ name: "PersonSkill.EditForm.BTN_Save", submit: this.handleSubmit }} />
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "PersonSkill.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.personskill,
    PersonSkillStore.actionCreators
)(PersonSkillEdit as any);