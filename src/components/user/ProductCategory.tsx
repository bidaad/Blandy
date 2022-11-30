import React, { Component, useState } from "react";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { responseModel } from "../../model/general/responseModel";
import { APIUrl, GetIP4 } from "../../helper/config";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { VwUserCategory } from "../../model/viewModel/VwUserCategory";
import { NavItem } from "react-bootstrap";
import $ from "jquery";
import { VwSeacrh } from "../../model/viewModel/VwSeacrh";
export interface BestSellProps {
  controller: string;
  action: string;
}

type MobileMenuItemProps = { nodes: VwUserCategory[]; item: VwUserCategory ;Search:any;UserLoad:any;userId:any;SaveSearch:any;};

const MobileMenuItem = (props: MobileMenuItemProps) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [selectedCalss, setSelectedCalss] = useState('')

  const clickHandler = () => {
    setShowSubMenu(!showSubMenu)
    if(selectedCalss === '')
      setSelectedCalss('')
    else
      setSelectedCalss('')

  }
 const clickMenu = (e: any) => {
    e.stopPropagation();
    let code = e.currentTarget.dataset.code;
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    let dt: VwSeacrh = {
      id: id,
      code: code,
      mid: "",
      mName: "",
      name: name,
      type: "CATEGORY",
    };
    GetIP4()
      .then((ip: any) => {
        let data = {
          categoryId: id,
          searchText: name,
          userId: props.userId,
          createUserID: props.userId,
          clicked: true,
          isActive: true,
          IP: ip,
        };

        props.SaveSearch(data);
      })
      .catch((res) => {});

    props.Search(dt);
    props.UserLoad(true);
  };
  
  return (
    <NavItem key={props.item.id} as="li" data-code={props.item.code} >
      <NavLink
        className={"nav-link mobile-menu-item outer " }
        to={"/Asset/Category/" + props.item.sign.replace(/\s+/g, "-")}
        tag={Link}
        data-code={props.item.code}
        data-id={props.item.id}
        data-name={props.item.sign}
        onClick={(e)=>clickMenu(e)}
      >
        <span className={selectedCalss}>{props.item.sign}</span>
        <ul
          className="menu-item-cat mobile-submenu"
          id={"mnu" + props.item.code}
        >
          
        </ul>
      </NavLink>
      <SubMenu
            {...{ nodes: props.nodes, pid: props.item.id, show: showSubMenu,Search:props.Search,UserLoad:props.UserLoad,userId:props.userId,SaveSearch:props.SaveSearch }}
          />
      {props.nodes.filter( (c:VwUserCategory) => c.parentId === props.item.id).length > 0?
      <span className={!showSubMenu ? "fa mobile-menu-arrow fa-chevron-down" : "fa mobile-menu-arrow fa-chevron-up"} onClick={() => clickHandler()} ></span>
      :null}
    </NavItem>
  );
};

type SubMenuProps = { nodes: VwUserCategory[]; pid: any; show: boolean;Search:any;UserLoad:any;userId:any;SaveSearch:any;};
const SubMenu = (props: SubMenuProps) => {
  if (!props.show) return null;
  else
    return (
      <ul className="mobile-submenu-cont">
        {props.nodes
          .filter((c: VwUserCategory) => c.parentId === props.pid)
          .map((item2: VwUserCategory) => {
            return <MobileMenuItem {...{ nodes: props.nodes, item: item2 ,Search:props.Search,UserLoad:props.UserLoad,userId:props.userId,SaveSearch:props.SaveSearch}} />;
          })}
      </ul>
    );
};
SubMenu.defaultProps = {
  show: false,
};

type InputProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators &
  RouteComponentProps<{}> &
  BestSellProps;
class Product_Category extends Component<
  InputProps,
  { values: any; submenu: any; menunumber: number; localMenu: boolean }
> {
  private refmenu: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.state = { values: [], submenu: [], menunumber: 0, localMenu: false };
    this.refmenu = React.createRef();
  }
  componentDidMount() {
    if (this.props.controller && this.props.action) {
      fetch(APIUrl + "/" + this.props.controller + "/" + this.props.action, {
        method: "GET",
      })
        .then((response) => response.json() as responseModel | any)
        .then((mr) => {
          if ((mr as responseModel).messageCode === 0) {
            var data = (mr as responseModel).data;
            this.setState({ values: data, localMenu: true });
          }
        });
    }
  }
  mouseHoveHandler = (e: any) => {
    if (
      $("#mnu" + e.currentTarget.dataset.code + " li")
        .children("a")
        .first()
        .hasClass("Product_Header_Sign_Up")
    ) {
      $("#mnu" + e.currentTarget.dataset.code + " li")
        .children("a")
        .first()
        .removeClass("Product_Header_Sign_Up");
      $("#mnu" + e.currentTarget.dataset.code + " li")
        .children("a")
        .first()
        .addClass("Product_Header_Sign");
    }
    $("#mnu" + e.currentTarget.dataset.code).show();
  };
  mouseEnterHandler = (e: any) => {
    if (
      $("#mnu" + e.currentTarget.dataset.code)
        .closest("a")
        .first()
        .hasClass("Product_Header_Sign_Up")
    ) {
      $("#mnu" + e.currentTarget.dataset.code)
        .closest("a")
        .removeClass("Product_Header_Sign_Up");
      $("#mnu" + e.currentTarget.dataset.code)
        .closest("a")
        .addClass("Product_Header_Sign");
      return;
    }
  };
  mouseOutHandler = (e: any) => {
    $("#mnu" + e.currentTarget.dataset.code).hide();
    // $("#mnu" + e.currentTarget.dataset.code).closest("a").closest("a").removeClass("Product_Header_Sign_Up");
    // $("#mnu" + e.currentTarget.dataset.code).closest("a").closest("a").addClass("Product_Header_Sign");
  };
  SaveSearch = (data: any) => {
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
        this.props.UserLoad(false);
      });
  };
  clickHandler1 = (e: any) => {
    e.stopPropagation();
    let code = e.currentTarget.dataset.code;
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    let dt: VwSeacrh = {
      id: id,
      code: code,
      mid: "",
      mName: "",
      name: name,
      type: "CATEGORY",
    };
    GetIP4()
      .then((ip: any) => {
        let data = {
          categoryId: id,
          searchText: name,
          userId: this.props.userId,
          createUserID: this.props.userId,
          clicked: true,
          isActive: true,
          IP: ip,
        };

        this.SaveSearch(data);
      })
      .catch((res) => {});

    this.props.Search(dt);
    this.props.UserLoad(true);
  };
  clickHandler2 = (e: any) => {
    e.stopPropagation();
    let code = e.currentTarget.dataset.code;
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    let dt: VwSeacrh = {
      id: id,
      code: code,
      mid: "",
      mName: "",
      name: name,
      type: "CATEGORY",
    };
    GetIP4()
      .then((ip: any) => {
        let data = {
          categoryId: id,
          searchText: name,
          userId: this.props.userId,
          createUserID: this.props.userId,
          clicked: true,
          isActive: true,
          IP: ip,
        };
        this.SaveSearch(data);
      })
      .catch((res) => {});

    this.props.Search(dt);
    this.props.UserLoad(true);
  };
  clickHandler3 = (e: any) => {
    e.stopPropagation();
    let code = e.currentTarget.dataset.code;
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    let dt: VwSeacrh = {
      id: id,
      code: code,
      mid: "",
      mName: "",
      name: name,
      type: "CATEGORY",
    };
 
    GetIP4()
      .then((ip: any) => {
        let data = {
          categoryId: id,
          searchText: name,
          userId: this.props.userId,
          createUserID: this.props.userId,
          clicked: true,
          isActive: true,
          IP: ip,
        };
        this.SaveSearch(data);
      })
      .catch((res) => {});
    this.props.Search(dt);
    this.props.UserLoad(true);
  };

  public render() {
    const submenu1 = (pid: any, code: any) =>
      this.state.values
        .filter((c: VwUserCategory) => c.parentId === pid)
        .map((item2: VwUserCategory) => {
          return (
            <NavItem
              key={item2.id}
              as="li"
              onMouseOut={this.mouseOutHandler}
              onMouseOver={this.mouseHoveHandler}
              data-code={item2.code}
            >
              <NavLink
                data-child={item2.child}
                key={item2.id}
                to={"/Asset/Category/" + item2.sign.replace(/\s+/g, "-")}
                tag={Link}
                onClick={this.clickHandler1}
                data-code={item2.code}
                data-id={item2.id}
                data-name={item2.sign}
              >
                <span
                  className={item2.child > 0 ? "Product_Header_Sign_Left" : ""}
                >
                  {item2.sign}{" "}
                </span>
                
              </NavLink>
              {item2.child > 0 ? (
                  <ul className="submenu" id={"mnu" + item2.code}>
                    {submenu2(item2.id, item2.code)}
                  </ul>
                ) : null}
            </NavItem>
          );
        });

    const submenu2 = (pid2: any, code2: any) =>
      this.state.values
        .filter((c: VwUserCategory) => c.parentId === pid2)
        .map((item2: VwUserCategory) => {
          return (
            <NavItem
              key={item2.id}
              as="li"
              onMouseOver={this.mouseHoveHandler}
              data-code={item2.code}
            >
              <NavLink
                key={Math.random()}
                tag={Link}
                to={"/Asset/Category/" + item2.sign.replace(/\s+/g, "-")}
                onClick={this.clickHandler2}
                data-code={item2.code}
                data-id={item2.id}
                data-name={item2.sign}
              >
                {item2.sign}
              </NavLink>
            </NavItem>
          );
        });

    const ItemList = () =>
      this.state.values
        .filter(
          (c: VwUserCategory) => c.parentId === null && c.showInList === true
        )
        .map((item: VwUserCategory) => {
          return (
            <NavItem
              key={item.id}
              as="li"
              onMouseOut={this.mouseOutHandler}
              onMouseEnter={this.mouseEnterHandler}
              onMouseOver={this.mouseHoveHandler}
              data-code={item.code}
            >
              <NavLink
                key={Math.random()}
                tag={Link}
                className="Product_Header_Sign outer"
                to={"/Asset/Category/" + item.sign.replace(/\s+/g, "-")}
                onClick={this.clickHandler3}
                data-code={item.code}
                data-id={item.id}
                data-name={item.sign}
              >
                {item.sign}
                <ul className="menu-item-cat submenu" id={"mnu" + item.code}>
                  {submenu1(item.id, item.code)}
                </ul>
              </NavLink>
            </NavItem>
          );
        });

    const MobileItemList = () =>
      this.state.values
        .filter(
          (c: VwUserCategory) => c.parentId === null && c.showInList === true
        )
        .map((item: VwUserCategory) => {
          return (
            <MobileMenuItem key={item.id} {...{ nodes: this.state.values, item: item ,Search:this.props.Search,UserLoad:this.props.UserLoad,userId:this.props.userId,SaveSearch:this.SaveSearch}} />
          );
        });

    return (
      <div className="cat-row">
        <div className="container d-none d-sm-block">
          <div className="Product_Header">
            <ItemList />
            {
              this.state.localMenu ? (
                <div>
                  
                  <a href={"http://blog.autochar.net"} target="_blank" rel="noopener noreferrer" >
                    وبلاگ
                  </a>
                  <NavLink to={"/contactus"} tag={Link}>
                    تماس با ما
                  </NavLink>
                </div>
              ) : null
              // : <div className="spinner-border spinner-border-xl" role="status" aria-hidden="true"></div>
            }
          </div>
        </div>
        <div className="d-block d-sm-none">
          {this.props.showHumburgerMenu?
          <ul className="mobile-menu">
            <MobileItemList  />
            
            <li>
              <a
                className="nav-link"
                href={"http://blog.autochar.net"}
                target="_blank"
                rel="noopener noreferrer"
              >
                وبلاگ
              </a>
            </li>
            <li>
              <NavLink to={"/contactus"} tag={Link}>
                تماس با ما
              </NavLink>
            </li>
          </ul>
          :null}
        </div>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(Product_Category as any);
