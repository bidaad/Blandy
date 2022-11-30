import * as UserInfo from "../../../../store/UserInfo";
import { RouteComponentProps, useHistory } from "react-router";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../../store";

import Price_Range from "../../../../components/user/PriceRange";
import { APIUrl, APIImage, GetIP4 } from "../../../../helper/config";
import { responseModel } from "../../../../model/general/responseModel";
import { VwUserProductSearch } from "../../../../model/viewModel/VwUserAssetSearch";
import Image from "../../../../components/Image";
import $ from "jquery";
import { AssetSearchModel } from "../../../../model/viewModel/AssetSearchModel";
import { selectData } from "../../../../model/general/selectData";
import { VwUserCategory } from "../../../../model/viewModel/VwUserCategory";
import { VwCar } from "../../../../model/viewModel/VwCar";
import { VwPage } from "../../../../model/viewModel/VwPage";
import Pagination from "react-js-pagination";
import { VwHoomTools } from "../../../../components/user/HomeTools";
import { VwSeacrh } from "../../../../model/viewModel/VwSeacrh";
import ProductCardBootstrap from "../../../../components/user/ProductCardBootstrap";

type AssetListProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators &
  RouteComponentProps<{}> & { match: any; location: any; history: any };

const AssetList = (props: AssetListProps) => {
  let history = useHistory();
  const [productList, setProductList] = useState([]);
  const [productCount, setProductCount] = useState(Number);
  const [brandList, setBrandList] = useState<selectData[]>();
  const [assetSearch, setAssetSearchModel] = useState<AssetSearchModel>();
  const [categoryList, setCategoryList] = useState<VwUserCategory[]>();
  const [, setLoad] = useState(Boolean);
  const [clPrice, setClearPrice] = useState(Boolean);

  const [carList, setCarList] = useState<VwCar[]>();
  const [page, setPage] = useState<VwPage>();
  const [ResultReady, setResultReady] = useState(false);
  const [filterClass, setFilterClass] = useState("d-none d-sm-block");

  const [, setHomeTools] = useState<VwHoomTools>({
    brand: "",
    brandName: "",
    brands: [],
    products: [],
    product: "",
    productName: "",
    seacrh: false,
  });


  const getSelectedAssets = async (
    asm: {},
    pageSize: number,
    pageNumber: number
  ) => {
     props.UserLoad(true);
    if (pageSize === undefined) {
      pageSize = 15;
    }
    if (pageNumber === undefined) {
      pageNumber = 1;
    }

    fetch(
      APIUrl +
        "/Asset/SearchDetailData?PageSize=" +
        pageSize +
        "&PageNumber=" +
        pageNumber,
      {
        method: "POST",
        body: JSON.stringify(asm),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        setResultReady(true);
        if (responseModel.data === null || responseModel.data.length === 0) {
          setProductList([]);
          props.UserLoad(false);
          setProductCount(0);
          return;
        }

        setProductCount(responseModel.count);
        setProductList(responseModel.data);
        props.UserLoad(false);
      })
      .catch(() => {
        console.log("error");
        setProductCount(0);
        props.UserLoad(false);
      });
  };
  const cars = async () => {
    fetch(APIUrl + "/Asset/GetUserCars?PersonId=" + props.personId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          let data = responseModel.data as VwCar[];

          setCarList(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAssets = async () => {
    if (props.UserSearch) {
      if (props.UserSearch.type === "ASSET") {
        let data = { productId: props.UserSearch.id };
        setAssetSearchModel({ productId: props.UserSearch.id });
        setLoad(true);

        fetch(
          APIUrl +
            "/Asset/SearchDetailData?PageSize=" +
            15 +
            "&PageNumber=" +
            0,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json() as Promise<responseModel>)
          .then((responseModel) => {
            setResultReady(true);
            if (
              responseModel.data === null ||
              responseModel.data.length === 0
            ) {
              setProductList([]);
              props.UserLoad(false);
              setProductCount(0);
              return;
            }
 
            setProductCount(responseModel.count);
            setProductList(responseModel.data);
            props.UserLoad(false);
          })
          .catch(() => {
            console.log("error");
            setProductCount(0);
            props.UserLoad(false);
          });
        return;
      }
      if (props.UserSearch.type === "CATEGORY") {
        setAssetSearchModel({
          categoryCode: [props.UserSearch.code],
          categoryId: props.UserSearch.id,
        });
             // setCatCode(props.UserSearch.code);
        let data2 = {
          CategoryCode: [props.UserSearch.code],
          CategoryId: props.UserSearch.id,
          Keyword: "",
        };
        setLoad(true);
        fetch(
          APIUrl +
            "/Asset/SearchDetailData?PageSize=" +
            15 +
            "&PageNumber=" +
            0,
          {
            method: "POST",
            body: JSON.stringify(data2),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json() as Promise<responseModel>)
          .then((responseModel) => {
                     setResultReady(true);
            if (
              responseModel.data === null ||
              responseModel.data.length === 0
            ) {
              setProductList([]);
              props.UserLoad(false);
              setProductCount(0);
              return;
            }
            setProductCount(responseModel.count);
            setProductList(responseModel.data);
            props.UserLoad(false);
          })
          .catch(() => {
            console.log("error");
            setProductCount(0);
            props.UserLoad(false);
          });
        return;
      }
      if (props.UserSearch.type === "MACHINE") {
        setAssetSearchModel({ machineId: props.UserSearch.id });
        let data2 = {
          machineId: props.UserSearch.id,
        };

        setLoad(true);
        fetch(
          APIUrl +
            "/Asset/SearchDetailData?PageSize=" +
            15 +
            "&PageNumber=" +
            0,
          {
            method: "POST",
            body: JSON.stringify(data2),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json() as Promise<responseModel>)
          .then((responseModel) => {
            setResultReady(true);
            if (
              responseModel.data === null ||
              responseModel.data.length === 0
            ) {
              setProductList([]);
              props.UserLoad(false);
              setProductCount(0);
              return;
            }
            setProductCount(responseModel.count);
            setProductList(responseModel.data);
            props.UserLoad(false);
          })
          .catch(() => {
            console.log("error");
            setProductCount(0);
            props.UserLoad(false);
          });
        return;
      }
      if (props.UserSearch.type === "َALL") {
        setAssetSearchModel({ titleKeyword: props.UserSearch.name });
        let data2 = {
          titleKeyword: props.UserSearch.name,
        };

        setLoad(true);
        fetch(
          APIUrl +
            "/Asset/SearchDetailData?PageSize=" +
            15 +
            "&PageNumber=" +
            0,
          {
            method: "POST",
            body: JSON.stringify(data2),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json() as Promise<responseModel>)
          .then((responseModel) => {
            setResultReady(true);
            if (
              responseModel.data === null ||
              responseModel.data.length === 0
            ) {
              setProductList([]);
              props.UserLoad(false);
              setProductCount(0);
              return;
            }
            setProductCount(responseModel.count);
            setProductList(responseModel.data);
            props.UserLoad(false);
          })
          .catch(() => {
            console.log("error");
            setProductCount(0);
            props.UserLoad(false);
          });
        return;
      }
      if (props.UserSearch.type === "NONE") {
        setAssetSearchModel({ titleKeyword: "" });
        getSelectedAssets(
          { titleKeyword: "" },
          page !== undefined && page.pageSize !== undefined
            ? page.pageSize
            : 15,
          page !== undefined && page.pageNumber !== undefined
            ? page.pageNumber
            : 1
        );
        return;
      }
    }
  };

  useEffect(() => {
    console.log("load again");

    fetchBrands();
    fetchCategory();
    cars();
    getBrands(props);
    setPage({ pageNumber: 1, pageSize: 15, active: 1 });
    setClearPrice(false);
    fetchAssets();

    if (props.showHumburgerMenu) props.ToggleHumburgerMenu();
  }, [props.UserSearch, props.location]);

  const fetchBrands = async () => {
    fetch(
      APIUrl +
        "/Brand/BrandManufactureSearch?pageSize=10000&Lang=" +
        props.lang.abr,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        console.log(responseModel.data);
        setBrandList(responseModel.data);
        console.log(brandList);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchCategory = async () => {
    fetch(APIUrl + "/Category/AllCategory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        console.log(responseModel.data);
        if (responseModel.data === null || responseModel.data.length === 0) {
          setCategoryList([]);
          return;
        }
        setCategoryList(responseModel.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlerMostVisited = (e: any) => {
    var code = e.currentTarget.dataset.codetype;
    $(e.currentTarget)
      .closest("div")
      .children()
      .removeClass("Product_Category_Header_Curent_Active");
    $(e.currentTarget).addClass("Product_Category_Header_Curent_Active");

    const data = Object.assign({}, assetSearch, { codeType: code });
    setAssetSearchModel(data);
    getSelectedAssets(
      data,
      page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
      page !== undefined && page.pageNumber !== undefined ? page.pageNumber : 1
    );

    // var code = e.currentTarget.dataset.codetype;
    // var data: AssetSearchModel = { codeType: code };
    // setAssetSearchModel(data);
    // getSelectedAssets(data, (page !== undefined && page.pageSize !== undefined) ? page.pageSize : 15, (page !== undefined && page.pageNumber !== undefined) ? page.pageNumber : 1);
  };
  const handlerExpensive = (e: any) => {
    var exp = e.currentTarget.dataset.expensive;
    $(e.currentTarget)
      .closest("div")
      .children()
      .removeClass("Product_Category_Header_Curent_Active");
    $(e.currentTarget).addClass("Product_Category_Header_Curent_Active");

    const data = Object.assign({}, assetSearch, {
      Expensive: exp === "0" ? false : exp === "1" ? true : null,
    });
    setAssetSearchModel(data);
    getSelectedAssets(
      data,
      page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
      page !== undefined && page.pageNumber !== undefined ? page.pageNumber : 1
    );

    // var code = e.currentTarget.dataset.codetype;
    // var data: AssetSearchModel = { codeType: code };
    // setAssetSearchModel(data);
    // getSelectedAssets(data, (page !== undefined && page.pageSize !== undefined) ? page.pageSize : 15, (page !== undefined && page.pageNumber !== undefined) ? page.pageNumber : 1);
  };
  const handlerPrice = (e: any) => {
     const data = Object.assign({}, assetSearch, {
      startPrice: e.min * 10,
      endPrice: e.max * 10,
    });
    setAssetSearchModel(data);
    // getSelectedAssets(data, (page !== undefined && page.pageSize !== undefined) ? page.pageSize : 15, (page !== undefined && page.pageNumber !== undefined) ? page.pageNumber : 1);
  };
  const handlerChangeCompletePrice = () => {
     if (assetSearch) {
      setClearPrice(false);
      getSelectedAssets(
        assetSearch,
        page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
        page !== undefined && page.pageNumber !== undefined
          ? page.pageNumber
          : 1
      );
    }
  };
  const handlerChangeCompleteTextboxMax = (e: any) => {
     if (assetSearch) {
      const data = Object.assign({}, assetSearch, {
        startPrice: Number(e.min * 10),
        endPrice: Number(e.max * 10),
      });
      setAssetSearchModel(data);
      setClearPrice(false);
      getSelectedAssets(
        data,
        page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
        page !== undefined && page.pageNumber !== undefined
          ? page.pageNumber
          : 1
      );
    }
  };
  const handlerStock = (e: any) => {
    let chk = e.target.checked;

    const data = Object.assign({}, assetSearch, { currentStock: chk });
    setAssetSearchModel(data);
    getSelectedAssets(
      data,
      page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
      page !== undefined && page.pageNumber !== undefined ? page.pageNumber : 1
    );
  };
  const handlerDiscount = (e: any) => {
    let chk = e.target.checked;

    const data = Object.assign({}, assetSearch, { discountPrice: chk });
    setAssetSearchModel(data);
    getSelectedAssets(
      data,
      page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
      page !== undefined && page.pageNumber !== undefined ? page.pageNumber : 1
    );
  };
  const handlerSearch = (e: any) => {
    const data = Object.assign({}, assetSearch, {
      titleKeyword: e.currentTarget.value,
    });
    setAssetSearchModel(data);
    // getSelectedAssets(data, (page !== undefined && page.pageSize !== undefined) ? page.pageSize : 15, (page !== undefined && page.pageNumber !== undefined) ? page.pageNumber : 1);
  };
  const handlerKepUpSearch = (e: any) => {
    const data = Object.assign({}, assetSearch, {
      titleKeyword: e.target.value,
    });
    setAssetSearchModel(data);
    if (e.keyCode === 13) {
      if (assetSearch && assetSearch.titleKeyword !== undefined) {
        let value = e.target.value;
        if (value) {
          GetIP4()
            .then((ip: any) => {
              let datasr = {
                searchText: value,
                userId: props.userId,
                createUserID: props.userId,
                clicked: false,
                isActive: true,
                IP: ip,
              };
              SaveSearch(datasr);
            })
            .catch(() => {});
        }

        // let dt: VwSeacrh = { id: e.target.value, mid: '', mName: '', code: '', name: '', type: "َALL" };
        // props.Search(dt);
        // const data = Object.assign({}, assetSearch, { titleKeyword: e.target.value });
        // setAssetSearchModel(data);
        getSelectedAssets(
          data,
          page !== undefined && page.pageSize !== undefined
            ? page.pageSize
            : 16,
          page !== undefined && page.pageNumber !== undefined
            ? page.pageNumber
            : 1
        );
      }
    }
  };
  const handlerBrand = (e: any) => {
    if (brandList !== undefined) {
      const data1: selectData = {
        check: e.currentTarget.checked,
        value: e.currentTarget.dataset.id,
        label: e.currentTarget.dataset.name,
        logo: e.currentTarget.dataset.logo,
      };
      let id = e.currentTarget.dataset.id;
      let name = e.currentTarget.dataset.name;
      if (id && name) {
        GetIP4()
          .then((ip: any) => {
            let datasr = {
              brandId: id,
              searchText: name,
              userId: props.userId,
              createUserID: props.userId,
              clicked: false,
              isActive: true,
              IP: ip,
            };

            SaveSearch(datasr);
          })
          .catch(() => {});
      }

      var lst = brandList.slice();
      lst[
        lst.findIndex((el) => el.value === e.currentTarget.dataset.id)
      ] = data1;


      const data = Object.assign({}, assetSearch, {
        brandList: lst.filter((c) => c.check === true).map((c) => c.value),
      });
      const stdata = Object.assign({}, assetSearch, {
        brandList: lst.filter((c) => c.check === true).map((c) => c.value),
      });
      setAssetSearchModel(stdata);
      setBrandList(lst);
      getSelectedAssets(
        data,
        page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
        page !== undefined && page.pageNumber !== undefined
          ? page.pageNumber
          : 1
      );
    }
  };
  const handlerCar = (e: any) => {
    if (carList) {
      let lst = carList
        .map((el) =>
          el.productId === e.currentTarget.dataset.productid
            ? Object.assign({}, el, { check: true })
            : Object.assign({}, el, { check: false })
        )
        .slice();
      setCarList(lst);
      const data = Object.assign({}, assetSearch, {
        car: e.currentTarget.dataset.productid,
      });
      setAssetSearchModel(data);
      getSelectedAssets(
        data,
        page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
        page !== undefined && page.pageNumber !== undefined
          ? page.pageNumber
          : 1
      );
    }

    // var data: AssetSearchModel = {
    //     car: e.currentTarget.dataset.id,
    //     startPrice: assetSearch !== undefined && assetSearch.startPrice !== undefined ? assetSearch.startPrice : undefined,
    //     endPrice: assetSearch !== undefined && assetSearch.endPrice !== undefined ? assetSearch.endPrice : undefined, categoryId: assetSearch !== undefined && assetSearch.categoryId !== undefined ? assetSearch.categoryId : undefined, brandList: assetSearch !== undefined && assetSearch.brandList !== undefined ? assetSearch.brandList : undefined
    //     , discountPrice: assetSearch !== undefined && assetSearch.discountPrice !== undefined ? assetSearch.discountPrice : undefined
    //     , currentStock: assetSearch !== undefined && assetSearch.currentStock !== undefined ? assetSearch.currentStock : undefined,
    //     titleKeyword: assetSearch !== undefined && assetSearch.titleKeyword !== undefined ? assetSearch.titleKeyword : undefined
    // };
    // setAssetSearchModel(data);
    // getSelectedAssets(data, (page !== undefined && page.pageSize !== undefined) ? page.pageSize : 15, (page !== undefined && page.pageNumber !== undefined) ? page.pageNumber : 1);
  };
  const SaveSearch = (data: any) => {
    fetch(APIUrl + "/ProductSearch/SaveSearchAndClick", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        lang: "Fa",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          if (responseModel.data) {
          }
        }
      })
      .catch((error) => {
        console.log(error);
        props.UserLoad(false);
      });
  };
  const handlerCategory = (e: any) => {
    e.stopPropagation();

    // let dt: VwSeacrh = { id: e.currentTarget.dataset.id, mid: '', mName: '', code: '', name: '', type: "CATEGORY" };
    // props.Search(dt);
    let catid = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;

    GetIP4()
      .then((ip: any) => {
        let datasr = {
          categoryId: catid,
          searchText: name,
          userId: props.userId,
          createUserID: props.userId,
          clicked: true,
          isActive: true,
          IP: ip,
        };
        SaveSearch(datasr);
      })
      .catch(() => {});
    const data = Object.assign({}, assetSearch, {
      categoryId: e.currentTarget.dataset.id,
    });
    setAssetSearchModel(data);
    getSelectedAssets(
      data,
      page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
      page !== undefined && page.pageNumber !== undefined ? page.pageNumber : 1
    );
    $(".Product_List_Ul_Category li").removeClass(
      "Product_List_Tree_Category_Active"
    );
    $(e.currentTarget).addClass("Product_List_Tree_Category_Active");

    if (e.currentTarget.dataset.child === "0") {
      return;
    }

    if ($(e.currentTarget).hasClass("Product_List_Tree_Category_Plus")) {
      if (categoryList !== undefined) {
        var lst = categoryList.slice();
        let ed: VwUserCategory =
          lst[
            lst.findIndex(
              (el: VwUserCategory) => el.id === e.currentTarget.dataset.id
            )
          ];
        lst
          .filter((c) => c.parentId === ed.id)
          .forEach(function (part: VwUserCategory) {
            part.show = true;
          });
        setCategoryList(lst);
        $(e.currentTarget).removeClass("Product_List_Tree_Category_Plus");
        $(e.currentTarget).addClass("Product_List_Tree_Category_Negative");
        return;
      }
    }
    if ($(e.currentTarget).hasClass("Product_List_Tree_Category_Negative")) {
      if (categoryList !== undefined) {
        var lst2 = categoryList.slice();

        let ed: VwUserCategory =
          lst2[
            lst2.findIndex(
              (el: VwUserCategory) => el.id === e.currentTarget.dataset.id
            )
          ];
        lst2
          .filter((c) => c.parentId === ed.id)
          .forEach(function (part: VwUserCategory) {
            part.show = false;
          });
        setCategoryList(lst2);
        $(e.currentTarget).addClass("Product_List_Tree_Category_Plus");
        $(e.currentTarget).removeClass("Product_List_Tree_Category_Negative");
        return;
      }
    }
  };
  const handlerPage = (pageNumber: any) => {
    console.log(pageNumber);
    setPage({
      pageNumber:
        page !== undefined && page.pageNumber !== undefined
          ? page.pageNumber
          : 16,
      pageSize:
        page !== undefined && page.pageSize !== undefined ? page.pageSize : 1,
      active: pageNumber === undefined ? 1 : pageNumber,
    });
    var data: AssetSearchModel = {
      startPrice:
        assetSearch !== undefined && assetSearch.startPrice !== undefined
          ? assetSearch.startPrice
          : undefined,
      endPrice:
        assetSearch !== undefined && assetSearch.endPrice !== undefined
          ? assetSearch.endPrice
          : undefined,
      categoryId:
        assetSearch !== undefined && assetSearch.categoryId !== undefined
          ? assetSearch.categoryId
          : undefined,
      brandList:
        assetSearch !== undefined && assetSearch.brandList !== undefined
          ? assetSearch.brandList
          : undefined,
      discountPrice:
        assetSearch !== undefined && assetSearch.discountPrice !== undefined
          ? assetSearch.discountPrice
          : undefined,
      currentStock:
        assetSearch !== undefined && assetSearch.currentStock !== undefined
          ? assetSearch.currentStock
          : undefined,
      titleKeyword:
        assetSearch !== undefined && assetSearch.titleKeyword !== undefined
          ? assetSearch.titleKeyword
          : undefined,
      car:
        assetSearch !== undefined && assetSearch.car !== undefined
          ? assetSearch.car
          : undefined,
    };
    getSelectedAssets(
      data,
      page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
      pageNumber
    );
  };

  // async function getProducts(props: any, brandId: string, brandName: string) {
  //   fetch(APIUrl + "/Product/GetByBrandId?brandId=" + brandId + "&Lang=fa", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + props.token,
  //     },
  //   })
  //     .then((response) => response.json() as Promise<responseModel>)
  //     .then((responseModel) => {
  //       if (responseModel.messageCode === 0) {
  //         setHomeTools({
  //           brands: HoomToolsModel.brands,
  //           brand: brandId,
  //           brandName: brandName,
  //           product: "",
  //           productName: "",
  //           products: responseModel.data,
  //           seacrh: false,
  //         });
  //         setLoad(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  async function getProductsDefault(
    props: any,
    brandId: string,
    brandName: string,
    productId: string,
    productName: string,
    brands: any
  ) {
    fetch(APIUrl + "/Product/GetByBrandId?brandId=" + brandId + "&Lang=fa", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          setHomeTools({
            brands: brands,
            brand: brandId,
            brandName: brandName,
            product: productId,
            productName: productName,
            products: responseModel.data,
            seacrh: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function getBrands(props: any) {
    fetch(APIUrl + "/Brand/GetBrandsForCarSearch?pageSize=1000&Lang=fa", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          if (responseModel.data && responseModel.data.length > 0) {
            if (props.UserSearch) {
              if (props.UserSearch.type === "MACHINE") {
                setHomeTools({
                  brands: responseModel.data,
                  brand: "",
                  brandName: "",
                  product: "",
                  productName: "",
                  products: [],
                  seacrh: false,
                });
                getProductsDefault(
                  props,
                  props.UserSearch.mid,
                  props.UserSearch.mName,
                  props.UserSearch.id,
                  props.UserSearch.name,
                  responseModel.data
                );
                return;
              }
            }
            setHomeTools({
              brands: responseModel.data,
              brand: "",
              brandName: "",
              product: "",
              productName: "",
              products: [],
              seacrh: false,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function ClearTitleKeyword() {
    let dt: VwSeacrh = {
      id: "",
      code: "",
      mid: "",
      mName: "",
      name: "",
      type: "NONE",
    };
    props.Search(dt);
    if (assetSearch && assetSearch.titleKeyword) {
      setLoad(true);
      const data = Object.assign({}, assetSearch, { titleKeyword: "" });
      await setAssetSearchModel(data);
      getSelectedAssets(
        data,
        page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
        page !== undefined && page.pageNumber !== undefined
          ? page.pageNumber
          : 1
      );
    }
  }
  function ClearProduct() {
    let dt: VwSeacrh = {
      id: "",
      code: "",
      mid: "",
      mName: "",
      name: "",
      type: "NONE",
    };
    props.Search(dt);
    const data = Object.assign({}, assetSearch, { productId: undefined });
    setAssetSearchModel(data);
    getSelectedAssets(
      data,
      page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
      page !== undefined && page.pageNumber !== undefined ? page.pageNumber : 1
    );
  }
  function ClearCurrentCategory() {
    let dt: VwSeacrh = {
      id: "",
      code: "",
      mid: "",
      mName: "",
      name: "",
      type: "NONE",
    };
    props.Search(dt);
    const data = Object.assign({}, assetSearch, {
      categoryCode: undefined,
      categoryId: undefined,
    });
    setAssetSearchModel(data);
    getSelectedAssets(
      data,
      page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
      page !== undefined && page.pageNumber !== undefined ? page.pageNumber : 1
    );
  }
  function ClearCategory() {
    let dt: VwSeacrh = {
      id: "",
      code: "",
      mid: "",
      mName: "",
      name: "",
      type: "NONE",
    };
    props.Search(dt);
    if (assetSearch && assetSearch.categoryId) {
      setLoad(true);
      const data = Object.assign({}, assetSearch, { categoryId: undefined });
      $(".Product_List_Ul_Category li").removeClass(
        "Product_List_Tree_Category_Active"
      );
      setAssetSearchModel(data);
      getSelectedAssets(
        data,
        page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
        page !== undefined && page.pageNumber !== undefined
          ? page.pageNumber
          : 1
      );
    }
  }
  function ClearPrice() {
    if (
      assetSearch &&
      assetSearch.startPrice &&
      assetSearch.endPrice &&
      (assetSearch.startPrice >= 0 || assetSearch.endPrice >= 50000000)
    ) {
      setLoad(true);
      const data = Object.assign({}, assetSearch, {
        startPrice: 0,
        endPrice: 50000000 * 10,
      });
      setAssetSearchModel(data);
      getSelectedAssets(
        data,
        page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
        page !== undefined && page.pageNumber !== undefined
          ? page.pageNumber
          : 1
      );
      setClearPrice(true);
    }
  }
  function ClearBrands() {
    if (brandList !== undefined) {
      var lst = brandList
        .map((el) => Object.assign({}, el, { check: false }))
        .slice();
      const data = Object.assign({}, assetSearch, { brandList: undefined });
      setAssetSearchModel(data);
      setBrandList(lst);
      getSelectedAssets(
        data,
        page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
        page !== undefined && page.pageNumber !== undefined
          ? page.pageNumber
          : 1
      );
    }
  }
  function ClearCar() {
    if (carList !== undefined) {
      setLoad(true);
      var lst = carList
        .map((el) => Object.assign({}, el, { check: false }))
        .slice();
      setCarList(lst);
      const data = Object.assign({}, assetSearch, { car: undefined });
      setAssetSearchModel(data);
      getSelectedAssets(
        data,
        page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
        page !== undefined && page.pageNumber !== undefined
          ? page.pageNumber
          : 1
      );
    }
  }
  function ClearVisited() {
    if (carList !== undefined) {
      setLoad(true);
      $(".Product_Category_Header span").removeClass(
        "Product_Category_Header_Curent_Active"
      );
      const data = Object.assign({}, assetSearch, { codeType: undefined });
      setAssetSearchModel(data);
      getSelectedAssets(
        data,
        page !== undefined && page.pageSize !== undefined ? page.pageSize : 15,
        page !== undefined && page.pageNumber !== undefined
          ? page.pageNumber
          : 1
      );
    }
  }

  return (
    <div>
      <div className="d-block d-sm-none filter-results-toolbar">
        <div className=" row">
          <div className="col-5 text-right">
            <div className="text-right caption-header mr-2">
              {
                <li
                  onClick={() => history.push({ pathname: "/" })}
                  className="fa fa-arrow-right back-arrow"
                ></li>
              }
              نتایج جستجو
            </div>
          </div>

          <div className="col-7 text-left">
            {filterClass === "d-none d-sm-block" ? (
              <button
                className="btn btn-orange d-block d-sm-none"
                onClick={() => setFilterClass("")}
              >
                جستجوی پیشرفته
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="search-assets row">
        {/* {isload === true ?
                    <div className="overlayCarSearch"><div className="spinner-grow text-danger" role="status"><span className="sr-only">Loading...</span></div></div>
                    : null
                } */}
        <div
          className={
            "col-xl-2 col-lg-3 col-md-11 col-sm-11 col-xs-11 AdSearch_Box " +
            filterClass
          }
        >
          {props.token !== "" && props.token !== null ? (
            carList !== undefined && carList !== null && carList.length > 0 ? (
              <ul className="Product_List_Ul_Category">
                <li className="Product_List_Titr_Category">
                  <button
                    type="button"
                    onClick={ClearCar}
                    className="close Product_List_Close"
                    title="حذف فیلتر"
                    aria-label="Close"
                  >
                    {/* <span aria-hidden="true">&times;</span> */}
                    <Image
                      fallbackSrc={APIImage + "default.png"}
                      alt={""}
                      src={APIImage + "filtersearch.png"}
                    />
                  </button>
                  <span>خودرو من</span>
                </li>
                <li className="Product_Search_Car">
                  برای کدام خودرو خود قصد خرید دارید؟
                </li>
                <li>
                  {carList !== undefined
                    ? carList.map((item: VwCar) => (
                        <div className="Product_Search_Radio_Car">
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            checked={item.check}
                            value="male"
                            data-id={item.id}
                            data-productId={item.productId}
                            onChange={handlerCar}
                          />
                          <a title={item.sign + " " + " " + item.year} href='#'>
                            <span>{item.sign + " " + " " + item.year}</span>
                          </a>
                          <Image
                            fallbackSrc={APIImage + "car.png"}
                            alt={""}
                            src={APIImage + "" + item.logo}
                          />
                        </div>
                      ))
                    : null}
                </li>
              </ul>
            ) : null
          ) : null}
          <ul className="Product_List_Ul_Category">
            <li className="Product_List_Titr_Category">
              <button
                type="button"
                onClick={ClearTitleKeyword}
                className="close Product_List_Close"
                title="حذف فیلتر"
                aria-label="Close"
              >
                {/* <span aria-hidden="true">&times;</span> */}
                <Image
                  fallbackSrc={APIImage + "default.png"}
                  alt={""}
                  src={require("../../../../img/Delete.png")}
                  className="del-icon"
                />
              </button>
              <span>جستجو در نتایج</span>
            </li>
            {props.UserSearch && props.UserSearch.type === "ASSET" ? (
              <li className="Product_List_Titr_Lable">
                <button
                  type="button"
                  onClick={ClearProduct}
                  className="close Product_List_Close"
                  title="حذف فیلتر"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <span>{props.UserSearch.name}</span>
              </li>
            ) : (
              <li className="input-Text-AdSearch">
                <img
                  className="Text-AdSearch"
                  src={require("../../../../img/Search.png")}
                  alt="Product Search"
                />
                <input
                  type="text"
                  className="Product_List_Search_Category"
                  defaultValue={assetSearch ? assetSearch.titleKeyword : ""}
                  placeholder="نام محصول مورد نظرتان را وارد کنید"
                  onKeyUp={handlerKepUpSearch}
                  onChange={handlerSearch}
                />
              </li>
            )}
          </ul>
          {/* <ul className="Product_List_Ul_Category">
            <li className="Product_List_Titr_Category">
              <button
                type="button"
                onClick={ClearMachin}
                className="close Product_List_Close"
                title="حذف فیلتر"
                aria-label="Close"
              >
                <Image
                  fallbackSrc={APIImage + "default.png"}
                  alt={""}
                  src={require('../../../../img/Delete.png')}
                  className="del-icon"
                />
              </button>
              <span>نمایش محصولات مربوط به خودرو</span>
            </li>
            <li className="Product_Search_Car">
              <Select
                className="ddBrandsAssetList"
                required
                onChange={handleBrands}
                placeholder={"برند تولید کننده"}
                value={HoomToolsModel.brands.filter(
                  (option: any) => option.value === HoomToolsModel.brand
                )}
                options={HoomToolsModel.brands}
              />
            </li>
            <li className="Product_Search_Car">
              <Select
                className="ddBrandsAssetList"
                required
                onChange={handleProduct}
                placeholder={"محصول"}
                value={HoomToolsModel.products.filter(
                  (option: any) => option.value === HoomToolsModel.product
                )}
                options={HoomToolsModel.products}
              />
            </li>
          </ul> */}
          <ul className="Product_List_Ul_Category">
            <li className="Product_List_Titr_Category">
              <span>دسته بندی نتایج</span>
              <button
                type="button"
                className="close Product_List_Close"
                onClick={ClearCategory}
                title="حذف فیلتر"
                aria-label="Close"
              >
                {/* <span aria-hidden="true">&times;</span> */}
                <Image
                  fallbackSrc={APIImage + "default.png"}
                  alt={""}
                  src={require("../../../../img/Delete.png")}
                  className="del-icon"
                />
              </button>
            </li>
            {props.UserSearch && props.UserSearch.type === "CATEGORY" ? (
              <li className="Product_List_Titr_Lable">
                <button
                  type="button"
                  onClick={ClearCurrentCategory}
                  className="close Product_List_Close"
                  title="حذف فیلتر"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <span>{props.UserSearch.name}</span>
              </li>
            ) : (
              <ul className="Product_List_Tree_Category">
                {categoryList !== undefined
                  ? categoryList
                      .filter(
                        (c: VwUserCategory) =>
                          c.parentId === null && c.show === true
                      )
                      .map((item: VwUserCategory) => (
                        <li
                          data-child={item.child}
                          className={
                            item.child <= 0
                              ? "Product_List_Tree_Category_Negative"
                              : "Product_List_Tree_Category_Plus"
                          }
                          data-Id={item.id}
                          data-name={item.sign}
                          onClick={handlerCategory}
                        >
                          {item.child <= 0 ? (
                            <img
                              alt=''
                              className="arrow-cat"
                              src={require("../../../../img/ArrowDown.png")}
                            />
                          ) : (
                            <img
                            alt=''
                              className="arrow-cat"
                              src={require("../../../../img/Arrow - Left 2.png")}
                            />
                          )}
                          {item.sign}
                          <ul>
                            {categoryList
                              .filter(
                                (c: VwUserCategory) =>
                                  c.parentId === item.id && c.show === true
                              )
                              .map((item2: VwUserCategory) => (
                                <li
                                  data-child={item2.child}
                                  className={
                                    item2.child <= 0
                                      ? "Product_List_Tree_Category_Negative"
                                      : "Product_List_Tree_Category_Plus"
                                  }
                                  data-name={item2.sign}
                                  data-Id={item2.id}
                                  onClick={handlerCategory}
                                >
                                  {item2.child <= 0 ? (
                                    <img
                                    alt=''
                                      className="arrow-cat"
                                      src={require("../../../../img/ArrowDown.png")}
                                    />
                                  ) : (
                                    <img
                                    alt=''
                                      className="arrow-cat"
                                      src={require("../../../../img/Arrow - Left 2.png")}
                                    />
                                  )}

                                  {item2.sign}
                                  <ul>
                                    {categoryList
                                      .filter(
                                        (c: VwUserCategory) =>
                                          c.parentId === item2.id &&
                                          c.show === true
                                      )
                                      .map((item3: VwUserCategory) => (
                                        <li
                                          data-child={item3.child}
                                          className={
                                            item3.child <= 0
                                              ? "Product_List_Tree_Category_Negative"
                                              : "Product_List_Tree_Category_Plus"
                                          }
                                          data-name={item3.sign}
                                          data-Id={item3.id}
                                          onClick={handlerCategory}
                                        >
                                          {item3.child <= 0 ? (
                                            <img
                                            alt=''
                                              className="arrow-cat"
                                              src={require("../../../../img/ArrowDown.png")}
                                            />
                                          ) : (
                                            <img
                                            alt=''
                                              className="arrow-cat"
                                              src={require("../../../../img/Arrow - Left 2.png")}
                                            />
                                          )}
                                          {item3.sign}
                                          <ul>
                                            {categoryList
                                              .filter(
                                                (c: VwUserCategory) =>
                                                  c.parentId === item3.id &&
                                                  c.show === true
                                              )
                                              .map((item4: VwUserCategory) => (
                                                <li
                                                  data-child={item4.child}
                                                  className={
                                                    item4.child <= 0
                                                      ? "Product_List_Tree_Category_Negative"
                                                      : "Product_List_Tree_Category_Plus"
                                                  }
                                                  data-name={item4.sign}
                                                  data-Id={item4.id}
                                                >
                                                  <div
                                                    onClick={handlerCategory}
                                                  >
                                                    {item4.child <= 0 ? (
                                                      <img
                                                      alt=''
                                                        className="arrow-cat"
                                                        src={require("../../../../img/ArrowDown.png")}
                                                      />
                                                    ) : (
                                                      <img
                                                      alt=''
                                                        className="arrow-cat"
                                                        src={require("../../../../img/Arrow - Left 2.png")}
                                                      />
                                                    )}
                                                    {item4.sign}
                                                  </div>
                                                </li>
                                              ))}
                                          </ul>
                                        </li>
                                      ))}
                                  </ul>
                                </li>
                              ))}
                          </ul>
                        </li>
                      ))
                  : null}
              </ul>
            )}
          </ul>
          <ul className="Product_List_Ul_Category">
            <li className="Product_List_Titr_Category">
              <span>قیمت</span>
              <button
                type="button"
                className="close Product_List_Close"
                onClick={ClearPrice}
                title="حذف فیلتر"
                aria-label="Close"
              >
                {/* <span aria-hidden="true">&times;</span> */}
                <Image
                  fallbackSrc={APIImage + "default.png"}
                  alt={""}
                  src={require("../../../../img/Delete.png")}
                  className="del-icon"
                />
              </button>
            </li>
            <li>
              <Price_Range
                {...{
                  min: 0,
                  max: 50000000,
                  changeHandler: handlerPrice,
                  changeCompleteHandler: handlerChangeCompletePrice,
                  changeCompleteTextboxMax: handlerChangeCompleteTextboxMax,
                  clear: clPrice,
                }}
              />
            </li>
          </ul>

          <ul className="Product_List_Ul_Category">
            <li className="Product_List_Titr_Category">
              برند
              <button
                type="button"
                onClick={ClearBrands}
                className="close Product_List_Close"
                title="حذف فیلتر"
                aria-label="Close"
              >
                {/* <span aria-hidden="true">&times;</span> */}
                <Image
                  fallbackSrc={APIImage + "default.png"}
                  alt={""}
                  src={require("../../../../img/Delete.png")}
                  className="del-icon"
                />
              </button>
            </li>
            <li className="Product_Brand">
              {brandList !== undefined
                ? brandList.map((item: selectData) => (
                    <label key={item.value} className="Product_Brand_list">
                      <input
                        type="checkbox"
                        data-name={item.label}
                        data-id={item.value}
                        data-logo={item.logo}
                        onChange={handlerBrand}
                        checked={item.check === undefined ? false : item.check}
                      />
                      <b>{item.label}</b>
                      <span className="checkmark"></span>
                      <img
                        className="logobrand"
                        alt={""}
                        src={
                          APIImage + (item.logo ? item.logo : "/default.png")
                        }
                      />
                      {/* <p className="Product_Brand_list_P">ُSNT</p> */}
                    </label>
                  ))
                : null}
            </li>
          </ul>
          <ul className="Product_Toggle_Switch">
            <li className="Product_Toggle_Switch_Row">
              <label className="Toggle_Switch">
                <input
                  type="checkbox"
                  onChange={handlerStock}
                  defaultChecked={
                    assetSearch !== undefined ? assetSearch.currentStock : false
                  }
                />
                <span className="Toggle_Slider round"></span>
              </label>
              <p className="Product_Toggle_Switch_Text">
                فقط کالاهای موجود نمایش داده شوند
              </p>
            </li>
            <li className="Product_Toggle_Switch_Row">
              <label className="Toggle_Switch">
                <input
                  type="checkbox"
                  onChange={handlerDiscount}
                  defaultChecked={
                    assetSearch !== undefined
                      ? assetSearch.discountPrice
                      : false
                  }
                />
                <span className="Toggle_Slider round"></span>
              </label>
              <p className="Product_Toggle_Switch_Text">
                کالاهای دارای تخفیف نمایش داده شوند
              </p>
            </li>
          </ul>
          <button
            className="btn btn-orange d-block d-sm-none"
            onClick={() => setFilterClass("d-none d-sm-block")}
          >
            عدم نمایش فیلترها
          </button>
        </div>
        <div className="col-xl-9 col-lg-8  col-md-11 col-sm-11 col-xs-11">
          <div className="row search-result-container">
            <div className="col-lg-12">
              {/* <div className="Product_Category_Header d-none d-sm-block"> */}
              <div className="Product_Category_Header">
                <span>
                  <button
                    type="button"
                    onClick={ClearVisited}
                    className="close Product_List_Close_Visited"
                    title="حذف فیلتر"
                    aria-label="Close"
                  >
                    {/* <span aria-hidden="true">&times;</span> */}
                    <Image
                      fallbackSrc={APIImage + "default.png"}
                      alt="Product List"
                      src={require("../../../../img/list.png")}
                    />
                  </button>
                  <span
                    onClick={ClearVisited}
                    className="Product_Category_Header_Text Product_Category_Header_Text_Active"
                  >
                    نمایش بر اساس
                  </span>
                </span>

                <span
                  className="Product_Category_Header_Text"
                  data-codetype="4"
                  onClick={handlerMostVisited}
                >
                  پربازدیدترین
                </span>
                <span
                  className="Product_Category_Header_Text"
                  data-codetype="1"
                  onClick={handlerMostVisited}
                >
                  پرفروش ترین
                </span>
                <span
                  className="Product_Category_Header_Text"
                  data-codetype="2"
                  onClick={handlerMostVisited}
                >
                  بیشترین امتیاز
                </span>
                <span
                  className="Product_Category_Header_Text"
                  data-codetype="3"
                  onClick={handlerMostVisited}
                >
                  جدیدترین
                </span>
                <span
                  className="Product_Category_Header_Text"
                  data-expensive="1"
                  onClick={handlerExpensive}
                >
                  گران ترین
                </span>
                <span
                  className="Product_Category_Header_Text"
                  data-expensive="0"
                  onClick={handlerExpensive}
                >
                  ارزان ترین
                </span>
              </div>
            </div>

            <div className="col-lg-12">
              {/* <ul className="Product_Card_LIst"> */}
              {productList.length === 0 && ResultReady ? (
                <div className="shadow mt-4">
                  <div className="row">
                    <div className="col-lg-6 col-xs-12">
                      <div className="black-large-message">
                        کاربر گرامی <br />
                        جستجو برای کلمه موردنظر شما نتیجه ای نداشت.
                      </div>
                      <div className="search-message2">
                        - کلمه موردنظر را مجدد بررسی کنید. <br />- کلمه مورد نظر
                        خود را تغییر دهید.
                      </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                      <img
                        className="img-fluid"
                        src={require("../../../../img/noresult.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row row-cols-6">
                  {productList.map((item: VwUserProductSearch) => (
                    <ProductCardBootstrap
                      key={item.assetId}
                      {...{
                        assetId: item.assetId,
                        id: item.productId,
                        star: item.star,
                        header: item.sign,
                        text: item.sign,
                        price: item.currentPrice,
                        image: item.mainPic,
                        previousPrice: item.previousPrice,
                        discount: item.discountPercent,
                        stock: item.currentStock,
                        isstock: true,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* <li className="Product_Card-None"></li> */}
              {/* </ul> */}
              <div className="col-lg-12 page-contect">
                {productCount > 15 ? (
                  <div className="Product_Search_PageNumber">
                    <Pagination
                      activePage={
                        page === undefined || page.active === undefined
                          ? 1
                          : page.active
                      }
                      itemsCountPerPage={
                        page !== undefined && page.pageSize !== undefined
                          ? page.pageSize
                          : 1
                      }
                      totalItemsCount={productCount}
                      pageRangeDisplayed={5}
                      onChange={handlerPage}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(AssetList as any);
