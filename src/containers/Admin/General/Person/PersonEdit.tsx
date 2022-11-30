import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as PersonStore from '../../../../store/Person';
import { Container, Form, Row, Col } from 'react-bootstrap';
 
import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwPerson } from '../../../../model/viewModel/VwPerson';
import { stateBase } from '../../../../model/general/stateBase';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import TAutoComplete from '../../../../components/TAutoComplete';
import DateTime from '../../../../components/DateTime';
import TTabs, { ComponentColumns } from '../../../../components/TTabs';
import { Directions } from '../../../../model/general';


type PersonProps =
    stateBase<VwPerson> & typeof PersonStore.actionCreators & RouteComponentProps<{}>;
class PersonEdit extends React.PureComponent<PersonProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwPerson;
        this.props.saveData(senddata);

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
        this.props.ChangeTab('','PersonEdit','Person');
    }

    public render() {
        console.log('this.props.edit=' + this.props.edit);
        const columnStructure2 = [
            { key: "personLang", name: "personlang" },
            { key: "assetperson", name: "asset" },
            { key: "contactperson", name: "contact" },

            { key: "personproduct", name: "personproduct" },
            { key: "personcategory", name: "personcategory" },
            { key: "personskill", name: "personskill" },
            { key: "personactiveinzone", name: "personactiveinzone" },

            { key: "document", name: "document", }
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
                <Container className="form-container Rtl">
                    <Row>
                        <Col md={12} className={"form-container"+Rtl} >
                            <Col md={12} className="T-header">
                                <TTitle {...{ name: "Person.EditForm" }} />
                            </Col>
                            <Form className="edit-form">
                                <InputBox {...{ name: 'Person.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <Row>
                                    <Col md={6}>

                                        <InputBox  {...{ name: 'Person.EditForm.NationalCode', type: typeComponent.text, value: this.props.edit.nationalCode }} />
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCGender", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcgenderId, name: "Person.EditForm.HCGenderId", valueName: this.props.edit.genderName }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox  {...{ name: 'Person.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                    <Col md={6}>
                                    <DateTime {...{name:"Person.EditForm.BirthDate",value:this.props.edit.birthDate,timePicker:true}} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox  {...{ name: 'Person.EditForm.expertConfirm', type: typeComponent.check, value: this.props.edit.expertConfirm }} />
                                    </Col>
                                    <Col md={6}>
                                    <InputBox  {...{ name: 'Person.EditForm.isActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "Person.EditForm.Creator",size:6 ,value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "Person.EditForm.updater",size:6 ,value: this.props.edit.updater}} /></Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "Person.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "Person.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "Person.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    {this.props.edit.id !== '' ?
                        <TTabs {...{ component: columnStructure2, editId: this.props.edit.id, defaultKey: "personLang", folder: "personLang" ,typeForm:"person" }} />
                        : null}
                    {/* {this.props.edit.id !== '' ?
                        <div>
                            <PersonLang  {...{ pId: this.props.edit.id }} />
                        </div>
                        : null} */}
                </Container>
            </React.Fragment>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.persons,
    PersonStore.actionCreators 
)(PersonEdit as any);