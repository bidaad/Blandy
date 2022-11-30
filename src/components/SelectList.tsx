import React, { useState, useEffect } from 'react'
import { MessageSelect } from '../containers/Admin/General/Message/Message';
import { ProductSL } from '../containers/Admin/Asset/Product/Product';
import { BrandSelect } from '../containers/Admin/General/Brand/Brand';
import { LanguageSelect } from '../containers/Admin/General/Language/Language';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { faSearch, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApplicationState } from '../store';
import * as UserInfo from '../store/UserInfo';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { VwPermisionResource } from '../model/viewModel/VwPermisionResource';
import { Directions } from '../model/general';
import { AssetDep, AssetSelect } from '../containers/Admin/Asset/Asset/Asset';
import { DepartmentSelect } from '../containers/Admin/General/Department/Department';
import { PersonSelect } from '../containers/Admin/General/Person/Person';
import { JobCardSelect } from '../containers/Admin/Maintenance/JobCard';
import { CategorySelect } from '../containers/Admin/Asset/Category/Category';
import { ZoneSelect } from '../containers/Admin/General/Zone/Zone';
import { UserSelect } from '../containers/Admin/Security/User/User';
import { BookingSelect } from '../containers/Admin/Booking/Booking';
import { ResourceSelect } from '../containers/Admin/Security/Resource/Resource';
import { WorkOrderSelect } from '../containers/Admin/Maintenance/WorkOrder';
import AssetDefect from '../containers/Admin/Asset/Asset/AssetDefect';
import { UserOpinionSelect } from '../containers/Admin/General/UserOpinion/UserOpinion';
import { JCIntervalSelect } from '../containers/Admin/Maintenance/JCInterval';
import { ShipRuleSelect } from '../containers/Admin/Shipping/ShipRule';
import { LoadDeliveryTTWeekDaySelect } from '../containers/Admin/Shipping/LoadDeliveryTTWeekDay';
import { ContactPerson } from '../containers/Admin/General/Contact/Contact';
import { ContractSelect } from '../containers/Admin/Finance/Contract';

const components = {
    messagesl: MessageSelect,
    productsl: ProductSL,
    brandsl: BrandSelect,
    languagesl: LanguageSelect,
    assetsl: AssetSelect,
    assetdep: AssetDep,
    departmentsl: DepartmentSelect,
    shiprulesl: ShipRuleSelect,
    personsl: PersonSelect,
    jobcardsl: JobCardSelect,
    categorysl: CategorySelect,
    zonesl: ZoneSelect,
    usersl: UserSelect,
    bookingsl: BookingSelect,
    resourcesl: ResourceSelect,
    workordersl: WorkOrderSelect,
    assetdefect: AssetDefect,
    useropinionsl: UserOpinionSelect,
    jcintervalsl: JCIntervalSelect,
    contactperson: ContactPerson,
    contractsl: ContractSelect,
    loaddeliveryttweekdaysl: LoadDeliveryTTWeekDaySelect,
};

type SelectListProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    RouteComponentProps<{}> &
    {
        name: string;
        label: string;
        valueId: string;
        valueName: string;
        valuefiltersl: string;
        noselectId: null;
        entityName:
        "messagesl" |
        "productsl" |
        "brandsl" |
        "languagesl" |
        "assetsl" |
        "loaddeliveryttweekdaysl" |
        "departmentsl" |
        "personsl" |
        "jobcardsl" |
        "categorysl" |
        "zonesl" |
        "resourcesl" |
        "bookingsl" |
        "workordersl" |
        "assetdefect" |
        "assetdep" |
        "useropinionsl" |
        "usersl" |
        "jcintervalsl"
        ;
    };
const SelectList = (props: SelectListProps) => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState<any>(props.valueId);
    const [name, setName] = useState(props.valueName);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClear = () => {
        setShow(false);
        setValue(null);
        setName('');
    };
    const selectRecord = (id: string, selectedColumns: string) => {
        setValue(id);
        setName(selectedColumns);
        handleClose();
    }


    var MyComponent = components[props.entityName];

    if (MyComponent === undefined) {
        switch (props.entityName) {
            case 'messagesl':
                MyComponent = MessageSelect
                break;
            case 'productsl':
                MyComponent = ProductSL
                break;
            case 'brandsl':
                MyComponent = BrandSelect
                break;
            case 'languagesl':
                MyComponent = LanguageSelect
                break;
            case 'assetsl':
                MyComponent = AssetSelect
                break;
            case 'departmentsl':
                MyComponent = DepartmentSelect
                break;
            case 'personsl':
                MyComponent = PersonSelect
                break;
            case 'jobcardsl':
                MyComponent = JobCardSelect
                break;
            case 'zonesl':
                MyComponent = ZoneSelect
                break;
            case 'usersl':
                MyComponent = UserSelect
                break;
            case 'bookingsl':
                MyComponent = BookingSelect
                break;
            case 'resourcesl':
                MyComponent = ResourceSelect
                break;
            case 'workordersl':
                MyComponent = WorkOrderSelect
                break;
            case 'useropinionsl':
                MyComponent = UserOpinionSelect
                break;
            case 'jcintervalsl':
                MyComponent = JCIntervalSelect
                break;
            case 'categorysl':
                MyComponent = CategorySelect
                break;
        }
    }
    let disbaled = false;
    let isRequired = '';
    var myResource: VwPermisionResource | undefined;

    useEffect(() => {
        MyComponent = components[props.entityName];
    }, [props.entityName]);

    if (props.resources) {
        let Resources = props.resources as VwPermisionResource[];
        if (Resources) {
            myResource = Resources.find(c => c.resourceCode === props.name.toString().toUpperCase() && c.lang === props.lang.abr.toUpperCase());
        }
    }
    if (myResource) {
        if (myResource.actionTypes) {
            if (!myResource.actionTypes.toUpperCase().includes("V"))
                return null;
            if (!myResource.actionTypes.toUpperCase().includes("E"))
                disbaled = true;

        }
    }
    // if (myResource.resourceNullable === false) {
    //     isRequired = 'required';
    // }

    //if (MyComponent === undefined)
    //    MyComponent = Asset

    let Rtl = "";
    if (props.dir === Directions.RTL) {
        Rtl = "Rtl";
    }



    if (!props.name || myResource === undefined) {
        return null;
    }
    else
        return (

            // <div className="rowContainer"
            <div>
                <div>
                    <Form.Label>{(myResource as VwPermisionResource).resourceLanguageName}</Form.Label>
                    <InputGroup>

                        <Button variant="success" onClick={handleShow}>
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                        <Button variant="danger" onClick={handleClear}>
                            X
                        </Button>
                        <Form.Control disabled={disbaled} name={props.name.split('.')[2]} defaultValue={value} onChange={(e: any) => setValue(e.target.value)} type='hidden' />
                        <Form.Control className={isRequired} disabled={disbaled} name={props.label} value={name} type='text' />

                    </InputGroup>

                </div>
                <Modal size="lg" show={show} onHide={handleClose} className={Rtl}>
                    <Modal.Header>
                        <Modal.Title>&nbsp;</Modal.Title>
                        <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={handleClose} />
                    </Modal.Header>
                    <Modal.Body>

                        <MyComponent {...{ selectRecord: selectRecord, editable: false, isSelected: true, valuefiltersl: props.valuefiltersl, noselectId: props.noselectId }} />

                    </Modal.Body>
                </Modal>

            </div>
        )
}

export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(SelectList as any);



