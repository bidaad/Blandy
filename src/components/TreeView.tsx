import React from "react";
import { Col, InputGroup, Row, Container, Form, Button } from "react-bootstrap";
import $ from 'jquery';
import * as UserInfoStore from '../store/UserInfo';
import { ApplicationState } from "../store";
import { connect } from "react-redux";
import * as UserInfo from '../store/UserInfo';
import { responseModel } from "../model/general/responseModel";
import { VwGetTreeResource } from "../model/viewModel/VwGetTreeResource";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RouteComponentProps } from "react-router";
import { faSearch, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { VwPermisionResource } from "../model/viewModel/VwPermisionResource";
type UserProps =
    UserInfoStore.UserInfoState &
    RouteComponentProps<{}> &
    typeof UserInfoStore.actionCreators & { controller: string, action: string, columns: [], FillList: any, Edit: any, New: any, Delete: any, Title: any };


class TreeView extends React.PureComponent<UserProps, { value: any, valueItem: any, search: string, load: boolean }> {
    private Item: any;
    constructor(props: any) {
        super(props);
        this.state = { value: [], valueItem: [], search: '', load: true };
    };
    liclick = (e: any) => {
    // if (e.currentTarget.closest("li").dataset.child === "0") {
    //     return;
    // }
        this.setState({ load: true })
        e.preventDefault();
        $("#SearchTreeView").val('');
        let event = e.currentTarget;
        // if (e.currentTarget.closest("li").dataset.child === "1") {
        if ($(e.currentTarget).closest('li').children('li').length > 0) {
            $(e.currentTarget.closest("li")).children("li").toggle(700);
            if ($(e.currentTarget).hasClass("texpand")) {
                $(e.currentTarget).removeClass("texpand")
                $(e.currentTarget).addClass("tcollapse")
                this.setState({ load: false });
                return;
            }
            if ($(e.currentTarget).hasClass("tcollapse")) {
                $(e.currentTarget).removeClass("tcollapse")
                $(e.currentTarget).addClass("texpand")
            }
            this.setState({ load: false })
        }
        else {
            var pid = $(e.currentTarget.closest('li')).attr('id');
            fetch(this.props.apiUrl + '/' + this.props.controller + '/' + this.props.action + '?ParentId=' + pid + '&Search=', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.props.token,
                    // 'Content-Type': 'application/json;charset=UTF-8',
                }
            })
                .then(response => response.json() as responseModel | any)
                .then(mr => {
                    if ((mr as responseModel).messageCode === 0) {
                        
                        var data = (mr as responseModel).data as VwGetTreeResource[];
                        var rs = this.state.value.concat(data);
                        //var index = rs.findIndex((c: VwGetTreeResource) => c.id === pid);
                        this.props.FillList(rs);
                        // var lst = this.state.value.slice();
                        // lst.push()
                        // let ed: VwGetTreeResource = lst[lst.findIndex((el: VwGetTreeResource) => el.id === pid)];
                        // lst.filter((c:any) => c.parentId === ed.id).forEach(function (part: VwGetTreeResource, index:any) {
                        //     part.show = 1;
                        // });
          


                        if ($('#' + pid + ' b').first().hasClass("texpand")) {
                            $('#' + pid + ' b').first().removeClass("texpand")
                            $('#' + pid + ' b').first().addClass("tcollapse")
                            var index2 = rs.findIndex((c: VwGetTreeResource) => c.id === pid);
                            rs[index2].level = 4000;
                            rs[index2].child = 0;
                            this.setState({ value: rs });

                            setTimeout(function () {
                                $(event.closest("li")).children("li").fadeIn(700);
                            }, 2000)
                            this.setState({ load: false })
                            return;
                        }
                        if ($('#' + pid + ' b').first().hasClass("tcollapse")) {
                            $('#' + pid + ' b').first().removeClass("tcollapse")
                            $('#' + pid + ' b').first().addClass("texpand")
                            var index3 = rs.findIndex((c: VwGetTreeResource) => c.id === pid);
                            rs[index3].level = 5000;
                            rs[index3].child = 1;
                            this.setState({ value: rs });
                        }
                        $(".texpand").closest('li').children('li').hide();
                        this.setState({ load: false })

                    }

                });
        }

        // }
    }
    refreshClick = (e: any) => {
        e.preventDefault();
        $("#SearchTreeView").val('');
        if (this.props.apiUrl && this.props.token && this.props.controller && this.props.action) {

            fetch(this.props.apiUrl + '/' + this.props.controller + '/' + this.props.action + '?ParentId=&Search=', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.props.token,
                    // 'Content-Type': 'application/json;charset=UTF-8',
                }
            })
                .then(response => response.json() as responseModel | any)
                .then(mr => {
                    if ((mr as responseModel).messageCode === 0) {

                        var data = (mr as responseModel).data as VwGetTreeResource[];
                        this.setState({ value: data, load: false });
                        this.props.FillList(data);
                    }
                });
        }
    }
    editClick = (e: any) => {
        this.props.Edit(e.currentTarget.dataset.id);

    }
    newClick = (e: any) => {
        this.props.New();

    }
    deleteClick = (e: any) => {
        this.props.Delete(e.currentTarget.dataset.id);

    }
    searchClick = (e: any) => {
        e.preventDefault();
        this.setState({ load: true });
        var sr = $("#SearchTreeView").val();
        if (sr) {
            if (this.props.apiUrl && this.props.token && this.props.controller && this.props.action) {

                fetch(this.props.apiUrl + '/' + this.props.controller + '/' + this.props.action + '?ParentId=&Search=' + sr, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + this.props.token,
                        // 'Content-Type': 'application/json;charset=UTF-8',
                    }
                })
                    .then(response => response.json() as responseModel | any)
                    .then(mr => {
                        if ((mr as responseModel).messageCode === 0) {

                            var data = (mr as responseModel).data as VwGetTreeResource[];
                            this.props.FillList(data);
                            this.setState({ value: data });


                            this.setState({ load: false });
                            setTimeout(function () {
                                $(".tView ul li").show()
                            }, 700);


                            $('.tView ul li').each(function () {
                                if ($(this).children('li').length > 0) {
                                    $(this).find('b').first().removeClass("texpand")
                                    $(this).find('b').first().addClass("tcollapse")
                                }
                            });

                        }
                    });
            }
        }

    }

    componentDidMount = () => {
        if (this.props.apiUrl && this.props.token && this.props.controller && this.props.action) {

            fetch(this.props.apiUrl + '/' + this.props.controller + '/' + this.props.action + '?ParentId=&Search=', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.props.token,
                    // 'Content-Type': 'application/json;charset=UTF-8',
                }
            })
                .then(response => response.json() as responseModel | any)
                .then(mr => {
                    if ((mr as responseModel).messageCode === 0) {

                        var data = (mr as responseModel).data as VwGetTreeResource[];
                        this.setState({ value: data, load: false });
                        this.props.FillList(data);
                    }
                });
        }
    }
    
    public render() {
        var myResource: VwPermisionResource | undefined;
        var childResource: VwPermisionResource[] | undefined;
        var ButtonCreateResource: VwPermisionResource | undefined;
        var ButtonEditResource: VwPermisionResource | undefined;
        var ButtonDeleteResource: VwPermisionResource | undefined;
        var disabledButtonCreateResource = "";
        var disabledButtonEditResource = false;
        var disabledButtonDeleteResource = false;
        var accessButtonDeleteResource = false;
        var accessButtonCreateResource = false;
        var accessButtonEditResource = false;
        var disabled = "";

        if (this.props.resources !== undefined) {
            let Resources = this.props.resources as VwPermisionResource[];
            if (Resources) {

                myResource = Resources.find(c => c.resourceCode === this.props.Title.toString().toUpperCase() && c.lang === this.props.lang.abr.toUpperCase());
                ButtonCreateResource = Resources.find(c => c.resourceCode === this.props.Title.toString().toUpperCase() + '.' + 'BTN_CREATE' && c.lang === this.props.lang.abr.toUpperCase());
                ButtonEditResource = Resources.find(c => c.resourceCode === this.props.Title.toString().toUpperCase() + '.' + 'BTN_EDIT' && c.lang === this.props.lang.abr.toUpperCase());
                ButtonDeleteResource = Resources.find(c => c.resourceCode === this.props.Title.toString().toUpperCase() + '.' + 'BTN_DELETE' && c.lang === this.props.lang.abr.toUpperCase());

                childResource = Resources.filter((c: any) => c.resourceCode.includes(this.props.Title.toUpperCase()) && c.lang === this.props.lang.abr.toUpperCase());
            }
        }
        if (myResource === undefined) {

        }
        else {
            if (myResource) {
                if (myResource.actionTypes) {
                    if (!myResource.actionTypes.toUpperCase().includes("V"))
                        return null;
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
                        disabledButtonEditResource = true;
                    if (ButtonEditResource.actionTypes.toUpperCase().includes("V"))
                        accessButtonEditResource = true;
                }
            }
            if (ButtonDeleteResource) {
                if (ButtonDeleteResource.actionTypes) {
                    if (!ButtonDeleteResource.actionTypes.toUpperCase().includes("E"))
                        disabledButtonDeleteResource = true;
                    if (ButtonDeleteResource.actionTypes.toUpperCase().includes("V"))
                        accessButtonDeleteResource = true;
                }
            }
        }
        const ItemList = () =>
            (
                this.state.value.filter((d: any) => d.parentId === null).sort((c: any) => c.child).reverse().map((item: any) => {
                    return (

                        <li key={item.id} id={item.id} data-child={item.child}  ><b className={(item.child === 0) ? "tcollapse" : (item.child === 1) ? "texpand" : (item.level === 4000) ? "tcollapse" : (item.level === 5000) ? "texpand" : ""} onClick={this.liclick}> </b>
                            {
                                this.props.columns.map((name: string) => {
                                    return (<span key={"1"}>{item[name]}</span>);
                                })
                            }
                            {accessButtonEditResource === true ? <button type="button" key={item.id+"1"} className="btn btn-success fa fa-edit" disabled={disabledButtonEditResource} data-id={item.id} onClick={this.editClick}></button> : null}
                            {accessButtonDeleteResource === true ? <button type="button" key={item.id+"1"} className="btn btn-danger fa fa-trash" disabled={disabledButtonDeleteResource} onClick={this.deleteClick} data-id={item.id} ></button> : null}
                            {
                                this.state.value.filter((d: any) => d.parentId === item.id).sort((c: any) => c.child).reverse().map((item: any) => {
                                    return (
                                        <li key={item.id} id={item.id} data-child={item.child}><b className={(item.child === 0) ? "tcollapse" : (item.child === 1) ? "texpand" : (item.level === 4000) ? "tcollapse" : (item.level === 5000) ? "texpand" : ""} onClick={this.liclick} > </b>
                                            {
                                                this.props.columns.map((name: string) => {
                                                    return (<span key={item.id+"1"}>{item[name]}</span>);
                                                })
                                            }
                                            {accessButtonEditResource === true ? <button key={item.id+"1"} type="button" className="btn btn-success fa fa-edit" disabled={disabledButtonEditResource} data-id={item.id} onClick={this.editClick}></button> : null}
                                            {accessButtonDeleteResource === true ? <button key={item.id+"1"} type="button" className="btn btn-danger fa fa-trash" disabled={disabledButtonDeleteResource} onClick={this.deleteClick} data-id={item.id} ></button> : null}
                                            {
                                                this.state.value.filter((d: any) => d.parentId === item.id).sort((c: any) => c.child).reverse().map((item: any) => {
                                                    return (
                                                        <li key={item.id} id={item.id} data-child={item.child}  ><b className={(item.child === 0) ? "tcollapse" : (item.child === 1) ? "texpand" : (item.level === 4000) ? "tcollapse" : (item.level === 5000) ? "texpand" : ""} onClick={this.liclick} > </b>
                                                            {
                                                                this.props.columns.map((name: string) => {
                                                                    return (<span key={item.id+"1"}>{item[name]}</span>);
                                                                })
                                                            }
                                                            {accessButtonEditResource === true ? <button key={item.id+"1"} type="button" className="btn btn-success fa fa-edit" disabled={disabledButtonEditResource} data-id={item.id} onClick={this.editClick}></button> : null}
                                                            {accessButtonDeleteResource === true ? <button key={item.id+"1"} type="button" className="btn btn-danger fa fa-trash" disabled={disabledButtonDeleteResource} onClick={this.deleteClick} data-id={item.id} ></button> : null}
                                                            {
                                                                this.state.value.filter((d: any) => d.parentId === item.id).sort((c: any) => c.child).reverse().map((item: any) => {
                                                                    return (
                                                                        <li key={item.id} id={item.id} data-child={item.child}  ><b className={(item.child === 0) ? "tcollapse" : (item.child === 1) ? "texpand" : (item.level === 4000) ? "tcollapse" : (item.level === 5000) ? "texpand" : ""} onClick={this.liclick}> </b>
                                                                            {
                                                                                this.props.columns.map((name: string) => {
                                                                                    return (<span key={item.id+"1"}>{item[name]}</span>);
                                                                                })
                                                                            }
                                                                            {accessButtonEditResource === true ? <button type="button" key={"2"} className="btn btn-success fa fa-edit" disabled={disabledButtonEditResource} data-id={item.id} onClick={this.editClick}></button> : null}
                                                                            {accessButtonDeleteResource === true ? <button type="button" key={"3"} className="btn btn-danger fa fa-trash" disabled={disabledButtonDeleteResource} onClick={this.deleteClick} data-id={item.id} ></button> : null}
                                                                            {
                                                                                this.state.value.filter((d: any) => d.parentId === item.id).sort((c: any) => c.child).reverse().map((item: any) => {
                                                                                    return (
                                                                                        <li key={item.id} id={item.id} data-child={item.child} ><b className={(item.child === 0 && item.show === 1) ? "tcollapse" : (item.child === 1) ? "texpand" : (item.level === 4000) ? "tcollapse" : (item.level === 5000) ? "texpand" : ""} onClick={this.liclick} > </b>
                                                                                            {
                                                                                                this.props.columns.map((name: string) => {
                                                                                                    return (<span key={"4"}>{item[name]}</span>);
                                                                                                })
                                                                                            }
                                                                                            {accessButtonEditResource === true ? <button key={"5"} type="button" className="btn btn-success fa fa-edit" disabled={disabledButtonEditResource} data-id={item.id} onClick={this.editClick}></button> : null}
                                                                                            {accessButtonDeleteResource === true ? <button key={"6"} type="button" className="btn btn-danger fa fa-trash" disabled={disabledButtonDeleteResource} onClick={this.deleteClick} data-id={item.id} ></button> : null}
                                                                                            {
                                                                                                this.state.value.filter((d: any) => d.parentId === item.id).sort((c: any) => c.child).reverse().map((item: any) => {
                                                                                                    return (
                                                                                                        <li key={item.id} id={item.id} data-child={item.child}  ><b className={(item.child === 0 && item.show === 1) ? "tcollapse" : (item.child === 1) ? "texpand" : (item.level === 4000) ? "tcollapse" : (item.level === 5000) ? "texpand" : ""} onClick={this.liclick}> </b>
                                                                                                            {
                                                                                                                this.props.columns.map((name: string) => {
                                                                                                                    return (<span key={"7"} >{item[name]}</span>);
                                                                                                                })
                                                                                                            }
                                                                                                            {accessButtonEditResource === true ? <button key={"8"} type="button" className="btn btn-success fa fa-edit" disabled={disabledButtonEditResource} data-id={item.id} onClick={this.editClick}></button> : null}
                                                                                                            {accessButtonDeleteResource === true ? <button key={"9"} type="button" className="btn btn-danger fa fa-trash" disabled={disabledButtonDeleteResource} onClick={this.deleteClick} data-id={item.id} ></button> : null}
                                                                                                            {
                                                                                                                this.state.value.filter((d: any) => d.parentId === item.id).sort((c: any) => c.child).reverse().map((item: any) => {
                                                                                                                    return (
                                                                                                                        <li key={item.id} id={item.id} data-child={item.child} ><b className={(item.child === 0 && item.show === 1) ? "tcollapse" : (item.child === 1) ? "texpand" : (item.level === 4000) ? "tcollapse" : (item.level === 5000) ? "texpand" : ""} onClick={this.liclick} > </b>
                                                                                                                            {
                                                                                                                                this.props.columns.map((name: string) => {
                                                                                                                                    return (<span key={"10"}>{item[name]}</span>);
                                                                                                                                })
                                                                                                                            }
                                                                                                                            {accessButtonEditResource === true ? <button key={"11"} type="button" className="btn btn-success fa fa-edit" disabled={disabledButtonEditResource} data-id={item.id} onClick={this.editClick}></button> : null}
                                                                                                                            {accessButtonDeleteResource === true ? <button key={"12"} type="button" className="btn btn-danger fa fa-trash" disabled={disabledButtonDeleteResource} onClick={this.deleteClick} data-id={item.id} ></button> : null}
                                                                                                                            {
                                                                                                                                this.state.value.filter((d: any) => d.parentId === item.id).sort((c: any) => c.child).reverse().map((item: any) => {
                                                                                                                                    return (
                                                                                                                                        <li key={item.id} id={item.id} data-child={item.child}  ><b className={(item.child === 0 && item.show === 1) ? "tcollapse" : (item.child === 1) ? "texpand" : (item.level === 4000) ? "tcollapse" : (item.level === 5000) ? "texpand" : ""} onClick={this.liclick}> </b>
                                                                                                                                            {
                                                                                                                                                this.props.columns.map((name: string) => {
                                                                                                                                                    return (<span key={"13"}>{item[name]}</span>);
                                                                                                                                                })
                                                                                                                                            }
                                                                                                                                            {accessButtonEditResource === true ? <button key={"14"} type="button" className="btn btn-success fa fa-edit" disabled={disabledButtonEditResource} data-id={item.id} onClick={this.editClick}></button> : null}
                                                                                                                                            {accessButtonDeleteResource === true ? <button key={"15"} type="button" className="btn btn-danger fa fa-trash" disabled={disabledButtonDeleteResource} data-id={item.id} onClick={this.deleteClick}></button> : null}
                                                                                                                                            {
                                                                                                                                                this.state.value.filter((d: any) => d.parentId === item.id).sort((c: any) => c.child).reverse().map((item: any) => {
                                                                                                                                                    return (
                                                                                                                                                        <li key={item.id} id={item.id} data-child={item.child}  ><b className={(item.child === 0 && item.show === 1) ? "tcollapse" : (item.child === 1) ? "texpand" : (item.level === 4000) ? "tcollapse" : (item.level === 5000) ? "texpand" : ""} onClick={this.liclick}> </b>
                                                                                                                                                            {
                                                                                                                                                                this.props.columns.map((name: string) => {
                                                                                                                                                                    return (<span key={"16"}>{item[name]}</span>);
                                                                                                                                                                })
                                                                                                                                                            }
                                                                                                                                                            {accessButtonEditResource === true ? <button key={"17"} type="button" className="btn btn-success fa fa-edit" disabled={disabledButtonEditResource} data-id={item.id} onClick={this.editClick}></button> : null}
                                                                                                                                                            {accessButtonDeleteResource === true ? <button key={"18"} type="button" className="btn btn-danger fa fa-trash" disabled={disabledButtonDeleteResource} data-id={item.id} onClick={this.deleteClick}></button> : null}
                                                                                                                                                            {
                                                                                                                                                                this.state.value.filter((d: any) => d.parentId === item.id).sort((c: any) => c.child).reverse().map((item: any) => {
                                                                                                                                                                    return (
                                                                                                                                                                        <li key={item.id} id={item.id} data-child={item.child}  ><b className={(item.child === 0 && item.show === 1) ? "tcollapse" : (item.child === 1) ? "texpand" : (item.level === 4000) ? "tcollapse" : (item.level === 5000) ? "texpand" : ""} onClick={this.liclick}> </b>
                                                                                                                                                                            {
                                                                                                                                                                                this.props.columns.map((name: string) => {
                                                                                                                                                                                    return (<span key={"19"}>{item[name]}</span>);
                                                                                                                                                                                })
                                                                                                                                                                            }
                                                                                                                                                                            {accessButtonEditResource === true ? <button key={"20"} type="button" className="btn btn-success fa fa-edit" disabled={disabledButtonEditResource} data-id={item.id} onClick={this.editClick}></button> : null}
                                                                                                                                                                            {accessButtonDeleteResource === true ? <button key={"21"} type="button" className="btn btn-danger fa fa-trash" disabled={disabledButtonDeleteResource} data-id={item.id} onClick={this.deleteClick}></button> : null}
                                                                                                                                                                            {
                                                                                                                                                                                this.state.value.filter((d: any) => d.parentId === item.id).sort((c: any) => c.child).reverse().map((item: any) => {
                                                                                                                                                                                    return (
                                                                                                                                                                                        <li key={item.id} id={item.id} data-child={item.child}  ><b className={(item.child === 0 && item.show === 1) ? "tcollapse" : (item.child === 1) ? "texpand" : (item.level === 4000) ? "tcollapse" : (item.level === 5000) ? "texpand" : ""} onClick={this.liclick}> </b>
                                                                                                                                                                                            {
                                                                                                                                                                                                this.props.columns.map((name: string) => {
                                                                                                                                                                                                    return (<span key={"22"}>{item[name]}</span>);
                                                                                                                                                                                                })
                                                                                                                                                                                            }
                                                                                                                                                                                            {accessButtonEditResource === true ? <button key={"23"} type="button" className="btn btn-success fa fa-edit" disabled={disabledButtonEditResource} data-id={item.id} onClick={this.editClick}></button> : null}
                                                                                                                                                                                            {accessButtonDeleteResource === true ? <button key={"24"} type="button" className="btn btn-danger fa fa-trash" disabled={disabledButtonDeleteResource} data-id={item.id} onClick={this.deleteClick}></button> : null}
                                                                                                                                                                                            {
                                                                                                                                                                                                this.state.value.filter((d: any) => d.parentId === item.id).sort((c: any) => c.child).reverse().map((item: any) => {
                                                                                                                                                                                                    return (
                                                                                                                                                                                                        <li key={item.id} id={item.id} data-child={item.child}  ><b className={(item.child === 0 && item.show === 1) ? "tcollapse" : (item.child === 1) ? "texpand" : (item.level === 4000) ? "tcollapse" : (item.level === 5000) ? "texpand" : ""} onClick={this.liclick}> </b>
                                                                                                                                                                                                            {
                                                                                                                                                                                                                this.props.columns.map((name: string) => {
                                                                                                                                                                                                                    return (<span key={"25"}>{item[name]}</span>);
                                                                                                                                                                                                                })
                                                                                                                                                                                                            }
                                                                                                                                                                                                            {accessButtonEditResource === true ? <button key={"26"} type="button" className="btn btn-success fa fa-edit" disabled={disabledButtonEditResource} data-id={item.id} onClick={this.editClick}></button> : null}
                                                                                                                                                                                                            {accessButtonDeleteResource === true ? <button key={"27"} type="button" className="btn btn-danger fa fa-trash" disabled={disabledButtonDeleteResource} data-id={item.id} onClick={this.deleteClick}></button> : null}
                                                                                                                                                                                                        </li>
                                                                                                                                                                                                    )
                                                                                                                                                                                                })
                                                                                                                                                                                            }
                                                                                                                                                                                        </li>
                                                                                                                                                                                    )
                                                                                                                                                                                })
                                                                                                                                                                            }
                                                                                                                                                                        </li>
                                                                                                                                                                    )
                                                                                                                                                                })
                                                                                                                                                            }
                                                                                                                                                        </li>
                                                                                                                                                    )
                                                                                                                                                })
                                                                                                                                            }
                                                                                                                                        </li>
                                                                                                                                    )
                                                                                                                                })
                                                                                                                            }
                                                                                                                        </li>
                                                                                                                    )
                                                                                                                })
                                                                                                            }
                                                                                                        </li>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </li>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </li>
                                                    )
                                                })
                                            }
                                        </li>
                                    )
                                })
                            }

                        </li>
                    )

                })
            );
        ;
        return (
            <React.Fragment>
                <Container fluid>
                    <Row>
                        <Col className="tViewHeader">
                            <Row>

                                <Col>
                                    <ul>
                                        <li>
                                            <button type="button" className="btn btn-success fa fa-plus" onClick={this.newClick} ></button>
                                            {
                                                this.props.columns.map((name: string) => {
                                                    let RCol = (this.props.Title + "." + name).toUpperCase();
                                                    if (childResource === undefined) {
                                                        return null;
                                                    }
                                                    let ResourceCol = childResource.find((c: any) => c.resourceCode.toString().toUpperCase().includes(RCol));
                                                    if (ResourceCol) {
                                                        return (<span>{ResourceCol.resourceLanguageName}&nbsp;</span>);
                                                    }

                                                })}</li>
                                    </ul>
                                </Col>
                                <Col md={4}>
                                    <InputGroup>
                                        <Form.Control id="SearchTreeView" />
                                        <Button onClick={this.searchClick} variant="success" >
                                            <FontAwesomeIcon icon={faSearch} />
                                        </Button>
                                        <Button onClick={this.refreshClick} variant="danger"  >
                                            <FontAwesomeIcon icon={faWindowClose} color="white" />
                                        </Button>

                                    </InputGroup>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                    <Row>
                        {this.props.dir === 1 ?
                            <Col className="tView treeRtl">
                                <ul>
                                    {this.state.load === true ?
                                        <div><div className="overlayTreeView"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div><ItemList /></div>
                                        : <ItemList />}


                                </ul>
                            </Col> :
                            <Col className="tView treeLtr">
                                <ul>
                                    {this.state.load === true ?
                                        <div><div className="overlayTreeView"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div><ItemList /></div>
                                        : <ItemList />}


                                </ul>
                            </Col>
                        }

                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(TreeView as any);
