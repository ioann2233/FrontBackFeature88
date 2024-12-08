import React from 'react';

const Status = ({status}) => {
    return (
        status
            ?<div className={"flex justify-center items-start w-[85px] h-[20px] pb-5 bg-lime-300 rounded-sm"}>
                <p>Активно</p>
            </div>
            :<div className={"flex justify-center items-start w-[85px] h-[20px] pb-5 bg-red-500 text-white rounded-sm"} >
                <p>Закрыт</p>
             </div>
    );
};

export default Status;