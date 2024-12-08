import React, {useState} from 'react';
import TextBox from "../UI/Text/TextBox.jsx";
import CoolButton from "../UI/CoolButton/CoolButton.jsx";
import sendIcon from "/src/Images/sendMessageIcon.png"
const Chat = ({messageFromMap, message}) => {
    return (
        <div className={"flex flex-col w-full h-72 bg-white rounded-lg border-t-2 border-b-2 border-zinc-300 border-solid"}>
            <div className={"flex h-full mb-2 p-2 border-t-2 border-b-2 border-zinc-200 border-solid"}>
                <label>{messageFromMap ? messageFromMap : "Здесь будет ответ от бота по поводу проишествия"}</label>
            </div>
            <div className={"flex flex-row p-2"}>
                <TextBox value={message} placeholder={"проишествие..."}/>
                <CoolButton>
                    <div className={"flex items-center justify-center"}>
                        <img src={sendIcon} alt="sendMessageIcon" className={"w-8"}/>
                    </div>
                </CoolButton>
            </div>
        </div>
    );
};

export default Chat;