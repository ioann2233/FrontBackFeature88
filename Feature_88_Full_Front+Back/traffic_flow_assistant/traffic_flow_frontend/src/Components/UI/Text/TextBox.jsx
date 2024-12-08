import React from 'react';

const TextBox = ({title, placeholder,...props}) => {
    return (
        <div className={"flex flex-col w-full"}>
            {title &&
                <p className={"font-medium text-xl mb-2"}>{title}</p>
            }
            <input className={"w-full rounded-lg p-2 border-gray-300 border-2 hover:bg-gray-50 "}
                   placeholder={placeholder} type={"text"} {...props}/>
        </div>
    );
};

export default TextBox;