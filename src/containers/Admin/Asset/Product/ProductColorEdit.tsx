import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as ProductColorStore from '../../../../store/ProductColor';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwProductColor } from '../../../../model/viewModel/VwProductColor';
import { stateBase } from '../../../../model/general/stateBase';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import TAutoComplete from '../../../../components/TAutoComplete';
import { Directions } from '../../../../model/general';


type ProductColorProps =
    stateBase<VwProductColor> & typeof ProductColorStore.actionCreators & RouteComponentProps<{}>;
class ProductColorEdit extends React.PureComponent<ProductColorProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwProductColor;
        this.props.saveData(senddata);

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
                            <Col md={12} className="T-header">
                                <TTitle {...{ name: "ProductColor.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'ProductColor.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'ProductColor.EditForm.productId', type: typeComponent.hidden, value: this.props.edit.productId ? this.props.edit.productId : this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>

                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCColor", action: "HCList", selectName: "sign", valueId: this.props.edit.hccolorId, name: "ProductColor.EditForm.HCColorId", valueName: this.props.edit.colorSign }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'ProductColor.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'ProductColor.EditForm.Description', type: typeComponent.text, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                        <TButton {...{ name: "ProductColor.EditForm.BTN_Save", submit: this.handleSubmit }} />
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "ProductColor.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.productcolor,
    ProductColorStore.actionCreators
)(ProductColorEdit as any);