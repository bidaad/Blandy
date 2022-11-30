import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as ResourceLangStore from '../../../../store/ResourceLang';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwResourceLang } from '../../../../model/viewModel/VwResourceLang';
import { stateBase } from '../../../../model/general/stateBase';
import TAutoComplete from '../../../../components/TAutoComplete';
import TButton from '../../../../components/TButton';
import { Directions } from '../../../../model/general';

type ResourceLangProps =
    stateBase<VwResourceLang> &
    typeof ResourceLangStore.actionCreators &
    RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };

class ResourceLangEdit extends React.PureComponent<ResourceLangProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit(event: any) {
        event.preventDefault();

        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwResourceLang;
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
                <Container className={"form-container"+Rtl}>
                    <Row>
                        <Col md={12}>
                            <Form onSubmit={this.handleSubmit}>
                                <InputBox {...{ name: 'ResourceLang.EditForm.id', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'ResourceLang.EditForm.resourceId', type: typeComponent.hidden, value: this.props.edit.resourceId ? this.props.edit.resourceId : this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "Language", action: "GetList", selectName: "sign", valueId: this.props.edit.languageId, name: "ResourceLang.EditForm.LanguageId", valueName: this.props.edit.sign }} />
                                    </Col>

                                    <Col md={6}>
                                        <InputBox {...{ name: 'ResourceLang.EditForm.isActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'ResourceLang.EditForm.name', type: typeComponent.text, value: this.props.edit.name }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2} >
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "ResourceLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "ResourceLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={2} >
                                        <TButton {...{ name: "ResourceLang.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.resourcelangs,
    ResourceLangStore.actionCreators
)(ResourceLangEdit as any);