export interface RoleLang {
    ID: string;
    RoleId: string;
    LanguageId: string;
    Name: string;
    CategoryDescription: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface Role {
    ID: string;
    Code: string;
    Sign: string;
    NameEn: string;
    NameFa: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface StockLang {
    ID: string;
    StockId: string;
    LanguageId: string;
    Package: string;
    PackageUnit: string;
    AssetUnit: string;
    Warranty: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface sysdiagrams {
    name: string;
    principal_id: number;
    diagram_id: number;
    version: number;
    definition: string;
}
export interface ProductAttribute {
    ID: string;
    ProductId: string;
    HCAttributeTitle: string;
    Value: string;
    ShowForAsset: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface ProductCategory {
    ID: string;
    ProductId: string;
    CategoryId: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface Brand {
    ID: string;
    Code: string;
    Sign: string;
    Logo: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface Category {
    ID: string;
    ParentId: string;
    Code: string;
    Sign: string;
    Icon: string;
    Each: string;
    HSCode: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface ProductLang {
    ID: string;
    ProductId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCAssetHealthStatus {
    ID: string;
    Code: string;
    Sign: string;
    Icon: string;
    OrderBy: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface BrandLang {
    ID: string;
    BrandId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface CategoryAttribute {
    ID: string;
    CategoryId: string;
    HCAttributeTitleId: string;
    Value: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCAssetQuality {
    ID: string;
    Code: string;
    Sign: string;
    Icon: string;
    OrderBy: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface AssetAttribute {
    ID: string;
    AssetId: string;
    HCAttributeTitleId: string;
    Value: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface CategoryLang {
    ID: string;
    CategoryId: string;
    LanguageId: string;
    Name: string;
    CategoryDescription: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCUnit {
    ID: string;
    Code: string;
    Sign: string;
    Icon: string;
    OrderBy: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCAttributeTitle {
    ID: string;
    Code: string;
    Sign: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface Contact {
    ID: string;
    PersonId: string;
    DepId: string;
    HCContactTypeId: string;
    ZoneId: string;
    Value: string;
    PostCode: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface Department {
    ID: string;
    Code: string;
    Sign: string;
    ParentId: string;
    HCDepTypeId: string;
    latitude: string;
    Longitude: string;
    RegisterNumber: string;
    RegisterDate: Date;
    EconomicCode: string;
    NationalCode: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCContactType {
    ID: string;
    Code: string;
    Sign: string;
    Icon: string;
    OrderBy: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCAssetHealthStatusLang {
    ID: string;
    HCAssetHealthStatusId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface Zone {
    ID: string;
    Code: string;
    Sign: string;
    ParentId: string;
    TelCode: string;
    HCZoneTypeId: string;
    Latitude: string;
    Longitude: string;
    ISOCode1: string;
    ISOCode2: string;
    ISOCode3: string;
    PostCode: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface Person {
    ID: string;
    HCGenderId: string;
    NationalCode: string;
    BirthDate: Date;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCAssetQualityLang {
    ID: string;
    HCAssetQualityId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface DepartmentLang {
    ID: string;
    DepartmentId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface Product {
    ID: string;
    Code: string;
    Sign: string;
    MainFactoryPN: string;
    Icon: string;
    ManufactureId: string;
    BrandId: string;
    BarCode: string;
    Model: string;
    DetailComment: string;
    Machine: string;
    ParentId: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
    InternalFactoryPN: string;
    HCUnitId: string;
}
export interface HCUnitLang {
    ID: string;
    HCUnitId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface DepCategory {
    ID: string;
    DepId: string;
    DepTypeId: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface MachineRelated {
    ID: string;
    ProductId: string;
    MachineId: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCDepType {
    ID: string;
    Code: string;
    Sign: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface ProductSearch {
    ID: string;
    UserId: string;
    Time: Date;
    BrandId: string;
    ProductId: string;
    CategoryId: string;
    SearchText: string;
    ResultCount: number;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface DepBrands {
    ID: string;
    DepId: string;
    BrandId: string;
    Default: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCAttributeTitleLang {
    ID: string;
    HCAttributeTitleId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCZoneType {
    ID: string;
    Code: string;
    Sign: string;
    OrderBy: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface Document {
    ID: string;
    HCDocTypeId: string;
    Code: string;
    Sign: string;
    Version: string;
    FilePath: string;
    KeyWords: string;
    Abstract: string;
    ISBN: string;
    Publisher: string;
    PublishDate: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCContactTypeLang {
    ID: string;
    HCContactTypeId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface EntityDoc {
    ID: string;
    EntityName: string;
    EntityId: string;
    DocumentId: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCDepTypeLang {
    ID: string;
    HCDepTypeId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCActionType {
    ID: string;
    Code: string;
    Sign: string;
    NameEn: string;
    NameFa: string;
    OrderBy: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCGender {
    ID: string;
    Code: string;
    Sign: string;
    Logo: string;
    OrderBy: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCActionTypeLang {
    ID: string;
    HCActionTypeId: string;
    LanguageId: string;
    Name: string;
    CategoryDescription: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCGenderLang {
    ID: string;
    HCGenderId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCLanguage {
    ID: string;
    ISOCode1: string;
    ISOCode2: string;
    Sign: string;
    Icon: string;
    OrderBy: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
    NameFa: string;
    NameEn: string;
    LocalName: string;
    RightToLeft: string;
}
export interface HCZoneTypeLang {
    ID: string;
    HCZoneTypeId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCCurrency {
    ID: string;
    ISOCode1: string;
    ISOCode2: string;
    Sign: string;
    DecimalNo: string;
    Symbol: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
    OrderBy: string;
}
export interface HCCurrencyLang {
    ID: string;
    HCCurrencyId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface Permission {
    ID: string;
    ResourceId: string;
    ActionTypeId: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCResourceTypeLang {
    ID: string;
    HCResourceTypeId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface Resource {
    ID: string;
    ParentId: string;
    HCResourceTypeId: string;
    Code: string;
    Sign: string;
    OrderBy: number;
    Area: string;
    Controller: string;
    Action: string;
    Icon: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCResourceType {
    ID: string;
    Code: string;
    Sign: string;
    OrderBy: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface PersonLang {
    ID: string;
    PersonId: string;
    LanguageId: string;
    Name: string;
    MidName: string;
    LastName: string;
    FatherName: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCUserTypeLang {
    ID: string;
    HCUserTypeId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface ResourceLang {
    ID: string;
    ResourceId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface HCUserType {
    ID: string;
    Code: string;
    Sign: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface RolePermission {
    ID: string;
    RoleId: string;
    PermissionId: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface User {
    ID: string;
    DepId: string;
    PersonId: string;
    HCUserTypeId: string;
    Username: string;
    PasswordSalt: string;
    Password: string;
    Authenticate: string;
    StatusMessage: string;
    Token: string;
    TokenExpireTime: Date;
    DefaultLanguageId: string;
    DefaultCurrencyId: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface UserPermission {
    ID: string;
    UserId: string;
    PermissionId: string;
    USPR_Deny: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface UserRole {
    ID: string;
    UserId: string;
    RoleId: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface LoginHistory {
    ID: string;
    UserId: string;
    LoginTime: Date;
    LoginIP: string;
    OS: string;
    Version: string;
    Browser: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface ZoneLang {
    ID: string;
    ZoneId: string;
    LanguageId: string;
    Name: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface PersonBrands {
    ID: string;
    PersonId: string;
    BrandId: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface Assets {
    ID: string;
    ProductId: string;
    PersonId: string;
    DepartmentId: string;
    ParentId: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
    PartNumber: string;
    SerialNumberVIN: string;
    Year: string;
    Type: string;
    BarCode: string;
    Package: string;
    HCAssetHealthStatusId: string;
    HCAssetQualityId: string;
    HCunitId: string;
}
export interface Pricing {
    ID: string;
    StockId: string;
    Time: Date;
    FromAmount: string;
    ToAmount: string;
    Price: string;
    CurrencyId: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
export interface Stock {
    ID: string;
    DepId: string;
    AssestId: string;
    Time: Date;
    PackageStock: string;
    AssetStock: string;
    AssetInPackage: string;
    IsActive: string;
    Description: string;
    CreateUserID: string;
    CreateDate: Date;
    UpdateUserID: string;
    UpdateDate: Date;
}
