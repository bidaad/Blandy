import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as StockStore from '../../../store/Stock';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwStock } from '../../../model/viewModel/VwStock';
import { stateBase } from '../../../model/general/stateBase';
import SelectList from '../../../components/SelectList';
import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import { ComponentColumns } from '../../../components/TTabs';
import { Directions } from '../../../model/general';


type StockProps =
    stateBase<VwStock> & typeof StockStore.actionCreators & RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };
class StockEdit extends React.PureComponent<StockProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwStock;
        if (senddata && senddata.id) {
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
    componentDidMount() {
        console.log('stockedit');

    }

    public render() {

        // const columnStructure = [
        //     { key: "stocklang", name: "stocklang" },
        // ] as ComponentColumns[];
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
                                <TTitle {...{ name: "Stock.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'Stock.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'Stock.EditForm.AssestId', type: typeComponent.hidden, value:this.props.edit.assestId?this.props.edit.assestId: this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "DepId name", valueId: this.props.edit.depId, valueName: this.props.edit.depSign, name: "Stock.EditForm.DepId", entityName: "departmentsl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Stock.EditForm.AssetStock', type: typeComponent.number, value: this.props.edit.assetStock }} />

                                        {/* <SelectList {...{ label: "AssetId name", valueId: this.props.edit.assetId, valueName: this.props.edit.productSign, name: "Stock.EditForm.AssestId", entityName: "assetsl" }} /> */}
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col md={6}>

                                        <DateTime {...{name:"Stock.EditForm.Time",value:this.props.edit.time,timePicker:true}} />
                                    </Col>
                                    <Col md={6}>
                                    </Col>
                                </Row> */}
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Stock.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Stock.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "Stock.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "Stock.EditForm.updator", size: 6, value: this.props.edit.updator }} /></Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "Stock.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "Stock.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "Stock.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    {/* {this.props.edit.id !== '' ?
                        <TTabs {...{ component: columnStructure, editId: this.props.edit.id, defaultKey: "stocklang" }} />
                        : null} */}
                </Container>
            </React.Fragment>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.stock,
    StockStore.actionCreators
)(StockEdit as any);