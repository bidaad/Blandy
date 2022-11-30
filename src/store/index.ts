import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as Asset from './Asset';
import * as AssetSL from './AssetSL';
import * as AssetDep from './AssetDep';
import * as AssetPerson from './AssetPerson';
import * as UserInfo from '../store/UserInfo';
import * as User from '../store/User';
import * as UserSL from '../store/UserSL';
import * as Message from './Message';
import * as MessageSL from './MessageSL';
import * as Brand from './Brand';
import * as BrandSL from './BrandSL';
import * as BrandLang from './BrandLang';
import * as Product from './Product';
import * as ProductSL from './ProductSL';
import * as ProductLang from './ProductLang';
import * as ProductCategory from './ProductCategory';
import * as ProductAttribute from './ProductAttribute';
import * as Language from './Language';
import * as LanguageSL from './LanguageSL';
import * as Document from './Document';
import * as Department from './Department';
import * as DepartmentSL from './DepartmentSL';
import * as Person from './Person';
import * as PersonSL from './PersonSL';
import * as PersonLang from './PersonLang';
import * as PersonBrand from './PersonBrand';
import * as Zone from './Zone';
import * as ZoneSL from './ZoneSL';
import * as Category from './Category';
import * as CategorySL from './CategorySL';
import * as CategoryLang from './CategoryLang';
import * as CategoryAttribute from './CategoryAttribute';
import * as MessageLang from './MessageLang';
import * as UserFavouriteAsset from './UserFavouriteAsset';
import * as UserFavouriteAssetForAsset from './UserFavouriteAssetForAsset';
import * as UserFavouriteAssetUser from './UserFavouriteAssetUser';
import * as TreeResource from './TreeResource';
import * as Resource from './Resource';
import * as ResourceSL from './ResourceSL';
import * as ResourceLang from './ResourceLang';
import * as AssetUsage from './AssetUsage';

import * as SurveySubjectParameter from './SurveySubjectParameter';
import * as SurveySubject from './SurveySubject';
import * as UserRole from './UserRole';
import * as NewsLetter from './NewsLetter';
import * as Contact from './Contact';
import * as ContactSL from './ContactSL';
import * as ContactDep from './ContactDep';
import * as ContactPerson from './ContactPerson';
import * as Chat from './Chat'
import * as ChatDetail from './ChatDetail'
import * as RolePermission from './RolePermission';
import * as HCPaymentType from './HCPaymentType';
import * as HCWOStatus from './HCWOStatus';
import * as HCShipStatus from './HCShipStatus';
import * as HCMessageTypeLang from './HCMessageTypeLang';
import * as HCShipType from './HCShipType';
import * as HCAssetHealthStatus from './HCAssetHealthStatus';
import * as HCAssetQuality from './HCAssetQuality';
import * as HCUnit from './HCUnit';
import * as HCAttributeTitle from './HCAttributeTitle';
import * as HCContactType from './HCContactType';
import * as HCAssetHealthStatusLang from './HCAssetHealthStatusLang';
import * as HCAssetQualityLang from './HCAssetQualityLang';
import * as HCUnitLang from './HCUnitLang';
import * as HCColor from './HCColor';
import * as HCDepType from './HCDepType';
import * as HCAttributeTitleLang from './HCAttributeTitleLang';
import * as HCZoneType from './HCZoneType';
import * as HCContactTypeLang from './HCContactTypeLang';
import * as HCShipVelicleType from './HCShipVelicleType';
import * as HCDepTypeLang from './HCDepTypeLang';
import * as HCAccountType from './HCAccountType';
import * as HCActionType from './HCActionType';
import * as HCPolicyTitle from './HCPolicyTitle';
import * as HCGender from './HCGender';
import * as HCPriority from './HCPriority';
import * as HCActionTypeLang from './HCActionTypeLang';
import * as HCDocType from './HCDocType';
import * as HCGenderLang from './HCGenderLang';
import * as HCPolicyTitleLang from './HCPolicyTitleLang';
import * as HCWHOperationStatus from './HCWHOperationStatus';
import * as HCLanguage from './HCLanguage';
import * as HCZoneTypeLang from './HCZoneTypeLang';
import * as HCSkillTitleLang from './HCSkillTitleLang';
import * as HCWHOperationType from './HCWHOperationType';
import * as HCCurrency from './HCCurrency';
import * as HCSkillTitle from './HCSkillTitle';
import * as HCCurrencyLang from './HCCurrencyLang';
import * as HCBookingStatus from './HCBookingStatus';
import * as HCResourceTypeLang from './HCResourceTypeLang';
import * as HCPelakCharacter from './HCPelakCharacter';
import * as HCWeekDay from './HCWeekDay';
import * as HCResourceType from './HCResourceType';
import * as HCJCOperationType from './HCJCOperationType';
import * as HCMessageType from './HCMessageType';
import * as HCUserTypeLang from './HCUserTypeLang';
import * as HCJCOperationTypeLang from './HCJCOperationTypeLang';
import * as HCUserType from './HCUserType';
import * as HCJobCardType from './HCJobCardType';
import * as HCJobCardTypeLang from './HCJobCardTypeLang';
import * as HCWHOperationStatusLang from './HCWHOperationStatusLang';
import * as HCWHOperationTypeLang from './HCWHOperationTypeLang';
import * as HCPaymentStatus from './HCPaymentStatus';
import * as HCSurveyParameter from './HCSurveyParameter';
import * as HCSurveyDomain from './HCSurveyDomain';
import * as HCMonth from './HCMonth';
import * as HCSelectionType from './HCSelectionType';
import * as HCHardCondition from './HCHardCondition';
import * as HCOperationStatus from './HCOperationStatus';
import * as HCPlanTitle from './HCPlanTitle';
import * as HCPlanType from './HCPlanType';
import * as HCPredecessorType from './HCPredecessorType';
import * as HCQuestionTitle from './HCQuestionTitle';
import * as HCPlanTitleLang from './HCPlanTitleLang';
import * as HCGuaranteeType from './HCGuaranteeType';

import * as HCChatStatus from './HCChatStatus';
import * as HCChatTitle from './HCChatTitle';
import * as HCChatType from './HCGuaranteeType';

import * as ShippingDetail from './ShippingDetail';
import * as LoadDeliveryTTWeekDay from './LoadDeliveryTTWeekDay';
import * as LoadDeliveryTTWeekDaySL from './LoadDeliveryTTWeekDaySL';
import * as LoadDeliveryTimeTitle from './LoadDeliveryTimeTitle';
import * as BillOLBooking from './BillOLBooking';
import * as BillOLBKShipStatus from './BillOLBKShipStatus';
import * as BillOfLading from './BillOfLading';
import * as BillOfLadingDep from './BillOfLadingDep';
import * as LoginHistory from './LoginHistory';
import * as WorkOrder from './WorkOrder';
import * as WorkOrderSL from './WorkOrderSL';
import * as WorkOrderAsset from './WorkOrderAsset';
import * as WorkOrderJobcard from './WorkOrderJobcard';
import * as JobCardLang from './JobCardLang';
import * as JCInterval from './JCInterval';
import * as JCIntervalSL from './JCIntervalSL';
import * as JCNeedProduct from './JCNeedProduct';
import * as JCNeedCategory from './JCNeedCategory';
import * as JCEffectOnProduct from './JCEffectOnProduct';
import * as JCEffectOnCategory from './JCEffectOnCategory';
import * as JCEffectOnAsset from './JCEffectOnAsset';
import * as JCEffectOnAssetForAsset from './JCEffectOnAssetForAsset';
import * as JCEffectOnAssetForJobCard from './JCEffectOnAssetForJobCard';
import * as JCUserReject from './JCUserReject';
import * as JCUserRejectAsset from './JCUserRejectAsset';
import * as JCUserRejectUser from './JCUserRejectUser';
import * as JCUserRejectJobcard from './JCUserRejectJobcard';
import * as JobCard from './JobCard';
import * as JobCardSL from './JobCardSL';
import * as DepWorkDate from './DepWorkDate';
import * as DepWeekWorkTime from './DepWeekWorkTime';
import * as DepPolicy from './DepPolicy';
import * as DepPolicyLang from './DepPolicyLang';
import * as DepCategory from './DepCategory';
import * as DepBrand from './DepBrand';
import * as DepartmentLang from './DepartmentLang';
import * as DepartmentDepType from './DepartmentDepType';
import * as Payment from './Payment';
import * as CurrencyExchange from './CurrencyExchange';
import * as BillOfLadingPayment from './BillOfLadingPayment';
import * as Account from './Account';
import * as BookingWork from './BookingWork';
import * as BookingAsset from './BookingAsset';
import * as Booking from './Booking';
import * as BookingSL from './BookingSL';
import * as BookingForAsset from './BookingForAsset';
import * as MachineRelated from './MachineRelated';
import * as AssignmentDetail from './AssignmentDetail';
import * as Assignment from './Assignment';

import * as ShipRule from './ShipRule';
import * as ShipRuleSL from './ShipRuleSL';
import * as ShipRuleDep from './ShipRuleDep';
import * as Stock from './Stock';
import * as StockLang from './StockLang';

import * as AssetDefect from './AssetDefect';
import * as AssetLang from './AssetLang';
import * as AssetOperStatus from './AssetOperStatus';
import * as AssetSelectionType from './AssetSelectionType';
import * as AssetAttribute from './AssetAttribute';
import * as AssetPricing from './AssetPricing';
import * as DepActiveInZone from './DepActiveInZone';
import * as FAQ from './FAQ';
import * as Guarantee from './Guarantee';
import * as GuaranteeDep from './GuaranteeDep';
import * as GuaranteeAsset from './GuaranteeAsset';
import * as MessageBox from './MessageBox';
import * as WorkOrderLang from './WorkOrderLang';
import * as UserOpinion from './UserOpinion';
import * as UserOpinionSL from './UserOpinionSL';
import * as UserOpinionAsset from './UserOpinionAsset';
import * as UserOpinionUser from './UserOpinionUser';
import * as CategorySelectionType from './CategorySelectionType';

import * as ZoneHardCondition from './ZoneHardCondition';
import * as UserFavouriteDep from './UserFavouriteDep';
import * as DepSkill from './DepSkill';
import * as Contract from './Contract';
import * as ContractSL from './ContractSL';
import * as UserFriend from './UserFriend';
import * as BookingReturn from './BookingReturn';
import * as ProductLife from './ProductLife';
import * as ProductColor from './ProductColor';
import * as PersonProduct from './PersonProduct';
import * as PersonCategory from './PersonCategory';
import * as PersonSkill from './PersonSkill';
import * as PersonActiveInZone from './PersonActiveInZone';
import * as AssetPhotographyReq from './AssetPhotographyReq';

import * as HCBookingStatusLang from './HCBookingStatusLang'
import * as HCColorLang from './HCColorLang'
import * as HCGuaranteeTypelang from './HCGuaranteeTypelang'
import * as HCHardConditionLang from './HCHardConditionLang'
import * as HCOperationStatusLang from './HCOperationStatusLang'
import * as HCPaymentStatusLang from './HCPaymentStatusLang'
import * as HCPaymentTypeLang from './HCPaymentTypeLang'
import * as HCPlanTypeLang from './HCPlanTypeLang'
import * as HCPredecessorTypeLang from './HCPredecessorTypeLang'
import * as HCPriorityLang from './HCPriorityLang'
import * as HCShipStatusLang from './HCShipStatusLang'
import * as HCShipTypeLang from './HCShipTypeLang'
import * as HCWeekDayLang from './HCWeekDayLang'
import * as HCWOStatusLang from './HCWOStatusLang'
import * as ZoneLang from './ZoneLang'

import { MessageTypes } from '../model/general';
import { stateBase } from '../model/general/stateBase';
import { VwMessage } from '../model/viewModel/VwMessage';
import { VwAsset } from '../model/viewModel/VwAsset';
import { VwProduct } from '../model/viewModel/VwProduct';
import { VwBrand } from '../model/viewModel/VwBrand';
import { VwProductLang } from '../model/viewModel/VwProductLang';
import { VwLanguage } from '../model/viewModel/VwLanguage';
import { VwDocument } from '../model/viewModel/VwDocument';
import { VwProductAttribute } from '../model/viewModel/VwProductAttribute';
import { VwProductCategory } from '../model/viewModel/VwProductCategory';
import { VwCategory } from '../model/viewModel/VwCategory';
import { VwDepartment } from '../model/viewModel/VwDepartment';
import { VwPerson } from '../model/viewModel/VwPerson';
import { VwUser } from '../model/viewModel/VwUser';
import { VwZone } from '../model/viewModel/VwZone';
import { VwMessageLang } from '../model/viewModel/VwMessageLang';
import { VwBrandLang } from '../model/viewModel/VwBrandLang';
import { VwPersonLang } from '../model/viewModel/VwPersonLang';
import { VwPersonBrand } from '../model/viewModel/VwPersonBrand';
import { VwCategoryLang } from '../model/viewModel/VwCategoryLang';
import { VwCategoryAttribute } from '../model/viewModel/VwCategoryAttribute';
import { VwDepActiveInZone } from '../model/viewModel/VwDepActiveInZone';

import { VwHCPaymentType } from '../model/viewModel/VwHCPaymentType';
import { VwHCWOStatus } from '../model/viewModel/VwHCWOStatus';
import { VwHCShipStatus } from '../model/viewModel/VwHCShipStatus';
import { VwHCMessageTypeLang } from '../model/viewModel/VwHCMessageTypeLang';
import { VwHCAssetHealthStatus } from '../model/viewModel/VwHCAssetHealthStatus';
import { VwHCAssetQuality } from '../model/viewModel/VwHCAssetQuality';
import { VwHCUnit } from '../model/viewModel/VwHCUnit';
import { VwHCAttributeTitle } from '../model/viewModel/VwHCAttributeTitle';
import { VwHCContactType } from '../model/viewModel/VwHCContactType';
import { VwHCAssetHealthStatusLang } from '../model/viewModel/VwHCAssetHealthStatusLang';
import { VwHCAssetQualityLang } from '../model/viewModel/VwHCAssetQualityLang';
import { VwHCUnitLang } from '../model/viewModel/VwHCUnitLang';
import { VwHCColor } from '../model/viewModel/VwHCColor';
import { VwHCDepType } from '../model/viewModel/VwHCDepType';
import { VwHCAttributeTitleLang } from '../model/viewModel/VwHCAttributeTitleLang';
import { VwHCZoneType } from '../model/viewModel/VwHCZoneType';
import { VwHCContactTypeLang } from '../model/viewModel/VwHCContactTypeLang';
import { VwHCShipVelicleType } from '../model/viewModel/VwHCShipVelicleType';
import { VwHCDepTypeLang } from '../model/viewModel/VwHCDepTypeLang';
import { VwHCAccountType } from '../model/viewModel/VwHCAccountType';
import { VwHCActionType } from '../model/viewModel/VwHCActionType';
import { VwHCPolicyTitle } from '../model/viewModel/VwHCPolicyTitle';
import { VwHCGender } from '../model/viewModel/VwHCGender';
import { VwHCPriority } from '../model/viewModel/VwHCPriority';
import { VwHCActionTypeLang } from '../model/viewModel/VwHCActionTypeLang';
import { VwHCDocType } from '../model/viewModel/VwHCDocType';
import { VwHCGenderLang } from '../model/viewModel/VwHCGenderLang';
import { VwHCPolicyTitleLang } from '../model/viewModel/VwHCPolicyTitleLang';
import { VwHCWHOperationStatus } from '../model/viewModel/VwHCWHOperationStatus';
import { VwHCLanguage } from '../model/viewModel/VwHCLanguage';
import { VwHCZoneTypeLang } from '../model/viewModel/VwHCZoneTypeLang';
import { VwHCSkillTitleLang } from '../model/viewModel/VwHCSkillTitleLang';
import { VwHCWHOperationType } from '../model/viewModel/VwHCWHOperationType';
import { VwHCCurrency } from '../model/viewModel/VwHCCurrency';
import { VwHCSkillTitle } from '../model/viewModel/VwHCSkillTitle';
import { VwHCCurrencyLang } from '../model/viewModel/VwHCCurrencyLang';
import { VwHCBookingStatus } from '../model/viewModel/VwHCBookingStatus';
import { VwHCResourceTypeLang } from '../model/viewModel/VwHCResourceTypeLang';
import { VwHCPelakCharacter } from '../model/viewModel/VwHCPelakCharacter';
import { VwHCWeekDay } from '../model/viewModel/VwHCWeekDay';
import { VwHCResourceType } from '../model/viewModel/VwHCResourceType';
import { VwHCJCOperationType } from '../model/viewModel/VwHCJCOperationType';
import { VwHCMessageType } from '../model/viewModel/VwHCMessageType';
import { VwHCUserTypeLang } from '../model/viewModel/VwHCUserTypeLang';
import { VwHCJCOperationTypeLang } from '../model/viewModel/VwHCJCOperationTypeLang';
import { VwHCUserType } from '../model/viewModel/VwHCUserType';
import { VwHCJobCardType } from '../model/viewModel/VwHCJobCardType';
import { VwHCJobCardTypeLang } from '../model/viewModel/VwHCJobCardTypeLang';
import { VwHCWHOperationStatusLang } from '../model/viewModel/VwHCWHOperationStatusLang';
import { VwHCWHOperationTypeLang } from '../model/viewModel/VwHCWHOperationTypeLang';
import { VwHCPaymentStatus } from '../model/viewModel/VwHCPaymentStatus';
import { VwHCShipType } from '../model/viewModel/VwHCShipType';

import { VwShippingDetail } from '../model/viewModel/VwShippingDetail';
import { VwLoadDeliveryTTWeekDay } from '../model/viewModel/VwLoadDeliveryTTWeekDay';
import { VwLoadDeliveryTimeTitle } from '../model/viewModel/VwLoadDeliveryTimeTitle';
import { VwBillOLBooking } from '../model/viewModel/VwBillOLBooking';
import { VwBillOLBKShipStatus } from '../model/viewModel/VwBillOLBKShipStatus';
import { VwBillOfLading } from '../model/viewModel/VwBillOfLading';
import { VwLoginHistory } from '../model/viewModel/VwLoginHistory';
import { VwWorkOrder } from '../model/viewModel/VwWorkOrder';
import { VwJobCardLang } from '../model/viewModel/VwJobCardLang';
import { VwJCInterval } from '../model/viewModel/VwJCInterval';
import { VwJCNeedProduct } from '../model/viewModel/VwJCNeedProduct';
import { VwJCNeedCategory } from '../model/viewModel/VwJCNeedCategory';

import { VwJCEffectOnProduct } from '../model/viewModel/VwJCEffectOnProduct';
import { VwJCEffectOnCategory } from '../model/viewModel/VwJCEffectOnCategory';
import { VwJCEffectOnAsset } from '../model/viewModel/VwJCEffectOnAsset';
import { VwJobCard } from '../model/viewModel/VwJobCard';
import { VwDepWorkDate } from '../model/viewModel/VwDepWorkDate';
import { VwDepWeekWorkTime } from '../model/viewModel/VwDepWeekWorkTime';
import { VwDepPolicy } from '../model/viewModel/VwDepPolicy';
import { VwDepCategory } from '../model/viewModel/VwDepCategory';
import { VwDepBrand } from '../model/viewModel/VwDepBrand';
import { VwDepartmentLang } from '../model/viewModel/VwDepartmentLang';
import { VwDepartmentDepType } from '../model/viewModel/VwDepartmentDepType';
import { VwPayment } from '../model/viewModel/VwPayment';
import { VwCurrencyExchange } from '../model/viewModel/VwCurrencyExchange';
import { VwBillOfLadingPayment } from '../model/viewModel/VwBillOfLadingPayment';
import { VwAccount } from '../model/viewModel/VwAccount';
import { VwBookingWork } from '../model/viewModel/VwBookingWork';
import { VwBookingAsset } from '../model/viewModel/VwBookingAsset';
import { VwBooking } from '../model/viewModel/VwBooking';
import { VwMachineRelated } from '../model/viewModel/VwMachineRelated';
import { VwAssignmentDetail } from '../model/viewModel/VwAssignmentDetail';
import { VwAssignment } from '../model/viewModel/VwAssignment';
import { VwAssetDefect } from '../model/viewModel/VwAssetDefect';
import { VwShipRule } from '../model/viewModel/VwShipRule';
import { VwStock } from '../model/viewModel/VwStock';
import { VwStockLang } from '../model/viewModel/VwStockLang';
import { VwAssetLang } from '../model/viewModel/VwAssetLang';
import { VwAssetOperStatus } from '../model/viewModel/VwAssetOperStatus';
import { VwAssetSelectionType } from '../model/viewModel/VwAssetSelectionType';
import { VwAssetAttribute } from '../model/viewModel/VwAssetAttribute';
import { VwDepPolicyLang } from '../model/viewModel/VwDepPolicyLang';
import { VwFAQ } from '../model/viewModel/VwFAQ';
import { VwGuarantee } from '../model/viewModel/VwGuarantee';
import { VwPricing } from '../model/viewModel/VwPricing';

import { VwUserFavouriteAsset } from '../model/viewModel/VwUserFavouriteAsset';
import { VwSurveySubjectParameter } from '../model/viewModel/VwSurveySubjectParameter';
import { VwHCSurveyParameter } from '../model/viewModel/VwHCSurveyParameter';
import { VwHCSurveyDomain } from '../model/viewModel/VwHCSurveyDomain';
import { VwSurveySubject } from '../model/viewModel/VwSurveySubject';
import { VwResource } from '../model/viewModel/VwResource';
import { VwResourceLang } from '../model/viewModel/VwResourceLang';
import { VwRolePermission } from '../model/viewModel/VwRolePermission';
import { VwHCMonth } from '../model/viewModel/VwHCMonth';
import { VwHCSelectionType } from '../model/viewModel/VwHCSelectionType';
import { VwUserRole } from '../model/viewModel/VwUserRole';
import { VwHCGuaranteeType } from '../model/viewModel/VwHCGuaranteeType';
import { VwHCHardCondition } from '../model/viewModel/VwHCHardCondition';
import { VwHCOperationStatus } from '../model/viewModel/VwHCOperationStatus';
import { VwHCPlanTitle } from '../model/viewModel/VwHCPlanTitle';
import { VwHCPlanType } from '../model/viewModel/VwHCPlanType';
import { VwHCPredecessorType } from '../model/viewModel/VwHCPredecessorType';
import { VwHCQuestionTitle } from '../model/viewModel/VwHCQuestionTitle';
import { VwHCPlanTitleLang } from '../model/viewModel/VwHCPlanTitleLang';
import { VwHCChatStatus } from '../model/viewModel/VwHCChatStatus';
import { VwHCChatTitle } from '../model/viewModel/VwHCChatTitle';
import { VwHCChatType } from '../model/viewModel/VwHCChatType';
import { VwContact } from '../model/viewModel/VwContact';
import { VwNewsLetter } from '../model/viewModel/VwNewsLetter';
import { VwChat } from '../model/viewModel/VwChat';
import { VwChatDetail } from '../model/viewModel/VwChatDetail';
import { VwJCUserReject } from '../model/viewModel/VwJCUserReject';
import { VwWorkOrderLang } from '../model/viewModel/VwWorkOrderLang';
import { VwUserOpinion } from '../model/viewModel/VwUserOpinion';
import { VwAssetUsage } from '../model/viewModel/VwAssetUsage';
import { VwCategorySelectionType } from '../model/viewModel/VwCategorySelectionType';

import { VwZoneHardCondition } from '../model/viewModel/VwZoneHardCondition';
import { VwDepSkill } from '../model/viewModel/VwDepSkill';
import { VwContract } from '../model/viewModel/VwContract';
import { VwUserFriend } from '../model/viewModel/VwUserFriend';
import { VwProductLife } from '../model/viewModel/VwProductLife';
import { VwPersonCategory } from '../model/viewModel/VwPersonCategory';
import { VwPersonSkill } from '../model/viewModel/VwPersonSkill';
import { VwUserFavouriteDep } from '../model/viewModel/VwUserFavouriteDep';
import { VwBookingReturn } from '../model/viewModel/VwBookingReturn';
import { VwProductColor } from '../model/viewModel/VwProductColor';
import { VwPersonProduct } from '../model/viewModel/VwPersonProduct';
import { VwPersonActiveInZone } from '../model/viewModel/VwPersonActiveInZone';
import { VwAssetPhotographyReq } from '../model/viewModel/VwAssetPhotographyReq';

import { VwHCBookingStatusLang } from '../model/viewModel/VwHCBookingStatusLang';
import { VwHCColorLang } from '../model/viewModel/VwHCColorLang';
import { VwHCGuaranteeTypelang } from '../model/viewModel/VwHCGuaranteeTypelang';
import { VwHCHardConditionLang } from '../model/viewModel/VwHCHardConditionLang';
import { VwHCOperationStatusLang } from '../model/viewModel/VwHCOperationStatusLang';
import { VwHCPaymentStatusLang } from '../model/viewModel/VwHCPaymentStatusLang';
import { VwHCPaymentTypeLang } from '../model/viewModel/VwHCPaymentTypeLang';
import { VwHCPlanTypeLang } from '../model/viewModel/VwHCPlanTypeLang';
import { VwHCPredecessorTypeLang } from '../model/viewModel/VwHCPredecessorTypeLang';
import { VwHCPriorityLang } from '../model/viewModel/VwHCPriorityLang';
import { VwHCShipStatusLang } from '../model/viewModel/VwHCShipStatusLang';
import { VwHCShipTypeLang } from '../model/viewModel/VwHCShipTypeLang';
import { VwHCWeekDayLang } from '../model/viewModel/VwHCWeekDayLang';
import { VwHCWOStatusLang } from '../model/viewModel/VwHCWOStatusLang';
import { VwZoneLang } from '../model/viewModel/VwZoneLang';


// import Resource from '../containers/Admin/Security/Resource/Resource';



// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
    userinfo: UserInfo.UserInfoState;
    users: stateBase<VwUser>;
    userssl: stateBase<VwUser>;
    assets: stateBase<VwAsset>;
    assetssl: stateBase<VwAsset>;
    messages: stateBase<VwMessage>;
    messagessl: stateBase<VwMessage>;
    products: stateBase<VwProduct>;
    productssl: stateBase<VwProduct>;
    newsletter: stateBase<VwNewsLetter>;
    categories: stateBase<VwCategory>;
    categoriessl: stateBase<VwCategory>;
    categorylangs: stateBase<VwCategoryLang>;
    categoryattributes: stateBase<VwCategoryAttribute>;
    brands: stateBase<VwBrand>;
    brandssl: stateBase<VwBrand>;
    brandlangs: stateBase<VwBrandLang>;
    productlangs: stateBase<VwProductLang>;
    productattributes: stateBase<VwProductAttribute>;
    productcategories: stateBase<VwProductCategory>;
    rolepermissions: stateBase<VwRolePermission>;
    languages: stateBase<VwLanguage>;
    languagessl: stateBase<VwLanguage>;
    documents: stateBase<VwDocument>;
    departments: stateBase<VwDepartment>;
    departmentssl: stateBase<VwDepartment>;
    shiprulesl: stateBase<VwShipRule>;
    persons: stateBase<VwPerson>;
    personssl: stateBase<VwPerson>;
    personlangs: stateBase<VwPersonLang>;
    personbrands: stateBase<VwPersonBrand>;
    zones: stateBase<VwZone>;
    zonessl: stateBase<VwZone>;
    messagelangs: stateBase<VwMessageLang>;
    treeresources: stateBase<VwResource>;
    userroles: stateBase<VwUserRole>;
    resources: stateBase<VwResource>;
    resourcessl: stateBase<VwResource>;
    resourcelangs: stateBase<VwResourceLang>;
    hcpaymenttype: stateBase<VwHCPaymentType>;
    hcwostatus: stateBase<VwHCWOStatus>;
    hcshipstatus: stateBase<VwHCShipStatus>;
    hcmessagetypelang: stateBase<VwHCMessageTypeLang>;
    hcassethealthstatus: stateBase<VwHCAssetHealthStatus>;
    hcassetquality: stateBase<VwHCAssetQuality>;
    hcunit: stateBase<VwHCUnit>;
    hcattributetitle: stateBase<VwHCAttributeTitle>;
    hccontacttype: stateBase<VwHCContactType>;
    hcassethealthstatuslang: stateBase<VwHCAssetHealthStatusLang>;
    hcassetqualitylang: stateBase<VwHCAssetQualityLang>;
    hcunitlang: stateBase<VwHCUnitLang>;
    hccolor: stateBase<VwHCColor>;
    hcdeptype: stateBase<VwHCDepType>;
    hcattributetitlelang: stateBase<VwHCAttributeTitleLang>;
    hczonetype: stateBase<VwHCZoneType>;
    hccontacttypelang: stateBase<VwHCContactTypeLang>;
    hcshipvelicletype: stateBase<VwHCShipVelicleType>;
    hcdeptypelang: stateBase<VwHCDepTypeLang>;
    hcaccounttype: stateBase<VwHCAccountType>;
    hcactiontype: stateBase<VwHCActionType>;
    hcpolicytitle: stateBase<VwHCPolicyTitle>;
    hcgender: stateBase<VwHCGender>;
    hcpriority: stateBase<VwHCPriority>;
    hcactiontypelang: stateBase<VwHCActionTypeLang>;
    hcdoctype: stateBase<VwHCDocType>;
    hcgenderlang: stateBase<VwHCGenderLang>;
    hcpolicytitlelang: stateBase<VwHCPolicyTitleLang>;
    hcwhoperationstatus: stateBase<VwHCWHOperationStatus>;
    hclanguage: stateBase<VwHCLanguage>;
    hczonetypelang: stateBase<VwHCZoneTypeLang>;
    hcskilltitlelang: stateBase<VwHCSkillTitleLang>;
    hcwhoperationtype: stateBase<VwHCWHOperationType>;
    hccurrency: stateBase<VwHCCurrency>;
    hcskilltitle: stateBase<VwHCSkillTitle>;
    hccurrencylang: stateBase<VwHCCurrencyLang>;
    hcbookingstatus: stateBase<VwHCBookingStatus>;
    hcresourcetypelang: stateBase<VwHCResourceTypeLang>;
    hcpelakcharacter: stateBase<VwHCPelakCharacter>;
    hcweekday: stateBase<VwHCWeekDay>;
    hcresourcetype: stateBase<VwHCResourceType>;
    hcjcoperationtype: stateBase<VwHCJCOperationType>;
    hcmessagetype: stateBase<VwHCMessageType>;
    hcusertypelang: stateBase<VwHCUserTypeLang>;
    hcjcoperationtypelang: stateBase<VwHCJCOperationTypeLang>;
    hcusertype: stateBase<VwHCUserType>;
    hcjobcardtype: stateBase<VwHCJobCardType>;
    hcjobcardtypelang: stateBase<VwHCJobCardTypeLang>;
    hcwhoperationstatuslang: stateBase<VwHCWHOperationStatusLang>;
    hcwhoperationtypelang: stateBase<VwHCWHOperationTypeLang>;
    hcpaymentstatus: stateBase<VwHCPaymentStatus>;
    hcshiptype: stateBase<VwHCShipType>;
    hcsurveyparameter: stateBase<VwHCSurveyParameter>;
    HCSurveyDomain: stateBase<VwHCSurveyDomain>;
    hcmonth: stateBase<VwHCMonth>;
    hcselectiontype: stateBase<VwHCSelectionType>;

    hcguaranteetype: stateBase<VwHCGuaranteeType>;
    hchardcondition: stateBase<VwHCHardCondition>;
    hcoperationstatus: stateBase<VwHCOperationStatus>;
    hcplantitle: stateBase<VwHCPlanTitle>;
    hcplantype: stateBase<VwHCPlanType>;
    hcpredecessortype: stateBase<VwHCPredecessorType>;
    hcquestiontitle: stateBase<VwHCQuestionTitle>;
    hcplantitlelang: stateBase<VwHCPlanTitleLang>;

    hcchatstatus: stateBase<VwHCChatStatus>;
    hcchattitle: stateBase<VwHCChatTitle>;
    hcchattype: stateBase<VwHCChatType>;

    shippingdetail: stateBase<VwShippingDetail>;
    loaddeliveryttweekday: stateBase<VwLoadDeliveryTTWeekDay>;
    loaddeliveryttweekdaysl: stateBase<VwLoadDeliveryTTWeekDay>;
    loaddeliverytimetitle: stateBase<VwLoadDeliveryTimeTitle>;
    billolbooking: stateBase<VwBillOLBooking>;
    billolbkshipstatus: stateBase<VwBillOLBKShipStatus>;
    billoflading: stateBase<VwBillOfLading>;
    billofladingdep: stateBase<VwBillOfLading>;
    loginhistory: stateBase<VwLoginHistory>;
    workorder: stateBase<VwWorkOrder>;
    workordersl: stateBase<VwWorkOrder>;
    workorderasset: stateBase<VwWorkOrder>;
    workorderjobcard: stateBase<VwWorkOrder>;
    jobcardlang: stateBase<VwJobCardLang>;
    jcinterval: stateBase<VwJCInterval>;
    jcintervalsl: stateBase<VwJCInterval>;
    jcneedproduct: stateBase<VwJCNeedProduct>;
    jcneedcategory: stateBase<VwJCNeedCategory>;
    jceffectonproduct: stateBase<VwJCEffectOnProduct>;
    jceffectoncategory: stateBase<VwJCEffectOnCategory>;
    jceffectonasset: stateBase<VwJCEffectOnAsset>;
    jceffectonassetforasset: stateBase<VwJCEffectOnAsset>;
    jceffectonassetforjobcard: stateBase<VwJCEffectOnAsset>;
    jcuserreject: stateBase<VwJCUserReject>;
    jcuserrejectasset: stateBase<VwJCUserReject>;
    jcuserrejectuser: stateBase<VwJCUserReject>;
    jcuserrejectjobcard: stateBase<VwJCUserReject>;
    jobcard: stateBase<VwJobCard>;
    jobcardsl: stateBase<VwJobCard>;
    depworkdate: stateBase<VwDepWorkDate>;
    depweekworktime: stateBase<VwDepWeekWorkTime>;
    deppolicy: stateBase<VwDepPolicy>;
    deppolicylang: stateBase<VwDepPolicyLang>;

    depcategory: stateBase<VwDepCategory>;
    depbrand: stateBase<VwDepBrand>;
    departmentlang: stateBase<VwDepartmentLang>;
    departmentdeptype: stateBase<VwDepartmentDepType>;
    payment: stateBase<VwPayment>;
    currencyexchange: stateBase<VwCurrencyExchange>;
    billofladingpayment: stateBase<VwBillOfLadingPayment>;
    account: stateBase<VwAccount>;
    bookingwork: stateBase<VwBookingWork>;
    bookingasset: stateBase<VwBookingAsset>;
    booking: stateBase<VwBooking>;
    bookingsl: stateBase<VwBooking>;
    machinerelated: stateBase<VwMachineRelated>;
    assignmentdetail: stateBase<VwAssignmentDetail>;
    assignment: stateBase<VwAssignment>;
    assetdefect: stateBase<VwAssetDefect>;
    vwshippingdetail: stateBase<VwShippingDetail>;
    vwloaddeliveryttweekday: stateBase<VwLoadDeliveryTTWeekDay>;
    vwloaddeliverytimetitle: stateBase<VwLoadDeliveryTimeTitle>;
    vwbillolbooking: stateBase<VwBillOLBooking>;
    vwbillolbkshipstatus: stateBase<VwBillOLBKShipStatus>;
    vwbilloflading: stateBase<VwBillOfLading>;
    vwloginhistory: stateBase<VwLoginHistory>;
    vwworkorder: stateBase<VwWorkOrder>;
    vwjobcardlang: stateBase<VwJobCardLang>;
    vwjcinterval: stateBase<VwJCInterval>;
    vwjcneedproduct: stateBase<VwJCNeedProduct>;
    vwjcneedcategory: stateBase<VwJCNeedCategory>;
    vwjceffectonproduct: stateBase<VwJCEffectOnProduct>;
    vwjceffectoncategory: stateBase<VwJCEffectOnCategory>;
    vwjceffectonasset: stateBase<VwJCEffectOnAsset>;
    vwjcuserrekect: stateBase<VwJCUserReject>;

    vwjobcard: stateBase<VwJobCard>;
    vwdepworkdate: stateBase<VwDepWorkDate>;
    vwdepweekworktime: stateBase<VwDepWeekWorkTime>;
    vwdeppolicylang: stateBase<VwDepPolicyLang>;
    vwdeppolicy: stateBase<VwDepPolicy>;
    vwdepcategory: stateBase<VwDepCategory>;
    vwdepbrand: stateBase<VwDepBrand>;
    vwdepartmentlang: stateBase<VwDepartmentLang>;
    vwdepartmentdeptype: stateBase<VwDepartmentDepType>;
    vwpayment: stateBase<VwPayment>;
    vwcurrencyexchange: stateBase<VwCurrencyExchange>;
    vwbillofladingpayment: stateBase<VwBillOfLadingPayment>;
    vwaccount: stateBase<VwAccount>;
    vwbookingwork: stateBase<VwBookingWork>;
    vwbookingasset: stateBase<VwBookingAsset>;
    vwbooking: stateBase<VwBooking>;
    vwmachinerelated: stateBase<VwMachineRelated>;
    vwassignmentdetail: stateBase<VwAssignmentDetail>;
    vwassignment: stateBase<VwAssignment>;
    shiprule: stateBase<VwShipRule>;
    shipruledep: stateBase<VwShipRule>;
    stock: stateBase<VwStock>;
    stocklang: stateBase<VwStockLang>;
    vwassetdefect: stateBase<VwAssetDefect>;
    assetlang: stateBase<VwAssetLang>;
    assetoperstatus: stateBase<VwAssetOperStatus>;
    assetselectiontype: stateBase<VwAssetSelectionType>;
    assetattribute: stateBase<VwAssetAttribute>;
    assetpricing: stateBase<VwPricing>;
    depactiveinzone: stateBase<VwDepActiveInZone>;
    faq: stateBase<VwFAQ>;
    guarantee: stateBase<VwGuarantee>;
    guaranteeasset: stateBase<VwGuarantee>;
    guaranteedep: stateBase<VwGuarantee>;
    userfavouriteasset: stateBase<VwUserFavouriteAsset>;
    surveysubjectparameter: stateBase<VwSurveySubjectParameter>;
    surveysubject: stateBase<VwSurveySubject>;
    contact: stateBase<VwContact>;
    contactsl: stateBase<VwContact>;
    contactdep: stateBase<VwContact>;
    chat: stateBase<VwChat>;
    chatdetail: stateBase<VwChatDetail>;
    messagebox: stateBase<VwChat>;
    workorderlang: stateBase<VwWorkOrderLang>;
    assetdep: stateBase<VwAsset>;
    assetperson: stateBase<VwAsset>;
    contactperson: stateBase<VwContact>;
    userfavouriteassetforasset: stateBase<VwUserFavouriteAsset>;
    userfavouriteassetuser: stateBase<VwUserFavouriteAsset>;
    useropinion: stateBase<VwUserOpinion>;
    useropinionsl: stateBase<VwUserOpinion>;
    useropinionasset: stateBase<VwUserOpinion>;
    useropinionuser: stateBase<VwUserOpinion>;
    bookingforasset: stateBase<VwBooking>;
    assetusage: stateBase<VwAssetUsage>;
    categoryselectiontype: stateBase<VwCategorySelectionType>;

    zonehardcondition: stateBase<VwZoneHardCondition>;
    userfavouritedep: stateBase<VwUserFavouriteDep>;
    depskill: stateBase<VwDepSkill>;
    contract: stateBase<VwContract>;
    contractsl: stateBase<VwContract>;
    userfriend: stateBase<VwUserFriend>;
    bookingreturn: stateBase<VwBookingReturn>;
    productlife: stateBase<VwProductLife>;
    productcolor: stateBase<VwProductColor>;
    personproduct: stateBase<VwPersonProduct>;
    personcategory: stateBase<VwPersonCategory>;
    personskill: stateBase<VwPersonSkill>;
    personactiveinzone: stateBase<VwPersonActiveInZone>;
    assetphotographyreq: stateBase<VwAssetPhotographyReq>;

    hcbookingstatuslang: stateBase<VwHCBookingStatusLang>;
    hccolorlang: stateBase<VwHCColorLang>;
    hcguaranteetypelang: stateBase<VwHCGuaranteeTypelang>;
    hchardconditionlang: stateBase<VwHCHardConditionLang>;
    hcoperationstatuslang: stateBase<VwHCOperationStatusLang>;
    hcpaymentstatuslang: stateBase<VwHCPaymentStatusLang>;
    hcpaymenttypelang: stateBase<VwHCPaymentTypeLang>;
    hcplantypelang: stateBase<VwHCPlanTypeLang>;
    hcpredecessortypelang: stateBase<VwHCPredecessorTypeLang>;
    hcprioritylang: stateBase<VwHCPriorityLang>;
    hcshipstatuslang: stateBase<VwHCShipStatusLang>;
    hcshiptypelang: stateBase<VwHCShipTypeLang>;
    hcweekdaylang: stateBase<VwHCWeekDayLang>;
    hcwostatuslang: stateBase<VwHCWOStatusLang>;
    zonelang: stateBase<VwZoneLang>;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    userinfo: UserInfo.reducer,
    users: User.reducer,
    userssl: UserSL.reducer,
    assets: Asset.reducer,
    assetssl: AssetSL.reducer,
    messages: Message.reducer,
    messagessl: MessageSL.reducer,
    products: Product.reducer,
    productssl:ProductSL.reducer,
    brands: Brand.reducer,
    brandssl: BrandSL.reducer,
    brandlangs: BrandLang.reducer,
    productlangs: ProductLang.reducer,
    productattributes: ProductAttribute.reducer,
    productcategories: ProductCategory.reducer,
    rolepermissions: RolePermission.reducer,
    userroles: UserRole.reducer,
    languages: Language.reducer,
    languagessl: LanguageSL.reducer,
    documents: Document.reducer,
    departments: Department.reducer,
    departmentssl: DepartmentSL.reducer,
    persons: Person.reducer,
    personssl: PersonSL.reducer,
    personlangs: PersonLang.reducer,
    personbrands: PersonBrand.reducer,
    zones: Zone.reducer,
    zonessl: ZoneSL.reducer,
    messagelangs: MessageLang.reducer,
    categories: Category.reducer,
    categoriessl: CategorySL.reducer,
    categorylangs: CategoryLang.reducer,
    categoryattributes: CategoryAttribute.reducer,
    treeresources: TreeResource.reducer,
    resources: Resource.reducer,
    resourcessl: ResourceSL.reducer,
    resourcelangs: ResourceLang.reducer,
    hcpaymenttype: HCPaymentType.reducer,
    hcwostatus: HCWOStatus.reducer,
    hcshipstatus: HCShipStatus.reducer,
    hcmessagetypelang: HCMessageTypeLang.reducer,
    hcshiptype: HCShipType.reducer,
    hcassethealthstatus: HCAssetHealthStatus.reducer,
    hcassetquality: HCAssetQuality.reducer,
    hcunit: HCUnit.reducer,
    hcattributetitle: HCAttributeTitle.reducer,
    hccontacttype: HCContactType.reducer,
    hcassethealthstatuslang: HCAssetHealthStatusLang.reducer,
    hcassetqualitylang: HCAssetQualityLang.reducer,
    hcunitlang: HCUnitLang.reducer,
    hccolor: HCColor.reducer,
    hcdeptype: HCDepType.reducer,
    hcattributetitlelang: HCAttributeTitleLang.reducer,
    hczonetype: HCZoneType.reducer,
    hccontacttypelang: HCContactTypeLang.reducer,
    hcshipvelicletype: HCShipVelicleType.reducer,
    hcdeptypelang: HCDepTypeLang.reducer,
    hcaccounttype: HCAccountType.reducer,
    hcactiontype: HCActionType.reducer,
    hcpolicytitle: HCPolicyTitle.reducer,
    hcgender: HCGender.reducer,
    hcpriority: HCPriority.reducer,
    hcactiontypelang: HCActionTypeLang.reducer,
    hcdoctype: HCDocType.reducer,
    hcgenderlang: HCGenderLang.reducer,
    hcpolicytitlelang: HCPolicyTitleLang.reducer,
    hcwhoperationstatus: HCWHOperationStatus.reducer,
    hclanguage: HCLanguage.reducer,
    hczonetypelang: HCZoneTypeLang.reducer,
    hcskilltitlelang: HCSkillTitleLang.reducer,
    hcwhoperationtype: HCWHOperationType.reducer,
    hccurrency: HCCurrency.reducer,
    hcskilltitle: HCSkillTitle.reducer,
    hccurrencylang: HCCurrencyLang.reducer,
    hcbookingstatus: HCBookingStatus.reducer,
    hcresourcetypelang: HCResourceTypeLang.reducer,
    hcpelakcharacter: HCPelakCharacter.reducer,
    hcweekday: HCWeekDay.reducer,
    hcresourcetype: HCResourceType.reducer,
    hcjcoperationtype: HCJCOperationType.reducer,
    hcmessagetype: HCMessageType.reducer,
    hcusertypelang: HCUserTypeLang.reducer,
    hcjcoperationtypelang: HCJCOperationTypeLang.reducer,
    hcusertype: HCUserType.reducer,
    hcjobcardtype: HCJobCardType.reducer,
    hcjobcardtypelang: HCJobCardTypeLang.reducer,
    hcwhoperationstatuslang: HCWHOperationStatusLang.reducer,
    hcwhoperationtypelang: HCWHOperationTypeLang.reducer,
    hcpaymentstatus: HCPaymentStatus.reducer,

    hcsurveyparameter: HCSurveyParameter.reducer,
    HCSurveyDomain: HCSurveyDomain.reducer,

    shippingdetail: ShippingDetail.reducer,
    loaddeliveryttweekday: LoadDeliveryTTWeekDay.reducer,
    loaddeliveryttweekdaysl: LoadDeliveryTTWeekDaySL.reducer,
    loaddeliverytimetitle: LoadDeliveryTimeTitle.reducer,
    billolbooking: BillOLBooking.reducer,
    billolbkshipstatus: BillOLBKShipStatus.reducer,
    billoflading: BillOfLading.reducer,
    billofladingdep: BillOfLadingDep.reducer,
    loginhistory: LoginHistory.reducer,
    workorder: WorkOrder.reducer,
    workordersl: WorkOrderSL.reducer,
    workorderasset: WorkOrderAsset.reducer,
    workorderjobcard: WorkOrderJobcard.reducer,
    jobcardlang: JobCardLang.reducer,
    jcinterval: JCInterval.reducer,
    jcintervalsl: JCIntervalSL.reducer,
    jcneedproduct: JCNeedProduct.reducer,
    jcneedcategory: JCNeedCategory.reducer,
    jceffectonproduct: JCEffectOnProduct.reducer,
    jceffectoncategory: JCEffectOnCategory.reducer,
    jceffectonasset: JCEffectOnAsset.reducer,
    jceffectonassetforasset: JCEffectOnAssetForAsset.reducer,
    jceffectonassetforjobcard: JCEffectOnAssetForJobCard.reducer,
    jcuserreject: JCUserReject.reducer,
    jcuserrejectasset: JCUserRejectAsset.reducer,
    jcuserrejectuser: JCUserRejectUser.reducer,
    jcuserrejectjobcard:JCUserRejectJobcard.reducer,
    jobcard: JobCard.reducer,
    jobcardsl: JobCardSL.reducer,
    depworkdate: DepWorkDate.reducer,
    depweekworktime: DepWeekWorkTime.reducer,
    deppolicy: DepPolicy.reducer,
    deppolicylang: DepPolicyLang.reducer,
    depcategory: DepCategory.reducer,
    depbrand: DepBrand.reducer,
    departmentlang: DepartmentLang.reducer,
    departmentdeptype: DepartmentDepType.reducer,
    payment: Payment.reducer,
    currencyexchange: CurrencyExchange.reducer,
    billofladingpayment: BillOfLadingPayment.reducer,
    account: Account.reducer,
    bookingwork: BookingWork.reducer,
    bookingasset: BookingAsset.reducer,
    booking: Booking.reducer,
    bookingsl: BookingSL.reducer,
    machinerelated: MachineRelated.reducer,
    assignmentdetail: AssignmentDetail.reducer,
    assignment: Assignment.reducer,
    shipruledep: ShipRuleDep.reducer,
    shiprule: ShipRule.reducer,
    shiprulesl: ShipRuleSL.reducer,

    stock: Stock.reducer,
    stocklang: StockLang.reducer,


    assetdefect: AssetDefect.reducer,
    assetlang: AssetLang.reducer,
    assetoperstatus: AssetOperStatus.reducer,
    assetselectiontype: AssetSelectionType.reducer,
    assetattribute: AssetAttribute.reducer,
    depactiveinzone: DepActiveInZone.reducer,
    assetpricing: AssetPricing.reducer,
    faq: FAQ.reducer,
    guarantee: Guarantee.reducer,
    userfavouriteasset: UserFavouriteAsset.reducer,

    surveysubjectparameter: SurveySubjectParameter.reducer,
    surveysubject: SurveySubject.reducer,
    hcmonth: HCMonth.reducer,
    hcselectiontype: HCSelectionType.reducer,

    hcguaranteetype: HCGuaranteeType.reducer,
    hchardcondition: HCHardCondition.reducer,
    hcoperationstatus: HCOperationStatus.reducer,
    hcplantitle: HCPlanTitle.reducer,
    hcplantype: HCPlanType.reducer,
    hcpredecessortype: HCPredecessorType.reducer,
    hcquestiontitle: HCQuestionTitle.reducer,
    hcplantitlelang: HCPlanTitleLang.reducer,

    hcchatstatus: HCChatStatus.reducer,
    hcchattitle: HCChatTitle.reducer,
    hcchattype: HCChatType.reducer,

    contact: Contact.reducer,
    contactsl: ContactSL.reducer,
    newsletter: NewsLetter.reducer,
    chat: Chat.reducer,
    chatdetail: ChatDetail.reducer,
    messagebox: MessageBox.reducer,
    workorderlang: WorkOrderLang.reducer,
    assetdep: AssetDep.reducer,
    guaranteedep: GuaranteeDep.reducer,
    guaranteeasset: GuaranteeAsset.reducer,
    contactdep: ContactDep.reducer,
    assetperson: AssetPerson.reducer,
    contactperson: ContactPerson.reducer,
    userfavouriteassetforasset: UserFavouriteAssetForAsset.reducer,
    userfavouriteassetuser: UserFavouriteAssetUser.reducer,
    useropinion: UserOpinion.reducer,
    useropinionsl: UserOpinionSL.reducer,
    useropinionasset: UserOpinionAsset.reducer,
    useropinionuser: UserOpinionUser.reducer,
    bookingforasset: BookingForAsset.reducer,
    assetusage:AssetUsage.reducer,
    categoryselectiontype:CategorySelectionType.reducer,

    zonehardcondition:ZoneHardCondition.reducer,
    userfavouritedep:UserFavouriteDep.reducer,
    depskill:DepSkill.reducer,
    contract:Contract.reducer,
    contractsl:ContractSL.reducer,
    userfriend:UserFriend.reducer,
    bookingreturn:BookingReturn.reducer,
    productlife:ProductLife.reducer,
    productcolor:ProductColor.reducer,
    personproduct:PersonProduct.reducer,
    personcategory:PersonCategory.reducer,
    personskill:PersonSkill.reducer,
    personactiveinzone:PersonActiveInZone.reducer,
    assetphotographyreq:AssetPhotographyReq.reducer,

    hcbookingstatuslang:HCBookingStatusLang.reducer,
    hccolorlang:HCColorLang.reducer,
    hcguaranteetypelang:HCGuaranteeTypelang.reducer,
    hchardconditionlang:HCHardConditionLang.reducer,
    hcoperationstatuslang:HCOperationStatusLang.reducer,
    hcpaymentstatuslang:HCPaymentStatusLang.reducer,
    hcpaymenttypelang:HCPaymentTypeLang.reducer,
    hcplantypelang:HCPlanTypeLang.reducer,
    hcpredecessortypelang:HCPredecessorTypeLang.reducer,
    hcprioritylang:HCPriorityLang.reducer,
    hcshipstatuslang:HCShipStatusLang.reducer,
    hcshiptypelang:HCShipTypeLang.reducer,
    hcweekdaylang:HCWeekDayLang.reducer,
    hcwostatuslang:HCWOStatusLang.reducer,
    zonelang:ZoneLang.reducer,
};



export interface ChangeListPageSizeAction {
    type: 'CHANGE_PAGE_SIZE';
    PageSize: number,
}

export interface DeleteDataAction {
    type: 'DELETE';
    id: string,
}

export interface SetMessageAction {
    type: 'SET_MESSAGE';
    message: string,
    messageType: MessageTypes;
}

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
