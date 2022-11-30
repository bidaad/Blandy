import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as AssetLangStore from '../../../../store/AssetLang';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwAssetLang } from '../../../../model/viewModel/VwAssetLang';
import { stateBase } from '../../../../model/general/stateBase';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import TAutoComplete from '../../../../components/TAutoComplete';
import { Directions } from '../../../../model/general';


type AssetLangProps =
    stateBase<VwAssetLang> & typeof AssetLangStore.actionCreators & RouteComponentProps<{}> & { closeModal: any, refreshGrid: any, parentId: string };
class AssetLangEdit extends React.PureComponent<AssetLangProps> {
    constructor(props: any) {

        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
 
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwAssetLang;
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
                        <Col md={12} className={"form-container" + Rtl}>
                            {/* <Col md={12} className="T-header">
                                <TTitle {...{ name: "AssetLang.EditForm" }} />
                            </Col> */}
                            <Form >
                                <InputBox {...{ name: 'AssetLang.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'AssetLang.EditForm.AssetId', type:typeComponent.hidden, value:this.props.edit.assetId?this.props.edit.assetId:this.props.edit.parentId }} />
                                <Row>
                                   
                                    <Col md={6}>
                                    <TAutoComplete {...{ controller: "Language", action: "GetList", selectName: "sign", valueId: this.props.edit.languageId, name: "AssetLang.EditForm.LanguageId", valueName: this.props.edit.lang }} />
                                        
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetLang.EditForm.Package', type: typeComponent.textArea, value: this.props.edit.package }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetLang.EditForm.DetailComment', type: typeComponent.textArea, value: this.props.edit.detailComment }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetLang.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetLang.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                   
                                </Row>
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "AssetLang.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "AssetLang.EditForm.updator", size: 6, value: this.props.edit.updator }} /></Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "AssetLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "AssetLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "AssetLang.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.assetlang,
    AssetLangStore.actionCreators
)(AssetLangEdit as any);