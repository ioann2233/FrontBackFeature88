import React, {useState} from 'react';
import Chat from "../Chat/Chat.jsx";

const CurrentIncidents = ({reports, chatMessage}) => {
    const [chatAddress, setChatAddress] = useState("");

    const addInChat = (title) =>{
        console.log(title);
        setChatAddress(title);
    }
    return (
        <div className={"flex flex-col w-full h-fit ml-4 rounded-xl border-2 border-solid border-zinc-200"}>
            <div
                className={"w-[100%] flex bg-gray-200 h-10 rounded-xl text-center items-center justify-center "}>
                <p className={"flex items-center justify-center h-full w-full text-xl"}>Текущие
                    инциденты</p>
            </div>
            <div
                className={"flex flex-col h-52 w-full bg-gray-100 border-b-2 border-t-2 border-solid border-zinc-400 rounded-md p-2 items-center mt-4 overflow-y-scroll overflow-x-hidden"}>
                {
                    reports.map(report => (
                        <div key={report.location}
                             className={"flex flex-row w-[99%] gap-6 p-3 m-1 bg-gray-300 rounded-md text-lg cursor-pointer"}
                             onClick={e => {
                                 addInChat(report.location)
                             }}>
                            <p>{report.location}</p>
                            <p>{report.title}</p>
                        </div>
                    ))
                }
            </div>
            <div className={"mt-10"}>
                <Chat message={chatAddress}/>
            </div>
        </div>
    );
};

export default CurrentIncidents;