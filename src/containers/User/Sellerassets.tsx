import React, { useEffect, useState } from 'react'
import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { APIImage, APIUrl } from '../../helper/config';
import Select from 'react-select';
import { responseModel } from '../../model/general/responseModel';
import { VwAsset } from '../../model/viewModel/VwAsset';
import changeEnc from '../../helper/changeEnc';
import Pagination from 'react-js-pagination';
import Image from '../../components/Image'
import { Modal } from 'react-bootstrap';
import { AssetInfo } from '../../model/viewModel/VwAssetDetail';
import { useHistory } from 'react-router'


interface ComboList {
  value: string;
  label: string;

}

type SellerAssetsProps =
  UserInfo.UserInfoState &
  { match: any, location: any, history: any } &
  typeof UserInfo.actionCreators;


const SellerAssets = (props: SellerAssetsProps) => {
  let history = useHistory();
  const pageSizes = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
  ]

  const deliveryTimes = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ]

  const [view, setView] = useState(1)
  const [selectedAsset, setSelectedAsset] = useState('')

  const [selectedCat, setSelectedCat] = useState('')
  const [cats, setCats] = useState<ComboList[]>([])
  const [quaranteeTypes, setGuaranteeTypes] = useState<ComboList[]>([])

  const [selectedBrand, setSelectedBrand] = useState('')
  const [brands, setBrands] = useState<ComboList[]>([])

  const [selectedHCConfirmStatus, setSelectedHCConfirmStatus] = useState('')
  const [hCConfirmStatuses, setHCConfirmStatuses] = useState<ComboList[]>([])
  const [selectedHCQuaranteeType, setSelectedHCQuaranteeType] = useState('')

  const [AssetSign, setAssetSign] = useState('')
  const [AssetCode, setAssetCode] = useState('')

  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(25)

  const [assetList, setAssetList] = useState<VwAsset[]>([])
  const [totalItemCount, setTotalItemCount] = useState(0)
  const [isloading, setIsloading] = useState(false)

  const [Stock, setStock] = useState(0)
  const [MaxInBasket, setMaxInBasket] = useState(0)
  const [SelectedDeliveryTime, setSelectedDeliveryTime] = useState(0)
  const [Price, setPrice] = useState(0)
  const [SaveDisabled, setSaveDisabled] = useState(true)
  const [ShowDialog, setShowDialog] = useState(false)


  const handleCat = (event: any) => {
    setSelectedCat(event.value)
  }
  const handleBrand = (event: any) => {
    setSelectedBrand(event.value)
  }

  const handleHCAssetConfirmStatus = (event: any) => {
    setSelectedHCConfirmStatus(event.value)
  }

  const handleGuaranteeType = (event: any) => {
    setSelectedHCQuaranteeType(event.value)
  }
  const handleDeliveryTime = (event: any) => {
    setSelectedDeliveryTime(event.value)
  }


  const handleAssetSign = (event: any) => {
    setAssetSign(event.value)
  }
  const handleAssetCode = (event: any) => {
    setAssetCode(event.value)
  }
  const handlePageChange = (pageNumber: number) => {
    console.log('pageNumber=' + pageNumber);

    setPageNo(pageNumber);
    getAssets(pageNumber, pageSize);
  }

  const handlePageSize = (pageSizeObj: any) => {
    setPageSize(pageSizeObj.value);
    getAssets(pageNo, pageSizeObj.value);
  }


  const handleStock = (event: any) => {
    const intStock = parseInt(event.target.value, 10)
    setStock(intStock )
  }
  const handlePrice = (event: any) => {
    const intPrice = parseInt(event.target.value, 10)
    setPrice(intPrice )
  }

  const handleMaxInBasket = (event: any) => {
    const intMaxInBasket = parseInt(event.target.value, 10)
    setMaxInBasket(intMaxInBasket)
  }

  useEffect(() => {
    console.log('Price=' + Price);
    console.log('MaxInBasket=' + MaxInBasket);
    console.log('SelectedDeliveryTime=' + SelectedDeliveryTime);
    console.log('selectedHCQuaranteeType=' + selectedHCQuaranteeType);
    
    if (Price > 0 && Stock > 0 && MaxInBasket > 0 && SelectedDeliveryTime > 0 && selectedHCQuaranteeType !== '')
      setSaveDisabled(false)
    else
      setSaveDisabled(true)

       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHCQuaranteeType, Stock, MaxInBasket, SelectedDeliveryTime, Price])

  const getAssets = (pageNo: number, pageSize: number) => {
    setIsloading(true)
    const data = {
      CategoryCode: selectedCat,
      BrandId: selectedBrand,
      HCAssetConfirmStatusId: selectedHCConfirmStatus,
      AssetCode: AssetCode,
      AssetSign: AssetSign,
      PageNo: pageNo,
      PageSize: pageSize
    }
    fetch(APIUrl + '/Asset/GetSellerAssets', {
      method: 'Post',
      headers: {
                'ut':'1',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.token,
        lang: props.lang.abr,
      },
      body: JSON.stringify(data),

    }).then(response => response.json() as Promise<responseModel>).then(responseModel => {
      if (responseModel.messageCode === 0) {
        setAssetList(responseModel.data)
        setTotalItemCount(responseModel.count);
      }
      setIsloading(false)
    }).catch(
      error => {
        setIsloading(false)

        console.log(error);
      }
    );
  }
  useEffect(() => {
    const getCats = () => {
      fetch(APIUrl + '/Category/ActiveCategories', {
        method: 'Get',
        headers: {
                'ut':'1',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + props.token,
          lang: props.lang.abr,
        },

      }).then(response => response.json() as Promise<responseModel>).then(responseModel => {
        if (responseModel.messageCode === 0)
          setCats(responseModel.data);
      }).catch(
        error => {
          console.log(error);
        }
      );
    }
    const getBrands = () => {
      fetch(APIUrl + '/Brand/GetBrandList', {
        method: 'Get',
        headers: {
                'ut':'1',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + props.token,
          lang: props.lang.abr,
        },

      }).then(response => response.json() as Promise<responseModel>).then(responseModel => {
        if (responseModel.messageCode === 0)
          setBrands(responseModel.data);
      }).catch(
        error => {
          console.log(error);
        }
      );
    }

    const getGuaranteeTypes = () => {
      fetch(APIUrl + '/HCGuaranteeType/GetHCList', {
        method: 'Get',
        headers: {
                'ut':'1',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + props.token,
          lang: props.lang.abr,
        },

      }).then(response => response.json() as Promise<responseModel>).then(responseModel => {
        if (responseModel.messageCode === 0) {
          console.log(111);

          var ItemList = []
          for (let i = 0; i < responseModel.data.length; i++) {
            const element = responseModel.data[i];
            ItemList.push({ value: element.id, label: element.sign })
          }

          setGuaranteeTypes(ItemList as ComboList[]);
        }
      }).catch(
        error => {
          console.log(error);
        }
      );
    }

    const getAssetConfirmStatuses = () => {
      fetch(APIUrl + '/HCAssetConfirmStatus/GetHCList', {
        method: 'Get',
        headers: {
                'ut':'1',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + props.token,
          lang: props.lang.abr,
        },

      }).then(response => response.json() as Promise<responseModel>).then(responseModel => {
        var ItemList = []
        for (let i = 0; i < responseModel.data.length; i++) {
          const element = responseModel.data[i];
          ItemList.push({ value: element.id, label: element.sign })
        }

        setHCConfirmStatuses(ItemList as ComboList[]);
      }).catch(
        error => {
          console.log(error);
        }
      );
    }

    

    getCats();
    getBrands();
    getAssetConfirmStatuses();
    getAssets(pageNo, pageSize);
    getGuaranteeTypes();
  }, [])


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
        setPrice(assetInfo.detail.currentPrice)
        setStock(assetInfo.detail.currentStock)
        setMaxInBasket(assetInfo.detail.maxInBasket);
        setSelectedDeliveryTime(assetInfo.detail.deliveryTime);

      })
      .catch((error) => {
        console.log(error);
      });
  }

  const saveAssetPricing = () => {
    //setIsloading(true)
    const data = {
      id: selectedAsset,
      HCGuaranteeTypeId: selectedHCQuaranteeType,
      CurrentStock: Stock,
      MaxInBasket: MaxInBasket,
      DeliveryTime: SelectedDeliveryTime,
      Price: Price,
    }
    fetch(APIUrl + '/Asset/SellerSaveAssetPricing', {
      method: 'Post',
      headers: {
                'ut':'1',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.token,
        lang: props.lang.abr,
      },
      body: JSON.stringify(data),

    }).then(response => response.json() as Promise<responseModel>).then(responseModel => {
      if (responseModel.messageCode === 0) {
        setShowDialog(true);
      }
      setIsloading(false)
    }).catch(
      error => {
        setIsloading(false)

        console.log(error);
      }
    );
  }

  
  const gotoEditAsset = (id: string) => {
    history.push("/seller/editSellerAsset/" + id);

  }

  const gotoPricing = (id: string) => {
    setSelectedAsset(id);
    getAssetInfo(id)
    setView(2);
    window.scrollTo(0, 0);
  }
  var View1 = <>
    <div>
      <div className="seller-header-container">
        <div className="seller-header">
          لیست کالاها
      </div>
      </div>
      <div className="seller-tools">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-xs-6 text-right">
            <div>گروه کالا:</div>
            <Select className="ddCats" required onChange={handleCat} placeholder={'همه موارد'} value={cats.filter(option => option.value === selectedCat)} options={cats} />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 text-right">
            <div>برند کالا:</div>
            <Select className="ddBrands" required onChange={handleBrand} placeholder={'همه موارد'} value={brands.filter(option => option.value === selectedBrand)} options={brands} />
          </div>
          <div className="col-lg-6 col-md-6 col-xs-6 text-right">
            <div> وضعیت:</div>
            <Select className="ddHCAssetConfirmStatus" required onChange={handleHCAssetConfirmStatus} placeholder={'همه موارد'} value={hCConfirmStatuses.filter(option => option.value === selectedHCConfirmStatus)} options={hCConfirmStatuses} />

          </div>
        </div>

        <div className="row mt-3">
          <div className="col-lg-3 col-md-3 col-xs-6 text-right">
            <div>کد کالا:</div>
            <input onChange={handleAssetCode} className="form-control seller-tool-input" />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 text-right">
            <div>نام کالا:</div>
            <input onChange={handleAssetSign} className="form-control seller-tool-input" />

          </div>
          <div className="col-lg-6 col-md-6 col-xs-6 text-right">
            <button className="btn btn-seller-search" >جستجو</button>

          </div>
        </div>
      </div>
      <div className="seller-line">

      </div>
      <div className="row ml-4 mt-3">

        <div className="col-lg-6">
          <Select className="ddCats" required onChange={handlePageSize} placeholder={'25'} value={pageSizes.filter(option => option.value === pageSize)} options={pageSizes} />
        </div>
        <div className=" col-lg-6 ">
          <Pagination
            activePage={pageNo}
            itemsCountPerPage={pageSize}
            totalItemsCount={totalItemCount}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>

      <div>
        {isloading === true ?
          <div className="text-center w-100">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          :
          <table className="mt-4 tbl-seller-assets table-responsive table-hover">
            <tbody>
              <tr>
                <th>
                  ردیف
            </th>
                <th>
                  تصویر کالا
            </th>
                <th>
                  نام کالا
            </th>
                <th>
                  کد کالا
            </th>
                <th>
                  گروه اصلی کالا
            </th>
                <th>
                  برند
            </th>
                <th>
                  وضعیت
            </th>
                <th>

                </th>
              </tr>
              {assetList.map((item, index) =>
                <tr key={item.id}>

                  <td>
                    {changeEnc(((pageNo - 1) * pageSize + index + 1).toString())}
                  </td>
                  <td className="td-image-asset">
                    <Image fallbackSrc={APIImage + '/default.png'} alt={''} src={APIImage + item.firstProductPic} />
                  </td>
                  <td>
                    {item.productSign}
                  </td>
                  <td>
                    {item.code}
                  </td>
                  <td>
                    {item.mainCategory}
                  </td>
                  <td>
                    {item.brandName}
                  </td>

                  <td>
                    {item.hcConfirmSign}
                  </td>
                  <td>
                    <button className="btn btn-edit-asset" onClick={() => gotoEditAsset(item.id)} >ویرایش</button>
                    <button className="btn btn-pricing-asset" onClick={() => gotoPricing(item.id)} disabled={item.hcConfirmCode !== 'OK'} >قیمت گذاری</button>
                  </td>

                </tr>
              )}
            </tbody>
          </table>
        }
      </div>
    </div>
  </>
  var View2 = <>
    <Modal size="lg" show={ShowDialog} onHide={() => setShowDialog(false)} className={'Rtl terms-container'}>
      <Modal.Body>
        <div onClick={() => setShowDialog(false)} className="red-close"></div>
        <div className="w-100 text-center mb-4">
          قیمت محصول ثبت شد
        </div>
        <div className="w-100 text-center mt-4">
          <button onClick={() => { setShowDialog(false); setView(1) }} className="btn btn-green-ok">متوجه شدم</button>
        </div>
      </Modal.Body>
    </Modal>
    <div>
      <div className="seller-header-container">
        <div className="seller-header">
          مدیریت قیمت گذاری
      </div>
      </div>

      <div className="seller-line">

      </div>


      <div>
        {isloading === true ?
          <div className="text-center w-100">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          :
          <table className="mt-4 tbl-seller-assets table-responsive table-hover">
            <tbody>
              <tr>
                <th>
                  ردیف
            </th>
                <th>
                  تصویر کالا
            </th>
                <th>
                  نام کالا
            </th>
                <th>
                  کد کالا
            </th>
                <th>
                  گروه اصلی کالا
            </th>
                <th>
                  برند
            </th>
                <th>
                  وضعیت
            </th>
                <th>
                  امکان ویرایش
              </th>
              </tr>
              {assetList.filter(c => c.id === selectedAsset).map((item, index) =>
                <tr key={item.id}>

                  <td>
                    {changeEnc(((pageNo - 1) * pageSize + index + 1).toString())}
                  </td>
                  <td className="td-image-asset">
                    <Image fallbackSrc={APIImage + '/default.png'} alt={''} src={APIImage + item.firstProductPic} />

                  </td>
                  <td>
                    {item.productSign}
                  </td>
                  <td>
                    {item.code}
                  </td>
                  <td>
                    {item.mainCategory}
                  </td>
                  <td>
                    {item.brandName}
                  </td>

                  <td>
                    {item.hcConfirmSign}
                  </td>
                  <td>
                    <button className="btn btn-edit-asset" >ویرایش</button>

                  </td>

                </tr>
              )}
            </tbody>
          </table>
        }
      </div>
      <div className="row mt-4">
        <div className="col-lg-2 col-md-3 col-xs-6 text-right">
          <div>گارانتی کالا:</div>
          <Select className="ddCats" required onChange={handleGuaranteeType} placeholder={''} value={quaranteeTypes.filter(option => option.value === selectedHCQuaranteeType)} options={quaranteeTypes} />
        </div>
        <div className="col-lg-2 col-md-3 col-xs-6 text-right">
          <div> موجودی فروشنده:</div>
          <input onChange={handleStock} value={Stock} className="form-control seller-tool-input" />
        </div>
        <div className="col-lg-2 col-md-2 col-xs-6 text-right">
          <div>حداکثر سفارش در سبد:</div>
          <input onChange={handleMaxInBasket} value={MaxInBasket} className="form-control seller-tool-input" />
        </div>
        <div className="col-lg-2 col-md-2 col-xs-6 text-right">
          <div>بازه زمانی ارسال (به روز):</div>
          <Select className="ddCats" required onChange={handleDeliveryTime} placeholder={''} value={deliveryTimes.filter(option => option.value === SelectedDeliveryTime)} options={deliveryTimes} />
        </div>
        <div className="col-lg-4 col-md-2 col-xs-6 text-right">
          <div>: قیمت فروش (ریال)</div>
          <input onChange={handlePrice} value={Price} className="form-control seller-tool-input" />
        </div>

      </div>
      <div>
        <button className="btn btn-seller-save" onClick={saveAssetPricing} disabled={SaveDisabled}>ثبت</button>
      </div>
    </div>
  </>
  return (
    <>
      {
        view === 1 ?
          View1 :
          view === 2 ?
            View2 :
            null
      }
    </>
  )
}


export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(SellerAssets as any);
