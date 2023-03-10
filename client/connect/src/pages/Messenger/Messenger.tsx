import { Box, TextField, IconButton, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';
import './Messenger.css';
import { useQuery } from "@apollo/client";
import { GET_ALL_USER } from "../../gqlOperations/queries";

const socket = io('http://localhost:5000/');

const Messenger = () => {
    const { data, error, loading } =
        useQuery(GET_ALL_USER);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [chatMessages, setMessages] = useState<any>([]);
    const [receiverDetail, setReceiverDetails] = useState<any>();
    const [currentUser, setCurrentUser] = useState<any>();

    const valueRef = useRef<HTMLInputElement>(null)
    console.log(data)

    const updateMessages = (msg: any) => {
        const tempMessage = [...chatMessages];
        tempMessage.push(msg);
        setMessages(tempMessage)
    }
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('userData') || '{}'));
        socket.on('connect', () => {
            console.log("connect");
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('message', (newMessage) => {
            console.log("newMessage", newMessage);
            console.log("Old Message", chatMessages);
            updateMessages(newMessage)
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (valueRef.current) {
            setMessages([...chatMessages, {
                message: valueRef?.current?.value,
                sentBy: currentUser.id,
                receiverId: receiverDetail.id
            }]);
            socket.emit('message', {
                message: valueRef?.current?.value,
                sentBy: currentUser.id,
                receiverId: receiverDetail.id
            });
            valueRef.current.value = '';

        }
    };

    const onUserClick = (userDetail: any) => {
        console.log(userDetail);
        setReceiverDetails(userDetail)
    }
    return (
        <div className="messenger">
            <div className="messenger-users">

                <UserList {...data} onClick={onUserClick} />
            </div>
            <div className="messager-chat-box">
                <div className="messager-chat-box-messages-list">
                    <ChatMessages messages={chatMessages} receiverDetail={receiverDetail} currentUser={currentUser} />
                </div>
                <Box component="form" sx={{ mt: 1 }} className="messager-chat-box-messages-input" noValidate onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="message"
                        name="message"
                        autoComplete="message"
                        placeholder="Message"
                        autoFocus
                        inputRef={valueRef}
                    />

                    <IconButton
                        color="primary"
                        type="submit"

                    >
                        <SendIcon />
                    </IconButton>

                </Box>
            </div>
        </div >
    )
}
export default Messenger;


const ChatMessages = ({ messages = [], receiverDetail, currentUser }: { messages: any[], receiverDetail: any, currentUser: any }) => {
    return messages.length ? <ul className="chat-messages">
        {messages.map((messageDetail: any, key: number) => <li key={key + '_messages'} className={messageDetail.sentBy == currentUser.id ? 'sent-by-you' : 'not-sent-by-you'}>

            {messageDetail.sentBy !== currentUser.id && <Avatar alt={receiverDetail.firstName} src="/static/images/avatar/1.jpg" />}
            <span>{messageDetail.message}</span>
            {messageDetail.sentBy === currentUser.id && <Avatar alt={currentUser.firstName} src="/static/images/avatar/1.jpg" />}

        </li>)}
    </ul> : null
}


const UserList = ({ users = [], onClick }: { users: any[], onClick: any }) => {
    return users.length ? <div className="chat-users">
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {users.map((user: any, key: number) => <ListItem alignItems="flex-start" onClick={() => onClick(user)}>
                <ListItemAvatar>
                    <Avatar alt={user.firstName} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={user.firstName + ' ' + user.lastName}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Message (1)
                            </Typography>

                        </React.Fragment>
                    }
                >
                </ListItemText>
            </ListItem>)}
        </List>
    </div> : null
}