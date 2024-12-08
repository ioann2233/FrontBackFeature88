import React, {useEffect, useState} from 'react';
import Status from "../Components/UI/Status/Status.jsx";
import Action from "../Components/UI/Action/Action.jsx";
import useIncidents from "../Hooks/useIncidents.jsx";
import Filter from "../Components/Filter/Filter.jsx";
import {reportGet} from "../Services/OurApi/index.js";

function formatDate(isoString) {
  const date = new Date(isoString);

  const pad = (num) => String(num).padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Month is 0-indexed
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}


const Admin = () => {
    const [incidents, setIncidents] = useState([]);
//     const [incidents, setIncidents] = React.useState([
//         {id:"1",type:"ДТП",place:"ул. Красная",
//             description:" Автоматически обнаружен затор. Уровень загрузки: 4/10. Средняя скорость: 20 км/ч",
//             time:" 06.12.2024 13:11", status:true, action:false},
//         {id:"2",type:"ДТП",place:"ул. Красная",
//             description:" Автоматически обнаружен затор. Уровень загрузки: 4/10. Средняя скорость: 20 км/ч",
//             time:" 06.12.2024 13:11", status:false, action:true},
//         {id:"13",type:"ДТП",place:"ул. Красная",
//             description:" Автоматически обнаружен затор. Уровень загрузки: 4/10. Средняя скорость: 20 км/ч",
//             time:" 06.12.2024 13:11", status:true, action:false},
//         {id:"4",type:"ДТП",place:"ул. Красная",
//             description:" Автоматически обнаружен затор. Уровень загрузки: 4/10. Средняя скорость: 20 км/ч",
//             time:" 06.12.2024 13:11", status:false, action:true},
//         {id:"5",type:"ДТП",place:"ул. Красная",
//             description:" Автоматически обнаружен затор. Уровень загрузки: 4/10. Средняя скорость: 20 км/ч",
//             time:" 06.12.2024 13:11", status:true, action:false},
//         {id:"6",type:"ДТП",place:"ул. Красная",
//             description:" Автоматически обнаружен затор. Уровень загрузки: 4/10. Средняя скорость: 20 км/ч",
//             time:" 06.12.2024 13:11", status:false, action:true},
//     ]);
    const [filter, setFilter] = useState(1);
    const filteredIncidents = useIncidents(filter,incidents);

     useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const fetchedIncidents = await reportGet();
                setIncidents(fetchedIncidents);
            } catch (error) {
                console.error("Error fetching incidents:", error);
            }
        };

        fetchIncidents();
    }, []);

    const changeStatus = (changingIncident) =>{
        const updatedIncident = {
            ...changingIncident,
            status: !changingIncident.status,
            action: !changingIncident.action
        };
        setIncidents(incidents.map(incident =>
            incident.id === changingIncident.id ? updatedIncident : incident
        ));
        console.log(updatedIncident)
    }
    return (
        <div className={"h-[777px] w-[90%] flex justify-center"}>
            <div className={"flex w-[80%] h-fit p-4"}>
                <div className={"flex flex-col w-full justify-center mt-5 p-5 pb-10 bg-gray-100 rounded-xl"}>
                    <div className={"flex justify-center w-full pt-10"}>
                        <p className={"font-bold text-3xl"}>Панель Администратора</p>
                    </div>
                    <div className={"flex flex-col w-80% h-fit mt-10 border-2 border-solid border-gray-200"}>
                        <div className={"flex flex-row justify-between p-4 text-2xl font-medium border-b-gray-300 border-solid border-b-2"}>
                            <p>Управление инцидентами</p>
                            <Filter setFilter={setFilter}/>
                        </div>
                        <div className={"flex flex-row w-full justify-between"}>

                            <div className={"overflow-auto"}>
                                <table className="min-w-full border-collapse border border-gray-200">
                                    <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-200 px-4 py-2 text-left max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">ID</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left">Тип</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left">Местоположение</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left">Описание</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left">Время</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left">Статус</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left">Действия</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        filteredIncidents.map((incident, index) =>
                                            <tr className="hover:bg-gray-50" key={incident.id}>
                                                <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                                                <td className="border border-gray-200 px-4 py-2">{incident.title}</td>
                                                <td className="border border-gray-200 px-4 py-2 min-w-[420px] max-w-[450px] overflow-hidden text-ellipsis whitespace-nowrap">{incident.location}</td>
                                                <td className="border border-gray-200 px-4 py-2">{incident.text}</td>
                                                <td className="border border-gray-200 px-4 py-2">{formatDate(incident.creature)}</td>
                                                <td className="border border-gray-200 px-4 py-2"><Status status={incident.status}/></td>
                                                <td className="border border-gray-200 px-4 py-2"><Action action={incident.action} onClick={() =>{changeStatus(incident)}}/></td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;