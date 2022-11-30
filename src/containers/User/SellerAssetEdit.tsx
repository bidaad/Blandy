import React, { useEffect, useState } from "react";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { APIImage, APIUrl } from "../../helper/config";
import Select from "react-select";
import { responseModel } from "../../model/general/responseModel";
import { Modal } from "react-bootstrap";
import { AssetInfo } from "../../model/viewModel/VwAssetDetail";
import ProductAutoComplete, {
  ProductSuggest,
} from "../../components/ProductComplete";
import { ProductSearchMode } from "../../model/general";
import { VwProductAttribute } from "../../model/viewModel/VwProductAttribute";
import NewBrand from "./NewBrand";
import { VwDocument } from "../../model/viewModel/VwDocument";
import { VwAssetAttribute } from "../../model/viewModel/VwAssetAttribute";

interface ComboList {
  value: string;
  label: string;
}
export interface IHash {
  [details: string]: string;
}

interface Dimension {
  w: number;
  h: number;
}
let AttributeValues: IHash = {};

var InputRef1: React.RefObject<HTMLInputElement>;
var InputRef2: React.RefObject<HTMLInputElement>;
var InputRef3: React.RefObject<HTMLInputElement>;

type SellerAssetEditProps = UserInfo.UserInfoState & {
  match: any;
  location: any;
  history: any;
} & typeof UserInfo.actionCreators;


const SellerAssetEdit = (props: SellerAssetEditProps) => {
  const [selectedAssetId] = useState("");

  const [selectedCat, setSelectedCat] = useState("");
  const [selectedSubCat, setSelectedSubCat] = useState("");
  const [cats, setCats] = useState<ComboList[]>([]);
  const [subCats, setSubCats] = useState<ComboList[]>([]);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [brands, setBrands] = useState<ComboList[]>([]);

  //const [, setSelectedHCConfirmStatus] = useState("");
  const [selectedHCQuaranteeType] = useState("");
  const [productAttributes, setProductAttributes] = useState<VwProductAttribute[]>([]);
  const [assetAttributes, setAssetAttributes] = useState<VwAssetAttribute[]>([]);
  const [Documents, setDocuments] = useState<VwDocument[]>([]);
  

  const [AssetCode, setAssetCode] = useState("");
  const [selectedProductId, setselectedProductId] = useState("");
  const [IsOrigenal, setIsOrigenal] = useState(false);
  const [AttributesChanged, setAttributesChanged] = useState(false);

  const [NetWeight, setNetWeight] = useState("");
  const [PackingWeight, setPackingWeight] = useState("");
  const [Packinglength, setPackinglength] = useState("");
  const [PackingWidth, setPackingWidth] = useState("");
  const [PackingHeight, setPackingHeight] = useState("");
  const [ProductLength, setProductLength] = useState("");
  const [ProductWidth, setProductWidth] = useState("");
  const [ProductHeight, setProductHeight] = useState("");

  const [EnglishName, setEnglishName] = useState("");
  const [PersianName, setPersianName] = useState("");
  const [Description, setDescription] = useState("");
  const [UploadMessage, setUploadMessage] = useState('')

  const [, setIsloading] = useState(false);

  const [SaveDisabled, setSaveDisabled] = useState(true);
  const [ShowDialog, setShowDialog] = useState(false);
  const [ShowBrand, setShowBrand] = useState(false);

  const [data1, setData1] = useState({ data: '', name: '', suffix: '', size: 0 })
  const [data2, setData2] = useState({ data: '', name: '', suffix: '', size: 0 })
  const [data3, setData3] = useState({ data: '', name: '', suffix: '', size: 0 })


  var assetId = ''
  var strLocation: string = props.location.pathname;
  var n: number = strLocation.search(/editSellerAsset/);
  if(n !== -1)
    assetId = strLocation.substring(n + 16, n + 16 + 36);
  function getImageDimensions(file: string) {
    return new Promise(function (resolved) {
      var i = new Image()
      i.onload = function () {
        resolved({ w: i.width, h: i.height })
      };
      i.src = file
    })
  }


  const getProductAttributes = (productId: string) => {
    fetch(
      APIUrl +
      "/ProductAttribute/GetProductAttributes/?strProductId=" +
      productId,
      {
        method: "Get",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
          lang: props.lang.abr,
        },
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          setProductAttributes(responseModel.data);
        }
      })
      .catch((error) => {
        setProductAttributes([]);
        console.log(error);
      });
  }
  const selectProduct = (selectedItem: ProductSuggest | undefined) => {
    if (selectedItem === undefined) return;
    setselectedProductId(selectedItem.id);
    getProductAttributes(selectedItem.id);
    
  };

  const handleUploadFile1 = async (event: any) => {
    if (event.target.files.length === 1) {
      if (event.target.files[0].name) {
        const size = event.target.files[0].size;
        const names = event.target.files[0].name.split(".");
        const name = names[0];
        const suffix = names[1];
        console.log('name=' + name);
        console.log('suffix=' + suffix);

        toBase64(event.target.files[0]).then(
          async data => {
            var dimensions = await getImageDimensions(data + '');
            const Width: number = (dimensions as Dimension).w;
            const Height: number = (dimensions as Dimension).h;
            if (Width < 600 || Height < 600 || Width > 2500 || Height > 2500) {
              setUploadMessage('ابعاد تصویر بایستی در بازه 600*600 تا 2500*2500 پیکسل باشد');
              return;
            }
            setData1({ data: data + '', name: name, size: size, suffix: suffix });

          }
        );
      }
    }
  }

  const handleUploadFile2 = (event: any) => {
    if (event.target.files.length === 1) {
      if (event.target.files[0].name) {
        const size = event.target.files[0].size;
        const names = event.target.files[0].name.split(".");
        const name = names[0];
        const suffix = names[1];
        console.log('name=' + name);
        console.log('suffix=' + suffix);

        toBase64(event.target.files[0]).then(
          data => {
            setData2({ data: data + '', name: name, size: size, suffix: suffix });
          }
        );
      }
    }

  }
  const handleUploadFile3 = (event: any) => {
    if (event.target.files.length === 1) {
      if (event.target.files[0].name) {
        const size = event.target.files[0].size;
        const names = event.target.files[0].name.split(".");
        const name = names[0];
        const suffix = names[1];
        console.log('name=' + name);
        console.log('suffix=' + suffix);

        toBase64(event.target.files[0]).then(
          data => {
            setData3({ data: data + '', name: name, size: size, suffix: suffix });
          }
        );
      }
    }

  }

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });


  const handleStartUpload1 = () => {
    if (InputRef1.current !== null) InputRef1.current.click();
  };
  const handleStartUpload2 = () => {
    if (InputRef2.current !== null) InputRef2.current.click();
  };
  const handleStartUpload3 = () => {
    if (InputRef3.current !== null) InputRef3.current.click();
  };

  const handleCat = (event: any) => {
    setSelectedCat(event.value);
    getSubCats(event.value);
  };

  const handleSubCat = (event: any) => {
    setSelectedSubCat(event.value);
  };

  const handleBrand = (event: any) => {
    setSelectedBrand(event.value);
  };

  const handleIsOrigenal = (event: any) => {
    setIsOrigenal(event.target.checked);
  };


  const handleAssetDesription = (event: any) => {
    setDescription(event.target.value);
  };

  const handleAttributeVal = (attributeCode: string, event: any) => {
    AttributeValues[attributeCode] = event.target.value;
    setAttributesChanged(!AttributesChanged);
  };
  const handleAssetCode = (event: any) => {
    setAssetCode(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    InputRef1 = React.createRef();
    InputRef2 = React.createRef();
    InputRef3 = React.createRef();
    
  }, [])

  useEffect(() => {
    if (selectedProductId === "") {//if product is not selected all fields should be filled
      if (selectedCat !== '' && selectedSubCat !== '' && selectedBrand !== '' && AssetCode !== '' && EnglishName !== '' && PersianName !== ''
        && NetWeight !== '' && PackingWeight !== '' && Packinglength !== '' && PackingWidth !== '' && ProductLength !== '' && ProductWidth !== ''
        && ProductHeight !== ''
      )
        setSaveDisabled(false)
      else
        setSaveDisabled(true)
    }
    else {
      if (AssetCode !== '' && EnglishName !== '' && PersianName !== ''
        && Object.keys(AttributeValues).length === productAttributes.length //all attribute fields are filled
      )
        setSaveDisabled(false)
      else
        setSaveDisabled(true)
    }
  }, [selectedCat, selectedSubCat, selectedBrand, AssetCode, EnglishName, PersianName, NetWeight, PackingWeight, PackingWidth, ProductLength,
    ProductWidth, ProductHeight, AttributesChanged]);


  useEffect( () => {
    
    const getCats = () => {
      fetch(APIUrl + "/Category/ActiveCategories/", {
        method: "Get",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
          lang: props.lang.abr,
        },
      })
        .then((response) => response.json() as Promise<responseModel>)
        .then((responseModel) => {
          if (responseModel.messageCode === 0) setCats(responseModel.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getBrands = () => {
      fetch(APIUrl + "/Brand/GetBrandList", {
        method: "Get",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
          lang: props.lang.abr,
        },
      })
        .then((response) => response.json() as Promise<responseModel>)
        .then((responseModel) => {
          if (responseModel.messageCode === 0) setBrands(responseModel.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getCats();
    getBrands();
    getAssetInfo(assetId)
  }, []);

  const getSubCats = (parentId: string) => {
    fetch(APIUrl + "/Category/ActiveCategories/?ParentId=" + parentId, {
      method: "Get",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
        lang: props.lang.abr,
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) setSubCats(responseModel.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const getAssetInfo = (assetId: string) => {
    fetch(
      APIUrl + "/Asset/Detail?AssetId=" + assetId + "&Lang=" + props.lang.abr,
      {
        method: "GET",
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        const assetInfo = responseModel.data as AssetInfo;
        if(assetInfo.detail.assetCode !== null && assetInfo.detail.assetCode !== undefined) setAssetCode(assetInfo.detail.assetCode.toString())
        setPersianName(assetInfo.detail.sign)

        if(assetInfo.detail.productLength !== null ) setProductLength(assetInfo.detail.productLength.toString())
        if(assetInfo.detail.productWidth !== null ) setProductWidth(assetInfo.detail.productWidth.toString())
        if(assetInfo.detail.productHeight !== null ) setProductHeight(assetInfo.detail.productHeight.toString()) ;
        if(assetInfo.detail.packingWeight !== null ) setPackingWeight(assetInfo.detail.packingWeight.toString()) ;
        if(assetInfo.detail.packinglength !== null ) setPackinglength(assetInfo.detail.packinglength.toString()) ;
        if(assetInfo.detail.packingWidth !== null ) setPackingWidth(assetInfo.detail.packingWidth.toString()) ;
        if(assetInfo.detail.packingHeight !== null ) setPackingHeight(assetInfo.detail.packingHeight.toString()) ;
        if(assetInfo.detail.netWeight !== null ) setNetWeight(assetInfo.detail.netWeight.toString()) ;
        if(assetInfo.detail.brandId !== null ) setSelectedBrand(assetInfo.detail.brandId) ;
        setDocuments(assetInfo.documents);
        setDescription(assetInfo.detail.description);
        getProductAttributes(assetInfo.detail.productId);
        setAssetAttributes(assetInfo.assetAttributes)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveAsset = () => {
    if (data1.data === "") {
      setUploadMessage('قرار دادن حداقل یک تصویر به عنوان تصویر اصلی محصول الزامی است.');
      return;
    }

    var strAttributes = "";
    for (let key in AttributeValues) {
      let value = AttributeValues[key];
      strAttributes += key + ":" + value + ";";
    }


    setIsloading(true);
    const data = {
      id: selectedAssetId === "" ? null : selectedAssetId,
      HCGuaranteeTypeId: selectedHCQuaranteeType,
      Attributes: strAttributes,
      NetWeight: parseInt(NetWeight),
      PackingWeight: parseInt(PackingWeight),
      Packinglength: parseInt(Packinglength),
      PackingWidth: parseInt(PackingWidth),
      PackingHeight: parseInt(PackingHeight),
      ProductLength: parseInt(ProductLength),
      ProductWidth: parseInt(ProductWidth),
      ProductHeight: parseInt(ProductHeight),
      IsOrigenal: IsOrigenal,
      EnglishName: EnglishName,
      PersianName: PersianName,
      ProductId: selectedProductId === "" ? null : selectedProductId,
      BrandId: selectedBrand === "" ? null : selectedBrand,
      CategoryId: selectedSubCat === "" ? null : selectedSubCat,
      Description: Description,
      AssetCode: parseInt(AssetCode),
      Files: [data1, data2, data3],

    }
    fetch(APIUrl + '/Asset/SellerSaveAssetInfo', {
      method: 'Post',
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
        lang: props.lang.abr,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          setShowDialog(true);
        }
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);

        console.log(error);
      });
  };

  const NewBrandHandler = () => {
    setShowBrand(true);
  };
  const HideBrandHandler = () => {
    setShowBrand(false);
  };

  return (
    <div className="seller-asset-container">
      <Modal
        size="lg"
        show={ShowDialog}
        onHide={() => setShowDialog(false)}
        className={"Rtl terms-container"}
      >
        <Modal.Body>
          <div onClick={() => setShowDialog(false)} className="red-close"></div>
          <div className="w-100 text-center mb-4">
            کالای شما با موفقیت ذخیره شد
          </div>
          <div className="w-100 text-center mt-4">
            <button
              onClick={() => {
                setShowDialog(false);
              }}
              className="btn btn-green-ok"
            >
              متوجه شدم
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <NewBrand {...{ showBrand: ShowBrand, hideBrand: HideBrandHandler }} />
      <div className="seller-header-container">
        <div className="seller-header">
          {assetId === ''? 'افزودن کالای جدید' : 'ویرایش کالا'}

        </div>
      </div>
      <div className="seller-tools">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-xs-6 text-right">
            <div>گروه کالا:</div>
            <Select
              className="ddCats"
              required
              onChange={handleCat}
              placeholder={"همه موارد"}
              value={cats.filter((option) => option.value === selectedCat)}
              options={cats}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 text-right">
            <div>نوع کالا:</div>
            <Select
              className="ddCats"
              required
              onChange={handleSubCat}
              placeholder={"همه موارد"}
              value={subCats.filter(
                (option) => option.value === selectedSubCat
              )}
              options={subCats}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 text-right">
            <div>برند کالا:</div>
            <Select
              className="ddBrands"
              required
              onChange={handleBrand}
              placeholder={"همه موارد"}
              value={brands.filter((option) => option.value === selectedBrand)}
              options={brands}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 text-right">
            <button className="btn btn-seller-save" onClick={NewBrandHandler}>
              درخواست برند جدید
            </button>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-lg-3 col-md-3 col-xs-6 text-right">
            <div>اصالت کالا:</div>
            <input
              type="checkbox"
              onChange={handleIsOrigenal}
              defaultChecked={IsOrigenal}
              className="form-control seller-tool-input"
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 text-right">
            <div>کد کالا:</div>
            <input
              onChange={handleAssetCode}
              defaultValue={AssetCode}
              className="form-control seller-tool-input"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-xs-6 text-right">
            <div>انتخاب از محصولات موجود:</div>
            <div className="seller-searchproduct-container">
              <i className="fa fa-search seller-search-product-icon" />
              <ProductAutoComplete
                {...{
                  mode: ProductSearchMode.FormControl,
                  SelectProduct: selectProduct,
                }}
              />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-lg-6 col-md-6 col-xs-6 text-right">
            <div>نام فارسی کالا:</div>
            <input
              placeholder={"نام کالای خود را وارد کنید"}
              onChange={(e: any) => setPersianName(e.target.value)}
              defaultValue={PersianName}
              className="form-control seller-asset-name-fa"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-xs-6 text-right">
            <div>نام انگلیسی کالا:</div>
            <input
              placeholder={"نام کالا را به زبان انگلیسی وارد کنید"}
              onChange={(e: any) => setEnglishName(e.target.value)}
              defaultValue={EnglishName}
              className="form-control seller-asset-name-en"
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-lg-6 col-md-6 col-xs-6 text-right">
            <div className="cordinates">
              <div>ابعاد کالا ( سانتی متر ):</div>
              <input
                placeholder={"طول"}
                onChange={(e: any) => setProductLength(e.target.value)}
                defaultValue={ProductLength}
                className="form-control "
              />
              <input
                placeholder={"عرض"}
                onChange={(e: any) => setProductWidth(e.target.value)}
                defaultValue={ProductWidth}
                className="form-control "
              />
              <input
                placeholder={"ارتفاع"}
                onChange={(e: any) => setProductHeight(e.target.value)}
                defaultValue={ProductHeight}
                className="form-control "
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-xs-6 text-right">
            <div className="cordinates">
              <div>ابعاد بسته بندی کالا ( سانتی متر ):</div>
              <input
                placeholder={"طول"}
                onChange={(e: any) => setPackinglength(e.target.value)}
                defaultValue={Packinglength}
                className="form-control "
              />
              <input
                placeholder={"عرض"}
                onChange={(e) => setPackingWidth(e.target.value)}
                defaultValue={PackingWidth}
                className="form-control "
              />
              <input
                placeholder={"ارتفاع"}
                onChange={(e: any) => setPackingHeight(e.target.value)}
                defaultValue={PackingHeight}
                className="form-control "
              />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-lg-3 col-md-3 col-xs-6 text-right">
            <div className="cordinates">
              <div>وزن کالا ( گرم):</div>
              <input
                placeholder={""}
                onChange={(e: any) => setNetWeight(e.target.value)}
                defaultValue={NetWeight}
                className="form-control "
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 text-right">
            <div className="cordinates">
              <div>وزن بسته بندی ( گرم):</div>
              <input
                placeholder={""}
                onChange={(e) => setPackingWeight(e.target.value)}
                defaultValue={PackingWeight}
                className="form-control "
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-xs-6 text-right"></div>
        </div>

        <div className="text-right mb-4 mt-2">
          <div>شرح کالا:</div>
          <textarea
            placeholder={""}
            onChange={handleAssetDesription}
            defaultValue={Description}
            className="form-control seller-asset-desc"
          />
        </div>
      </div>
      <div className="seller-line" />
      <div className="text-right mb-2 mt-2">ویژگی های فنی کالا</div>
      <div className="mb-3 mt-3">
        <div className="row mt-3">
          {productAttributes.map((c) => (
            <div className="col-lg-3 col-md-3 col-xs-6 text-right">
              <div>{c.sign}</div>
              <div className="mb-2">
                <input
                  placeholder={"مقدار"}
                  onChange={(e) => handleAttributeVal(c.attributeCode, e)}
                  defaultValue={
                    assetAttributes.filter(m => m.attributeCode === c.attributeCode).length === 1 ?
                    assetAttributes.filter(m => m.attributeCode === c.attributeCode)[0].value : ''
                  }
                  className="form-control "
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-right mb-2 mt-2">بارگذاری تصویر:</div>
      <div className="upload-image-info">
        - ابعاد تصویر بایستی در بازه 600*600 تا 2500*2500 پیکسل و حجم آن باید
        کمتر از 5 مگابایت باشد .<br />
        - پس زمینه تصویر باید کاملا سفید باشد و کالا 85% تصویر را در بربگیرد .
        <br />
        - تصویر باید مربعی باشد یا ابعاد یک به یک داشته باشد .<br />
        - فرمت تصویر باید jpg باشد .<br />
        -قرار دادن حداقل یک تصویر به عنوان تصویر اصلی محصول الزامی است .<br />
        -اولین تصویری که بارگذاری شود به عنوان تصویر اصلی محصول نمایش داده می
        شود .<br />
      </div>
      <div className="text-right mb-4 mt-4 upload-buttons">
        <input
          ref={InputRef1}
          className="uploader"
          onChange={handleUploadFile1}
          type="file"
        />
        <input
          ref={InputRef2}
          className="uploader"
          onChange={handleUploadFile2}
          type="file"
        />
        <input
          ref={InputRef3}
          className="uploader"
          onChange={handleUploadFile3}
          type="file"
        />

        {
          data1.data === "" ? <button className="btn btn-uploader" onClick={handleStartUpload1}>
            +
        </button>
            :
            <img className="seller-uploaded-img" alt='' src={data1.data} />
        }

        {data2.data === "" ?
          <button className="btn btn-uploader" onClick={handleStartUpload2}>
            +
        </button>
          :
          <img className="seller-uploaded-img" alt='' src={data2.data} />
        }

        {data3.data === "" ?

          <button className="btn btn-uploader" onClick={handleStartUpload3}>
            +
        </button> :
          <img className="seller-uploaded-img" alt='' src={data3.data} />
        }

      </div>
      <div className="text-right seller-error rtl">
        {UploadMessage}
      </div>

      
      <div className="mb-3 mt-3">
        <div className="row mt-3">
          {Documents.map((c) => (
            <div className="col-lg-3 col-md-3 col-xs-6 text-right">
              <div className="mb-2">
              <img className="seller-uploaded-img"  src={APIImage + 'Product' + c.filePath} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>


      <div>



      </div>

      <div >
        <button
          className="btn btn-seller-save"
          onClick={saveAsset}
          disabled={SaveDisabled}
        >
          ذخیره کالا
        </button>
      </div>

    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(SellerAssetEdit as any);

