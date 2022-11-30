import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as AssetUsageStore from '../../../../store/AssetUsage';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { stateBase } from '../../../../model/general/stateBase';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import TAutoComplete from '../../../../components/TAutoComplete';
import DateTime from '../../../../components/DateTime';
import { VwAssetUsage } from '../../../../model/viewModel/VwAssetUsage';
import { Directions } from '../../../../model/general';


type AssetUsageProps =
    stateBase<VwAssetUsage> & typeof AssetUsageStore.actionCreators & RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };
class AssetUsageEdit extends React.PureComponent<AssetUsageProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwAssetUsage;
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
                                <InputBox {...{ name: 'AssetUsage.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'AssetUsage.EditForm.AssetId', type: typeComponent.hidden, value: this.props.edit.assetId ? this.props.edit.assetId : this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCPlanTitle", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcplanTitle, name: "AssetUsage.EditForm.hcplanTitle", valueName: this.props.edit.planTitleSign }} />
                                    </Col>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'AssetUsage.EditForm.Time', value: this.props.edit.time, datepicker: false }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetUsage.EditForm.Value', type: typeComponent.number, value: this.props.edit.value }} />
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCUnit", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcuniteId, name: "AssetUsage.EditForm.hcuniteId", valueName: this.props.edit.hcunitSign }} />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetUsage.EditForm.averageValue', type: typeComponent.number, value: this.props.edit.averageValue }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetUsage.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'AssetUsage.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "AssetUsage.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "AssetUsage.EditForm.updator", size: 6, value: this.props.edit.updator }} /></Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "AssetUsage.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "AssetUsage.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "AssetUsage.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.assetusage,
    AssetUsageStore.actionCreators
)(AssetUsageEdit as any);