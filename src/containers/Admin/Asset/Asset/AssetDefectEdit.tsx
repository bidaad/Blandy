import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as AssetDefectStore from '../../../../store/AssetDefect';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwAssetDefect } from '../../../../model/viewModel/VwAssetDefect';
import { stateBase } from '../../../../model/general/stateBase';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import TAutoComplete from '../../../../components/TAutoComplete';
import DateTime from '../../../../components/DateTime';
import { Directions } from '../../../../model/general';


type AssetDefectProps =
    stateBase<VwAssetDefect> & typeof AssetDefectStore.actionCreators & RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };
class AssetDefectEdit extends React.PureComponent<AssetDefectProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwAssetDefect;
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
                            <Form >
                                <InputBox {...{ name: 'AssetDefect.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'AssetDefect.EditForm.AssetId', type: typeComponent.hidden, value: this.props.edit.parentId }} />
                                <Row>

                                    <Col md={12}>
                                        <InputBox {...{ name: 'AssetDefect.EditForm.Code', type: typeComponent.text, value: this.props.edit.code }} />
                                    </Col>
                                    {/* <Col md={6}>
                                    </Col> */}
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'AssetDefect.EditForm.Time', value: this.props.edit.time, datepicker: false }} />
                                    </Col>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'AssetDefect.EditForm.DefectStatusTime', value: this.props.edit.defectStatusTime, datepicker: false }} />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCAssetHealthStatus", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcassetHealthStatus, name: "AssetDefect.EditForm.HCAssetHealthStatus", valueName: this.props.edit.sign }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetDefect.EditForm.Detail', type: typeComponent.textArea, value: this.props.edit.detail }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetDefect.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetDefect.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "AssetDefect.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "AssetDefect.EditForm.updator", size: 6, value: this.props.edit.updator }} /></Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "AssetDefect.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "AssetDefect.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "AssetDefect.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.assetdefect,
    AssetDefectStore.actionCreators
)(AssetDefectEdit as any);