import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as ContactStore from '../../../../store/Contact';
import * as ContactDepStore from '../../../../store/ContactDep';
import * as ContactPersonStore from '../../../../store/ContactPerson';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwContact } from '../../../../model/viewModel/VwContact';
import { stateBase } from '../../../../model/general/stateBase';
import TAutoComplete from '../../../../components/TAutoComplete';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import SelectList from '../../../../components/SelectList';
import { Directions } from '../../../../model/general';
import TTabs, { ComponentColumns } from '../../../../components/TTabs';

type ContactProps =
    stateBase<VwContact> &
    typeof ContactStore.actionCreators &
    RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string, typeForm?: string };

class ContactEdit extends React.PureComponent<ContactProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {

    }
    componentDidUpdate(props: any) {

    }
    handleSubmit(event: any) {
        debugger
        event.preventDefault();

        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwContact;

        if (senddata && senddata.id) {
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
        const columnStructure2 = [
            { key: "document", name: "document" }
          ] as ComponentColumns[];
        let Rtl = "";
        if (this.props.dir === Directions.RTL) {
            Rtl = " Rtl";
        }
        if (this.props.edit === undefined) {
            return null;
        }
        return (
            <React.Fragment>
                <Container className={"form-container"+Rtl}>
                    <Row>
                        <Col md={12}>
                            <Form onSubmit={this.handleSubmit}>
                                <InputBox {...{ name: 'Contact.EditForm.id', type: typeComponent.hidden, value: this.props.edit.id }} />
                                {this.props.typeForm === "person" ?
                                    <Row>
                                        <InputBox {...{ name: 'Contact.EditForm.personId', type: typeComponent.hidden, value: this.props.edit.personId ? this.props.edit.personId : this.props.parentId }} />
                                    </Row> : this.props.typeForm === "dep" ?
                                        <Row>
                                            <InputBox {...{ name: 'Contact.EditForm.depId', type: typeComponent.hidden, value: this.props.edit.depId ? this.props.edit.depId : this.props.edit.parentId }} />
                                        </Row> : null

                                }
                                <div>
                                    {(this.props.typeForm !== "person" && this.props.typeForm === "dep") ?
                                        <Row>
                                            <Col md={6}>
                                                <SelectList {...{ label: "Person name", valueId: this.props.edit.personId, valueName: this.props.edit.personName, name: "Contact.EditForm.personId", entityName: "personsl" }} />
                                            </Col>
                                        </Row> : (this.props.typeForm !== "dep" && this.props.typeForm === "person") ?
                                            <Row>
                                                <Col md={6}>
                                                    <SelectList {...{ label: "Department name", valueId: this.props.edit.depId, valueName: this.props.edit.departmentSign, name: "Contact.EditForm.depId", entityName: "departmentsl" }} />

                                                </Col></Row> :
                                            <Row>
                                                <Col md={6}>
                                                    <SelectList {...{ label: "Person name", valueId: this.props.edit.personId, valueName: this.props.edit.personName, name: "Contact.EditForm.personId", entityName: "personsl" }} />
                                                </Col>
                                                <Col md={6}>
                                                    <SelectList {...{ label: "Department name", valueId: this.props.edit.depId, valueName: this.props.edit.departmentSign, name: "Contact.EditForm.depId", entityName: "department" }} />

                                                </Col>
                                            </Row>
                                    }
                                </div>

                                <Row>

                                    <Col md={6}>
                                        <SelectList {...{ label: "Zone name", valueId: this.props.edit.zoneId, valueName: this.props.edit.cityName, name: "Contact.EditForm.zoneId", entityName: "zonesl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCContactType", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hccontactTypeId, name: "Contact.EditForm.hccontactTypeId", valueName: this.props.edit.contactTypeSign }} />
                                    </Col>
                                </Row>
                                <Row>

                                    <Col md={12}>
                                        <InputBox {...{ name: 'Contact.EditForm.value', type: typeComponent.textArea, value: this.props.edit.value }} />
                                    </Col>


                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Contact.EditForm.Latitude', type: typeComponent.number, value: this.props.edit.latitude }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Contact.EditForm.Longitude', type: typeComponent.number, value: this.props.edit.longitude }} />

                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Contact.EditForm.PostCode', type: typeComponent.text, value: this.props.edit.postCode }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Contact.EditForm.BuildingLicensePlate', type: typeComponent.textArea, value: this.props.edit.buildingLicensePlate }} />

                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Contact.EditForm.ApartmentLicensePlate', type: typeComponent.textArea, value: this.props.edit.apartmentLicensePlate }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Contact.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Contact.EditForm.isActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "Contact.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "Contact.EditForm.updater", size: 6, value: this.props.edit.updater }} /></Col>
                                </Row>
                                <Row>
                                    <Col md={2} >
                                        {this.props.saveLoading === true ?
                                            <TButton
                                                {...{
                                                    name: "Contact.EditForm.BTN_Save",
                                                    submit: this.handleSubmit,
                                                    isloading: true,
                                                }}
                                            />
                                            :
                                            <TButton
                                                {...{
                                                    name: "Contact.EditForm.BTN_Save",
                                                    submit: this.handleSubmit,
                                                }}
                                            />
                                        }
                                    </Col>
                                    <Col md={2} >
                                        <TButton {...{ name: "Contact.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    {this.props.edit.id !== "" ? (
            <TTabs
              {...{
                component: columnStructure2,
                editId: this.props.edit.id,
                defaultKey: columnStructure2[0].key,
                typeForm: "contact",
              }}
            />
          ) : null}
                </Container>
            </React.Fragment>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.contact,
    ContactStore.actionCreators
)(ContactEdit as any);


class ContactDepEditClass extends ContactEdit {
}

export const ContactDepEdit = connect(
    (state: ApplicationState) => state.contactdep,
    ContactDepStore.actionCreators
)(ContactDepEditClass as any);

class ContactPersonEditClass extends ContactEdit {
}

export const ContactPersonEdit = connect(
    (state: ApplicationState) => state.contactperson,
    ContactPersonStore.actionCreators
)(ContactPersonEditClass as any);