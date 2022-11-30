import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as AssetPricing from '../../../../store/AssetPricing';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwProductAttribute } from '../../../../model/viewModel/VwProductAttribute';
import { stateBase } from '../../../../model/general/stateBase';
import TAutoComplete from '../../../../components/TAutoComplete';
import TButton from '../../../../components/TButton';
import { VwPricing } from '../../../../model/viewModel/VwPricing';
import TTitle from '../../../../components/TTitle';
import { Directions } from '../../../../model/general';


type AssetPricingProps =
    stateBase<VwProductAttribute> &
    typeof AssetPricing.actionCreators &
    RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };

class AssetPriceEdit extends React.PureComponent<AssetPricingProps, { parentId: string }> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            parentId: this.props.parentId,
        }
    }
    handleSubmit(event: any) {
        event.preventDefault();

        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwPricing;
        if (senddata && senddata.id) {
            this.props.saveData(senddata);
        }
        else {
            this.props.saveData(senddata);
            this.props.closeModal();
        }
        // this.props.saveData(senddata);
        // this.props.closeModal();
        // this.props.refreshGrid(this.props.parentId);
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
        console.log('this.props.edit=' + this.props.edit);

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
                            <Form className="edit-form">
                                <InputBox {...{ name: 'Pricing.EditForm.id', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'Pricing.EditForm.assetId', type: typeComponent.hidden, value: this.props.edit.assetId ? this.props.edit.assetId : this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCCurrency", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hccurrencyId, name: "Pricing.EditForm.hCCurrencyId", valueName: this.props.edit.sign }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Pricing.EditForm.price', type: typeComponent.number, value: this.props.edit.price }} />
                                    </Col>
                                    {/* <Col md={4} >
                                        <DateTime {...{ name: 'Pricing.EditForm.fromDateTime', value: this.props.edit.fromDateTime, datepicker: true }} />
                                    </Col> */}
                                    {/* <Col md={4} >
                                        <DateTime {...{ name: 'Pricing.EditForm.toDateTime', value: this.props.edit.toDateTime, datepicker: true }} />
                                    </Col> */}


                                </Row>
                                {/* <Row>
                                    <Col md={4}>
                                        <TAutoComplete {...{ controller: "HCCurrency", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hccurrencyId, name: "Pricing.EditForm.hCCurrencyId", valueName: this.props.edit.sign }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputBox {...{ name: 'Pricing.EditForm.fromAmount', type: typeComponent.number, value: this.props.edit.fromAmount }} />

                                    </Col>
                                    <Col md={4}>
                                        <InputBox {...{ name: 'Pricing.EditForm.toAmount', type: typeComponent.number, value: this.props.edit.toAmount }} />

                                    </Col>


                                </Row> */}
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Pricing.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Pricing.EditForm.isActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>

                                </Row>

                                <Row>
                                    <Col md={6}><TTitle {...{ name: "Pricing.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "Pricing.EditForm.updator", size: 6, value: this.props.edit.updator }} /></Col>
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
                          name: "Pricing.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "Pricing.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={2} >
                                        <TButton {...{ name: "Pricing.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.assetpricing,
    AssetPricing.actionCreators
)(AssetPriceEdit as any);