import React, { useEffect } from "react";
import Product from "../containers/Admin/Asset/Product/Product";
import * as UserInfo from "../store/UserInfo";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Directions } from "../model/general";
import Department from "../containers/Admin/General/Department/Department";
import ProductLang from "../containers/Admin/Asset/Product/ProductLang";
import ProductCategory from "../containers/Admin/Asset/Product/ProductCategory";
import ProductAttribute from "../containers/Admin/Asset/Product/ProductAttribute";
import Document from "../containers/Admin/Document/Document";

import HCActionTypeLang from "../containers/Admin/HardCode/HCActionTypeLang";
import HCAssetHealthStatusLang from "../containers/Admin/HardCode/HCAssetHealthStatusLang";
import HCAssetQualityLang from "../containers/Admin/HardCode/HCAssetQualityLang";
import HCAttributeTitleLang from "../containers/Admin/HardCode/HCAttributeTitleLang";
import HCContactTypeLang from "../containers/Admin/HardCode/HCContactTypeLang";
import HCCurrencyLang from "../containers/Admin/HardCode/HCCurrencyLang";
import HCDepTypeLang from "../containers/Admin/HardCode/HCDepTypeLang";
import HCGenderLang from "../containers/Admin/HardCode/HCGenderLang";
import HCJCOperationTypeLang from "../containers/Admin/HardCode/HCJCOperationTypeLang";
import HCJobCardTypeLang from "../containers/Admin/HardCode/HCJobCardTypeLang";
import HCMessageTypeLang from "../containers/Admin/HardCode/HCMessageTypeLang";
import HCPolicyTitleLang from "../containers/Admin/HardCode/HCPolicyTitleLang";
import HCResourceTypeLang from "../containers/Admin/HardCode/HCResourceTypeLang";
import HCSkillTitleLang from "../containers/Admin/HardCode/HCSkillTitleLang";
import HCUnitLang from "../containers/Admin/HardCode/HCUnitLang";
import HCUserTypeLang from "../containers/Admin/HardCode/HCUserTypeLang";
import HCWHOperationStatusLang from "../containers/Admin/HardCode/HCWHOperationStatusLang";
import HCWHOperationTypeLang from "../containers/Admin/HardCode/HCWHOperationTypeLang";
import HCZoneTypeLang from "../containers/Admin/HardCode/HCZoneTypeLang";
import AssignmentDetail from "../containers/Admin/Asset/Assignment/AssignmentDetail";
import MachineRelated from "../containers/Admin/Asset/Product/MachineRelated";
import JCEffectOnAsset, {
  JCEffectOnAssetForAsset,
  JCEffectOnAssetForJobCard,
} from "../containers/Admin/Maintenance/JCEffectOnAsset";
import JCEffectOnCategory from "../containers/Admin/Maintenance/JCEffectOnCategory";
import JCEffectOnProduct from "../containers/Admin/Maintenance/JCEffectOnProduct";
import JCNeedProduct from "../containers/Admin/Maintenance/JCNeedProduct";
import JCUserReject, {
  JCUserRejectAsset,
  JCUserRejectJobcard,
} from "../containers/Admin/Maintenance/JCUserReject";
import User from "../containers/Admin/Security/User/User";
import LoginHistory from "../containers/Admin/Security/User/LoginHistory";
import Booking, { BookingForAsset } from "../containers/Admin/Booking/Booking";
import BookingWork from "../containers/Admin/Booking/BookingWork";
import BookingAsset from "../containers/Admin/Booking/BookingAsset";
import StockLang from "../containers/Admin/Booking/StockLang";
import BillOLBooking from "../containers/Admin/Shipping/BillOLBooking";
import BillOLBKShipStatus from "../containers/Admin/Shipping/BillOLBKShipStatus";
import LoadDeliveryTTWeekDay from "../containers/Admin/Shipping/LoadDeliveryTTWeekDay";
import CategoryLang from "../containers/Admin/Asset/Category/CategoryLang";
import CategoryAttribute from "../containers/Admin/Asset/Category/CategoryAttribute";
import AssetDefect from "../containers/Admin/Asset/Asset/AssetDefect";
import AssetLang from "../containers/Admin/Asset/Asset/AssetLang";
import AssetOperStatus from "../containers/Admin/Asset/Asset/AssetOperStatus";
import AssetSelectionType from "../containers/Admin/Asset/Asset/AssetSelectionType";
import AssetAttribute from "../containers/Admin/Asset/Asset/AssetAttribute";
import { ApplicationState } from "../store";
import DepActiveInZone from "../containers/Admin/General/Department/DepActiveInZone";
import DepartmentDepType from "../containers/Admin/General/Department/DepartmentDepType";
import DepBrand from "../containers/Admin/General/Department/DepBrand";
import DepCategory from "../containers/Admin/General/Department/DepCategory";
import DepPolicy from "../containers/Admin/General/Department/DepPolicy";
import DepartmentLang from "../containers/Admin/General/Department/DepartmentLang";
import DepWeekWorkTime from "../containers/Admin/General/Department/DepWeekWorkTime";
import DepWorkDate from "../containers/Admin/General/Department/DepWorkDate";
import DepPolicyLang from "../containers/Admin/General/Department/DepPolicyLang";
import LoadDeliveryTimeTitle from "../containers/Admin/Shipping/LoadDeliveryTimeTitle";
import LoadDeliveryTimeTitleEdit from "../containers/Admin/Shipping/LoadDeliveryTimeTitleEdit";
import MessageLang from "../containers/Admin/General/Message/MessageLang";
import AssetPrice from "../containers/Admin/Asset/Asset/AssetPrice";
import Stock from "../containers/Admin/Booking/Stock";
import ResourceLang from "../containers/Admin/Security/Resource/ResourceLang";
import SurveySubjectParameter from "../containers/Admin/Crm/SurveySubjectParameter";
import RolePermission from "../containers/Admin/Security/Resource/RolePermission";
import BrandLang from "../containers/Admin/General/Brand/BrandLang";
import UserRole from "../containers/Admin/Security/User/UserRole";
import PersonLang from "../containers/Admin/General/Person/PersonLang";
import Contact, {
  ContactDep,
  ContactPerson,
} from "../containers/Admin/General/Contact/Contact";
import ChatDetail from "../containers/Admin/Crm/ChatDetail";
import JCNeedCategory from "../containers/Admin/Maintenance/JCNeedCategory";
import JobCardLang from "../containers/Admin/Maintenance/JobCardLang";
import JCInterval from "../containers/Admin/Maintenance/JCInterval";
import WorkOrder, {
  WorkOrderAsset,
  WorkOrderJobcard,
} from "../containers/Admin/Maintenance/WorkOrder";
import Guarantee, {
  GuaranteeDep,
  GuaranteeAsset,
} from "../containers/Admin/Guarantee/Guarantee";
import GuaranteeEdit, {
  GuaranteeDepEdit,
  GuaranteeAssetEdit,
} from "../containers/Admin/Guarantee/GuaranteeEdit";
import ShipRule, { ShipRuleDep } from "../containers/Admin/Shipping/ShipRule";
import ShipRuleEdit, {
  ShipRuleDepEdit,
} from "../containers/Admin/Shipping/ShipRuleEdit";
import Asset, {
  AssetDep,
  AssetPerson,
} from "../containers/Admin/Asset/Asset/Asset";
import AssetEdit, {
  AssetPersonEdit,
} from "../containers/Admin/Asset/Asset/AssetEdit";
import WorkOrderLang from "../containers/Admin/Maintenance/WorkOrderLang";
import {
  ContactDepEdit,
  ContactPersonEdit,
} from "../containers/Admin/General/Contact/ContactEdit";
import BillOfLading, {
  BillOfLadingDep,
} from "../containers/Admin/Shipping/BillOfLading";
import BillOfLadingEdit, {
  BillOfLadingEditDep,
} from "../containers/Admin/Shipping/BillOfLadingEdit";
import UserFavouriteAsset, {
  UserFavouriteAssetUser,
  UserFavouriteAssetForAsset,
} from "../containers/Admin/Security/User/UserFavouriteAsset";
import UserFavouriteAssetEdit, {
  UserFavouriteAssetForAssetEdit,
  UserFavouriteAssetUserEdit,
} from "../containers/Admin/Security/User/UserFavouriteAssetEdit";
import UserEdit from "../containers/Admin/Security/User/UserEdit";
import UserOpinion, {
  UserOpinionAsset,
  UserOpinionUser,
} from "../containers/Admin/General/UserOpinion/UserOpinion";
import UserOpinionEdit, {
  UserOpinionAssetEdit,
  UserOpinionUserEdit,
} from "../containers/Admin/General/UserOpinion/UserOpinionEdit";
import { BookingForAssetEdit } from "../containers/Admin/Booking/BookingEdit";
import WorkOrderEdit, {
  WorkOrderAssetEdit,
  WorkOrderJobcardEdit,
} from "../containers/Admin/Maintenance/WorkOrderEdit";
import JCEffectOnAssetEdit, {
  JCEffectOnAssetForAssetEdit,
  JCEffectOnAssetForJobCardEdit,
} from "../containers/Admin/Maintenance/JCEffectOnAssetEdit";
import JCUserRejectEdit, {
  JCUserRejectAssetEdit,
  JCUserRejectJobcardEdit,
} from "../containers/Admin/Maintenance/JCUserRejectEdit";
import AssetUsage from "../containers/Admin/Asset/Asset/AssetUsage";
import AssetUsageEdit from "../containers/Admin/Asset/Asset/AssetUsageEdit";
import ResourceLangEdit from "../containers/Admin/Security/Resource/ResourceLangEdit";
import MachineRelatedEdit from "../containers/Admin/Asset/Product/MachineRelatedEdit";
import CategorySelectionType from "../containers/Admin/Asset/Category/CategorySelectionType";
import CategorySelectionTypeEdit from "../containers/Admin/Asset/Category/CategorySelectionTypeEdit";
import DepSkill from "../containers/Admin/General/Department/DepSkill";
import ZoneHardCondition from "../containers/Admin/General/Zone/ZoneHardCondition";
import Contract from "../containers/Admin/Finance/Contract";
import BookingReturn from "../containers/Admin/Booking/BookingReturn";
import ProductLife from "../containers/Admin/Asset/Product/ProductLife";
import UserFavouriteDep from "../containers/Admin/Security/User/UserFavouriteDep";
import ProductColor from "../containers/Admin/Asset/Product/ProductColor";
import PersonCategory from "../containers/Admin/General/Person/PersonCategory";
import PersonActiveInZone from "../containers/Admin/General/Person/PersonActiveInZone";
import DepSkillEdit from "../containers/Admin/General/Department/DepSkillEdit";
import ContractEdit from "../containers/Admin/Finance/ContractEdit";
import BookingReturnEdit from "../containers/Admin/Booking/BookingReturnEdit";
import ProductLifeEdit from "../containers/Admin/Asset/Product/ProductLifeEdit";
import ProductColorEdit from "../containers/Admin/Asset/Product/ProductColorEdit";
import PersonSkillEdit from "../containers/Admin/General/Person/PersonSkillEdit";
import PersonActiveInZoneEdit from "../containers/Admin/General/Person/PersonActiveInZoneEdit";
import PersonSkill from "../containers/Admin/General/Person/PersonSkill";
import PersonProductEdit from "../containers/Admin/General/Person/PersonProductEdit";
import UserFavouriteDepEdit from "../containers/Admin/Security/User/UserFavouriteDepEdit";
import UserFriend from "../containers/Admin/Security/User/UserFriend";
import PersonCategoryEdit from "../containers/Admin/General/Person/PersonCategoryEdit";
import UserFriendEdit from "../containers/Admin/Security/User/UserFriendEdit";
import ZoneHardConditionEdit from "../containers/Admin/General/Zone/ZoneHardConditionEdit";
import PersonProduct from "../containers/Admin/General/Person/PersonProduct";
import AssetPhotographyReq from "../containers/Admin/Asset/Asset/AssetPhotographyReq";
import AssetPhotographyReqEdit from "../containers/Admin/Asset/Asset/AssetPhotographyReqEdit";

import HCBookingStatusLang from "../containers/Admin/HardCode/HCBookingStatusLang";
import HCColorLang from "../containers/Admin/HardCode/HCColorLang";
import HCGuaranteeTypelang from "../containers/Admin/HardCode/HCGuaranteeTypelang";
import HCHardConditionLang from "../containers/Admin/HardCode/HCHardConditionLang";
import HCOperationStatusLang from "../containers/Admin/HardCode/HCOperationStatusLang";
import HCPaymentStatusLang from "../containers/Admin/HardCode/HCPaymentStatusLang";
import HCPaymentTypeLang from "../containers/Admin/HardCode/HCPaymentTypeLang";
import HCPlanTypeLang from "../containers/Admin/HardCode/HCPlanTypeLang";
import HCPredecessorTypeLang from "../containers/Admin/HardCode/HCPredecessorTypeLang";
import HCPriorityLang from "../containers/Admin/HardCode/HCPriorityLang";
import HCShipStatusLang from "../containers/Admin/HardCode/HCShipStatusLang";
import HCShipTypeLang from "../containers/Admin/HardCode/HCShipTypeLang";
import HCWeekDayLang from "../containers/Admin/HardCode/HCWeekDayLang";
import HCWOStatusLang from "../containers/Admin/HardCode/HCWOStatusLang";
import ZoneLang from "../containers/Admin/General/Zone/ZoneLang";
import ZoneLangEdit from "../containers/Admin/General/Zone/ZoneLangEdit";

const components = {
  product: Product,
  productlang: ProductLang,
  productcategory: ProductCategory,
  productattribute: ProductAttribute,
  rolepermission: RolePermission,
  document: Document,
  assignmentdetail: AssignmentDetail,

  hcactiontypelang: HCActionTypeLang,
  hcassethealthstatuslang: HCAssetHealthStatusLang,
  hcassetqualitylang: HCAssetQualityLang,
  hcattributetitlelang: HCAttributeTitleLang,
  hccontacttypelang: HCContactTypeLang,
  hccurrencylang: HCCurrencyLang,
  hcdeptypelang: HCDepTypeLang,
  hcgenderlang: HCGenderLang,
  hcjcoperationtypelang: HCJCOperationTypeLang,
  hcjobcardtypelang: HCJobCardTypeLang,
  hcmessagetypelang: HCMessageTypeLang,
  hcpolicytitlelang: HCPolicyTitleLang,
  hcresourcetypelang: HCResourceTypeLang,
  hcskilltitlelang: HCSkillTitleLang,
  hcunitlang: HCUnitLang,
  hcusertypelang: HCUserTypeLang,
  hcwhoperationstatuslang: HCWHOperationStatusLang,
  hcwhoperationtypelang: HCWHOperationTypeLang,
  hczonetypelang: HCZoneTypeLang,
  jceffectoncategory: JCEffectOnCategory,
  jceffectonproduct: JCEffectOnProduct,
  jcneedcategory: JCNeedCategory,
  jcneedproduct: JCNeedProduct,
  jobcardlang: JobCardLang,
  jcinterval: JCInterval,
  loginhistory:LoginHistory,
  user: User,
  booking: Booking,
  bookingasset: BookingAsset,
  bookingwork: BookingWork,
  stocklang: StockLang,
  stock: Stock,
  billolbooking: BillOLBooking,
  billolbkshipstatus: BillOLBKShipStatus,
  loaddeliveryttweekday: LoadDeliveryTTWeekDay,
  categorylang: CategoryLang,
  categoryattribute: CategoryAttribute,

  assetdefect: AssetDefect,
  assetattribute: AssetAttribute,
  assetlang: AssetLang,
  assetoperstatus: AssetOperStatus,
  assetselectiontype: AssetSelectionType,
  pricing: AssetPrice,
  depactiveinzone: DepActiveInZone,
  departmentdeptype: DepartmentDepType,
  departmentlang: DepartmentLang,
  depbrand: DepBrand,
  depcategory: DepCategory,
  deppolicy: DepPolicy,
  deppolicylang: DepPolicyLang,
  depweekworktime: DepWeekWorkTime,
  depworkdate: DepWorkDate,
  department: Department,
  messagelang: MessageLang,
  resourcelang: ResourceLang,
  resourcelangedit: ResourceLangEdit,
  surveysubjectparameter: SurveySubjectParameter,
  brandlang: BrandLang,
  userrole: UserRole,
  personLang: PersonLang,
  contact: Contact,
  chatdetail: ChatDetail,
  workorder: WorkOrder,
  workorderedit: WorkOrderEdit,
  workorderasset: WorkOrderAsset,
  workorderassetedit: WorkOrderAssetEdit,
  workorderjobcard: WorkOrderJobcard,
  workorderjobcardedit: WorkOrderJobcardEdit,
  loaddeliverytimetitle: LoadDeliveryTimeTitle,
  loaddeliverytimetitleedit: LoadDeliveryTimeTitleEdit,
  guarantee: Guarantee,
  guaranteedep: GuaranteeDep,
  guaranteedepedit: GuaranteeDepEdit,
  shiprule: ShipRule,
  shipruleedit: ShipRuleEdit,
  asset: Asset,
  assetedit: AssetEdit,
  guaranteeedit: GuaranteeEdit,
  workorderlang: WorkOrderLang,
  assetdep: AssetDep,
  contactdep: ContactDep,
  contactdepedit: ContactDepEdit,
  shipruledep: ShipRuleDep,
  shipruledepedit: ShipRuleDepEdit,
  billoflading: BillOfLading,
  billofladingedit: BillOfLadingEdit,
  billofladingdep: BillOfLadingDep,
  billofladingeditdep: BillOfLadingEditDep,
  assetperson: AssetPerson,
  assetpersonedit: AssetPersonEdit,
  contactperson: ContactPerson,
  contactpersonedit: ContactPersonEdit,
  guaranteeasset: GuaranteeAsset,
  guaranteeassetedit: GuaranteeAssetEdit,
  userfavouriteasset: UserFavouriteAsset,
  userfavouriteassetedit: UserFavouriteAssetEdit,
  userfavouriteassetforasset: UserFavouriteAssetForAsset,
  userfavouriteasseteditforassetedit: UserFavouriteAssetForAssetEdit,
  userfavouriteassetuser: UserFavouriteAssetUser,
  userfavouriteassetuseredit: UserFavouriteAssetUserEdit,
  userfavouritedep: UserFavouriteDep,
  userfavouritedepedit: UserFavouriteDepEdit,
  useredit: UserEdit,
  useropinion: UserOpinion,
  useropinionedit: UserOpinionEdit,
  useropinionasset: UserOpinionAsset,
  useropinionassetedit: UserOpinionAssetEdit,
  useropinionuser: UserOpinionUser,
  useropinionuseredit: UserOpinionUserEdit,
  bookingforasset: BookingForAsset,
  bookingforassetedit: BookingForAssetEdit,
  jceffectonasset: JCEffectOnAsset,
  jceffectonassetedit: JCEffectOnAssetEdit,
  jceffectonassetforasset: JCEffectOnAssetForAsset,
  jceffectonassetforassetedit: JCEffectOnAssetForAssetEdit,
  jceffectonassetforjobcard: JCEffectOnAssetForJobCard,
  jceffectonassetforjobcardedit: JCEffectOnAssetForJobCardEdit,
  jcuserreject: JCUserReject,
  jcuserrejectedit: JCUserRejectEdit,
  jcuserrejectasset: JCUserRejectAsset,
  jcuserrejectassetedit: JCUserRejectAssetEdit,
  jcuserrejectjobcard: JCUserRejectJobcard,
  jcuserrejectjobcardedit: JCUserRejectJobcardEdit,
  assetusage: AssetUsage,
  assetusageedit: AssetUsageEdit,
  machinerelated: MachineRelated,
  machinerelatededit: MachineRelatedEdit,
  categoryselectiontype: CategorySelectionType,
  categoryselectiontypeedit: CategorySelectionTypeEdit,

  zonehardcondition: ZoneHardCondition,
  UserFavouriteDep: UserFavouriteDep,
  UserFavouriteDepedit: UserFavouriteDepEdit,
  depskill: DepSkill,
  contract: Contract,
  userfriend: UserFriend,
  bookingreturn: BookingReturn,
  productlife: ProductLife,
  productcolor: ProductColor,
  personproduct: PersonProduct,
  personcategory: PersonCategory,
  personskill: PersonSkill,
  personactiveinzone: PersonActiveInZone,
  assetphotographyreq: AssetPhotographyReq,

  zonehardconditionedit: ZoneHardConditionEdit,
  depskilledit: DepSkillEdit,
  contractedit: ContractEdit,
  userfriendedit: UserFriendEdit,
  bookingreturnedit: BookingReturnEdit,
  productlifeedit: ProductLifeEdit,
  productcoloredit: ProductColorEdit,
  personproductedit: PersonProductEdit,
  personcategoryedit: PersonCategoryEdit,
  personskilledit: PersonSkillEdit,
  personactiveinzoneedit: PersonActiveInZoneEdit,
  assetphotographyreqedit: AssetPhotographyReqEdit,


  hcbookingstatuslang: HCBookingStatusLang,
  hccolorlang: HCColorLang,
  hcguaranteetypelang: HCGuaranteeTypelang,
  hchardconditionlang: HCHardConditionLang,
  hcoperationstatuslang: HCOperationStatusLang,
  hcpaymentstatuslang: HCPaymentStatusLang,
  hcpaymenttypelang: HCPaymentTypeLang,
  hcplantypelang: HCPlanTypeLang,
  hcpredecessortypelang: HCPredecessorTypeLang,
  hcprioritylang: HCPriorityLang,
  hcshipstatuslang: HCShipStatusLang,
  hcshiptypelang: HCShipTypeLang,
  hcweekdaylang: HCWeekDayLang,
  hcwostatuslang: HCWOStatusLang,
  zonelang:ZoneLang,
  zonelangedit:ZoneLangEdit


};

type DynamicComponentProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators &
  RouteComponentProps<{}> & {
    folderName: string;
    parentId: any;
    typeForm?: string;
    isTabDetail?: boolean;
    entityName:
    | "product"
    | "productlang"
    | "productcategory"
    | "productattribute"
    | "rolepermission"
    | "document"
    | "department"
    | "machinerelated"
    | "machinerelatededit"
    | "hcactiontypelang"
    | "hcassethealthstatuslang"
    | "hcassetqualitylang"
    | "hcattributetitlelang"
    | "hccontacttypelang"
    | "hccurrencylang"
    | "hcdeptypelang"
    | "hcgenderlang"
    | "hcjcoperationtypelang"
    | "hcjobcardtypelang"
    | "hcmessagetypelang"
    | "hcpolicytitlelang"
    | "hcresourcetypelang"
    | "hcskilltitlelang"
    | "hcunitlang"
    | "hcusertypelang"
    | "hcwhoperationstatuslang"
    | "hcwhoperationtypelang"
    | "hczonetypelang"
    | "assignmentdetail"
    | "jceffectonasset"
    | "jceffectoncategory"
    | "jceffectonproduct"
    | "jcneedproduct"
    | "jcinterval"
    | "user"
    |"loginhistory"
    | "booking"
    | "bookingasset"
    | "bookingwork"
    | "stocklang"
    | "billolbooking"
    | "billolbkshipstatus"
    | "categoryattribute"
    | "categorylang"
    | "assetattribute"
    | "assetdefect"
    | "assetselectiontype"
    | "assetlang"
    | "assetoperstatus"
    | "userrole"
    | "depactiveinzone"
    | "departmentdeptype"
    | "departmentlang"
    | "depbrand"
    | "depcategory"
    | "deppolicy"
    | "deppolicylang"
    | "depweekworktime"
    | "depworkdate"
    | "messagelang"
    | "pricing"
    | "resourcelang"
    | "resourcelangedit"
    | "stock"
    | "surveysubjectparameter"
    | "brandlang"
    | "personLang"
    | "contact"
    | "contactdep"
    | "contactdepedit"
    | "chatdetail"
    | "workorder"
    | "loaddeliverytimetitle"
    | "loaddeliverytimetitleedit"
    | "guarantee"
    | "guaranteedep"
    | "shiprule"
    | "shipruleedit"
    | "guaranteeedit"
    | "guaranteedepedit"
    | "workorder"
    | "workorderlang"
    | "assetdep"
    | "shipruledep"
    | "shipruledepedit"
    | "billoflading"
    | "billofladingedit"
    | "billofladingdep"
    | "billofladingeditdep"
    | "assetperson"
    | "assetpersonedit"
    | "contactperson"
    | "contactpersonedit"
    | "guaranteeasset"
    | "guaranteeassetedit"
    | "userfavouriteasset"
    | "userfavouriteassetedit"
    | "userfavouriteassetforasset"
    | "userfavouriteasseteditforassetedit"
    | "userfavouriteassetuser"
    | "userfavouriteassetuseredit"
    | "userfavouritedep"
    | "userfavouritedepedit"
    | "useredit"
    | "useropinion"
    | "useropinionedit"
    | "useropinionasset"
    | "useropinionassetedit"
    | "useropinionuser"
    | "useropinionuseredit"
    | "bookingforasset"
    | "bookingforassetedit"
    | "workorderedit"
    | "workorderasset"
    | "workorderassetedit"
    | "workorderjobcard"
    | "workorderjobcardedit"
    | "jceffectonasset"
    | "jceffectonassetedit"
    | "jceffectonassetforasset"
    | "jceffectonassetforassetedit"
    | "jceffectonassetforjobcard"
    | "jceffectonassetforjobcardedit"
    | "jcuserreject"
    | "jcuserrejectedit"
    | "jcuserrejectasset"
    | "jcuserrejectassetedit"
    | "jcuserrejectjobcard"
    | "jcuserrejectjobcardedit"
    | "assetusage"
    | "assetusageedit"
    | "categoryselectiontype"
    | "categoryselectiontypeedit"
    | "zonehardcondition"
    | "userfavouritedep"
    | "depskill"
    | "contract"
    | "userfriend"
    | "bookingreturn"
    | "productlife"
    | "productcolor"
    | "personproduct"
    | "personcategory"
    | "personskill"
    | "personactiveinzone"
    | "assetphotographyreq"
    | "hcbookingstatuslang"
    | "hccolorlang"
    | "hcguaranteetypelang"
    | "hchardconditionlang"
    | "hcoperationstatuslang"
    | "hcpaymentstatuslang"
    | "hcpaymenttypelang"
    | "hcplantypelang"
    | "hcpredecessortypelang"
    | "hcprioritylang"
    | "hcshipstatuslang"
    | "hcshiptypelang"
    | "hcweekdaylang"
    | "hcwostatuslang"
    |"zonelang"
    |"zonelangedit"
  };
const DynamicComponent = (props: DynamicComponentProps) => {

  var MyComponent = components[props.entityName];
  useEffect(() => {
    MyComponent = components[props.entityName];
  }, [props.entityName]);

  if (!props.entityName) {
    return null;
  }
  if (props.dir === Directions.RTL) {
  }

  if (MyComponent === undefined) {
    switch (props.entityName) {
      case "assetdep":
        MyComponent = AssetDep;
        break;
      case "assetperson":
        MyComponent = AssetPerson;
        break;
      case "guaranteedep":
        MyComponent = AssetDep;
        break;
      case "jcuserrejectjobcard":
        MyComponent = JCUserRejectJobcard;
        break;
      case "product":
        MyComponent = Product;
        break;
      // case 'shipruledep':
      //     MyComponent = AssetDep
      //     break;
      default:
        break;
    }
  }

  return (
    <div>
      {(MyComponent !== undefined && props.typeForm === undefined) ||
        props.typeForm === "" ? (
          <MyComponent {...{ pId: props.parentId }} />
        ) : (
          <MyComponent
            {...{
              pId: props.parentId,
              folderName: props.folderName,
              typeForm: props.typeForm,
            }}
          />
        )}
    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(DynamicComponent as any);
