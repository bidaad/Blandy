import React, { Component } from "react";
import Pagination from "react-js-pagination";
import Select from "react-select";
import { Row, Col } from "react-bootstrap";
import { ApplicationState } from "../store";
import { connect } from "react-redux";
import * as UserInfo from "../store/UserInfo";
import { RouteComponentProps } from "react-router";
import { VwPermisionResource } from "../model/viewModel/VwPermisionResource";
import $ from "jquery";
import { gridColumns } from "../model/general/stateBase";
import { typeColumn } from "../model/general/typeComponent";
import { APIImage } from "../helper/config";
import Image from "./Image";
import formatAndEncCurrency from "../helper/formatCurrency";

const pageSizes = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];
//Git2222 456 8888

type ReactGridProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators &
  RouteComponentProps<{}> & {
    baseID: string;
    pageNo: any;
    filter: any;
    pageSize: any;
    getData: any;
    sortData: any;
    title: any;
    editable: any;
    selectRecord: any;
    deleteRecord: any;
    editRecord: any;
    count: any;
    newRecord: any;
    isSelected?: boolean;
    internalLoading: boolean;
    sort?: string;
  };
interface gridState {
  columns: any;
  data: any;
  message: String;
  id: any;
  activePage: number;
  pageS: number;
  pageN: number;
  totalCount: number;
  baseID: string;

  showMode: number;
  showModal: boolean;
  modalLeft: number;
  modalTop: number;
  activeKey: any;
  selectedId: any;
  selectedKey: any;
  styles?: any;
  NewEdit?: any;
  showAlert: boolean;
  url?: string;
  showFilterCols: boolean;
  curColType: typeColumn | undefined;
  sort?: string;
  sortkey?: string; //save current selected column type for filter
  currentfilter?: any;
  filterkey?: string;
  filterText?: string;
}
export interface IHash {
  [details: string]: string;
}
export interface IHashNumber {
  [details: string]: number;
}
// function uuidv4() {
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
//     var r = (Math.random() * 16) | 0,
//       v = c === "x" ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// }

let filters = new Map<string, string>();
let filtersCnd = new Map<string, string>();

let timer = 0;
//let filter: string;
//let identity = uuidv4();
var prevent = false;

class ReactGrid extends Component<ReactGridProps, gridState> {
  private keyCount: number = 0;
  private clickTimeout: any = null;
  private startOffset: any = null;

  constructor(props: any) {
    super(props);
    var intializeState: gridState = {
      columns: [],
      data: [],
      message: "",
      id: null,
      activePage: 1,
      pageN: 1,
      pageS: 10,
      totalCount: 0,
      baseID: this.props.baseID,
      showMode: 1,
      showModal: false,
      modalLeft: 0,
      modalTop: 0,
      activeKey: undefined,
      selectedId: null,
      selectedKey: null,
      showAlert: false,
      url: APIImage,
      showFilterCols: false,
      curColType: typeColumn.text,
      currentfilter: undefined// new Map<string, string>(),
    };

    this.state = intializeState;
    this.getKey = this.getKey.bind(this);
    filters.clear();
    filtersCnd.clear();
    //this.setState({ activeKey: undefined });
    //this.setState({ currentfilter: undefined });
  }

  getKey() {
    return this.keyCount++;
  }
  changePageSize = (event: any) => {
    this.setState({ pageS: event.value });

    this.props.getData(
      this.state.pageN,
      event.value,
      this.state.filterText,
      this.state.sort,
      this.state.sortkey
    );
  };
  handleDBClicks = (e: any) => {
    let ids = e.currentTarget.id;
    if (this.props.isSelected === true) {
      this.selectRow(ids);
      return;
    }
    if (this.clickTimeout !== null) {
      this.selectRow(ids);
      this.props.editRecord(ids);
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
    } else {
      this.clickTimeout = setTimeout(() => {
        this.selectRow(ids);
        clearTimeout(this.clickTimeout);
        this.clickTimeout = null;
      }, 2000);
    }
  };

  componentDidUpdate(props: any) {
    this.keyCount = 0;
    // function handleClickOutsideWindow(event: any) {
    // if (event.target.className !== undefined && event.target.className !== null) {
    //     if (event.target.className.indexOf('btn-filter') === -1) {
    //         $('div.filter-modal').hide();
    //     }
    // }

    // }

    // document.addEventListener("mousedown", handleClickOutsideWindow);
  }

  handlePageChange = (pageNumber: any) => {
    this.setState({ pageN: pageNumber });
    console.log(this.props.filter);

    this.props.getData(
      pageNumber,
      this.state.pageS,
      this.state.filterText,
      this.state.sort,
      this.state.sortkey
    );
  };
  handleSort = (e: any) => {
    let key = e.currentTarget.dataset.key;
    let sort = $(e.currentTarget).hasClass("sort-AZ");
    if (sort) {
      $(e.currentTarget).removeClass("sort-AZ");
      $(".caption-item-row span").removeClass("sort-Active");
      $(e.currentTarget).addClass("sort-ZA sort-Active");
      this.setState({ sort: "DESC", sortkey: key });
      if (this.props.pageNo) {
        this.props.getData(
          this.state.pageN,
          this.state.pageS,
          this.state.filterText,
          "DESC",
          key
        );
        return;
      }
      this.props.getData(
        this.state.pageN,
        this.state.pageS,
        this.state.filterText,
        "DESC",
        key
      );
      // this.props.sortData('ASC', key);
    } else {
      $(e.currentTarget).removeClass("sort-ZA");
      $(".caption-item-row span").removeClass("sort-Active");
      $(e.currentTarget).addClass("sort-AZ sort-Active");
      this.setState({ sort: "ASC", sortkey: key });
      if (this.props.pageNo) {
        this.props.getData(
          this.state.pageN,
          this.state.pageS,
          this.state.filterText,
          "ASC",
          key
        );
      }
      this.props.getData(
        this.state.pageN,
        this.state.pageS,
        this.state.filterText,
        "ASC",
        key
      );
      // this.props.sortData('DESC', key);
    }
  };
  handleClick = (Id: any) => {
    this.setState({
      NewEdit: "Edit",
    });

    // this.getSingleData(url);
  };

  showFilterConditions = (e: any, key: any, type: typeColumn | undefined) => {
    let dsp = $(e.target).next().css("display");

    $("div.filter-modal").hide();

    if (dsp.toUpperCase() === "NONE") {
      this.setState({ curColType: type });
      $(e.target).next().show();
    } else {
      $(e.target).next().hide();
    }
    this.setState({
      activeKey: key,
    });
    //  $(e.target).next().toggle();
    // if (e) {
    //     var rect = (ReactDOM.findDOMNode(e.target) as HTMLElement).getBoundingClientRect();
    //     this.setState({
    //         styles: {
    //             left: rect.left - 20,
    //             top: rect.top - 80,
    //         },
    //         showModal: !this.state.showModal,
    //         activeKey: key,
    //     }
    //     );
    // }
  };

  applyFilter = () => {
    var strFilter = "";
    //      var curOperation = 2;
    for (let i = 0; i < this.state.columns.length; i++) {
      // curOperation = 2;
      const element = this.state.columns[i];
      if (
        filters.get(element.key) !== "" &&
        filters.get(element.key) !== undefined
      ) {
        if (filtersCnd.get(element.key) !== undefined)
          var x = filtersCnd.get(element.key);
        if (element.type === 3 && x === "1") {
          x = "2";
        }
        strFilter +=
          element.key + ":" + filters.get(element.key) + ":" + x + ";";
      }
    }
    this.setState({ showModal: false });
    this.setState({ activePage: 1 });
    this.setState({ filterText: strFilter });
    // this.props.getData(pageNumber, this.props.pageSize, this.props.filter,this.state.sort,this.state.sortkey);
    this.props.getData(
      1,
      this.state.pageS,
      strFilter,
      this.state.sort,
      this.state.sortkey
    );
  };

  componentWillReceiveProps(nextProps: any) {

    if (this.props !== nextProps) {
      this.setState({
        data: nextProps.data,
        columns: nextProps.columns,
        totalCount: nextProps.count,
      });
    }
  }
  componentDidMount() {}

  error = (msg: any) => {
    this.setState({ message: msg });
  };

  handleChangeFilterCheckBox = (
    key: string,
    e: { target: HTMLInputElement }
  ) => {
    if (e.target.checked) {
      filters.set(key, "true");
      this.setState({ currentfilter: filters, filterkey: key });
    } else if (e.target.checked === false) {
      filters.set(key, "false");
      this.setState({ currentfilter: filters, filterkey: key });
    }
    this.setState({
      activeKey: e.target.dataset.itemkey,
    });

    this.setFilterCondition(2, key);
  };
  handleChangeFilter = (key: string, event: { target: HTMLInputElement }) => {
    filters.set(key, event.target.value);
    this.setState({ currentfilter: filters, filterkey: key });
    // $("#" + identity + " input[data-itemkey=" + key+ "]").val(event.target.value );
  };
  handleKeyDownFilter = (e: any) => {
    if (e.key === "Enter") {
      if (e.currentTarget.dataset.itemtype === "3") {
        this.setState({
          activeKey: e.currentTarget.dataset.itemkey,
        });
        this.setFilterCondition(2, e.currentTarget.dataset.itemkey);
      } else {
        this.setFilterCondition(1, e.currentTarget.dataset.itemkey);
      }
    }
  };

  setFilterCondition = (num: number, key?: string) => {
    
    filtersCnd.set(key ? key : "", num.toString());
    if (num === 0) {
      this.applyFilter();
      $("div.filter-modal").hide();
      return;
    }
    this.applyFilter();
    $("div.filter-modal").hide();
  };
  handlerRefresh = () => {
    filters.clear();
    filtersCnd.clear();
    this.setState({ activeKey: undefined });
    this.setState({ currentfilter: undefined });
    this.props.getData(1, this.state.pageS, "", "", "");
    $("div.filter-modal").hide();
    $("input.filter-condition-textbox").val("");
    $(".caption-item-row span").removeClass("sort-Active");
    $("span[data-key=" + this.state.filterkey + "]").removeClass(
      "sort-ZA sort-Active"
    );
    $("span[data-key=" + this.state.filterkey + "]").addClass("sort-AZ");
    this.setState({
      activePage: 1,
      pageN: 1,
      sort: undefined,
      sortkey: undefined,
      filterkey: undefined,
      filterText: undefined,
    });
    // this.props.getData(1, this.props.pageSize, this.props.filter, "", "");
    return;
  };
  selectRow = (id: string) => {
    const curRecord = this.state.data.find((item: any) => item.id === id);
    this.setState({ selectedId: id });
    var selectedColumns = "";
    for (let i = 0; i < this.state.columns.length; i++) {
      const element = this.state.columns[i];
      if (element.showWhenSelected) {
        if (selectedColumns === "")
          selectedColumns += curRecord[this.state.columns[i].key];
        else selectedColumns += ", " + curRecord[this.state.columns[i].key];
      }
    }

    this.props.selectRecord(id, selectedColumns);
  };

  AlertDeleteRecord = () => {
    if (this.state.selectedId !== null) {
      this.setState({ showAlert: true });
    }
  };
  deleteDetailRecord = () => {
    this.props.deleteRecord(this.state.selectedId);
    this.setState({ showAlert: false });
  };
  cancelDelete = () => {
    this.setState({ showAlert: false });
  };
  editRecord = (key: string | undefined) => {
    if (key !== undefined) this.props.editRecord(this.state.selectedId);
    else if (this.state.selectedId !== null)
      this.props.editRecord(this.state.selectedId);
  };
  // onError = (e: any) => {
  //     e.currentTarget.src = this.state.url + '/default.png';

  // }

  doClickAction() {
    console.log(" click");
  }
  doDoubleClickAction() {
    console.log("Double Click");
  }

  handleDoubleClick() {
    clearTimeout(timer);
    prevent = true;
    this.doDoubleClickAction();
  }
  MousMoveHandler = (e: any) => {
    if (this.startOffset) {
      $(e.currentTarget).css("width", this.startOffset - e.pageX + "px");
      $("span[data-index=" + e.currentTarget.dataset.index + "]").css(
        "width",
        this.startOffset - e.pageX + "px"
      );
    }
  };
  MousDownHandler = (e: any) => {
    console.log("Mouse Down");
    this.startOffset = e.currentTarget.offsetWidth + e.pageX;
  };
  MousUpHandler = (e: any) => {
    console.log("Mouse UP");
    this.startOffset = undefined;
  };
  render() {
    let disabled = "";

    var myResource: VwPermisionResource | undefined;
    var childResource: VwPermisionResource[] | undefined;
    var ButtonCreateResource: VwPermisionResource | undefined;
    var ButtonEditResource: VwPermisionResource | undefined;
    var ButtonDeleteResource: VwPermisionResource | undefined;
    let disabledButtonCreateResource = "";
    let disabledButtonEditResource = "";
    let disabledButtonDeleteResource = "";
    let accessButtonDeleteResource = false;
    let accessButtonCreateResource = false;
    let accessButtonEditResource = false;

    if (this.props.resources !== undefined) {
      let Resources = this.props.resources as VwPermisionResource[];
      if (Resources) {
        myResource = Resources.find(
          (c) =>
            c.resourceCode === this.props.title.toString().toUpperCase() &&
            c.lang === this.props.lang.abr.toUpperCase()
        );
        ButtonCreateResource = Resources.find(
          (c) =>
            c.resourceCode ===
              this.props.title.toString().toUpperCase() + "." + "BTN_CREATE" &&
            c.lang === this.props.lang.abr.toUpperCase()
        );
        ButtonEditResource = Resources.find(
          (c) =>
            c.resourceCode ===
              this.props.title.toString().toUpperCase() + "." + "BTN_EDIT" &&
            c.lang === this.props.lang.abr.toUpperCase()
        );
        ButtonDeleteResource = Resources.find(
          (c) =>
            c.resourceCode ===
              this.props.title.toString().toUpperCase() + "." + "BTN_DELETE" &&
            c.lang === this.props.lang.abr.toUpperCase()
        );

        childResource = Resources.filter(
          (c: any) =>
            c.resourceCode.includes(this.props.title.toUpperCase()) &&
            c.lang === this.props.lang.abr.toUpperCase()
        );
        
      }
    }
    if (myResource === undefined) {
    } else {
      if (myResource) {
        if (myResource.actionTypes) {
          if (!myResource.actionTypes.toUpperCase().includes("V")) return null;
          if (!myResource.actionTypes.toUpperCase().includes("E"))
            disabled = "disabled";
        }
      }
      if (ButtonCreateResource) {
        if (ButtonCreateResource.actionTypes) {
          if (!ButtonCreateResource.actionTypes.toUpperCase().includes("E"))
            disabledButtonCreateResource = "disabled";
          if (ButtonCreateResource.actionTypes.toUpperCase().includes("V"))
            accessButtonCreateResource = true;
        }
      }
      if (ButtonEditResource) {
        if (ButtonEditResource.actionTypes) {
          if (!ButtonEditResource.actionTypes.toUpperCase().includes("E"))
            disabledButtonEditResource = "disabled";
          if (ButtonEditResource.actionTypes.toUpperCase().includes("V"))
            accessButtonEditResource = true;
        }
      }
      if (ButtonDeleteResource) {
        if (ButtonDeleteResource.actionTypes) {
          if (!ButtonDeleteResource.actionTypes.toUpperCase().includes("E"))
            disabledButtonDeleteResource = "disabled";
          if (ButtonDeleteResource.actionTypes.toUpperCase().includes("V"))
            accessButtonDeleteResource = true;
        }
      }
    }
    const FilterConditions = (k: any,id:any) => {
      if (k === typeColumn.number) {
        return (
          <div className="filter-modal">
            <div>
              <button
                className="btn-filter-condition"
                onClick={() => this.setFilterCondition(2,id)}
              >
                برابر با
              </button>
            </div>
            <div>
              <button
                className="btn-filter-condition"
                onClick={() => this.setFilterCondition(3,id)}
              >
                بزرگتر از
              </button>
            </div>
            <div>
              <button
                className="btn-filter-condition"
                onClick={() => this.setFilterCondition(4,id)}
              >
                کوچکتر از
              </button>
            </div>
          </div>
        );
      }
      if (k === typeColumn.check) {
        return <div></div>;
      } else {
        return (
          <div className="filter-modal">
            <div>
              <button
                className="btn-filter-condition"
                onClick={() => this.setFilterCondition(1,id)}
              >
                شامل
              </button>
            </div>

            <div>
              <button
                className="btn-filter-condition"
                onClick={() => this.setFilterCondition(2,id)}
              >
                برابر با
              </button>
            </div>
            <div>
              <button
                className="btn-filter-condition"
                onClick={() => this.setFilterCondition(3,id)}
              >
                بزرگتر از
              </button>
            </div>
            <div>
              <button
                className="btn-filter-condition"
                onClick={() => this.setFilterCondition(4,id)}
              >
                کوچکتر از
              </button>
            </div>
            <div>
              <button
                className="btn-filter-condition"
                onClick={() => this.setFilterCondition(5,id)}
              >
                شامل نباشد
              </button>
            </div>
            <div>
              <button
                className="btn-filter-condition"
                onClick={() => this.setFilterCondition(6,id)}
              >
                مخالف
              </button>
            </div>
            <div>
              <button
                className="btn-filter-condition no-filter"
                onClick={() => this.setFilterCondition(0,id)}
              >
                بدون فیلتر
              </button>
            </div>
          </div>
        );
      }
    };

    const Loading = this.props.internalLoading ? (
      <div className="spinner-grow text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      ""
    );

    const ItemList = () =>
      this.state.data.map((item: any) => {
        const curKey = this.getKey();
        if (this.state.showMode === 1)
          return (
            <tr
              id={item.id}
              onDoubleClick={this.handleDoubleClick.bind(this)}
              onClick={() => this.setState({ selectedKey: curKey })}
              key={curKey}
            >
              {this.state.columns.map((col: gridColumns, index: any) => {
                const curColName = col.key;
                var colVal = item[curColName];
                if (col.type === typeColumn.number) {
                  colVal = formatAndEncCurrency(item[curColName]);
                }
                if (col.type === typeColumn.check) {
                  if (item[curColName]) {
                    colVal = <input type="checkbox" defaultChecked />;
                  } else {
                    colVal = <input type="checkbox" />;
                  }
                }
                if (col.type === typeColumn.image) {
                  let path = APIImage + item[curColName];
                  // if (FileExist(path)===false) {
                  //     path = APIImage + '/default.png';
                  // }
                  if (item[curColName] !== null)
                    colVal = (
                      <Image
                        fallbackSrc={APIImage + "/default.png"}
                        alt={""}
                        src={path}
                      />
                    );
                  //colVal = <img src={path} />
                  else colVal = null;
                }
                if (col.type === typeColumn.html) {
                  return (
                    <td
                      id={item.id}
                      className={
                        this.state.selectedKey === curKey ? "selected-row " : ""
                      }
                      onClick={this.handleDBClicks}
                      key={col.key}
                    >
                      <span
                        dangerouslySetInnerHTML={{ __html: colVal }}
                        data-index={index}
                        data-value={""}
                      ></span>
                    </td>
                  );
                }
                // onClick={() => this.selectRow(item.id)}

                return (
                  <td
                    id={item.id}
                    className={
                      this.state.selectedKey === curKey ? "selected-row " : ""
                    }
                    onClick={this.handleDBClicks}
                    key={col.key}
                  >
                    <span data-index={index} data-value={colVal}>
                      {colVal}
                    </span>
                  </td>
                );
              })}
            </tr>
          );
        else
          return (
            <li className="caselistitem" id={item._id} key={item._id}>
              <ul className="casecard">
                {this.props.editable ? (
                  <li onClick={() => this.props.deleteRecord(item._id)}>
                    <span className="btn btn-danger fa fa-trash"></span>
                  </li>
                ) : null}
                {this.state.columns.map((col: any) => {
                  let curColKey = col.key;
                  let curColName = col.name;
                  var colVal = item[curColKey];
                  if (colVal !== null)
                    if (colVal.length > 0)
                      return (
                        <li
                          onClick={() => this.props.editRecord(item._id)}
                          key={col.key}
                        >
                          <span className="lbl">{curColName}</span>: {colVal}
                        </li>
                      );
                })}
              </ul>
            </li>
          );
      });

    if (this.props.internalLoading) {
      return (
        <div className="centered">
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    let tableClass = "table-responsive";
    if (this.state && this.state.columns && this.state.columns.length <= 2) {
      tableClass = "";
    }

    return (
      <Row>
        {this.props.dir === 1 && this.state.showAlert === true ? (
          <div className="PanelAdmin_Modal">
            <div className="PanelAdmin_Modal_Content">
              <div>آیا از حذف اطلاعات مطمئن هستید ؟؟؟</div>
              <div className="PanelAdmin_Modal_Content_Row">
                <button
                  onClick={() => this.deleteDetailRecord()}
                  className="btn btn-info"
                >
                  بله
                </button>
                <button onClick={this.cancelDelete} className="btn btn-danger">
                  خیر
                </button>
              </div>
            </div>
          </div>
        ) : this.props.dir === 2 && this.state.showAlert === true ? (
          <div className="PanelAdmin_Modal">
            <div className="PanelAdmin_Modal_Content">
              <div>Are You Shure ???</div>
              <div className="PanelAdmin_Modal_Content_Row">
                <button
                  onClick={() => this.deleteDetailRecord()}
                  className="btn btn-info"
                >
                  Yes
                </button>
                <button onClick={this.cancelDelete} className="btn btn-danger">
                  No
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <Col md={12} className="T-container">
          {/* <div className="float-left"> */}
          <div className="T-header">
            <div className="grid-toolbar">
              {!this.props.internalLoading ? (
                <div className="pagination-container">
                  <Pagination
                    activePage={this.state.pageN}
                    itemsCountPerPage={this.state.pageS}
                    totalItemsCount={this.state.totalCount}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                  />
                </div>
              ) : null}
              <div className="pagesize-container ml-3">
                <div className="form-group ">
                  <div className="">
                    <Select
                      className="page-size"
                      required
                      onChange={this.changePageSize}
                      value={pageSizes.filter(
                        (option) => option.value === this.state.pageS
                      )}
                      placeholder="Page Size"
                      options={pageSizes}
                    />
                  </div>
                </div>
              </div>
              <div className="pagesize-container ml-3">
                <div className="form-group ">
                  <div className="rtl mt-1">
                    <span>تعداد رکورد:</span>
                    <span className="mr-1">{this.props.count} </span>
                  </div>
                </div>
              </div>

              {this.props.isSelected !== true ? (
                <div>
                  <div className="pagesize-container ml-3">
                    <span
                      onClick={() => this.handlerRefresh()}
                      className="btn btn-info fa fa-refresh mr-1"
                    ></span>
                  </div>
                  <div className="pagesize-container ml-3">
                    {accessButtonDeleteResource === true ? (
                      <span
                        onClick={() => this.AlertDeleteRecord()}
                        className="btn btn-danger fa fa-trash"
                        {...disabledButtonDeleteResource}
                      ></span>
                    ) : null}
                  </div>
                  <div className="pagesize-container ml-3">
                    {accessButtonEditResource === true ? (
                      <span
                        onClick={() => this.editRecord(undefined)}
                        className="btn btn-warning fa fa-edit mr-1"
                        {...disabledButtonEditResource}
                      ></span>
                    ) : null}
                  </div>
                  <div className="pagesize-container ml-3">
                    <div className="form-group ">
                      {accessButtonCreateResource === true ? (
                        <button
                          onClick={this.props.newRecord}
                          className="btn btn-success fa fa-plus"
                          {...disabledButtonCreateResource}
                        ></button>
                      ) : null}
                    </div>
                  </div>
                  <h3>
                    {myResource !== undefined
                      ? myResource.resourceLanguageName
                      : ""}
                  </h3>
                </div>
              ) : (
                <h3>
                  {myResource !== undefined
                    ? myResource.resourceLanguageName
                    : ""}
                </h3>
              )}

              <div className="clearfix"></div>
            </div>
          </div>
          {/* </div> */}
          {/* <div className="float-right">
                    <button onClick={() => this.setState({ showMode: 1 })} className="m-2 btn btn-primary" >Grid</button>
                    <button onClick={() => this.setState({ showMode: 2 })} className="m-2 btn btn-info" >Cards</button>
                </div> */}
          <div className="clearfix"></div>
          {Loading}
          {myResource === undefined ? (
            <div className="centered">
              <div className="spinner-grow text-danger" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div>
              {this.state.showMode === 1 ? (
                <table
                  className={
                    "tblRecords table table-hover table-striped table-bordered " +
                    tableClass
                  }
                  {...disabled}
                >
                  <thead>
                    <tr>
                      {this.state.columns.map(
                        (item: gridColumns, index: any) => {
                          let tComponent = "text";
                          if (item.type !== undefined) {
                            if (item.type === typeColumn.number) {
                              tComponent = "number";
                            }
                            if (item.type === typeColumn.check) {
                              tComponent = "checkbox";
                            }
                          }
                          let RCol = (
                            this.props.title +
                            "." +
                            item.key
                          ).toUpperCase();
                          if (childResource === undefined) {
                            return null;
                          }
                          let ResourceCol = childResource.find((c: any) =>
                            c.resourceCode
                              .toString()
                              .toUpperCase()
                              .includes(RCol)
                          );
                          let srtName = "";
                          let srtType = "";

                          if (this.props.sort) {
                            if (this.props.sort.indexOf(":") !== -1) {
                              srtName = this.props.sort
                                .split(":")[0]
                                .toUpperCase();
                              srtType = this.props.sort
                                .split(":")[1]
                                .toUpperCase();
                            }
                          }
                          let curentFilter = "";
                          let curentFilterValue;
                          let curentFilterValueString;

                          if (this.props.filter) {
                            if (this.props.filter.indexOf(":") !== -1) {
                              curentFilter = this.props.filter.split(":")[0];
                              curentFilterValueString = this.props.filter.split(
                                ":"
                              )[1];
                              if (
                                curentFilterValueString.toUpperCase() === "TRUE"
                              ) {
                                curentFilterValue = true;
                              }
                              if (
                                curentFilterValueString.toUpperCase() ===
                                "FALSE"
                              ) {
                                curentFilterValue = false;
                              }
                            }
                          }
                          if (ResourceCol) {
                            return (
                              <th key={item.key} scope="col">
                                <div
                                  className="filter-item-container"
                                  data-index={index}
                                  onMouseMove={this.MousMoveHandler}
                                  onMouseDown={this.MousDownHandler}
                                  onMouseUp={this.MousUpHandler}
                                >
                                  <div>
                                    <div className="caption-item">
                                      <a
                                        title={ResourceCol.resourceLanguageName}
                                        href='#'
                                      >
                                        {ResourceCol.resourceLanguageName}
                                      </a>
                                      {srtName === undefined ||
                                      srtName === null ||
                                      srtName === "" ? (
                                        <span
                                          className="sort-AZ"
                                          data-key={item.key}
                                          onClick={this.handleSort}
                                        ></span>
                                      ) : srtName === item.key.toUpperCase() &&
                                        srtType.includes("DESC") ? (
                                        <span
                                          className="sort-ZA sort-Active"
                                          data-key={item.key}
                                          onClick={this.handleSort}
                                        ></span>
                                      ) : srtName === item.key.toUpperCase() &&
                                        srtType.includes("ASC") ? (
                                        <span
                                          className="sort-AZ sort-Active"
                                          data-key={item.key}
                                          onClick={this.handleSort}
                                        ></span>
                                      ) : (
                                        <span
                                          className="sort-AZ"
                                          data-key={item.key}
                                          onClick={this.handleSort}
                                        ></span>
                                      )}

                                      {!this.state.showFilterCols ? (
                                        <span
                                          title="نمایش/عدم نمایش فیلترها"
                                          onClick={() =>
                                            this.setState({
                                              showFilterCols: !this.state
                                                .showFilterCols,
                                            })
                                          }
                                          className="btn-filter btn fa fa-filter"
                                        ></span>
                                      ) : null}
                                    </div>
                                    {this.state.showFilterCols ? (
                                      <div className="caption-item ">
                                        {tComponent === "checkbox" &&
                                        item.type === 0 ? (
                                          <input
                                            data-itemType={item.type}
                                            data-itemkey={item.key}
                                            checked={
                                              this.state.currentfilter
                                                ? this.state.currentfilter.get(
                                                    item.key
                                                  )
                                                : false
                                            }
                                            onClick={(e: any) =>
                                              this.handleChangeFilterCheckBox(
                                                item.key,
                                                e
                                              )
                                            }
                                            type={tComponent}
                                          />
                                        ) : item.type !== 1 ? (
                                          <input
                                            className="form-control filter-condition-textbox ml-1"
                                            data-itemType={item.type}
                                            data-itemkey={item.key}
                                            onKeyDown={this.handleKeyDownFilter}
                                            onChange={(e) =>
                                              this.handleChangeFilter(
                                                item.key,
                                                e
                                              )
                                            }
                                            value={
                                              this.state.currentfilter
                                                ? this.state.currentfilter.get(
                                                    item.key
                                                  )
                                                : ""
                                            }
                                            type={tComponent}
                                          />
                                        ) : null}

                                        <span
                                          id={Math.floor(
                                            Math.random() * 1000
                                          ).toString()}
                                        >
                                          {item && item.type !== 1 ? (
                                            <span>
                                              <span
                                                onClick={(e) => {
                                                  this.showFilterConditions(
                                                    e,
                                                    item.key,
                                                    item.type
                                                  );
                                                }}
                                                className="btn-filter btn fa fa-filter"
                                              ></span>
                                              {FilterConditions(item.type,item.key)}
                                            </span>
                                          ) : (
                                            <span></span>
                                          )}
                                        </span>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </th>
                            );
                          }
                        }
                      )}
                    </tr>
                    {/* <tr id='filtertoolbar'>

                                    {this.state.columns.map((item) => {
                                        return (
                                            <td key={item.key} >
                                                <div className="filter-item-container">
                                                    <div>
                                                        <input className='form-control filter-condition-textbox ml-1' onChange={(e) => this.handleChangeFilter(item.key, e)} type='text' />
                                                    </div>
                                                    <div>
                                                        <button className="ml-1 mr-1" onClick={(e) => this.showFilterConditions(e, item.key)} className="btn-filter btn btn-primary fa fa-filter" />
                                                    </div>
                                                </div>


                                            </td>
                                        )
                                    })
                                    }
                                </tr> */}
                  </thead>
                  <tbody>
                    {this.state.data !== undefined &&
                    this.state.data !== null ? (
                      <ItemList />
                    ) : null}
                  </tbody>
                </table>
              ) : null}
              {this.state.showMode === 2 ? (
                <ul className="caselist">
                  <ItemList />
                  <div className="clearfix"></div>
                </ul>
              ) : null}
              <div className="grid-toolbar">
                {!this.props.internalLoading ? (
                  <div className="pagination-container">
                    <Pagination
                      activePage={this.state.pageN}
                      itemsCountPerPage={this.state.pageS}
                      totalItemsCount={this.state.totalCount}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                  </div>
                ) : null}
                <div className="pagesize-container ml-3">
                  <div className="form-group ">
                    <div className="">
                      <Select
                        className="page-size"
                        required
                        onChange={this.changePageSize}
                        value={pageSizes.filter(
                          (option) => option.value === this.state.pageS
                        )}
                        placeholder="Page Size"
                        options={pageSizes}
                      />
                    </div>
                  </div>
                </div>
                <div className="pagesize-container ml-3">
                  <div className="form-group ">
                    <div className="rtl mt-1">
                      <span>تعداد رکورد:</span>
                      <span className="mr-1">{this.props.count} </span>
                    </div>
                  </div>
                </div>
                {this.props.isSelected !== true ? (
                  <div>
                    <div className="pagesize-container ml-3">
                      <span
                        onClick={() => this.handlerRefresh()}
                        className="btn btn-info fa fa-refresh mr-1"
                      ></span>
                    </div>
                    <div className="pagesize-container ml-3">
                      {accessButtonDeleteResource === true ? (
                        <span
                          onClick={() => this.AlertDeleteRecord()}
                          className="btn btn-danger fa fa-trash"
                          {...disabledButtonDeleteResource}
                        ></span>
                      ) : null}
                    </div>
                    <div className="pagesize-container ml-3">
                      {accessButtonEditResource === true ? (
                        <span
                          onClick={() => this.editRecord(undefined)}
                          className="btn btn-warning fa fa-edit mr-1"
                          {...disabledButtonEditResource}
                        ></span>
                      ) : null}
                    </div>

                    <div className="pagesize-container ml-3">
                      <div className="form-group ">
                        {accessButtonCreateResource === true ? (
                          <button
                            onClick={this.props.newRecord}
                            className="btn btn-success fa fa-plus"
                            {...disabledButtonCreateResource}
                          ></button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="clearfix"></div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    );
    //alireza 22
  }
}
export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(ReactGrid as any);
