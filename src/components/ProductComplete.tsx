import React, { useState, useEffect, useRef } from "react";
import { APIUrl, GetIP4 } from "../helper/config";
import { responseModel } from "../model/general/responseModel";
import { useHistory, RouteComponentProps } from "react-router";
import { correctPersian } from "../helper/correctPersian";
import { AssetSearchResponse } from "../model/viewModel/AssetSearchResponse";
import $ from "jquery";
import { VwSeacrh } from "../model/viewModel/VwSeacrh";
import { ApplicationState } from "../store";
import * as UserInfo from "../store/UserInfo";
import { connect } from "react-redux";
import { ProductSearchMode } from "../model/general";

export interface ProductSuggest {
  id: string;
  name: string;
}
interface CatSuggest {
  id: string;
  name: string;
  code: string;
}

function useOutsideAlerter(ref: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        $("#PCompleteSearch").hide();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

type ProductAutoCompleteProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators &
  RouteComponentProps<{}> & {
    mode: ProductSearchMode;
    SelectProduct: (selectedItem: ProductSuggest | undefined) => void;
  };

const ProductAutoComplete = (props: ProductAutoCompleteProps) => {
  let typingTimer: any = null;
  // const products = [] as ProductSuggest[];
  const [items, setItem] = useState<ProductSuggest[] | undefined>([]);
  const [categories, setCategories] = useState<CatSuggest[]>();
  const [Keyword, setKeyword] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestion, setshowSuggestion] = useState(false);
  const [loading, setloading] = useState(false);
  const [categoryTitr, ] = useState();
  const wrapperRef = useRef(null);
  const [donothing, setDonothing] = useState(false);
  useOutsideAlerter(wrapperRef);

  //var keywordValue = ''
  var index = -1;
  var keywordRef: React.RefObject<HTMLInputElement>;
  keywordRef = React.createRef();

  useEffect(() => {
    // if (keywordRef.current) {
    //     keywordRef.current.focus();
    // }
    clearTimeout(typingTimer);
  });
  let history = useHistory();
  function handleClick(event: any) {
    $("#PCompleteSearch").show();
  }
  async function handleChange(event: any) {
     setDonothing(false);
    setloading(true);
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
    const val = event.target.value;
    if (!event.target.value) {
      await setItem([]);
      await setCategories([]);
      await setloading(false);
      return;
    }

    // setloading(true);
    typingTimer = setTimeout(() => {
      setKeyword(val);
      getSuggestion(val);
    }, 600);

    // if (event.target.value === '') {
    //     setshowSuggestion(false);
    //     return false;
    // }
    // setKeyword(event.target.value)
    // if (!loading)
    //     getSuggestion(event.target.value)
    // return false;
  }

  async function handleKeyUp(event: any) {
    event.stopPropagation();

    if (!event.target.value) {
      await setItem([]);
      await setCategories([]);
    }
    // if (event.target.value.length < 3) {
    //     return;
    // }
    // (keywordRef.current as HTMLInputElement).setAttribute("value", "11111");

    if (event.keyCode === 27) {
      setshowSuggestion(false);
      return;
    }
    if (event.keyCode === 38) {
      if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
      return;
    }

    if (event.keyCode === 40) {
      if (items && selectedIndex < items.length - 1)
        setSelectedIndex(selectedIndex + 1);
      return;
    }

    if (event.keyCode === 13) {
      // if (event.target.value.length < 3) {
      //     setshowSuggestion(false);
      //     return false;
      // }
      setDonothing(true);
      if (items && items.length > 0) {
        setshowSuggestion(false);
        if (selectedIndex !== -1) {
          setKeyword(items[selectedIndex].name);
          (keywordRef.current as HTMLInputElement).value =
            items[selectedIndex].name;
        }
        event.stopPropagation();
        let dt: VwSeacrh = {
          id: "",
          code: "",
          mid: "",
          mName: "",
          name: (keywordRef.current as HTMLInputElement).value,
          type: "َALL",
        };
        props.Search(dt);

        let val = (keywordRef.current as HTMLInputElement).value;
        if (val) {
          GetIP4()
            .then((ip: any) => {
              let data = {
                searchText: val,
                userId: props.userId,
                createUserID: props.userId,
                clicked: false,
                isActive: true,
                IP: ip,
              };
              SaveSearch(data);
            })
            .catch((res) => {});
        }

        if (props.mode === ProductSearchMode.Search) {
          props.UserLoad(true);
          history.push(
            "/Asset/Search?q=" +
              (keywordRef.current as HTMLInputElement).value.replace(
                /\s+/g,
                "-"
              )
          );
        } else props.SelectProduct(items[selectedIndex]);
      } else {
        setshowSuggestion(false);
        event.stopPropagation();
        let dt: VwSeacrh = {
          id: "",
          code: "",
          mid: "",
          mName: "",
          name: (keywordRef.current as HTMLInputElement).value,
          type: "َALL",
        };
        props.Search(dt);

        let val = (keywordRef.current as HTMLInputElement).value;
        GetIP4()
          .then((ip: any) => {
            let data = {
              searchText: val,
              userId: props.userId,
              createUserID: props.userId,
              clicked: false,
              isActive: true,
              IP: ip,
            };

            SaveSearch(data);
          })
          .catch((res) => {});

        if (props.mode === ProductSearchMode.Search) {
          props.UserLoad(true);
          history.push(
            "/Asset/Search?q=" +
              (keywordRef.current as HTMLInputElement).value.replace(
                /\s+/g,
                "-"
              )
          );
        } else {
          if (items) props.SelectProduct(items[selectedIndex]);
        }
      }
      return false;
    }
  }

  function selectSuggestion(id: any, suggestion: string) {
    //setKeyword(suggestion);
    setDonothing(true);
    setshowSuggestion(false);
    (keywordRef.current as HTMLInputElement).value = suggestion;
    if (items && items.length > 0) {
      setshowSuggestion(false);
      if (selectedIndex !== -1) {
        setKeyword(items[selectedIndex].name);
        (keywordRef.current as HTMLInputElement).value =
          items[selectedIndex].name;
      }
      let dt: VwSeacrh = {
        id: id,
        code: "",
        mid: "",
        mName: "",
        name: suggestion,
        type: "ASSET",
      };
      props.Search(dt);

      GetIP4()
        .then((ip: any) => {
          let data = {
            assetId: id,
            searchText: suggestion,
            userId: props.userId,
            createUserID: props.userId,
            clicked: false,
            isActive: true,
            IP: ip,
          };
          SaveSearch(data);
        })
        .catch((res) => {});

      if (props.mode === ProductSearchMode.Search) {
        props.UserLoad(true);
        history.push(
          "/Asset/Search/?p=" +
            (keywordRef.current as HTMLInputElement).value.replace(/\s+/g, "-")
        );
      } else {
        props.SelectProduct(items.filter((c) => c.id === id)[0]);
      }
    } else {
      let dt: VwSeacrh = {
        id: id,
        code: "",
        mid: "",
        mName: "",
        name: suggestion,
        type: "ASSET",
      };
      props.Search(dt);

      GetIP4()
        .then((ip: any) => {
          let data = {
            assetId: id,
            searchText: suggestion,
            userId: props.userId,
            createUserID: props.userId,
            clicked: false,
            isActive: true,
            IP: ip,
          };
          SaveSearch(data);
        })
        .catch((res) => {});

      if (props.mode === ProductSearchMode.Search) {
        props.UserLoad(true);
        history.push(
          "/Asset/Search/?p=" +
            (keywordRef.current as HTMLInputElement).value.replace(/\s+/g, "-")
        );
      } else {
        if (items) props.SelectProduct(items[selectedIndex]);
      }
    }
  }
  function HandlerCategory(id: any, code: any, name: any) {
    setshowSuggestion(false);
    let dt: VwSeacrh = {
      id: id,
      code: code,
      mid: "",
      mName: "",
      name: name,
      type: "CATEGORY",
    };
    props.Search(dt);

    GetIP4()
      .then((ip: any) => {
        let data = {
          categoryId: id,
          searchText: name,
          userId: props.userId,
          createUserID: props.userId,
          clicked: false,
          isActive: true,
          IP: ip,
        };
        SaveSearch(data);
      })
      .catch((res) => {});
    if (props.mode === ProductSearchMode.Search) {
      props.UserLoad(true);
      history.push("/Asset/Search/?c=" + name.replace(/\s+/g, "-"));
    } else {
      if (items) props.SelectProduct(items[selectedIndex]);
    }
  }
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
  function getSuggestion(keyword: string) {
    console.log("get suggestion");
    if (donothing) return;

    const data = {
      titleKeyword: correctPersian(keyword.trim()),
    };
    fetch(APIUrl + "/Asset/SearchData", {
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
            setshowSuggestion(true);
            var result = responseModel.data as AssetSearchResponse;
            if (result.categories.length > 0) {
              setCategories(result.categories as CatSuggest[]);
            } else {
              setCategories(undefined);
            }
            if (result.products.length > 0) {
              setItem(result.products as ProductSuggest[]);
            } else {
              setItem(undefined);
            }
            setloading(false);
            setSelectedIndex(-1);
          } else {
            setshowSuggestion(false);
          }
        }
      })
      .catch((error) => {
        setloading(false);
        console.log(error);
      });
  }
  const handlerClear = (e: any) => {
    setItem([]);
    setCategories([]);
    setloading(false);
    setKeyword("");
    (keywordRef.current as HTMLInputElement).value = "";
    let dt: VwSeacrh = {
      id: "",
      code: "",
      mid: "",
      mName: "",
      name: "",
      type: "َALL",
    };
    props.Search(dt);
  };
  return (
    <div className="autocomplete-container" ref={wrapperRef}>
      <div className="div-search-box">
        <input
          type="text"
          defaultValue=""
          autoComplete="off"
          placeholder={props.mode === ProductSearchMode.Search ? "" : ""}
          className={
            props.userId === null ||
            props.userId === "" ||
            props.userId === undefined
              ? "searchbox form-control rtl"
              : "searchbox form-control rtl "
          }
          ref={keywordRef}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onClick={handleClick}
        />
        <img
          src={require("../img/Search.png")}
          className={"fa-search-box"}
          alt="Account"
        />
        {Keyword && Keyword.length > 0 ? (
          <span
            onClick={handlerClear}
            className="fa-search-box-close"
            aria-hidden="true"
          >
            &times;
          </span>
        ) : null}
      </div>
      {loading ? (
        <div className="spinner-grow text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : showSuggestion ? (
        <div
          className={
            props.userId === null ||
            props.userId === "" ||
            props.userId === undefined
              ? "suggestions"
              : "suggestions suggestionsBlandy"
          }
          id="PCompleteSearch"
        >
          {items
            ? items.map((item: ProductSuggest) => {
                index++;
                return (
                  <div
                    key={item.id}
                    onClick={() => selectSuggestion(item.id, item.name)}
                    className={
                      index === selectedIndex ? "selected-suggestion" : ""
                    }
                  >
                    {item.name}
                  </div>
                );
              })
            : null}
          <ul>
            <li>
              {categories !== undefined && categories.length > 0 ? (
                <span>دسته بندی {categoryTitr}</span>
              ) : null}

              {categories !== undefined
                ? categories.map((item: CatSuggest) => {
                    index++;
                    return (
                      <li
                        key={item.id}
                        onClick={() =>
                          HandlerCategory(item.id, item.code, item.name)
                        }
                        className={
                          index === selectedIndex ? "selected-suggestion" : ""
                        }
                      >
                        {item.name}
                      </li>
                    );
                  })
                : null}
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};
export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(ProductAutoComplete as any);
