import React, { useState, useEffect, useRef } from 'react'
import { APIUrl } from '../../helper/config';
import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { responseModel } from '../../model/general/responseModel';
type ChatProps =
    UserInfo.UserInfoState &
    { match: any, location: any, history: any } &
    { joinUserId?: string, chatId: string } &
    typeof UserInfo.actionCreators;


enum UserExpert {
    User = 0,
    Expert = 1
}

enum RowTypes {
    Mine = 1,
    Other = 2
}
interface ChatItems {
    id: string,
    chatText: string,
    rowType: RowTypes
}

var chatArray: ChatItems[] = []
var CurUserType = UserExpert.User;
const Chat = (props: ChatProps) => {

    const keywordRef = useRef(null)
    const [ChatId, setChatId] = useState('')
    const [, setIsLoading] = useState(true)
    const [ChatText, setChatText] = useState('')
    const [Message, setMessage] = useState('منتظر کارشناس ...')
    const [ChatHistory, setChatHistory] = useState<ChatItems[]>([])

    function handleKeyUp(event: any) {
        event.stopPropagation();

        if (event.keyCode === 13) {
            var rowType: RowTypes = RowTypes.Mine;
            const newItem = [{
                id: Math.random().toString(),
                chatText: ChatText,
                rowType: rowType,
            }]
            chatArray = ChatHistory.concat(newItem);
            setChatHistory(chatArray);
            (keywordRef.current as unknown as HTMLInputElement).value = '';

            const data = {
                ChatId: ChatId,
                UserId: props.userId,
                ChatText: ChatText
            }
            fetch(APIUrl + '/Chat/SendDetail', {
                method: 'POST',
                headers: {
                'ut':'1',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token,
                    lang: props.lang.abr,
                },
                body: JSON.stringify(data),

            }).then(response => response.json() as Promise<responseModel>).then(() => {
            }).catch(
                error => {
                    console.log(error);
                }
            );

            return false;
        }

        setChatText(event.target.value)
        return false;
    }
    const createChat = () => {
        setIsLoading(true);
        fetch(APIUrl + '/Chat/CreateChat', {
            method: 'POST',
            headers: {
                'ut':'1',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token,
                lang: props.lang.abr,
            },

        }).then(response => response.json() as Promise<responseModel>).then(responseModel => {
            setIsLoading(false)
            setChatId(responseModel.keyId);
            CheckChat(responseModel.keyId);
        }).catch(
            error => {
                setIsLoading(false)
                console.log(error);
            }
        );

    }

    const CheckChat = (chatId: string) => {
        console.log('GetUnreadDetails');
        if (chatId === '')
            return;
        setMessage('checking')
        fetch(APIUrl + '/ChatDetail/GetUnreadDetails?Id=' + chatId + '&UserType=' + CurUserType, {
            method: 'GET',
            headers: {
                'ut':'1',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token,
                lang: props.lang.abr,
            },

        }).then(response => response.json() as Promise<responseModel>).then((responseModel) => {
            const chatResponse: ChatItems[] = responseModel.data;
            if (chatResponse.length > 0) {
                const newChatHistory = chatArray.concat(chatResponse)
                chatArray = newChatHistory;
                setChatHistory(newChatHistory)
            }
            setMessage('done')
        }).catch(
            error => {
                console.log(error);
            }
        );
        setTimeout(() => {
            console.log('get detail...');

            CheckChat(chatId);
        }, 5000);
    }

    useEffect(() => {
        if (props.joinUserId !== null) {
            CurUserType = UserExpert.Expert;
            setMessage('');
            setChatId(props.chatId)
            CheckChat(props.chatId);
        }
        else
            createChat()

        if (props.chatId !== undefined)
            setChatId(props.chatId)

    }, [props.joinUserId, props.chatId]);



    return (
        <div className="chat-container">
            <div className="chat-box">
                <div className="float-left" onClick={() => props.showChat(false)}>
                    <li className={"fa fa-close"}></li>
                </div>
                <div>
                    پشتیبانی آنلاین اتوچار
                </div>
                <div>
                    {Message}
                </div>
                <div className="chat-history">
                    {
                        ChatHistory.length > 0 ?
                            ChatHistory.map((item: ChatItems) =>
                                <div className={item.rowType === RowTypes.Mine ? 'my-chat' : 'other-chat'}>
                                    <div className='chat-text'>{item.chatText}</div>
                                </div>
                            ) : null}
                </div>
                <div>
                    <input ref={keywordRef} onKeyUp={handleKeyUp} />
                </div>
            </div>
        </div>
    )
}

export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(Chat as any);
