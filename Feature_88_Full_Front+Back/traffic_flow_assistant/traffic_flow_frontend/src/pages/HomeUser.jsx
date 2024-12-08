import React from 'react';
import MapWrap from "../Components/MapWrap/MapWrap.jsx";

const HomeUser = () => {
    return (
        <div className={"w-full h-[100%] pb-[7px] flex bg-auto items-center justify-center"}>
            <div className={"flex flex-col w-[100%] justify-center items-center"}>
                <div className={'w-full h-10 flex justify-center items-center pt-16 mb-10'}>
                    <h1 className={"text-center text-4xl font-bold text-lime-200"}></h1>
                </div>
                <div className={"w-[100%] p-2 flex flex-col items-center shadow-xl drop-shadow rounded-lg"}>
                    <MapWrap isDisplayIncidents={false}/>
                </div>
            </div>

        </div>
    );
};

export default HomeUser;