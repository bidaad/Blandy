import React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import * as UserInfoStore from "../store/UserInfo";
import { TabList } from "../store/UserInfo";
import Product from "../containers/Admin/Asset/Product/Product";
import Asset from "../containers/Admin/Asset/Asset/Asset";
import ProductEdit from "../containers/Admin/Asset/Product/ProductEdit";
import Department from "../containers/Admin/General/Department/Department";
import Person from "../containers/Admin/General/Person/Person";
import Document from "../containers/Admin/Document/Document";

import CategorySelectionType from "../containers/Admin/Asset/Category/CategorySelectionType";
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
import JCEffectOnAsset from "../containers/Admin/Maintenance/JCEffectOnAsset";
import JCEffectOnCategory from "../containers/Admin/Maintenance/JCEffectOnCategory";
import JCEffectOnProduct from "../containers/Admin/Maintenance/JCEffectOnProduct";
import JCNeedProduct from "../containers/Admin/Maintenance/JCNeedProduct";
import JCUserReject from "../containers/Admin/Maintenance/JCUserReject";
import User from "../containers/Admin/Security/User/User";
import LoginHistory from "../containers/Admin/Security/User/LoginHistory";
import LoginHistoryEdit from "../containers/Admin/Security/User/LoginHistoryEdit";
import LoadDeliveryTTWeekDay from "../containers/Admin/Shipping/LoadDeliveryTTWeekDay";
import CategoryLang from "../containers/Admin/Asset/Category/CategoryLang";
import AssetSelectionType from "../containers/Admin/Asset/Asset/AssetSelectionType";
import AssetSelectionTypeEdit from "../containers/Admin/Asset/Asset/AssetSelectionTypeEdit";
import MessageLang from "../containers/Admin/General/Message/MessageLang";
import Stock from "../containers/Admin/Booking/Stock";
import ResourceLang from "../containers/Admin/Security/Resource/ResourceLang";
import SurveySubjectParameter from "../containers/Admin/Crm/SurveySubjectParameter";
import RolePermission from "../containers/Admin/Security/Resource/RolePermission";
import BrandLang from "../containers/Admin/General/Brand/BrandLang";
import UserRole from "../containers/Admin/Security/User/UserRole";
import PersonLang from "../containers/Admin/General/Person/PersonLang";
import Contact from "../containers/Admin/General/Contact/Contact";
import JCNeedCategory from "../containers/Admin/Maintenance/JCNeedCategory";
import JobCardLang from "../containers/Admin/Maintenance/JobCardLang";
import JCInterval from "../containers/Admin/Maintenance/JCInterval";
import Assignment from "../containers/Admin/Asset/Assignment/Assignment";
import AssignmentEdit from "../containers/Admin/Asset/Assignment/AssignmentEdit";
import AssignmentDetailEdit from "../containers/Admin/Asset/Assignment/AssignmentDetailEdit";
import Category from "../containers/Admin/Asset/Category/Category";
import CategoryEdit from "../containers/Admin/Asset/Category/CategoryEdit";
import CategoryLangEdit from "../containers/Admin/Asset/Category/CategoryLangEdit";
import BookingEdit from "../containers/Admin/Booking/BookingEdit";
import Booking from "../containers/Admin/Booking/Booking";
import StockEdit from "../containers/Admin/Booking/StockEdit";
import Chat from "../containers/Admin/Crm/Chat";
import ChatEdit from "../containers/Admin/Crm/ChatEdit";
import FAQ from "../containers/Admin/Crm/FAQ";
import MessageBoxEdit from "../containers/Admin/Crm/MessageBoxEdit";
import MessageBox from "../containers/Admin/Crm/MessageBox";
import NewsLetterEdit from "../containers/Admin/Crm/NewsLetterEdit";
import NewsLetter from "../containers/Admin/Crm/NewsLetter";
import SurveySubjectEdit from "../containers/Admin/Crm/SurveySubjectEdit";
import SurveySubject from "../containers/Admin/Crm/SurveySubject";
import SurveySubjectParameterEdit from "../containers/Admin/Crm/SurveySubjectParameterEdit";
import DocumentEdit from "../containers/Admin/Document/DocumentEdit";
import Account from "../containers/Admin/Finance/Account";
import AccountEdit from "../containers/Admin/Finance/AccountEdit";
import CurrencyExchange from "../containers/Admin/Finance/CurrencyExchange";
import CurrencyExchangeEdit from "../containers/Admin/Finance/CurrencyExchangeEdit";
import PaymentEdit from "../containers/Admin/Finance/PaymentEdit";
import Payment from "../containers/Admin/Finance/Payment";
import BrandEdit from "../containers/Admin/General/Brand/BrandEdit";
import Brand from "../containers/Admin/General/Brand/Brand";
import BrandLangEdit from "../containers/Admin/General/Brand/BrandLangEdit";
import ContactEdit from "../containers/Admin/General/Contact/ContactEdit";
import DepartmentEdit from "../containers/Admin/General/Department/DepartmentEdit";
import Language from "../containers/Admin/General/Language/Language";
import Message from "../containers/Admin/General/Message/Message";
import MessageEdit from "../containers/Admin/General/Message/MessageEdit";
import MessageLangEdit from "../containers/Admin/General/Message/MessageLangEdit";
import PersonEdit from "../containers/Admin/General/Person/PersonEdit";
import PersonLangEdit from "../containers/Admin/General/Person/PersonLangEdit";
import Zone from "../containers/Admin/General/Zone/Zone";
import ZoneEdit from "../containers/Admin/General/Zone/ZoneEdit";
import GuaranteeEdit from "../containers/Admin/Guarantee/GuaranteeEdit";
import Guarantee from "../containers/Admin/Guarantee/Guarantee";
import HCAccountType from "../containers/Admin/HardCode/HCAccountType";
import EditHCAccountType from "../containers/Admin/HardCode/EditHCAccountType";
import EditHCActionTypeLang from "../containers/Admin/HardCode/EditHCActionTypeLang";
import HCAssetHealthStatus from "../containers/Admin/HardCode/HCAssetHealthStatus";
import EditHCAssetHealthStatus from "../containers/Admin/HardCode/EditHCAssetHealthStatus";
import EditHCActionType from "../containers/Admin/HardCode/EditHCActionType";
import EditHCAssetHealthStatusLang from "../containers/Admin/HardCode/EditHCAssetHealthStatusLang";
import EditHCAssetQuality from "../containers/Admin/HardCode/EditHCAssetQuality";
import EditHCAssetQualityLang from "../containers/Admin/HardCode/EditHCAssetQualityLang";
import EditHCAttributeTitle from "../containers/Admin/HardCode/EditHCAttributeTitle";
import EditHCAttributeTitleLang from "../containers/Admin/HardCode/EditHCAttributeTitleLang";
import EditHCBookingStatus from "../containers/Admin/HardCode/EditHCBookingStatus";
import EditHCColor from "../containers/Admin/HardCode/EditHCColor";
import EditHCContactType from "../containers/Admin/HardCode/EditHCContactType";
import EditHCContactTypeLang from "../containers/Admin/HardCode/EditHCContactTypeLang";
import EditHCCurrency from "../containers/Admin/HardCode/EditHCCurrency";
import EditHCCurrencyLang from "../containers/Admin/HardCode/EditHCCurrencyLang";
import EditHCDepType from "../containers/Admin/HardCode/EditHCDepType";
import EditHCDepTypeLang from "../containers/Admin/HardCode/EditHCDepTypeLang";
import EditHCDocType from "../containers/Admin/HardCode/EditHCDocType";
import EditHCGender from "../containers/Admin/HardCode/EditHCGender";
import EditHCGenderLang from "../containers/Admin/HardCode/EditHCGenderLang";
import EditHCJCOperationType from "../containers/Admin/HardCode/EditHCJCOperationType";
import EditHCJCOperationTypeLang from "../containers/Admin/HardCode/EditHCJCOperationTypeLang";
import EditHCJobCardType from "../containers/Admin/HardCode/EditHCJobCardType";
import EditHCJobCardTypeLang from "../containers/Admin/HardCode/EditHCJobCardTypeLang";
import EditHCLanguage from "../containers/Admin/HardCode/EditHCLanguage";
import EditHCMessageType from "../containers/Admin/HardCode/EditHCMessageType";
import EditHCMessageTypeLang from "../containers/Admin/HardCode/EditHCMessageTypeLang";
import EditHCPaymentStatus from "../containers/Admin/HardCode/EditHCPaymentStatus";
import EditHCPaymentType from "../containers/Admin/HardCode/EditHCPaymentType";
import EditHCPelakCharacter from "../containers/Admin/HardCode/EditHCPelakCharacter";
import EditHCPolicyTitle from "../containers/Admin/HardCode/EditHCPolicyTitle";
import EditHCPolicyTitleLang from "../containers/Admin/HardCode/EditHCPolicyTitleLang";
import EditHCPriority from "../containers/Admin/HardCode/EditHCPriority";
import EditHCResourceType from "../containers/Admin/HardCode/EditHCResourceType";
import EditHCResourceTypeLang from "../containers/Admin/HardCode/EditHCResourceTypeLang";
import EditHCShipStatus from "../containers/Admin/HardCode/EditHCShipStatus";
import EditHCShipType from "../containers/Admin/HardCode/EditHCShipType";
import EditHCShipVelicleType from "../containers/Admin/HardCode/EditHCShipVelicleType";
import EditHCSkillTitle from "../containers/Admin/HardCode/EditHCSkillTitle";
import EditHCSkillTitleLang from "../containers/Admin/HardCode/EditHCSkillTitleLang";
import EditHCUnit from "../containers/Admin/HardCode/EditHCUnit";
import EditHCUnitLang from "../containers/Admin/HardCode/EditHCUnitLang";
import EditHCUserType from "../containers/Admin/HardCode/EditHCUserType";
import EditHCUserTypeLang from "../containers/Admin/HardCode/EditHCUserTypeLang";
import EditHCWeekDay from "../containers/Admin/HardCode/EditHCWeekDay";
import EditHCWHOperationStatus from "../containers/Admin/HardCode/EditHCWHOperationStatus";
import EditHCWHOperationStatusLang from "../containers/Admin/HardCode/EditHCWHOperationStatusLang";
import EditHCWHOperationType from "../containers/Admin/HardCode/EditHCWHOperationType";
import EditHCWHOperationTypeLang from "../containers/Admin/HardCode/EditHCWHOperationTypeLang";
import EditHCWOStatus from "../containers/Admin/HardCode/EditHCWOStatus";
import EditHCZoneType from "../containers/Admin/HardCode/EditHCZoneType";
import EditHCZoneTypeLang from "../containers/Admin/HardCode/EditHCZoneTypeLang";
import HCActionType from "../containers/Admin/HardCode/HCActionType";
import HCAssetQuality from "../containers/Admin/HardCode/HCAssetQuality";
import HCAttributeTitle from "../containers/Admin/HardCode/HCAttributeTitle";
import HCBookingStatus from "../containers/Admin/HardCode/HCBookingStatus";
import HCChatStatus from "../containers/Admin/HardCode/HCChatStatus";
import HCChatStatusEdit from "../containers/Admin/HardCode/HCChatStatusEdit";
import HCChatTitle from "../containers/Admin/HardCode/HCChatTitle";
import HCChatTitleEdit from "../containers/Admin/HardCode/HCChatTitleEdit";
import HCChatType from "../containers/Admin/HardCode/HCChatType";
import HCChatTypeEdit from "../containers/Admin/HardCode/HCChatTypeEdit";
import HCColor from "../containers/Admin/HardCode/HCColor";
import HCColorEdit from "../containers/Admin/HardCode/HCColorEdit";
import HCContactType from "../containers/Admin/HardCode/HCContactType";
import HCCurrency from "../containers/Admin/HardCode/HCCurrency";
import HCDepType from "../containers/Admin/HardCode/HCDepType";
import HCDocType from "../containers/Admin/HardCode/HCDocType";
import HCGender from "../containers/Admin/HardCode/HCGender";
import HCGuaranteeType from "../containers/Admin/HardCode/HCGuaranteeType";
import HCGuaranteeTypeEdit from "../containers/Admin/HardCode/HCGuaranteeTypeEdit";
import HCHardCondition from "../containers/Admin/HardCode/HCHardCondition";
import HCHardConditionEdit from "../containers/Admin/HardCode/HCHardConditionEdit";
import HCJCOperationType from "../containers/Admin/HardCode/HCJCOperationType";
import HCJobCardType from "../containers/Admin/HardCode/HCJobCardType";
import HCLanguage from "../containers/Admin/HardCode/HCLanguage";
import HCMessageType from "../containers/Admin/HardCode/HCMessageType";
import HCMonth from "../containers/Admin/HardCode/HCMonth";
import HCMonthEdit from "../containers/Admin/HardCode/HCMonthEdit";
import HCOperationStatus from "../containers/Admin/HardCode/HCOperationStatus";
import HCOperationStatusEdit from "../containers/Admin/HardCode/HCOperationStatusEdit";
import HCPaymentStatus from "../containers/Admin/HardCode/HCPaymentStatus";
import HCPaymentType from "../containers/Admin/HardCode/HCPaymentType";
import HCPelakCharacter from "../containers/Admin/HardCode/HCPelakCharacter";
import HCPlanTitle from "../containers/Admin/HardCode/HCPlanTitle";
import HCPlanTitleEdit from "../containers/Admin/HardCode/HCPlanTitleEdit";
import HCPlanTitleLang from "../containers/Admin/HardCode/HCPlanTitleLang";
import HCPlanTitleLangEdit from "../containers/Admin/HardCode/HCPlanTitleLangEdit";
import HCPlanType from "../containers/Admin/HardCode/HCPlanType";
import HCPlanTypeEdit from "../containers/Admin/HardCode/HCPlanTypeEdit";
import HCPolicyTitle from "../containers/Admin/HardCode/HCPolicyTitle";
import HCPredecessorType from "../containers/Admin/HardCode/HCPredecessorType";
import HCPredecessorTypeEdit from "../containers/Admin/HardCode/HCPredecessorTypeEdit";
import HCPriority from "../containers/Admin/HardCode/HCPriority";
import HCQuestionTitle from "../containers/Admin/HardCode/HCQuestionTitle";
import HCQuestionTitleEdit from "../containers/Admin/HardCode/HCQuestionTitleEdit";
import HCResourceType from "../containers/Admin/HardCode/HCResourceType";
import HCSelectionType from "../containers/Admin/HardCode/HCSelectionType";
import HCSelectionTypeEdit from "../containers/Admin/HardCode/HCSelectionTypeEdit";
import HCShipStatus from "../containers/Admin/HardCode/HCShipStatus";
import HCShipType from "../containers/Admin/HardCode/HCShipType";
import HCShipVelicleType from "../containers/Admin/HardCode/HCShipVelicleType";
import HCSkillTitle from "../containers/Admin/HardCode/HCSkillTitle";
import HCSurveyDomain from "../containers/Admin/HardCode/HCSurveyDomain";
import HCSurveyDomainEdit from "../containers/Admin/HardCode/HCSurveyDomainEdit";
import HCSurveyParameter from "../containers/Admin/HardCode/HCSurveyParameter";
import HCSurveyParameterEdit from "../containers/Admin/HardCode/HCSurveyParameterEdit";
import HCUnit from "../containers/Admin/HardCode/HCUnit";
import HCUserType from "../containers/Admin/HardCode/HCUserType";
import HCWeekDay from "../containers/Admin/HardCode/HCWeekDay";
import HCWHOperationStatus from "../containers/Admin/HardCode/HCWHOperationStatus";
import HCWHOperationType from "../containers/Admin/HardCode/HCWHOperationType";
import HCWOStatus from "../containers/Admin/HardCode/HCWOStatus";
import HCZoneType from "../containers/Admin/HardCode/HCZoneType";
import JCEffectOnAssetEdit from "../containers/Admin/Maintenance/JCEffectOnAssetEdit";
import JCEffectOnCategoryEdit from "../containers/Admin/Maintenance/JCEffectOnCategoryEdit";
import JCEffectOnProductEdit from "../containers/Admin/Maintenance/JCEffectOnProductEdit";
import JCIntervalEdit from "../containers/Admin/Maintenance/JCIntervalEdit";
import JCNeedCategoryEdit from "../containers/Admin/Maintenance/JCNeedCategoryEdit";
import JCNeedProductEdit from "../containers/Admin/Maintenance/JCNeedProductEdit";
import JCUserRejectEdit from "../containers/Admin/Maintenance/JCUserRejectEdit";
import JobCard from "../containers/Admin/Maintenance/JobCard";
import JobCardEdit from "../containers/Admin/Maintenance/JobCardEdit";
import JobCardLangEdit from "../containers/Admin/Maintenance/JobCardLangEdit";
import ResourceEdit from "../containers/Admin/Security/Resource/ResourceEdit";
import ResourceLangEdit from "../containers/Admin/Security/Resource/ResourceLangEdit";
import RolePermissionEdit from "../containers/Admin/Security/Resource/RolePermissionEdit";
import TreeResource from "../containers/Admin/Security/Resource/TreeResource";
import UserEdit from "../containers/Admin/Security/User/UserEdit";
import UserFavouriteAsset from "../containers/Admin/Security/User/UserFavouriteAsset";
import UserFavouriteAssetEdit from "../containers/Admin/Security/User/UserFavouriteAssetEdit";
import UserRoleEdit from "../containers/Admin/Security/User/UserRoleEdit";
import BillOfLading from "../containers/Admin/Shipping/BillOfLading";

import BillOfLadingEdit from "../containers/Admin/Shipping/BillOfLadingEdit";
import BillOfLadingPayment from "../containers/Admin/Shipping/BillOfLadingPayment";
import BillOLBKShipStatus from "../containers/Admin/Shipping/BillOLBKShipStatus";
import BillOLBooking from "../containers/Admin/Shipping/BillOLBooking";
import LoadDeliveryTimeTitle from "../containers/Admin/Shipping/LoadDeliveryTimeTitle";
import LoadDeliveryTimeTitleEdit from "../containers/Admin/Shipping/LoadDeliveryTimeTitleEdit";
import LoadDeliveryTTWeekDayEdit from "../containers/Admin/Shipping/LoadDeliveryTTWeekDayEdit";
import ShippingDetail from "../containers/Admin/Shipping/ShippingDetail";
import ShipRule from "../containers/Admin/Shipping/ShipRule";
import ShipRuleEdit from "../containers/Admin/Shipping/ShipRuleEdit";
import AssetEdit from "../containers/Admin/Asset/Asset/AssetEdit";

import WorkOrder from "../containers/Admin/Maintenance/WorkOrder";
import WorkOrderEdit from "../containers/Admin/Maintenance/WorkOrderEdit";
import UserOpinion from "../containers/Admin/General/UserOpinion/UserOpinion";
import UserOpinionEdit from "../containers/Admin/General/UserOpinion/UserOpinionEdit";
import AssetUsage from "../containers/Admin/Asset/Asset/AssetUsage";
import AssetUsageEdit from "../containers/Admin/Asset/Asset/AssetUsageEdit";
import FAQEdit from "../containers/Admin/Crm/FAQEdit";
import ChLine from "./chart/ChLine";
import ChBar from "./chart/ChBar";
import ChHorizontalBar from "./chart/ChHorizontalBar";
import ChPie from "./chart/ChPie";
import ZoneHardConditionEdit from "../containers/Admin/General/Zone/ZoneHardConditionEdit";
import ZoneHardCondition from "../containers/Admin/General/Zone/ZoneHardCondition";
import Contract from "../containers/Admin/Finance/Contract";
import ContractEdit from "../containers/Admin/Finance/ContractEdit";
import ZoneLang from "../containers/Admin/General/Zone/ZoneLang";
import ZoneLangEdit from "../containers/Admin/General/Zone/ZoneLangEdit";
import DepSkill from "../containers/Admin/General/Department/DepSkill";
import DepSkillEdit from "../containers/Admin/General/Department/DepSkillEdit";

type LayoutProps = UserInfoStore.UserInfoState &
  typeof UserInfoStore.actionCreators;

type componentOptions = {
  [key: string]: any;
};

const components: componentOptions = {
  product: Product,
  productedit: ProductEdit,
  asset: Asset,
  assetedit: AssetEdit,
  assignment: Assignment,
  assignmentedit: AssignmentEdit,
  assignmentdetail: AssignmentDetail,
  assignmentdetailedit: AssignmentDetailEdit,
  category: Category,
  categoryedit: CategoryEdit,
  categorylang: CategoryLang,
  categorylangedit: CategoryLangEdit,
  booking: Booking,
  bookingedit: BookingEdit,
  stock: Stock,
  stockedit: StockEdit,
  chat: Chat,
  chatedit: ChatEdit,
  messagebox: MessageBox,
  messageboxedit: MessageBoxEdit,
  newsletter: NewsLetter,
  newsletteredit: NewsLetterEdit,
  surveysubject: SurveySubject,
  surveysubjectedit: SurveySubjectEdit,
  surveysubjectparameter: SurveySubjectParameter,
  surveysubjectparameteredit: SurveySubjectParameterEdit,
  document: Document,
  documentedit: DocumentEdit,
  account: Account,
  accountedit: AccountEdit,
  currencyexchange: CurrencyExchange,
  currencyexchangeedit: CurrencyExchangeEdit,
  payment: Payment,
  paymentedit: PaymentEdit,
  brand: Brand,
  brandedit: BrandEdit,
  brandlang: BrandLang,
  brandlangedit: BrandLangEdit,
  contact: Contact,
  contactedit: ContactEdit,
  department: Department,
  departmentedit: DepartmentEdit,
  Language: Language,
  message: Message,
  messageedit: MessageEdit,
  messagelang: MessageLang,
  messagelangedit: MessageLangEdit,
  person: Person,
  personedit: PersonEdit,
  personlang: PersonLang,
  personlangedit: PersonLangEdit,
  zone: Zone,
  zoneedit: ZoneEdit,
  guarantee: Guarantee,
  guaranteeedit: GuaranteeEdit,
  edithcaccounttype: EditHCAccountType,
  edithcactiontype: EditHCActionType,
  edithcactiontypelang: EditHCActionTypeLang,
  edithcassethealthstatus: EditHCAssetHealthStatus,
  edithcassethealthstatuslang: EditHCAssetHealthStatusLang,
  edithcassetquality: EditHCAssetQuality,
  edithcassetqualitylang: EditHCAssetQualityLang,
  edithcattributetitle: EditHCAttributeTitle,
  edithcattributetitlelang: EditHCAttributeTitleLang,
  edithcbookingstatus: EditHCBookingStatus,
  edithccolor: EditHCColor,
  edithccontacttype: EditHCContactType,
  edithccontacttypelang: EditHCContactTypeLang,
  edithccurrency: EditHCCurrency,
  edithccurrencylang: EditHCCurrencyLang,
  edithcdeptype: EditHCDepType,
  edithcdeptypelang: EditHCDepTypeLang,
  edithcdoctype: EditHCDocType,
  edithcgender: EditHCGender,
  edithcgenderlang: EditHCGenderLang,
  edithcjcoperationtype: EditHCJCOperationType,
  edithcjcoperationtypelang: EditHCJCOperationTypeLang,
  edithcjobcardtype: EditHCJobCardType,
  edithcjobcardtypelang: EditHCJobCardTypeLang,
  edithclanguage: EditHCLanguage,
  edithcmessagetype: EditHCMessageType,
  edithcmessagetypelang: EditHCMessageTypeLang,
  edithcpaymentstatus: EditHCPaymentStatus,
  edithcpaymenttype: EditHCPaymentType,
  edithcpelakcharacter: EditHCPelakCharacter,
  edithcpolicytitle: EditHCPolicyTitle,
  edithcpolicytitlelang: EditHCPolicyTitleLang,
  edithcpriority: EditHCPriority,
  edithcresourcetype: EditHCResourceType,
  edithcresourcetypelang: EditHCResourceTypeLang,
  edithcshipstatus: EditHCShipStatus,
  edithcshiptype: EditHCShipType,
  edithcshipvelicletype: EditHCShipVelicleType,
  edithcskilltitle: EditHCSkillTitle,
  edithcskilltitlelang: EditHCSkillTitleLang,
  edithcunit: EditHCUnit,
  edithcunitlang: EditHCUnitLang,
  edithcusertype: EditHCUserType,
  edithcusertypelang: EditHCUserTypeLang,
  edithcweekday: EditHCWeekDay,
  edithcwhoperationstatus: EditHCWHOperationStatus,
  edithcwhoperationstatuslang: EditHCWHOperationStatusLang,
  edithcwhoperationtype: EditHCWHOperationType,
  edithcwhoperationtypelang: EditHCWHOperationTypeLang,
  edithcwostatus: EditHCWOStatus,
  edithczonetype: EditHCZoneType,
  edithczonetypelang: EditHCZoneTypeLang,
  hcaccounttype: HCAccountType,
  hcactiontype: HCActionType,
  hcactiontypelang: HCActionTypeLang,
  hcassethealthstatus: HCAssetHealthStatus,
  hcassethealthstatuslang: HCAssetHealthStatusLang,
  hcassetquality: HCAssetQuality,
  hcassetqualitylang: HCAssetQualityLang,
  hcattributetitle: HCAttributeTitle,
  hcattributetitlelang: HCAttributeTitleLang,
  hcbookingstatus: HCBookingStatus,
  hcchatstatus: HCChatStatus,
  hcchatstatusedit: HCChatStatusEdit,
  hcchattitle: HCChatTitle,
  hcchattitleedit: HCChatTitleEdit,
  hcchattype: HCChatType,
  hcchattypeedit: HCChatTypeEdit,
  hccolor: HCColor,
  hccoloredit: HCColorEdit,
  hccontacttype: HCContactType,
  hccontacttypelang: HCContactTypeLang,
  hccurrency: HCCurrency,
  hccurrencylang: HCCurrencyLang,
  hcdeptype: HCDepType,
  hcdeptypelang: HCDepTypeLang,
  hcdoctype: HCDocType,
  hcgender: HCGender,
  hcgenderlang: HCGenderLang,
  hcguaranteetype: HCGuaranteeType,
  hcguaranteetypeedit: HCGuaranteeTypeEdit,
  hchardcondition: HCHardCondition,
  hchardconditionedit: HCHardConditionEdit,
  hcjcoperationtype: HCJCOperationType,
  hcjcoperationtypelang: HCJCOperationTypeLang,
  hcjobcardtype: HCJobCardType,
  hcjobcardtypelang: HCJobCardTypeLang,
  hclanguage: HCLanguage,
  hcmessagetype: HCMessageType,
  hcmessagetypelang: HCMessageTypeLang,
  hcmonth: HCMonth,
  hcmonthedit: HCMonthEdit,
  hcoperationstatus: HCOperationStatus,
  hcoperationstatusedit: HCOperationStatusEdit,
  hcpaymentstatus: HCPaymentStatus,
  hcpaymenttype: HCPaymentType,
  hcpelakcharacter: HCPelakCharacter,
  hcplantitle: HCPlanTitle,
  hcplantitleedit: HCPlanTitleEdit,
  hcplantitlelang: HCPlanTitleLang,
  hcplantitlelangedit: HCPlanTitleLangEdit,
  hcplantype: HCPlanType,
  hcplantypeedit: HCPlanTypeEdit,
  hcpolicytitle: HCPolicyTitle,
  hcpolicytitlelang: HCPolicyTitleLang,
  hcpredecessortype: HCPredecessorType,
  hcpredecessortypeedit: HCPredecessorTypeEdit,
  hcpriority: HCPriority,
  hcquestiontitle: HCQuestionTitle,
  hcquestiontitleedit: HCQuestionTitleEdit,
  hcresourcetype: HCResourceType,
  hcresourcetypelang: HCResourceTypeLang,
  hcselectiontype: HCSelectionType,
  hcselectiontypeedit: HCSelectionTypeEdit,
  hcshipstatus: HCShipStatus,
  hcshiptype: HCShipType,
  hcshipvelicletype: HCShipVelicleType,
  hcskilltitle: HCSkillTitle,
  hcskilltitlelang: HCSkillTitleLang,
  hcsurveydomain: HCSurveyDomain,
  hcsurveydomainedit: HCSurveyDomainEdit,
  hcsurveyparameter: HCSurveyParameter,
  hcsurveyparameteredit: HCSurveyParameterEdit,
  hcunit: HCUnit,
  hcunitlang: HCUnitLang,
  hcusertype: HCUserType,
  hcusertypelang: HCUserTypeLang,
  hcweekday: HCWeekDay,
  hcwhoperationstatus: HCWHOperationStatus,
  hcwhoperationstatuslang: HCWHOperationStatusLang,
  hcwhoperationtype: HCWHOperationType,
  hcwhoperationtypelang: HCWHOperationTypeLang,
  hcwostatus: HCWOStatus,
  hczonetype: HCZoneType,
  hczonetypelang: HCZoneTypeLang,
  jceffectonasset: JCEffectOnAsset,
  jceffectonassetedit: JCEffectOnAssetEdit,
  jceffectoncategory: JCEffectOnCategory,
  jceffectoncategoryedit: JCEffectOnCategoryEdit,
  jceffectonproduct: JCEffectOnProduct,
  jceffectonproductedit: JCEffectOnProductEdit,
  jcinterval: JCInterval,
  jcintervaledit: JCIntervalEdit,
  jcneedcategory: JCNeedCategory,
  jcneedcategoryedit: JCNeedCategoryEdit,
  jcneedproduct: JCNeedProduct,
  jcneedproductedit: JCNeedProductEdit,
  jcuserreject: JCUserReject,
  jcuserrejectedit: JCUserRejectEdit,
  jobcard: JobCard,
  jobcardedit: JobCardEdit,
  jobcardlang: JobCardLang,
  jobcardlangedit: JobCardLangEdit,
  resource: TreeResource,
  resourceedit: ResourceEdit,
  resourcelang: ResourceLang,
  resourcelangedit: ResourceLangEdit,
  rolepermission: RolePermission,
  rolepermissionedit: RolePermissionEdit,
  treeresource: TreeResource,
  user: User,
  loginhistory:LoginHistory,
  loginhistoryedit:LoginHistoryEdit,
  useredit: UserEdit,
  userfavouriteasset: UserFavouriteAsset,
  userfavouriteassetedit: UserFavouriteAssetEdit,
  userrole: UserRole,
  userroleedit: UserRoleEdit,
  billoflading: BillOfLading,

  billofladingedit: BillOfLadingEdit,
  billofladingpayment: BillOfLadingPayment,
  billolbkshipstatus: BillOLBKShipStatus,
  billolbooking: BillOLBooking,
  loaddeliverytimetitle: LoadDeliveryTimeTitle,
  loaddeliverytimetitleedit: LoadDeliveryTimeTitleEdit,
  loaddeliveryttweekday: LoadDeliveryTTWeekDay,
  loaddeliveryttweekdayedit: LoadDeliveryTTWeekDayEdit,
  shippingdetail: ShippingDetail,
  shiprule: ShipRule,
  shipruleedit: ShipRuleEdit,
  workorder: WorkOrder,
  workorderedit: WorkOrderEdit,
  assetselectiontype: AssetSelectionType,
  assetselectiontypeedit: AssetSelectionTypeEdit,
  useropinion: UserOpinion,
  useropinionedit: UserOpinionEdit,
  assetusage: AssetUsage,
  assetusageedit: AssetUsageEdit,
  faq: FAQ,
  faqedit: FAQEdit,
  categoryselectiontype: CategorySelectionType,
  
  zonehardcondition: ZoneHardCondition,
  zonehardconditionedit: ZoneHardConditionEdit,
  contract: Contract,
  contractedit: ContractEdit,
  zonelang:ZoneLang,
  zonelangedit:ZoneLangEdit,
  depskill:DepSkill,
  depskilledit:DepSkillEdit
};

class TabLayout extends React.PureComponent<
  LayoutProps,
  { children?: React.ReactNode }
> {
  private isclose = false;
  constructor(props: any) {
    super(props);
  }

  logoutClickHandler = () => {
    this.props.logoutUser('/userlogin');
  };
  HandleAddTab = (event: any) => {
    if (this.isclose === false) {
      this.props.AddTab(
        event.currentTarget.value,
        event.currentTarget.dataset.component
      );
    }
    this.isclose = false;
  };
  HandleClose = (event: any) => {
    let component = event.currentTarget.dataset.component;
    this.props.DeleteTab(component);
    this.isclose = true;
  };
  render() {
    return (
      <div>
        <div className="tabAdmin">
          {this.props.tabModels !== undefined &&
          this.props.tabModels !== null &&
          this.props.tabModels.Tab !== undefined &&
          this.props.tabModels.Tab !== null &&
          this.props.tabModels.Tab.length > 0
            ? this.props.tabModels.Tab.map((item: TabList) => {
                var active = "";
                if (
                  this.props.tabModels.Active.toLowerCase() ===
                  item.component.toLowerCase()
                ) {
                  active = "active";
                }
                return (
                  <button
                    key={item.component}
                    onClick={this.HandleAddTab}
                    data-component={item.component}
                    className={"tablinks " + active}
                  >
                    {item.name}{" "}
                    <i
                      data-component={item.component}
                      className="fa fa-close"
                      aria-hidden="true"
                      onClick={this.HandleClose}
                    ></i>
                  </button>
                );
              })
            : null}
        </div>
        <div>
          {this.props.tabModels !== undefined &&
          this.props.tabModels !== null &&
          this.props.tabModels.Tab !== undefined &&
          this.props.tabModels.Tab !== null &&
          this.props.tabModels.Tab.length > 0 ? (
            this.props.tabModels.Tab.map((item: TabList) => {
              var activeContent = "";
              if (
                this.props.tabModels.Active.toLowerCase() ===
                item.component.toLowerCase()
              ) {
                activeContent = "activeContent";
              }
              var MyComponent = components[item.component];
              return (
                <div
                  key={item.name}
                  className={"tabcontentAdmin " + activeContent}
                >
                  {<MyComponent {...{ RefreshTab: this.props.RefreshTab }} />}
                </div>
              );
            })
          ) : (
            <div>
              <div className="row">
                <div className="col-md-6">
                  <div className="col-md-12">
                    <h5 className="horizontalBarTitr">بازدیدکنندگان</h5>
                  </div>
                  <ChLine
                    {...{
                      action: "VisitedUser",
                      title: "",
                      lable: "کاربر",
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <div className="col-md-12">
                    <h5 className="horizontalBarTitr">جستجوی برند</h5>
                    <ChPie
                      {...{
                        action: "VisitedBrand",
                        title: "",
                        lable: "تعداد بازدید",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="col-md-12">
                    <h5 className="horizontalBarTitr">فروش ماهانه</h5>
                  </div>
                  <ChHorizontalBar
                    {...{
                      action: "SalesMonth",
                      title: "فروش ماهانه",
                      lable: "فروش کالا",
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="col-md-12">
                    <h5 className="horizontalBarTitr">
                      پربازدیدترین دسته بندی ها
                    </h5>
                  </div>
                  <div className="col-md-12">
                    {/* <ChPolar /> */}
                    <ChBar
                      {...{
                        action: "VisitedCategory",
                        title: "",
                        lable: "تعداد بازدید",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <h5 className="horizontalBarTitr">پربازدیدترین کالاها</h5>
                </div>
                <div className="col-md-12">
                  {/* <ChPolar /> */}
                  <ChBar
                    {...{
                      action: "VisitedAsset",
                      title: "",
                      lable: "تعداد بازدید",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfoStore.actionCreators
)(TabLayout);

//tablayout
