import React from 'react';
import CoolButton from "../UI/CoolButton/CoolButton.jsx";

const Filter = ({setFilter}) => {
    const changeFilter = (filter,e) => {
        setFilter(filter);
    }
    return (
        <div className={"flex flex-row gap-2"}>
            <CoolButton width={"125"} bg={"bg-yellow-400"} color={"hover:bg-zinc-200"} onClick={(e) => changeFilter(1, e)}>Все</CoolButton>
            <CoolButton width={"125"} bg={"bg-green-700"} color={"text-white hover:bg-zinc-200 hover:text-black"} onClick={(e) => changeFilter(2, e)}>Активные</CoolButton>
            <CoolButton width={"125"} bg={"bg-rose-800"} color={"text-white hover:bg-zinc-200 hover:text-black"} onClick={(e) => changeFilter(3, e)}>Закрытые</CoolButton>
        </div>
    );
};

export default Filter;