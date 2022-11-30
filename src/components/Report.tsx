import React, { useState, useEffect } from "react";

import Message, {
  MessageSelect,
} from "../containers/Admin/General/Message/Message";
import Product, { ProductSL } from "../containers/Admin/Asset/Product/Product";
import Brand, { BrandSelect } from "../containers/Admin/General/Brand/Brand";
import Language, {
  LanguageSelect,
} from "../containers/Admin/General/Language/Language";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import {
  faSearch,
  faWindowClose,
  faDoorClosed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApplicationState } from "../store";
import * as UserInfo from "../store/UserInfo";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { VwPermisionResource } from "../model/viewModel/VwPermisionResource";
import { Directions } from "../model/general";
import Asset, {
  AssetDep,
  AssetSelect,
} from "../containers/Admin/Asset/Asset/Asset";
import Department, {
  DepartmentSelect,
} from "../containers/Admin/General/Department/Department";
import Person, {
  PersonSelect,
} from "../containers/Admin/General/Person/Person";
import JobCard, {
  JobCardSelect,
} from "../containers/Admin/Maintenance/JobCard";
import Category, {
  CategorySelect,
} from "../containers/Admin/Asset/Category/Category";
import Zone, { ZoneSelect } from "../containers/Admin/General/Zone/Zone";
import User, { UserSelect } from "../containers/Admin/Security/User/User";
import Booking, { BookingSelect } from "../containers/Admin/Booking/Booking";
import Resource, {
  ResourceSelect,
} from "../containers/Admin/Security/Resource/Resource";
import WorkOrder, {
  WorkOrderSelect,
} from "../containers/Admin/Maintenance/WorkOrder";
import AssetDefect from "../containers/Admin/Asset/Asset/AssetDefect";
import UserOpinion, {
  UserOpinionSelect,
} from "../containers/Admin/General/UserOpinion/UserOpinion";
import JCInterval, {
  JCIntervalSelect,
} from "../containers/Admin/Maintenance/JCInterval";
import { APIUrl } from "../helper/config";
import { responseModel } from "../model/general/responseModel";
import axios from "axios";

const components = {
  messagesl: MessageSelect,
  productsl: ProductSL,
  brandsl: BrandSelect,
  languagesl: LanguageSelect,
  assetsl: AssetSelect,
  assetdep: AssetDep,
  departmentsl: DepartmentSelect,
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
};

type ReportProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators &
  RouteComponentProps<{}>;
const Report = (props: ReportProps) => {
  const [show, setShow] = useState(true);
  const [content, setContent] = useState();
  const handleClose = () => setShow(false);
  const fetchReport = async () => {
    const response = await axios.get(
      "http://localhost:50794/Report/Index?id=1"
    );
     ;
    setContent(response.data);
  };
  useEffect(() => {
    // window.open("http://localhost:50794/Report/Index?id=1")
    // window.location.href="http://localhost:50794/Report/Index?id=1"
    // script.src = "https://use.typekit.net/foobar.js";
    // script.async = true;

    // document.body.appendChild(script);
    fetchReport();
    // fetch("http://localhost:50794" + "/Report/Index?id=1", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + props.token,
    //     lang: props.lang.abr,
    //   },
    // })
    //   .then((resp) => {
    //     return resp.y;
    //   })
    //   .then((text) => {
    //        
    //     setContent(text);
    //   })
    //   .catch((error) => {
    //      ;
    //     props.UserLoad(false);
    //     console.log(error);
    //   });
  }, []);
  let Rtl = "";
  if (props.dir === Directions.RTL) {
    Rtl = "Rtl";
  }

  return (
    // <div className="rowContainer"
    <div>
      <Modal size="xl" show={show} onHide={handleClose} className={Rtl}>
        <Modal.Header>
          <Modal.Title>&nbsp;</Modal.Title>
          <FontAwesomeIcon
            icon={faWindowClose}
            color="gray"
            size="lg"
            onClick={handleClose}
          />
        </Modal.Header>
        <Modal.Body>
          <React.Fragment>
            <div dangerouslySetInnerHTML={{ __html: content + "" }} />
          </React.Fragment>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(Report as any);
