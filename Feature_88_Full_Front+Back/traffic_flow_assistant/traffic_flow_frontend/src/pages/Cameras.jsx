import React, {useEffect, useState} from 'react';
import Status from "../Components/UI/Status/Status.jsx";
import Action from "../Components/UI/Action/Action.jsx";
import useIncidents from "../Hooks/useIncidents.jsx";
import Filter from "../Components/Filter/Filter.jsx";
import {reportGet} from "../Services/OurApi/index.js";

const generateRandomIP = () => {
    const ipParts = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256));
    return ipParts.join('.');
};

const Cameras = () => {
    const [incidents, setIncidents] = useState([]);
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
                        <p className={"font-bold text-3xl"}>Панель камер</p>
                    </div>
                    <div className={"flex flex-col w-80% h-fit mt-10 border-2 border-solid border-gray-200"}>
                        <div className={"flex flex-row w-full justify-between"}>

                            <div className={"overflow-auto"}>
                                <table className="min-w-full border-collapse border border-gray-200">
                                    <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-200 px-4 py-2 text-left max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">IP камеры</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left">Тип</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left">Местоположение</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filteredIncidents.map((incident, index) => { // Note the curly braces and return statement
                                        const randomIP = generateRandomIP();
                                        return ( // You MUST return JSX here
                                            <tr className="hover:bg-gray-50" key={incident.id}>
                                                <td className="border border-gray-200 px-4 py-2 w-full">
                                                    <a href={"https://smart-traffic-signal-simulator-notebookkaggle2.replit.app/"} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-500">
                                                    {randomIP}
                                                        </a>
                                                    </td>
                                                        <td className="border border-gray-200 px-4 py-2 max-w-[600px]">{incident.title}</td>
                                                <td className="border border-gray-200 px-4 py-2 max-w-[600px] overflow-hidden text-ellipsis whitespace-nowrap">{incident.location}</td>
                                            </tr>
                                        );
                                    })
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

export default Cameras;