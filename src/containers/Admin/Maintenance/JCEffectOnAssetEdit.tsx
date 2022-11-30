import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as JCEffectOnAssetStore from '../../../store/JCEffectOnAsset';
import * as JCEffectOnAssetForAssetStore from '../../../store/JCEffectOnAssetForAsset';
import * as JCEffectOnAssetForJobCardStore from '../../../store/JCEffectOnAssetForJobCard';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwJCEffectOnAsset } from '../../../model/viewModel/VwJCEffectOnAsset';
import { stateBase } from '../../../model/general/stateBase';
import SelectList from '../../../components/SelectList';
import TButton from '../../../components/TButton';
import { Directions } from '../../../model/general';


type JCEffectOnAssetProps =
    stateBase<VwJCEffectOnAsset> & typeof JCEffectOnAssetStore.actionCreators & RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string, typeForm?: string };
class JCEffectOnAssetEdit extends React.PureComponent<JCEffectOnAssetProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwJCEffectOnAsset;
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
        const { history } = this.props;
        history.goBack();

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
                                <TTitle {...{ name: "JCEffectOnAsset.EditForm" }} />
                            </Col> */}
                            <Form >
                                <InputBox {...{ name: 'JCEffectOnAsset.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />


                                {
                                    this.props.typeForm === "asset" ?
                                        <Row>
                                            <Col md={6}>
                                                <SelectList {...{ label: "JobCard name", valueId: this.props.edit.jobCardId, valueName: this.props.edit.jobCardName, name: "JCEffectOnAsset.EditForm.JobCardId", entityName: "jobcardsl" }} />
                                                <InputBox {...{ name: 'JCEffectOnAsset.EditForm.AssetId', type: typeComponent.hidden, value: this.props.edit.assetId ? this.props.edit.assetId : this.props.edit.parentId }} />
                                            </Col>
                                        </Row>
                                        : this.props.typeForm === "jobcard" ?
                                            <Row>
                                                <Col md={6}>
                                                    <SelectList {...{ label: "AssetId name", valueId: this.props.edit.assetId, valueName: this.props.edit.productCode, name: "JCEffectOnAsset.EditForm.AssetId", entityName: "assetsl" }} />
                                                    <InputBox {...{ name: 'JCEffectOnAsset.EditForm.JobCardId', type: typeComponent.hidden, value: this.props.edit.jobCardId ? this.props.edit.jobCardId : this.props.edit.parentId }} />

                                                </Col>
                                            </Row>
                                            :
                                            <Row>
                                                <Col md={6}>
                                                    <SelectList {...{ label: "JobCard name", valueId: this.props.edit.jobCardId, valueName: this.props.edit.jobCardName, name: "JCEffectOnAsset.EditForm.JobCardId", entityName: "jobcardsl" }} />
                                                </Col>
                                                <Col md={6}>
                                                    <SelectList {...{ label: "AssetId name", valueId: this.props.edit.assetId, valueName: this.props.edit.assetSign, name: "JCEffectOnAsset.EditForm.AssetId", entityName: "assetsl" }} />
                                                </Col>
                                            </Row>
                                }
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCEffectOnAsset.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCEffectOnAsset.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "JCEffectOnAsset.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "JCEffectOnAsset.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "JCEffectOnAsset.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.jceffectonasset,
    JCEffectOnAssetStore.actionCreators
)(JCEffectOnAssetEdit as any);

class JCEffectOnAssetEditClass extends JCEffectOnAssetEdit {
}

export const JCEffectOnAssetForAssetEdit = connect(
    (state: ApplicationState) => state.jceffectonassetforasset,
    JCEffectOnAssetForAssetStore.actionCreators
)(JCEffectOnAssetEditClass as any);

class JCEffectOnAssetForJobCardEditClass extends JCEffectOnAssetEdit {
}

export const JCEffectOnAssetForJobCardEdit = connect(
    (state: ApplicationState) => state.jceffectonassetforjobcard,
    JCEffectOnAssetForJobCardStore.actionCreators
)(JCEffectOnAssetForJobCardEditClass as any);