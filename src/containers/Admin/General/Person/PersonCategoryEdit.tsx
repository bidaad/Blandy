import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as PersonCategoryStore from '../../../../store/PersonCategory';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwPersonCategory } from '../../../../model/viewModel/VwPersonCategory';
import { stateBase } from '../../../../model/general/stateBase';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import SelectList from '../../../../components/SelectList';
import { Directions } from '../../../../model/general';


type PersonCategoryProps =
    stateBase<VwPersonCategory> & typeof PersonCategoryStore.actionCreators & RouteComponentProps<{}> & { closeModal: any, refreshGrid: any, parentId: string };
class PersonCategoryEdit extends React.PureComponent<PersonCategoryProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwPersonCategory;
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
                                <TTitle {...{ name: "PersonCategory.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'PersonCategory.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'PersonCategory.EditForm.PersonId', type: typeComponent.hidden, value: this.props.edit.personId ? this.props.edit.personId : this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "CategoryId name", valueId: this.props.edit.categoryId, valueName: this.props.edit.categorySign, name: "PersonCategory.EditForm.CategoryId", entityName: "categorysl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'PersonCategory.EditForm.IsDefault', type: typeComponent.check, value: this.props.edit.isDefault }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'PersonCategory.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'PersonCategory.EditForm.Description', type: typeComponent.text, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                        <TButton {...{ name: "PersonCategory.EditForm.BTN_Save", submit: this.handleSubmit }} />
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "PersonCategory.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.personcategory,
    PersonCategoryStore.actionCreators
)(PersonCategoryEdit as any);