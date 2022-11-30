import { AppThunkAction } from ".";
import { KnownAction, RequestAction, ReceiveAction, EditAction, SaveAction, DeleteAction, FillListAction, SaveChildsAction, EditLoadAction, LoadAction } from "./actionType";
import { responseModel } from "../model/general/responseModel";
import { stateBase, baseModel } from "../model/general/stateBase";
import { MessageTypes } from "../model/general";
import { KnownEntities } from "../model/general/entityBase";
import { VwPermisionResource } from "../model/viewModel/VwPermisionResource";
import { projectStrong } from "../helper/projectStrong";
import { VwMessageSystem } from "../model/viewModel/VwMessageSystem";
import history from '../history';



export const checkSecurity = <v>(history: any): AppThunkAction<KnownAction<v>> => (dispatch, getState) => {

    const appState = getState();
    if (appState) {
        if (appState.userinfo.token === null) {
            if (history !== undefined)
                history.push('/');
        }
    }
}

export const requestAction = <v>(storName: string, url: string, pageNo: number, pageSize: number, filter: string, parentId?: string, resource?: string, isSelected?: boolean, sort?: string, sortKey?: string, filtersl?: string, noselectId?: string, folder?: string): AppThunkAction<KnownAction<v>> => (dispatch, getState) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState) {

        let srt = '';
        if (folder) {
            dispatch({ type: 'CHANGE_FOLDER', name: folder });
        }

        if (sort !== undefined && sortKey !== undefined && sort !== '' && sortKey !== '') {

            srt = sortKey + ':' + sort + ';'
        }
        if (!noselectId) {
            noselectId = '';
        }
        console.log('parent req action=' + parentId + ' url:' + url);

        fetch(url + 'ReadData?pageNo=' + pageNo + '&pageSize=' + pageSize + '&filter=' + filter + '&lang=' + appState.userinfo.lang.abr + '&parentId=' + parentId + ' &resource=' + resource + ' &sort=' + srt + ' &filtersl=' + filtersl + ' &noselectId=' + noselectId, {
            headers: {
                'Authorization': 'Bearer ' + appState.userinfo.token,
            }
        })
            .then(response => { if (response.status === 200) { return response.json() as Promise<responseModel> } else { throw response } })
            .then(responseModel => {

                if (resource !== undefined) {
                    var rs = appState.userinfo.resources.filter((c: any) => c.resourceCode === resource.toUpperCase() && c.lang === appState.userinfo.lang.abr.toUpperCase());
                    if (rs.length === 0) {
                        fetch(appState.userinfo.apiUrl + '/User/ChangeResource?resourceName=' + resource + '&lang=' + appState.userinfo.lang.abr, {
                            method: 'GET',
                            headers: {
                                'Authorization': 'Bearer ' + appState.userinfo.token,
                                'Content-Type': 'application/json;charset=UTF-8',
                            }
                        }).then(response => { if (response.status === 200) { return response.json() as Promise<responseModel> } else { throw response } })
                            .then(mr => {
                                if (mr.messageCode === 0) {

                                    dispatch({ type: 'CHANGE_RESOURCE', resources: mr.resources, resourceLang: appState.userinfo.lang.abr, curentResouce: resource });
                                }
                            }).catch(
                                error => {
                                    if (error.status === 401) {
                                        history.push('/adminlogin');
                                    }
                                }
                            );
                    }
                }

                dispatch({ type: 'RECEIVE_ACTION' + storName, PageNo: pageNo, PageSize: pageSize, ReceiveModel: responseModel, Count: responseModel.count, Filter: filter, parentId: parentId, sort: srt });


            })
            .catch(
                error => {
                    if (error.status === 401) {
                        history.push('/adminlogin');
                    }
                }
            );
        dispatch({ type: 'REQUEST_ACTION' + storName, pageNo: pageNo, PageSize: pageSize, Filter: filter });
    }
}
export const requestActionWithDifferentAction = <v>(storName: string, url: string, pageNo: number, pageSize: number, filter: string, parentId?: string, resource?: string, isSelected?: boolean, sort?: string, sortKey?: string, filtersl?: string, noselectId?: string, folder?: string, actionName?: string): AppThunkAction<KnownAction<v>> => (dispatch, getState) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState) {

        let srt = '';
        if (folder) {
            dispatch({ type: 'CHANGE_FOLDER', name: folder });
        }

        if (sort !== undefined && sortKey !== undefined && sort !== '' && sortKey !== '') {

            srt = sortKey + ':' + sort + ';'
        }
        if (!noselectId) {
            noselectId = '';
        }
        fetch(url + actionName + '?pageNo=' + pageNo + '&pageSize=' + pageSize + '&filter=' + filter + '&lang=' + appState.userinfo.lang.abr + '&parentId=' + parentId + ' &resource=' + resource + ' &sort=' + srt + ' &filtersl=' + filtersl + ' &noselectId=' + noselectId, {
            headers: {
                'Authorization': 'Bearer ' + appState.userinfo.token,
            }
        })
            .then(response => { if (response.status === 200) { return response.json() as Promise<responseModel> } else { throw response } })
            .then(responseModel => {

                if (resource !== undefined) {
                    var rs = appState.userinfo.resources.filter((c: any) => c.resourceCode === resource.toUpperCase() && c.lang === appState.userinfo.lang.abr.toUpperCase());
                    if (rs.length === 0) {
                        fetch(appState.userinfo.apiUrl + '/User/ChangeResource?resourceName=' + resource + '&lang=' + appState.userinfo.lang.abr, {
                            method: 'GET',
                            headers: {
                                'Authorization': 'Bearer ' + appState.userinfo.token,
                                'Content-Type': 'application/json;charset=UTF-8',
                            }
                        }).then(response => { if (response.status === 200) { return response.json() as Promise<responseModel> } else { throw response } })
                            .then(mr => {
                                if (mr.messageCode === 0) {

                                    dispatch({ type: 'CHANGE_RESOURCE', resources: mr.resources, resourceLang: appState.userinfo.lang.abr, curentResouce: resource });
                                }
                            }).catch(
                                error => {
                                    if (error.status === 401) {
                                        history.push('/adminlogin');
                                    }
                                }
                            );
                    }
                }

                dispatch({ type: 'RECEIVE_ACTION' + storName, PageNo: pageNo, PageSize: pageSize, ReceiveModel: responseModel, Count: responseModel.count, Filter: filter, parentId: parentId, sort: srt });


            })
            .catch(
                error => {
                    if (error.status === 401) {
                        history.push('/adminlogin');
                    }
                }
            );
        dispatch({ type: 'REQUEST_ACTION' + storName, pageNo: pageNo, PageSize: pageSize, Filter: filter });
    }
}
export const setPageSize = <v>(storName: string, pageSize: number): AppThunkAction<KnownAction<v>> => (dispatch, getState) => {
    const appState = getState();
    if (appState) {
        dispatch({ type: 'CHANGE_PAGE_SIZE' + storName, PageSize: pageSize });
    }
}
export const fillListAction = <v>(storName: string, data: v[], resource: string): AppThunkAction<KnownAction<v>> => (dispatch, getState) => {

    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();

    if (appState) {
        dispatch({ type: 'FILLLIST_ACTION' + storName, ReceiveModel: data as [] });
        if (resource !== undefined) {
            var rs = appState.userinfo.resources.filter((c: any) => c.resourceCode === resource.toUpperCase() && c.lang === appState.userinfo.lang.abr.toUpperCase());
            if (rs.length === 0) {
                fetch(appState.userinfo.apiUrl + '/User/ChangeResource?resourceName=' + resource + '&lang=' + appState.userinfo.lang.abr, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + appState.userinfo.token,
                        'Content-Type': 'application/json;charset=UTF-8',
                    }
                }).then(response => { if (response.status === 200) { return response.json() as Promise<responseModel> } else { throw response } })
                    .then(mr => {
                        if (mr.messageCode === 0) {

                            dispatch({ type: 'CHANGE_RESOURCE', resources: mr.resources, resourceLang: appState.userinfo.lang.abr, curentResouce: resource });
                        }
                    }).catch(
                        error => {
                            if (error.status === 401) {
                                history.push('/adminlogin');
                            }
                        }
                    );
            }
        }
    }
}

export const deleteRecord = <v extends baseModel>(storName: string, url: string, id: string): AppThunkAction<KnownAction<v>> => (dispatch, getState) => {
    const appState = getState();
    if (appState) {
        fetch(url + 'Delete', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + appState.userinfo.token,
                'Content-Type': 'application/json',
                'lang': appState.userinfo.lang.abr
            },
            body: JSON.stringify({ Id: id }),
        })
            .then(response => { if (response.status === 200) { return response.json() } else { throw response } })
            .then((mr) => {
                if (mr.messageCode === 0) {
                    dispatch({ type: 'ADD_MESSAGE', message: [{ msg: mr.message, msgType: MessageTypes.Success }] });
                    setTimeout(() => {
                        dispatch({ type: 'Empty_Messages' })
                    }, 3000)
                    dispatch({ type: 'Delete_ACTION' + storName, id: id })
                    return
                }
                dispatch({ type: 'ADD_MESSAGE', message: [{ msg: mr.message, msgType: MessageTypes.Error }] });
                setTimeout(() => {
                    dispatch({ type: 'Empty_Messages' })
                }, 3000)
                // dispatch({ type: 'Delete_ACTION'+storName,id:id })
            })
            .catch((error) => {
                if (error.status === 401) {
                    history.push('/adminlogin');
                }
            });
    }

}
export const editDataFetch = <v extends baseModel>(storName: string, e: any, entityName: KnownEntities, controler: string, action: string): AppThunkAction<KnownAction<v>> => (dispatch, getState) => {
    const appSt = getState();
    if (e) {
        // dispatch({ type: 'EditLoad' + storName, load: true });
        // var edit = (appSt[entityName] as stateBase<baseModel>).models.find(c => c.id === e);
        if (e) {
            if (appSt) {
                fetch(appSt.userinfo.apiUrl + '/' + controler + '/' + action + '?id=' + e, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + appSt.userinfo.token,
                        'Content-Type': 'application/json;charset=UTF-8',
                    }
                }).then(response => { if (response.status === 200) { return response.json() as Promise<responseModel> } else { throw response } })
                    .then(mr => {
                        if (mr.messageCode === 0) {
                            
                            dispatch({ type: 'EDIT_ACTION_FETCH' + storName, edit: mr.data as v, dir: appSt.userinfo.dir });
                            // dispatch({ type: 'EditLoad' + storName, load: false });
                        }
                    }).catch(
                        error => {
                            if (error.status === 401) {
                                history.push('/adminlogin');
                                // dispatch({ type: 'EditLoad' + storName, load: false });
                            }
                        }
                    );
            }
        }
        else {
            const record: baseModel = {
                id: '',
                isActive: true
            };

            dispatch({ type: 'EDIT_ACTION' + storName, edit: record as v, dir: appSt.userinfo.dir });
            dispatch({ type: 'EditLoad' + storName, load: false });
        }
    }

}


export const editData = <v extends baseModel>(storName: string, e: any, entityName: KnownEntities): AppThunkAction<KnownAction<v>> => (dispatch, getState) => {
    const appSt = getState();
    if (e) {
        var edit = (appSt[entityName] as stateBase<baseModel>).models.find(c => c.id === e);
        if (edit) {
            if (appSt && appSt.weatherForecasts) {
                console.log(e);
                if (e != null) {
                    dispatch({ type: 'EDIT_ACTION' + storName, edit: edit as v, dir: appSt.userinfo.dir });
                }

            }
        }
        else {
            const record: baseModel = {
                id: '',
                isActive: true
            };

            dispatch({ type: 'EDIT_ACTION' + storName, edit: record as v, dir: appSt.userinfo.dir });
        }
    }
    else {
        const record: baseModel = {
            id: '',
            isActive: true
        };

        dispatch({ type: 'EDIT_ACTION' + storName, edit: record as v, dir: appSt.userinfo.dir });
    }

}

export const newData = <v extends baseModel>(storName: string, e: string, entityName: KnownEntities): AppThunkAction<KnownAction<v>> => (dispatch, getState) => {
    const appSt = getState();
    const record: baseModel = {
        id: '',
        parentId: e,
        isActive: true
    };

    dispatch({ type: 'NEW_ACTION' + storName, edit: record as v, dir: appSt.userinfo.dir });

}


export const saveData =  <v>(storName: string, url: string, data: any, folder?: string, action?: string): AppThunkAction<KnownAction<v>> => async (dispatch, getState) => {
    const appState = getState();
    dispatch({ type: 'Load_Save' + storName, load: true });
    if (appState && appState.userinfo) {
        if (data != null) {
            if (folder === undefined) {
                folder = '';
            }

            await fetch(url + (action ? action : 'Save'), {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + appState.userinfo.token,
                    'Content-Type': 'application/json;charset=UTF-8',
                    'lang': appState.userinfo.lang.abr,
                },
                body: JSON.stringify(data)
            })
                .then(response => { if (response.status === 200 || response.status === 400) { return response.json() as responseModel | any } else { throw response } })
                .then(msg => {
                    let messages = [];

                    if (msg.errors) {
                        for (var elem in msg.errors) {

                            if (elem) {
                                if (msg.errors[elem].toString().indexOf("**") !== -1) {

                                    let errors = msg.errors[elem].toString().split("**");
                                    projectStrong.getMessageList(errors[0], appState.userinfo.lang.abr);
                                    let messs = projectStrong.message as VwMessageSystem;
                                    if (messs) {
                                        let curentMsg = '';
                                        var myResource: VwPermisionResource | undefined;
                                        if (appState.userinfo.resources) {
                                            let resources = appState.userinfo.resources as VwPermisionResource[];
                                            if (resources !== undefined) {
                                                myResource = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + elem.toString().toUpperCase()) : undefined);
                                                if (myResource !== undefined && myResource.resourceLanguageName) {
                                                    curentMsg = messs.name.replace('{0}', myResource.resourceLanguageName.toString()).replace('{1}', errors[1]);
                                                }
                                            }

                                        } else {
                                            curentMsg = messs.name.replace('{0}', errors[0].toString()).replace('{1}', errors[1]);
                                        }
                                        messages.push({ msg: curentMsg, msgType: MessageTypes.Error });
                                        dispatch({ type: 'Load_Save' + storName, load: false });
                                    }

                                }
                                else if (msg.errors[elem].toString().indexOf("****") !== -1) {
                                    let errors = msg.errors[elem].toString().split("****");
                                    projectStrong.getMessageList(errors[0], appState.userinfo.lang.abr);
                                    let messs = projectStrong.message as VwMessageSystem;
                                    if (messs) {
                                        let curentMsg = '';
                                        var myResource: VwPermisionResource | undefined;
                                        var myResource2: VwPermisionResource | undefined;
                                        if (appState.userinfo.resources) {
                                            let resources = appState.userinfo.resources as VwPermisionResource[];
                                            if (resources !== undefined) {
                                                myResource = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + elem.toString().toUpperCase()) : undefined);
                                                myResource2 = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + errors[1].toString().toUpperCase()) : undefined);
                                                if (myResource !== undefined && myResource.resourceLanguageName && myResource2 !== undefined && myResource2.resourceLanguageName) {
                                                    curentMsg = messs.name.replace('{0}', myResource.resourceLanguageName.toString()).replace('{1}', myResource2.resourceLanguageName.toString());
                                                }
                                            }

                                        } else {
                                            curentMsg = messs.name.replace('{0}', errors[0].toString()).replace('{1}', errors[1]);
                                        }
                                        messages.push({ msg: curentMsg, msgType: MessageTypes.Error });
                                        dispatch({ type: 'Load_Save' + storName, load: false });
                                    }
                                }
                                else {
                                    projectStrong.getMessageList(msg.errors[elem], appState.userinfo.lang.abr);
                                    const mes = projectStrong.message as VwMessageSystem;
                                    if (mes) {
                                        let curentMsg = '';
                                        var myResource: VwPermisionResource | undefined;
                                        if (appState.userinfo.resources) {
                                            let resources = appState.userinfo.resources as VwPermisionResource[];
                                            if (resources !== undefined) {
                                                myResource = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + elem.toString().toUpperCase()) : undefined);
                                                if (myResource !== undefined && myResource.resourceLanguageName) {
                                                    curentMsg = mes.name.replace('{0}', myResource.resourceLanguageName.toString());
                                                }
                                            }

                                        } else {
                                            curentMsg = mes.name.replace('{0}', elem);
                                        }
                                        messages.push({ msg: curentMsg, msgType: MessageTypes.Error });
                                        dispatch({ type: 'Load_Save' + storName, load: false });
                                    }
                                }

                            }
                            dispatch({ type: 'ADD_MESSAGE', message: messages });
                            setTimeout(() => {
                                dispatch({ type: 'Empty_Messages' })
                            }, 3000)
                            dispatch({ type: 'Load_Save' + storName, load: false });

                        }
                        console.log(1111);
                        
                        return false;
                    }
                    else if ((msg as responseModel).messageCode === 0) {
                        dispatch({ type: 'ADD_MESSAGE', message: [{ msg: (msg as responseModel).message, msgType: MessageTypes.Success }] });
                        dispatch({ type: 'Save_ACTION' + storName, edit: (msg as responseModel).data[0], Count: (msg as responseModel).count });
                        setTimeout(() => {
                            dispatch({ type: 'Empty_Messages' })
                        }, 3000)
                        dispatch({ type: 'Load_Save' + storName, load: false });
                        console.log(2222);
                        return true;
                    } else if ((msg as responseModel).messageCode === 1) {
                        dispatch({ type: 'ADD_MESSAGE', message: [{ msg: (msg as responseModel).message, msgType: MessageTypes.Error }] });
                        setTimeout(() => {
                            dispatch({ type: 'Empty_Messages' })
                        }, 3000)
                        dispatch({ type: 'Load_Save' + storName, load: false });
                        console.log(333);
                        return false;
                    }
                })
                .catch(error => {
                    dispatch({ type: 'Load_Save' + storName, load: false });
                    if (error.status === 401) {
                        history.push('/adminlogin');
                    }
                    console.log(444);
                    return false;

                });

        }

    }
}

export const saveDataDifferentAction = <v>(storName: string, url: string, data: any, folder?: string, actionName?: string): AppThunkAction<KnownAction<v>> => (dispatch, getState) => {

    const appState = getState();

    if (appState && appState.userinfo) {
        if (data != null) {
            if (folder === undefined) {
                folder = '';
            }

            fetch(url + actionName, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + appState.userinfo.token,
                    'Content-Type': 'application/json;charset=UTF-8',
                    'lang': appState.userinfo.lang.abr,
                },
                body: JSON.stringify(data)
            })
                .then(response => { if (response.status === 200 || response.status === 400) { return response.json() as responseModel | any } else { throw response } })
                .then(msg => {

                    let messages = [];

                    if (msg.errors) {
                        for (var elem in msg.errors) {

                            if (elem) {
                                if (msg.errors[elem].toString().indexOf("**") !== -1) {

                                    let errors = msg.errors[elem].toString().split("**");
                                    projectStrong.getMessageList(errors[0], appState.userinfo.lang.abr);
                                    let messs = projectStrong.message as VwMessageSystem;
                                    if (messs) {
                                        let curentMsg = '';
                                        var myResource: VwPermisionResource | undefined;
                                        if (appState.userinfo.resources) {
                                            let resources = appState.userinfo.resources as VwPermisionResource[];
                                            if (resources !== undefined) {
                                                myResource = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + elem.toString().toUpperCase()) : undefined);
                                                if (myResource !== undefined && myResource.resourceLanguageName) {
                                                    curentMsg = messs.name.replace('{0}', myResource.resourceLanguageName.toString()).replace('{1}', errors[1]);
                                                }
                                            }

                                        } else {
                                            curentMsg = messs.name.replace('{0}', errors[0].toString()).replace('{1}', errors[1]);
                                        }
                                        messages.push({ msg: curentMsg, msgType: MessageTypes.Error });
                                    }

                                }
                                else if (msg.errors[elem].toString().indexOf("****") !== -1) {
                                    let errors = msg.errors[elem].toString().split("****");
                                    projectStrong.getMessageList(errors[0], appState.userinfo.lang.abr);
                                    let messs = projectStrong.message as VwMessageSystem;
                                    if (messs) {
                                        let curentMsg = '';
                                        var myResource: VwPermisionResource | undefined;
                                        var myResource2: VwPermisionResource | undefined;
                                        if (appState.userinfo.resources) {
                                            let resources = appState.userinfo.resources as VwPermisionResource[];
                                            if (resources !== undefined) {
                                                myResource = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + elem.toString().toUpperCase()) : undefined);
                                                myResource2 = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + errors[1].toString().toUpperCase()) : undefined);
                                                if (myResource !== undefined && myResource.resourceLanguageName && myResource2 !== undefined && myResource2.resourceLanguageName) {
                                                    curentMsg = messs.name.replace('{0}', myResource.resourceLanguageName.toString()).replace('{1}', myResource2.resourceLanguageName.toString());
                                                }
                                            }

                                        } else {
                                            curentMsg = messs.name.replace('{0}', errors[0].toString()).replace('{1}', errors[1]);
                                        }
                                        messages.push({ msg: curentMsg, msgType: MessageTypes.Error });
                                    }
                                }
                                else {
                                    projectStrong.getMessageList(msg.errors[elem], appState.userinfo.lang.abr);
                                    const mes = projectStrong.message as VwMessageSystem;
                                    if (mes) {
                                        let curentMsg = '';
                                        var myResource: VwPermisionResource | undefined;
                                        if (appState.userinfo.resources) {
                                            let resources = appState.userinfo.resources as VwPermisionResource[];
                                            if (resources !== undefined) {
                                                myResource = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + elem.toString().toUpperCase()) : undefined);
                                                if (myResource !== undefined && myResource.resourceLanguageName) {
                                                    curentMsg = mes.name.replace('{0}', myResource.resourceLanguageName.toString());
                                                }
                                            }

                                        } else {
                                            curentMsg = mes.name.replace('{0}', elem);
                                        }
                                        messages.push({ msg: curentMsg, msgType: MessageTypes.Error });
                                    }
                                }

                            }
                            dispatch({ type: 'ADD_MESSAGE', message: messages });
                            setTimeout(() => {
                                dispatch({ type: 'Empty_Messages' })
                            }, 3000)

                        }
                    }
                    else if ((msg as responseModel).messageCode === 0) {
                        dispatch({ type: 'ADD_MESSAGE', message: [{ msg: (msg as responseModel).message, msgType: MessageTypes.Success }] });
                        dispatch({ type: 'Save_ACTION' + storName, edit: (msg as responseModel).data[0], Count: (msg as responseModel).count });
                        setTimeout(() => {
                            dispatch({ type: 'Empty_Messages' })
                        }, 3000)
                    } else if ((msg as responseModel).messageCode === 1) {
                        dispatch({ type: 'ADD_MESSAGE', message: [{ msg: (msg as responseModel).message, msgType: MessageTypes.Error }] });
                        setTimeout(() => {
                            dispatch({ type: 'Empty_Messages' })
                        }, 3000)
                    }
                })
                .catch(error => {

                    if (error.status === 401) {
                        history.push('/adminlogin');
                    }

                });

        }

    }
}

export const generateWorkOrderAction = <v>(storName: string, url: string, data: any, actionName?: string): AppThunkAction<KnownAction<v>> => (dispatch, getState) => {

    const appState = getState();

    if (appState && appState.userinfo) {
        if (data != null) {

            fetch(url + actionName, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + appState.userinfo.token,
                    'Content-Type': 'application/json;charset=UTF-8',
                    'lang': appState.userinfo.lang.abr,
                },
                body: JSON.stringify(data)
            })
                .then(response => { if (response.status === 200 || response.status === 400) { return response.json() as responseModel | any } else { throw response } })
                .then(msg => {
                    let messages = [];
                    if ((msg as responseModel).messageCode === 0) {
                        dispatch({ type: 'ADD_MESSAGE', message: [{ msg: (msg as responseModel).message, msgType: MessageTypes.Success }] });
                        setTimeout(() => {
                            dispatch({ type: 'Empty_Messages' })
                        }, 3000)
                    } else if ((msg as responseModel).messageCode === 1) {
                        dispatch({ type: 'ADD_MESSAGE', message: [{ msg: (msg as responseModel).message, msgType: MessageTypes.Error }] });
                        setTimeout(() => {
                            dispatch({ type: 'Empty_Messages' })
                        }, 3000)
                    }
                })
                .catch(error => {

                    if (error.status === 401) {
                        history.push('/adminlogin');
                    }

                });

        }

    }
}
export const sendEmail = <v>(storName: string, url: string, data: any, folder?: string): AppThunkAction<KnownAction<v>> => (dispatch, getState) => {

    const appState = getState();

    if (appState && appState.userinfo) {
        if (data != null) {
            if (folder === undefined) {
                folder = '';
            }

            fetch(url + 'SendEmail', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + appState.userinfo.token,
                    'Content-Type': 'application/json;charset=UTF-8',
                    'lang': appState.userinfo.lang.abr,
                },
                body: JSON.stringify(data)
            })
                .then(response => { if (response.status === 200 || response.status === 400) { return response.json() as responseModel | any } else { throw response } })
                .then(msg => {

                    let messages = [];

                    if (msg.errors) {
                        for (var elem in msg.errors) {

                            if (elem) {
                                if (msg.errors[elem].toString().indexOf("**") !== -1) {

                                    let errors = msg.errors[elem].toString().split("**");
                                    projectStrong.getMessageList(errors[0], appState.userinfo.lang.abr);
                                    let messs = projectStrong.message as VwMessageSystem;
                                    if (messs) {
                                        let curentMsg = '';
                                        var myResource: VwPermisionResource | undefined;
                                        if (appState.userinfo.resources) {
                                            let resources = appState.userinfo.resources as VwPermisionResource[];
                                            if (resources !== undefined) {
                                                myResource = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + elem.toString().toUpperCase()) : undefined);
                                                if (myResource !== undefined && myResource.resourceLanguageName) {
                                                    curentMsg = messs.name.replace('{0}', myResource.resourceLanguageName.toString()).replace('{1}', errors[1]);
                                                }
                                            }

                                        } else {
                                            curentMsg = messs.name.replace('{0}', errors[0].toString()).replace('{1}', errors[1]);
                                        }
                                        messages.push({ msg: curentMsg, msgType: MessageTypes.Error });
                                    }

                                }
                                else if (msg.errors[elem].toString().indexOf("****") !== -1) {
                                    let errors = msg.errors[elem].toString().split("****");
                                    projectStrong.getMessageList(errors[0], appState.userinfo.lang.abr);
                                    let messs = projectStrong.message as VwMessageSystem;
                                    if (messs) {
                                        let curentMsg = '';
                                        var myResource: VwPermisionResource | undefined;
                                        var myResource2: VwPermisionResource | undefined;
                                        if (appState.userinfo.resources) {
                                            let resources = appState.userinfo.resources as VwPermisionResource[];
                                            if (resources !== undefined) {
                                                myResource = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + elem.toString().toUpperCase()) : undefined);
                                                myResource2 = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + errors[1].toString().toUpperCase()) : undefined);
                                                if (myResource !== undefined && myResource.resourceLanguageName && myResource2 !== undefined && myResource2.resourceLanguageName) {
                                                    curentMsg = messs.name.replace('{0}', myResource.resourceLanguageName.toString()).replace('{1}', myResource2.resourceLanguageName.toString());
                                                }
                                            }

                                        } else {
                                            curentMsg = messs.name.replace('{0}', errors[0].toString()).replace('{1}', errors[1]);
                                        }
                                        messages.push({ msg: curentMsg, msgType: MessageTypes.Error });
                                    }
                                }
                                else {
                                    projectStrong.getMessageList(msg.errors[elem], appState.userinfo.lang.abr);
                                    const mes = projectStrong.message as VwMessageSystem;
                                    if (mes) {
                                        let curentMsg = '';
                                        var myResource: VwPermisionResource | undefined;
                                        if (appState.userinfo.resources) {
                                            let resources = appState.userinfo.resources as VwPermisionResource[];
                                            if (resources !== undefined) {
                                                myResource = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + elem.toString().toUpperCase()) : undefined);
                                                if (myResource !== undefined && myResource.resourceLanguageName) {
                                                    curentMsg = mes.name.replace('{0}', myResource.resourceLanguageName.toString());
                                                }
                                            }

                                        } else {
                                            curentMsg = mes.name.replace('{0}', elem);
                                        }
                                        messages.push({ msg: curentMsg, msgType: MessageTypes.Error });
                                    }
                                }

                            }
                            dispatch({ type: 'ADD_MESSAGE', message: messages });
                            setTimeout(() => {
                                dispatch({ type: 'Empty_Messages' })
                            }, 3000)

                        }
                    }
                    else if ((msg as responseModel).messageCode === 0) {
                        dispatch({ type: 'ADD_MESSAGE', message: [{ msg: (msg as responseModel).message, msgType: MessageTypes.Success }] });
                        dispatch({ type: 'Save_ACTION' + storName, edit: (msg as responseModel).data[0], Count: (msg as responseModel).count });
                        setTimeout(() => {
                            dispatch({ type: 'Empty_Messages' })
                        }, 3000)
                    } else if ((msg as responseModel).messageCode === 1) {
                        dispatch({ type: 'ADD_MESSAGE', message: [{ msg: (msg as responseModel).message, msgType: MessageTypes.Error }] });
                        setTimeout(() => {
                            dispatch({ type: 'Empty_Messages' })
                        }, 3000)
                    }
                })
                .catch(error => {

                    if (error.status === 401) {
                        history.push('/adminlogin');
                    }

                });

        }

    }
}

export const saveChildData = <v>(storName: string, url: string, data: any, folder?: string): AppThunkAction<KnownAction<v>> => (dispatch, getState) => {

    const appState = getState();

    if (appState && appState.userinfo) {
        if (data != null) {
            if (folder === undefined) {
                folder = '';
            }
            fetch(url + 'SaveChilds', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + appState.userinfo.token,
                    'Content-Type': 'application/json;charset=UTF-8',
                    'lang': appState.userinfo.lang.abr
                },
                body: JSON.stringify(data)
            })
                .then(response => { if (response.status === 200 || response.status === 400) { return response.json() as responseModel | any } else { throw response } })
                .then(msg => {

                    let messages = [];
                    if (msg.errors) {
                        for (var elem in msg.errors) {

                            if (elem) {
                                if (msg.errors[elem].toString().indexOf("**") !== -1) {
                                    let errors = msg.errors[elem].toString().split("**");
                                    projectStrong.getMessageList(errors[0], appState.userinfo.lang.abr);
                                    let messs = projectStrong.message as VwMessageSystem;
                                    if (messs) {
                                        let curentMsg = '';
                                        var myResource: VwPermisionResource | undefined;
                                        if (appState.userinfo.resources) {
                                            let resources = appState.userinfo.resources as VwPermisionResource[];
                                            if (resources !== undefined) {
                                                myResource = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + elem.toString().toUpperCase()) : undefined);
                                                if (myResource !== undefined && myResource.resourceLanguageName) {
                                                    curentMsg = messs.name.replace('{0}', myResource.resourceLanguageName.toString()).replace('{1}', errors[1]);
                                                }
                                            }

                                        } else {
                                            curentMsg = messs.name.replace('{0}', errors[0].toString()).replace('{1}', errors[1]);
                                        }
                                        messages.push({ msg: curentMsg, msgType: MessageTypes.Error });
                                    }

                                }
                                else {
                                    projectStrong.getMessageList(msg.errors[elem], appState.userinfo.lang.abr);
                                    const mes = projectStrong.message as VwMessageSystem;
                                    if (mes) {
                                        let curentMsg = '';
                                        var myResource: VwPermisionResource | undefined;
                                        if (appState.userinfo.resources) {
                                            let resources = appState.userinfo.resources as VwPermisionResource[];
                                            if (resources !== undefined) {
                                                myResource = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + elem.toString().toUpperCase()) : undefined);
                                                if (myResource !== undefined && myResource.resourceLanguageName) {
                                                    curentMsg = mes.name.replace('{0}', myResource.resourceLanguageName.toString());
                                                }
                                            }

                                        } else {
                                            curentMsg = mes.name.replace('{0}', elem);
                                        }
                                        messages.push({ msg: curentMsg, msgType: MessageTypes.Error });
                                    }
                                }

                            }
                            dispatch({ type: 'ADD_MESSAGE', message: messages });
                            setTimeout(() => {
                                dispatch({ type: 'Empty_Messages' })
                            }, 3000)

                        }
                    }
                    else if ((msg as responseModel).messageCode === 0) {
                        dispatch({ type: 'ADD_MESSAGE', message: [{ msg: (msg as responseModel).message, msgType: MessageTypes.Success }] });
                        dispatch({ type: 'Save_ACTION_Childs' + storName, edit: (msg as responseModel).data[0], Count: (msg as responseModel).count });
                        setTimeout(() => {
                            dispatch({ type: 'Empty_Messages' })
                        }, 3000)
                    } else if ((msg as responseModel).messageCode === 1) {
                        dispatch({ type: 'ADD_MESSAGE', message: [{ msg: (msg as responseModel).message, msgType: MessageTypes.Error }] });
                        setTimeout(() => {
                            dispatch({ type: 'Empty_Messages' })
                        }, 3000)
                    }
                })
                .catch(error => {
                    if (error.status === 401) {
                        history.push('/adminlogin');
                    }

                });

        }

    }
}

export const DeleteChildData = <v>(storName: string, url: string, data: any, folder?: string): AppThunkAction<KnownAction<v>> => (dispatch, getState) => {

    const appState = getState();

    if (appState && appState.userinfo) {
        if (data != null) {
            if (folder === undefined) {
                folder = '';
            }
            fetch(url + 'DeleteChilds', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + appState.userinfo.token,
                    'Content-Type': 'application/json;charset=UTF-8',
                    'lang': appState.userinfo.lang.abr
                },
                body: JSON.stringify(data)
            })
                .then(response => { if (response.status === 200 || response.status === 400) { return response.json() as responseModel | any } else { throw response } })
                .then(msg => {

                    let messages = [];
                    if (msg.errors) {
                        for (var elem in msg.errors) {

                            if (elem) {
                                if (msg.errors[elem].toString().indexOf("**") !== -1) {
                                    let errors = msg.errors[elem].toString().split("**");
                                    projectStrong.getMessageList(errors[0], appState.userinfo.lang.abr);
                                    let messs = projectStrong.message as VwMessageSystem;
                                    if (messs) {
                                        let curentMsg = '';
                                        var myResource: VwPermisionResource | undefined;
                                        if (appState.userinfo.resources) {
                                            let resources = appState.userinfo.resources as VwPermisionResource[];
                                            if (resources !== undefined) {
                                                myResource = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + elem.toString().toUpperCase()) : undefined);
                                                if (myResource !== undefined && myResource.resourceLanguageName) {
                                                    curentMsg = messs.name.replace('{0}', myResource.resourceLanguageName.toString()).replace('{1}', errors[1]);
                                                }
                                            }

                                        } else {
                                            curentMsg = messs.name.replace('{0}', errors[0].toString()).replace('{1}', errors[1]);
                                        }
                                        messages.push({ msg: curentMsg, msgType: MessageTypes.Error });
                                    }

                                }
                                else {
                                    projectStrong.getMessageList(msg.errors[elem], appState.userinfo.lang.abr);
                                    const mes = projectStrong.message as VwMessageSystem;
                                    if (mes) {
                                        let curentMsg = '';
                                        var myResource: VwPermisionResource | undefined;
                                        if (appState.userinfo.resources) {
                                            let resources = appState.userinfo.resources as VwPermisionResource[];
                                            if (resources !== undefined) {
                                                myResource = resources.find(c => c.resourceCode ? c.resourceCode.includes('.EDITFORM.' + elem.toString().toUpperCase()) : undefined);
                                                if (myResource !== undefined && myResource.resourceLanguageName) {
                                                    curentMsg = mes.name.replace('{0}', myResource.resourceLanguageName.toString());
                                                }
                                            }

                                        } else {
                                            curentMsg = mes.name.replace('{0}', elem);
                                        }
                                        messages.push({ msg: curentMsg, msgType: MessageTypes.Error });
                                    }
                                }

                            }
                            dispatch({ type: 'ADD_MESSAGE', message: messages });
                            setTimeout(() => {
                                dispatch({ type: 'Empty_Messages' })
                            }, 3000)


                        }
                    }
                    else if ((msg as responseModel).messageCode === 0) {
                        dispatch({ type: 'ADD_MESSAGE', message: [{ msg: (msg as responseModel).message, msgType: MessageTypes.Success }] });
                        // dispatch({ type: 'Save_ACTION_Childs' + storName, edit: (msg as responseModel).data[0], Count: (msg as responseModel).count });
                        setTimeout(() => {
                            dispatch({ type: 'Empty_Messages' })
                        }, 3000)
                    } else if ((msg as responseModel).messageCode === 1) {
                        dispatch({ type: 'ADD_MESSAGE', message: [{ msg: (msg as responseModel).message, msgType: MessageTypes.Error }] });
                        setTimeout(() => {
                            dispatch({ type: 'Empty_Messages' })
                        }, 3000)
                    }
                })
                .catch(error => {
                    if (error.status === 401) {
                        history.push('/adminlogin');
                    }

                });

        }

    }
}

export const reduc = <v extends baseModel>(state: stateBase<v> | undefined, incomingAction: KnownAction<v>, storeName: string): stateBase<v> => {
    const unloadedState: stateBase<v> = {
        models: [], isLoading: false, editable: false, pageNo: 1, count: 0, pageSize: 20, id: '', parentId: '', message: '', messageType: MessageTypes.Success, filter: '', edit: undefined, backWardName: '', list: [], sort: ''
    };
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction<v>;
    switch (action.type) {
        case 'REQUEST_ACTION' + storeName:
            const act1 = incomingAction as RequestAction;
            return {
                ...state,
                pageNo: act1.pageNo,
                pageSize: act1.PageSize,
                filter: act1.Filter,
                isLoading: true,
            };
        case 'RECEIVE_ACTION' + storeName:

            const act2 = incomingAction as ReceiveAction;

            return {
                ...state,
                pageNo: act2.PageNo,
                models: act2.ReceiveModel.data,
                count: act2.Count,
                pageSize: act2.PageSize,
                filter: act2.Filter,
                parentId: state.parentId,
                isLoading: false,
                sort: act2.sort,

                // resources:act2.resources
            };
        case 'CHANGE_PAGE_SIZE' + storeName:
            const act3 = incomingAction as RequestAction;
            return {
                ...state, pageSize: act3.PageSize, isLoading: true
            };

        case 'EDIT_ACTION' + storeName:
            const act4 = incomingAction as EditAction<v>;
            return {
                ...state,
                edit: act4.edit,
                dir: act4.dir
            };
            case 'EDIT_ACTION_FETCH' + storeName:
            const act44 = incomingAction as EditAction<v>;
            return {
                ...state,
                edit: act44.edit,
                dir: act44.dir
            };

        case 'FILLLIST_ACTION' + storeName:
            const act8 = incomingAction as FillListAction;
            return {
                ...state,
                models: act8.ReceiveModel
            }
        case 'Save_ACTION' + storeName:
            const act5 = incomingAction as SaveAction<v>;
            let st = state.models.filter(c => c.id !== act5.edit.id);
            if (state.models.length > 10) {
                st.pop();
            }

            st.unshift(act5.edit);
            return {
                ...state,
                models: st,
                edit: act5.edit,
                id: act5.edit.id
            };
        case 'Load_Save' + storeName:

            const act10 = incomingAction as LoadAction<v>;
            return {
                ...state,
                saveLoading: act10.load
            };
        case 'Save_ACTION_Childs' + storeName:
            const act12 = incomingAction as SaveChildsAction<v>;
            let st2 = state.models.filter(c => c.id !== act12.edit.id);
            if (state.models.length > 10) {
                st2.pop();
            }
            st2.unshift(act12.edit);
            return {
                ...state,
                models: st2,
                edit: act12.edit,
                id: act12.edit.id,
                count: act12.Count
            };
        case 'Delete_ACTION' + storeName:

            const act7 = incomingAction as DeleteAction;
            let md = state.models.filter(c => c.id !== act7.id);
            return {
                ...state,
                models: md
            };
        case 'NEW_ACTION' + storeName:
            const act6 = incomingAction as EditAction<v>;
            return {
                ...state,
                edit: act6.edit,
                dir: act6.dir
            };
        case 'EditLoad' + storeName:
            const act15 = incomingAction as EditLoadAction<v>;
            return {
                ...state,
                isEditLoad: act15.load
            };
        default:
            return state;
    }

};


