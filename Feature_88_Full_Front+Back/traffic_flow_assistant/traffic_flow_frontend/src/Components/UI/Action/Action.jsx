import React from 'react';

const Action = ({action, status,onClick}) => {
    return (
        action
            ?<div className={"flex justify-center items-start w-[120px] h-[16px] pb-5 border-solid border-green-300 border-2 rounded-md"}>
                <button onClick={onClick}>Активировать</button>
            </div>
            :<div className={"flex justify-center items-start w-[75px] h-[16px] pb-5 border-solid border-red-200 border-2 rounded-md"}>
                <button onClick={onClick}>Закрыть</button>
            </div>
    );
};

export default Action;