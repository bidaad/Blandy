import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as HCPlanTitleLangStore from '../../../store/HCPlanTitleLang';

import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwHCPlanTitleLang } from '../../../model/viewModel/VwHCPlanTitleLang';
import { stateBase } from '../../../model/general/stateBase';

import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';


import SelectList from '../../../components/SelectList';
import TAutoComplete from '../../../components/TAutoComplete';
import { Directions } from '../../../model/general';



type HCPlanTitleLangProps =
    stateBase<VwHCPlanTitleLang> & typeof HCPlanTitleLangStore.actionCreators & RouteComponentProps<{}>;
class EditHCPlanTitleLang
    extends React.PureComponent<HCPlanTitleLangProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwHCPlanTitleLang;
        this.props.saveData(senddata);

    }

    getLabel = (label: string) => {
        return label;
    }
    getAccess = (label: string) => {
        return label;
    }

    gotoBackPage = () => {
        this.props.ChangeTab('', 'EditHCPlanTitleLang', 'HCPlanTitleLang');

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
                        <Col md={12} className="T-container">
                            <Col md={12} className="T-header">
                                <TTitle {...{ name: "HCPlanTitleLang.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'HCPlanTitleLang.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCPlanTitle", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcplanTitleId, name: "HCPlanTitleLang.EditForm.HCPlanTitleId", valueName: this.props.edit.hcplanTitlesign }} />
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "LanguageId name", valueId: this.props.edit.languageId, valueName: this.props.edit.languageSign, name: "HCPlanTitleLang.EditForm.LanguageId", entityName: "languagesl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'HCPlanTitleLang.EditForm.Name', type: typeComponent.text, value: this.props.edit.name }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'HCPlanTitleLang.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'HCPlanTitleLang.EditForm.Description', type: typeComponent.text, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                                <Row>
                  <Col md={12}>
                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "HCPlanTitleLang.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "HCPlanTitleLang.EditForm.updator",
                        size: 6,
                        value: this.props.edit.updator,
                      }}
                    />
                  </Col>
                </Row>
<Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "HCPlanTitleLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "HCPlanTitleLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "HCPlanTitleLang.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.hcplantitlelang,
    HCPlanTitleLangStore.actionCreators
)(EditHCPlanTitleLang as any);