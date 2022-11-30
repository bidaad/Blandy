import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as DepartmentLangStore from '../../../../store/DepartmentLang';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwDepartmentLang } from '../../../../model/viewModel/VwDepartmentLang';
import { stateBase } from '../../../../model/general/stateBase';
import TButton from '../../../../components/TButton';
import TAutoComplete from '../../../../components/TAutoComplete';
import { Directions } from '../../../../model/general';

type DepartmentLangProps =
    stateBase<VwDepartmentLang> & typeof DepartmentLangStore.actionCreators & RouteComponentProps<{}> & { closeModal: any, refreshGrid: any, parentId: string };
class DepartmentLangEdit extends React.PureComponent<DepartmentLangProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwDepartmentLang;
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
                            {/* <Col md={12} className="T-header">
                                <TTitle {...{ name: "DepartmentLang.EditForm" }} />
                            </Col> */}
                            <Form >
                                <InputBox {...{ name: 'DepartmentLang.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'DepartmentLang.EditForm.DepartmentId', type: typeComponent.hidden, value: this.props.edit.departmentId ? this.props.edit.departmentId : this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "Language", action: "GetList", selectName: "sign", valueId: this.props.edit.languageId, name: "DepartmentLang.EditForm.LanguageId", valueName: this.props.edit.sign }} />
                                        {/* <SelectList {...{ label: "LanguageId name", valueId: this.props.edit.languageId, valueName: this.props.edit.languageSign, name: "DepartmentLang.EditForm.LanguageId", entityName: "languagesl" }} /> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepartmentLang.EditForm.Name', type: typeComponent.textArea, value: this.props.edit.name }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepartmentLang.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepartmentLang.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                        {this.props.saveLoading === true ?
                                            <TButton
                                                {...{
                                                    name: "DepartmentLang.EditForm.BTN_Save",
                                                    submit: this.handleSubmit,
                                                    isloading: true,
                                                }}
                                            />
                                            :
                                            <TButton
                                                {...{
                                                    name: "DepartmentLang.EditForm.BTN_Save",
                                                    submit: this.handleSubmit,
                                                }}
                                            />
                                        }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "DepartmentLang.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.departmentlang,
    DepartmentLangStore.actionCreators
)(DepartmentLangEdit as any);