import React from 'react';

const TextBox = ({title, placeholder, name}) => {
    return (
        <div className={"flex flex-col w-full"}>
            <p className={"font-medium text-xl mb-2"}>{title}</p>
            <input className={"w-full rounded-lg p-1 border-gray-300 border-2 hover:bg-gray-50 "} placeholder={placeholder} type={"text"} name={name}/>
        </div>
    );
};

export default TextBox;