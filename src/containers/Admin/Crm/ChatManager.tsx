import React, { useState, useEffect } from 'react'
import { APIUrl } from '../../../helper/config';
import { responseModel } from '../../../model/general/responseModel';

import * as UserInfo from '../../../store/UserInfo';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import { VwChat } from '../../../model/viewModel/VwChat';
import Chat from '../../User/Chat';

type ChatManagerProps =
    UserInfo.UserInfoState &
    { match: any, location: any, history: any } &
    typeof UserInfo.actionCreators;

const ChatManager = (props: ChatManagerProps) => {
    const [IsLoading, setIsLoading] = useState(false)
    const [chatList, setChatList] = useState<VwChat[]>([])
    const [StartChat, setStartChat] = useState(false)
    const [CurrentChatid, setCurrentChatid] = useState('')

    const joinChat = (id: string) => {

        setIsLoading(true)
        fetch(APIUrl + '/Chat/JoinChat/?Id=' + id, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token,
                lang: props.lang.abr,
            },

        }).then(response => response.json() as Promise<responseModel>).then(responseModel => {
            setIsLoading(false)
            if(responseModel.messageCode === 0)
            {
                setStartChat(true)
                setCurrentChatid(id)
            }
        }).catch(
            error => {
                setIsLoading(false)
                console.log(error);
            }
        );

    }

    

    useEffect(() => {
        const getPotentialChats = () => {
            fetch(APIUrl + '/Chat/GetChats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token,
                    lang: props.lang.abr,
                },
    
            }).then(response => response.json() as Promise<responseModel>).then(responseModel => {
                setIsLoading(false)
                setChatList(responseModel.data);
            }).catch(
                error => {
                    setIsLoading(false)
                    console.log(error);
                }
            );
    
        }
        
        getPotentialChats();
    }, []);

    return (
        <div>
            <div>
                مدیریت چتها
            </div>
            {CurrentChatid !== ''? <Chat {...{joinUserId: props.userId, chatId: CurrentChatid}} />: null}
            <div>
                {IsLoading ? 'loading' : null}
                {chatList.map(item =>
                    <div className="row">
                        <div className="col">
                            {item.code}
                        </div>
                        <div className="col">
                            {item.userNikName}
                        </div>
                        <div className="col">
                            {item.cDate}
                        </div>
                        <div className="col">
                            <button onClick={() => joinChat(item.id)} className="btn btn-orange">
                                {item.chatStatusCode === 'CR'? 
                                'شروع مکالمه' : 'مشاهده'}
                            </button>
                            </div>
                    </div>
                )
                }
            </div>
        </div>
    )
}


export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(ChatManager as any);
