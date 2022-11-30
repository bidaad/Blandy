import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as BookingAssetStore from '../../../store/BookingAsset';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwBookingAsset } from '../../../model/viewModel/VwBookingAsset';
import { stateBase } from '../../../model/general/stateBase';
import SelectList from '../../../components/SelectList';
import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import TAutoComplete from '../../../components/TAutoComplete';
import { Directions } from '../../../model/general';


type BookingAssetProps =
    stateBase<VwBookingAsset> & typeof BookingAssetStore.actionCreators & RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };
class BookingAssetEdit extends React.PureComponent<BookingAssetProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwBookingAsset;
        this.props.saveData(senddata);

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
                            <Col md={12} className="T-header">
                                <TTitle {...{ name: "BookingAsset.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'BookingAsset.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'BookingAsset.EditForm.BookingId', type:typeComponent.hidden, value: this.props.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "AssetId name", valueId: this.props.edit.assetId, valueName: this.props.edit.productSign, name: "BookingAsset.EditForm.AssetId", entityName: "assetsl" }} />
                                    </Col>
                                    <Col md={6}>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BookingAsset.EditForm.CurrentStock', type: typeComponent.number, value: this.props.edit.currentStock }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BookingAsset.EditForm.CurrentPrice', type: typeComponent.number, value: this.props.edit.currentPrice }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BookingAsset.EditForm.AssetCount', type: typeComponent.number, value: this.props.edit.assetCount }} />
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCCurrency", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hccurrencyId, name: "BookingAsset.EditForm.HCCurrencyId", valueName: this.props.edit.currencySign }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BookingAsset.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'BookingAsset.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "BookingAsset.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "BookingAsset.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "BookingAsset.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.bookingasset,
    BookingAssetStore.actionCreators
)(BookingAssetEdit as any);