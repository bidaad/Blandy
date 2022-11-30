
export class entityBase {
    public static get MESSAGE(): string { return "messages"; }
    public static get MESSAGESL(): string { return "messagessl"; }
    public static get PRODUCT(): string { return "products"; }
    public static get PRODUCTSL(): string { return "productssl"; }
    public static get ASSET(): string { return "assets"; }
    public static get ASSETSL(): string { return "assetssl"; }
    public static get ASSETDEP(): string { return "assetdep"; }
    public static get ASSETPERSON(): string { return "assetperson"; }
    public static get BRAND(): string { return "brands"; }
    public static get BRANDSL(): string { return "brandssl"; }
    public static get BRANDLANG(): string { return "brandlangs"; }
    public static get PRODUCTLANG(): string { return "productlangs"; }
    public static get ZONELANG(): string { return "zonelang"; }
    public static get CONTACT(): string { return "contact"; }
    public static get CONTACTSL(): string { return "contactsl"; }
    public static get CONTACTDEP(): string { return "contactdep"; }
    public static get CONTACTPERSON(): string { return "contactperson"; }
    public static get Chat(): string { return "chat"; }
    public static get MessageBox(): string { return "messagebox"; }
    public static get ChatDetail(): string { return "chatdetail"; }
    public static get LANGUAGE(): string { return "languages"; }
    public static get LANGUAGESL(): string { return "languagessl"; }
    public static get Category(): string { return "categories"; }
    public static get CategorySL(): string { return "categoriessl"; }
    public static get Document(): string { return "documents"; }
    public static get ProductCategory(): string { return "productcategories"; }
    public static get RolePermission(): string { return "rolepermissions"; }
    public static get UserRole(): string { return "userroles"; }
    public static get ProductAttribute(): string { return "productattributes"; }
    public static get NEWSLETTER(): string { return "newsletter"; }
    public static get GETALL(): string { return this.MESSAGE + ' | ' + this.PRODUCT; }
    public static get DEPARTMENT(): string { return "departments"; }
    public static get DEPARTMENTSL(): string { return "departmentssl"; }
    public static get PERSON(): string { return "persons"; }
    public static get PERSONSL(): string { return "personssl"; }
    public static get PERSONLANG(): string { return "personlangs"; }
    public static get PERSONBRAND(): string { return "productbrands"; }
    public static get USER(): string { return "users"; }
    public static get USERSL(): string { return "userssl"; }
    public static get ZONE(): string { return "zones"; }
    public static get ZONESL(): string { return "zonessl"; }
    public static get CATEGORY(): string { return "categories"; }
    public static get CATEGORYLANG(): string { return "categorylangs"; }
    public static get CategoryAttribute(): string { return "categoryattributes"; }
    public static get MESSAGELANG(): string { return "messagelangs"; }

    public static get HCPAYMENTTYPE(): string { return "hcpaymenttype"; }
    public static get HCPELAKCHARACTER(): string { return "hcpelakcharacter"; }
    public static get HCWOSTATUS(): string { return "hcwostatus"; }
    public static get HCSHIPSTATUS(): string { return "hcshipstatus"; }
    public static get HCSHIPTYPE(): string { return "hcshiptype"; }
    public static get HCASSETHEALTHSTATUS(): string { return "hcassethealthstatus"; }
    public static get HCASSETQUALITY(): string { return "hcassetquality"; }
    public static get HCUNIT(): string { return "hcunit"; }
    public static get HCATTRIBUTETITLE(): string { return "hcattributetitle"; }
    public static get HCCONTACTTYPE(): string { return "hccontacttype"; }
    public static get HCASSETHEALTHSTATUSLANG(): string { return "hcassethealthstatuslang"; }
    public static get HCASSETQUALITYLANG(): string { return "hcassetqualitylang"; }
    public static get HCUNITLANG(): string { return "hcunitlang"; }
    public static get HCMESSAGETYPELANG(): string { return "hcmessagetypelang"; }
    public static get HCCOLOR(): string { return "hccolor"; }
    public static get HCDEPTYPE(): string { return "hcdeptype"; }
    public static get HCATTRIBUTETITLELANG(): string { return "hcattributetitlelang"; }
    public static get HCZONETYPE(): string { return "hczonetype"; }
    public static get HCCONTACTTYPELANG(): string { return "hccontacttypelang"; }
    public static get HCSHIPVELICLETYPE(): string { return "hcshipvelicletype"; }
    public static get HCDEPTYPELANG(): string { return "hcdeptypelang"; }
    public static get HCACCOUNTTYPE(): string { return "hcaccounttype"; }
    public static get HCACTIONTYPE(): string { return "hcactiontype"; }
    public static get HCPOLICYTITLE(): string { return "hcpolicytitle"; }
    public static get HCGENDER(): string { return "hcgender"; }
    public static get HCPRIORITY(): string { return "hcpriority"; }
    public static get HCACTIONTYPELANG(): string { return "hcactiontypelang"; }
    public static get HCDOCTYPE(): string { return "hcdoctype"; }
    public static get HCGENDERLANG(): string { return "hcgenderlang"; }
    public static get HCPOLICYTITLELANG(): string { return "hcpolicytitlelang"; }
    public static get HCWHOPERATIONSTATUS(): string { return "hcwhoperationstatus"; }
    public static get HCLANGUAGE(): string { return "hclanguage"; }
    public static get HCZONETYPELANG(): string { return "hczonetypelang"; }
    public static get HCSKILLTITLELANG(): string { return "hcskilltitlelang"; }
    public static get HCWHOPERATIONTYPE(): string { return "hcwhoperationtype"; }
    public static get HCCURRENCY(): string { return "hccurrency"; }
    public static get HCSKILLTITLE(): string { return "hcskilltitle"; }
    public static get HCCURRENCYLANG(): string { return "hccurrencylang"; }
    public static get HCBOOKINGSTATUS(): string { return "hcbookingstatus"; }
    public static get HCRESOURCETYPELANG(): string { return "hcresourcetypelang"; }
    public static get HCWEEKDAY(): string { return "hcweekday"; }
    public static get HCRESOURCETYPE(): string { return "hcresourcetype"; }
    public static get HCJCOPERATIONTYPE(): string { return "hcjcoperationtype"; }
    public static get HCMESSAGETYPE(): string { return "hcmessagetype"; }
    public static get HCUSERTYPELANG(): string { return "hcusertypelang"; }
    public static get HCJCOPERATIONTYPELANG(): string { return "hcjcoperationtypelang"; }
    public static get HCUSERTYPE(): string { return "hcusertype"; }
    public static get HCJOBCARDTYPE(): string { return "hcjobcardtype"; }
    public static get HCJOBCARDTYPELANG(): string { return "hcjobcardtypelang"; }
    public static get HCWHOPERATIONSTATUSLANG(): string { return "hcwhoperationstatuslang"; }
    public static get HCWHOPERATIONTYPELANG(): string { return "hcwhoperationtypelang"; }
    public static get HCPAYMENTSTATUS(): string { return "hcpaymentstatus"; }
    public static get HCSurveyDomain(): string { return "HCSurveyDomain"; }
    public static get HCSURVEYPARAMETER(): string { return "hcsurveyparameter"; }
    public static get HCMONTH(): string { return "hcmonth"; }
    public static get HCSELECTIONTYPE(): string { return "hcselectiontype"; }
    public static get HCGUARANTEETYPE(): string { return "hcguaranteetype"; }
    public static get HCHARDCONDITION(): string { return "hchardcondition"; }
    public static get HCOPERATIONSTATUS(): string { return "hcoperationstatus"; }
    public static get HCPLANTITLE(): string { return "hcplantitle"; }
    public static get HCPLANTYPE(): string { return "hcplantype"; }
    public static get HCPREDECESSORTYPE(): string { return "hcpredecessortype"; }
    public static get HCQUESTIONTITLE(): string { return "hcquestiontitle"; }
    public static get HCPLANTITLELANG(): string { return "hcplantitlelang"; }

    public static get HCCHATSTATUS(): string { return "hcchatstatus"; }
    public static get HCCHATTITLE(): string { return "hcchattitle"; }
    public static get HCCHATTYPE(): string { return "hcchattype"; }
    

    public static get ACCOUNT(): string { return "account"; }
    public static get SHIPPINGDETAIL(): string { return "shippingdetail"; }
    public static get LOADDELIVERYTTWEEKDAY(): string { return "loaddeliveryttweekday"; }
    public static get LOADDELIVERYTTWEEKDAYSL(): string { return "loaddeliveryttweekdaysl"; }
    public static get LOADDELIVERYTIMETITLE(): string { return "loaddeliverytimetitle"; }
    public static get BILLOLBKSHIPSTATUS(): string { return "billolbkshipstatus"; }
    public static get BILLOLBOOKING(): string { return "billolbooking"; }
    public static get BILLOFLADING(): string { return "billoflading"; }
    public static get BILLOFLADINGDEP(): string { return "billofladingdep"; }
    public static get LOGINHISTORY(): string { return "loginhistory"; }
    public static get WORKORDER(): string { return "workorder"; }
    public static get WORKORDERSL(): string { return "workordersl"; }
    public static get WORKORDERASSET(): string { return "workorderasset"; }
    public static get WORKORDERJOBCARD(): string { return "workorderjobcard"; }
    public static get JOBCARDLANG(): string { return "jobcardlang"; }
    public static get JCINTERVAL(): string { return "jcinterval"; }
    public static get JCINTERVALSL(): string { return "jcintervalsl"; }
    public static get JCNEEDPRODUCT(): string { return "jcneedproduct"; }
    public static get JCNEEDCATEGORY(): string { return "jcneedcategory"; }
    public static get JCEFFECTONPRODUCT(): string { return "jceffectonproduct"; }
    public static get JCEFFECTONCATEGORY(): string { return "jceffectoncategory"; }
    public static get JCEFFECTONASSET(): string { return "jceffectonasset"; }
    public static get JCEFFECTONASSETFORASSET(): string { return "jceffectonassetforasset"; }
    public static get JCEFFECTONASSETFORJOBCARD(): string { return "jceffectonassetforjobcard"; }
    public static get JCUSERREJECT(): string { return "jcuserreject"; }
    public static get JCUSERREJECTASSET(): string { return "jcuserrejectasset"; }
    public static get JCUSERREJECTUSER(): string { return "jcuserrejectuser"; }
    public static get JCUSERREJECTJOBCARD(): string { return "jcuserrejectjobcard"; }

    public static get JOBCARD(): string { return "jobcard"; }
    public static get JOBCARDSL(): string { return "jobcardsl"; }
    public static get DEPWORKDATE(): string { return "depworkdate"; }
    public static get DEPWEEKWORKTIME(): string { return "depweekworktime"; }
    public static get DEPPOLICY(): string { return "deppolicy"; }
    public static get DEPPOLICYLANG(): string { return "deppolicylang"; }
    public static get DEPCATEGORY(): string { return "depcategory"; }
    public static get DEPBRAND(): string { return "depbrand"; }
    public static get DEPARTMENTLANG(): string { return "departmentlang"; }
    public static get DEPARTMENTDEPTYPE(): string { return "departmentdeptype"; }
    public static get PAYMENT(): string { return "payment"; }
    public static get CURRENCYEXCHANGE(): string { return "currencyexchange"; }
    public static get BILLOFLADINGPAYMENT(): string { return "billofladingpayment"; }
    public static get BOOKINGWORK(): string { return "bookingwork"; }
    public static get BOOKINGASSET(): string { return "bookingasset"; }
    public static get BOOKING(): string { return "booking"; }
    public static get BOOKINGSL(): string { return "bookingsl"; }
    public static get BOOKINGFORASSET(): string { return "bookingforasset"; }
    public static get MACHINERELATED(): string { return "machinerelated"; }
    public static get ASSIGNMENTDETAIL(): string { return "assignmentdetail"; }
    public static get ASSIGNMENT(): string { return "assignment"; }

    public static get SHIPRULE(): string { return "shiprule"; }
    public static get SHIPRULESL(): string { return "shiprulesl"; }
    public static get SHIPRULEDEP(): string { return "shipruledep"; }
    public static get STOCK(): string { return "stock"; }
    public static get STOCKLANG(): string { return "stocklangshiprule"; }
    public static get TREERESOURCE(): string { return "treeresource"; }
    public static get RESOURCE(): string { return "resource"; }
    public static get RESOURCESL(): string { return "resourcessl"; }
    public static get RESOURCELANG(): string { return "resourcelang"; }
    public static get ASSETATTRIBUTE(): string { return "assetattribute"; }
    public static get ASSETPRICING(): string { return "assetpricing"; }
    public static get ASSETDEFECT(): string { return "assetdefect"; }
    public static get ASSETUSAGE(): string { return "assetusage"; }
    public static get ASSETLANG(): string { return "assetlang"; }
    public static get ASSETOPERSTATUS(): string { return "assetoperstatus"; }
    public static get ASSETSELECTIONTYPE(): string { return "assetselectiontype"; }

    public static get DEPACTIVEINZONE(): string { return "depactiveinzone"; }
    public static get FAQ(): string { return "faq"; }
    public static get GUARANTEE(): string { return "guarantee"; }
    public static get GUARANTEEDEP(): string { return "guaranteedep"; }
    public static get GUARANTEEASSET(): string { return "guaranteeasset"; }
    public static get USERFAVOURITEASSET(): string { return "userfavouriteasset"; }
    public static get USERFAVOURITEASSETUSER(): string { return "userfavouriteassetuser"; }
    public static get USERFAVOURITEASSETFORASSET(): string { return "userfavouriteassetforasset"; }

    public static get SURVEYSUBJECT(): string { return "surveysubject"; }
    public static get SURVEYSUBJECTPARAMETER(): string { return "surveysubjectparameter"; }
    public static get WORKORDERLANG(): string { return "workorderlang"; }
    public static get USEROPINION(): string { return "useropinion"; }
    public static get USEROPINIONSL(): string { return "useropinionsl"; }
    public static get USEROPINIONASSET(): string { return "useropinionasset"; }
    public static get USEROPINIONUSER(): string { return "useropinionuser"; }
    public static get CATEGORYSELECTIONTYPE(): string { return "categoryselectiontype"; }
    
    public static get ASSETPHOTOGRAPHYREQ(): string { return "assetphotographyreq"; }
    public static get ZONEHARDCONDITION(): string { return "zonehardcondition"; }
public static get USERFAVOURITEDEP(): string { return "userfavouritedep"; }
public static get DEPSKILL(): string { return "depskill"; }
public static get CONTRACT(): string { return "contract"; }
public static get CONTRACTSL(): string { return "contractsl"; }
public static get USERFRIEND(): string { return "userfriend"; }
public static get BOOKINGRETURN(): string { return "bookingreturn"; }
public static get PRODUCTLIFE(): string { return "productlife"; }
public static get PRODUCTCOLOR(): string { return "productcolor"; }
public static get PERSONPRODUCT(): string { return "personproduct"; }
public static get PERSONCATEGORY(): string { return "personcategory"; }
public static get PERSONSKILL(): string { return "personskill"; }
public static get PERSONACTIVEINZONE(): string { return "personactiveinzone"; }

public static get HCBOOKINGSTATUSLANG(): string { return "hcbookingstatuslang"; }
public static get HCCOLORLANG(): string { return "hccolorlang"; }
public static get HCGUARANTEETYPELANG(): string { return "hcguaranteetypelang"; }
public static get HCHARDCONDITIONLANG(): string { return "hchardconditionlang"; }
public static get HCOPERATIONSTATUSLANG(): string { return "hcoperationstatuslang"; }
public static get HCPAYMENTSTATUSLANG(): string { return "hcpaymentstatuslang"; }
public static get HCPAYMENTTYPELANG(): string { return "hcpaymenttypelang"; }
public static get HCPLANTYPELANG(): string { return "hcplantypelang"; }
public static get HCPREDECESSORTYPELANG(): string { return "hcpredecessortypelang"; }
public static get HCPRIORITYLANG(): string { return "hcprioritylang"; }
public static get HCSHIPSTATUSLANG(): string { return "hcshipstatuslang"; }
public static get HCSHIPTYPELANG(): string { return "hcshiptypelang"; }
public static get HCWEEKDAYLANG(): string { return "hcweekdaylang"; }
public static get HCWOSTATUSLANG(): string { return "hcwostatuslang"; }

}
export type KnownEntities =
    "newsletter" |
    "messagelangs" |
    "zones" |
    "zonessl" |
    "users" |
    "userssl" |
    "messages" |
    "messagessl" |
    "assets" |
    "assetssl" |
    "assetdep" |
    "products" |
    "brands" |
    "brandssl" |
    "brandlangs" |
    "productlangs" |
    "productssl" |
    "contact" |
    "contactsl" |
    "contactdep" |
    "chat" |
    "productcategories" |
    "rolepermissions" |
    "userroles" |
    "productattributes" |
    "languages" |
    "languagessl" |
    "categories" |
    "categoriessl" |
    "documents" |
    "persons" |
    "personssl" |
    "personlangs" |
    "personbrands" |
    "categories" |
    "categorylangs" |
    "categoryattributes" |
    "departments" |
    "departmentssl" |
    "treeresources" |
    "resourcelangs" |
    "hcpelakcharacter" |
    "hcpaymenttype" |
    "hcwostatus" |
    "hcshipstatus" |
    "hcshiptype" |
    "hcassethealthstatus" |
    "hcassetquality" |
    "hcunit" |
    "hcattributetitle" |
    "hccontacttype" |
    "hcassethealthstatuslang" |
    "hcassetqualitylang" |
    "hcunitlang" |
    "hcmessagetypelang" |
    "hccolor" |
    "hcdeptype" |
    "hcattributetitlelang" |
    "hczonetype" |
    "hccontacttypelang" |
    "hcshipvelicletype" |
    "hcdeptypelang" |
    "hcaccounttype" |
    "hcactiontype" |
    "hcpolicytitle" |
    "hcgender" |
    "hcpriority" |
    "hcactiontypelang" |
    "hcdoctype" |
    "hcgenderlang" |
    "hcpolicytitlelang" |
    "hcwhoperationstatus" |
    "hclanguage" |
    "hczonetypelang" |
    "hcskilltitlelang" |
    "hcwhoperationtype" |
    "hccurrency" |
    "hcskilltitle" |
    "hccurrencylang" |
    "hcbookingstatus" |
    "hcresourcetypelang" |
    "hcpelakcharacter" |
    "hcweekday" |
    "hcresourcetype" |
    "hcjcoperationtype" |
    "hcmessagetype" |
    "hcusertypelang" |
    "hcjcoperationtypelang" |
    "hcusertype" |
    "hcjobcardtype" |
    "hcjobcardtypelang" |
    "hcwhoperationstatuslang" |
    "hcwhoperationtypelang" |
    "hcpaymentstatus" |

    "shippingdetail" |
    "loaddeliveryttweekday" |
    "loaddeliveryttweekdaysl" |
    "loaddeliverytimetitle" |
    "billolbooking" |
    "billolbkshipstatus" |
    "billoflading" |
    "loginhistory" |
    "workorder" |
    "workordersl" |
    "jobcardlang" |
    "jcinterval" |
    "jcintervalsl" |
    "jcneedproduct" |
    "jcneedcategory" |
    "jceffectonproduct" |
    "jceffectoncategory" |
    "jceffectonasset" |
    "jcuserreject" |

    "jobcard" |
    "jobcardsl" |
    "depworkdate" |
    "depweekworktime" |
    "deppolicy" |
    "deppolicylang" |
    "depcategory" |
    "depbrand" |
    "departmentlang" |
    "departmentdeptype" |
    "payment" |
    "currencyexchange" |
    "billofladingpayment" |
    "account" |
    "bookingwork" |
    "bookingasset" |
    "booking" |
    "bookingsl" |
    "machinerelated" |
    "assignmentdetail" |
    "assignment" |
    "shiprule" |
    "shiprulesl" |
    "stock" |
    "stocklang" |
    "assetpricing" |
    "assetattribute" |
    "assetdefect" |
    "assetlang" |
    "assetoperstatus" |
    "assetselectiontype" |
    "depactiveinzone" |
    "faq" |
    "guarantee" |
    "userfavouriteasset" |

    "userfavouriteasset" |
    "userfavouriteasset" |
    "surveysubject" |
    "surveysubjectparameter" |

    "HCSurveyDomain" |
    "hcsurveyparameter" |
    "hcmonth" |
    "hcselectiontype" |
    "hcguaranteetype" |
    "hchardcondition" |
    "hcoperationstatus" |
    "hcplantitle" |
    "hcplantype" |
    "hcpredecessortype" |
    "hcquestiontitle" |
    "hcplantitlelang" |
    "hcchatstatus" |
    "hcchattitle" |
    "hcchattype" |
    "chatdetail" |
    "messagebox" |
    "workorderlang" |
    "guaranteedep" |
    "shipruledep" |
    "billofladingdep" |
    "assetperson" |
    "contactperson" |
    "guaranteeasset" |
    "userfavouriteassetuser" |
    "userfavouriteassetforasset" |
    "useropinion" |
    "useropinionsl" |
    "useropinionasset" |
    "useropinionuser" |
    "bookingforasset" |
    "workorderasset" |
    "workorderjobcard" |
    "jceffectonassetforasset" |
    "jceffectonassetforjobcard" |
    "jcuserrejectasset" |
    "jcuserrejectuser" |
    "jcuserrejectjobcard" |
    "assetusage" |
    "categoryselectiontype" |
    "resourcessl" |
    "assetphotographyreq" |
    "zonehardcondition" |
    "userfavouritedep" |
    "depskill" |
    "contract" |
    "contractsl" |
    "userfriend" |
    "bookingreturn" |
    "productlife" |
    "productcolor" |
    "personproduct" |
    "personcategory" |
    "personskill" |
    "personactiveinzone" |
    "hcbookingstatuslang" |
    "hccolorlang" |
    "hcguaranteetypelang" |
    "hchardconditionlang" |
    "hcoperationstatuslang" |
    "hcpaymentstatuslang" |
    "hcpaymenttypelang" |
    "hcplantypelang" |
    "hcpredecessortypelang" |
    "hcprioritylang" |
    "hcshipstatuslang" |
    "hcshiptypelang" |
    "hcweekdaylang" |
    "hcwostatuslang"  |
    "zonelang"
    ;

