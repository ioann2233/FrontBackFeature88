import React, {useEffect, useState} from 'react';
import {YMaps, Map, TrafficControl, Placemark} from '@pbe/react-yandex-maps';
import Chat from "../Chat/Chat.jsx";
import {reportGet} from "../../Services/OurApi/index.js";
import report from "../../pages/Report.jsx";
import Report from "../../pages/Report.jsx";
import CurrentIncidents from "../CurrentIncidents/CurrentIncidents.jsx";

const MyPlacemark = ({ coordinates, content }) => (
  <Placemark geometry={coordinates} properties={{ balloonContent: content }} />
);

const MapWrap = ({isDisplayIncidents}) => {
    const [incidents, setIncidents] = React.useState([]);
    const [reports, setReports] = useState([]);
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const newReports = await reportGet(); // Используем await!
                setReports(newReports); // Обновляем состояние
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
                //Обработка ошибки, например, вывод сообщения об ошибке пользователю
            }
        };

        fetchReports();
    }, []);


    const markers = [
    { coordinates: [45.011682, 38.991977], content: 'Marker 1'},
    { coordinates: [45.044957, 38.983289], content: 'Marker 2'},
    { coordinates: [45.016467, 38.956675], content: 'Marker 3'},
  ];

    return (
        <YMaps>
            {isDisplayIncidents
                ? <div
                    className={"flex flex-col px-12 py-8 2xl:w-[70%] bg-white border-2 border-solid border-gray-300 rounded-3xl"}>
                    <div className={"flex flex-row"}>
                        <div>
                            <p className={"mb-3 text-2xl"}>Карта дорожной ситуации</p>
                            <div className={"border-2 border-solid border-gray-300 w-[100%] h-[85%] rounded-md pl-1"}>
                                <Map defaultState={{center: [45.02, 38.95], zoom: 10}} height={"500px"} width={"700px"}>
                                    <TrafficControl options={{float: "right"}}/>
                                    {markers.map((marker, index) => (
                                        <MyPlacemark key={index} coordinates={marker.coordinates} content={marker.content} />
                                      ))}
                                </Map>
                            </div>
                        </div>
                        <CurrentIncidents reports={reports} />
                    </div>
                </div>
                : <div
                    className={"flex flex-col px-12 py-8 2xl:w-[80%] h-[650px] bg-white border-2 border-solid border-gray-300 rounded-3xl"}>
                    <div className={"flex flex-row"}>
                        <div className={"mr-20"}>
                            <p className={"mb-3 text-2xl"}>Карта дорожной ситуации</p>
                            <div className={"border-2 border-solid border-gray-300 w-[100%] h-[54%] rounded-md pl-1"}>
                                <Map defaultState={{center: [45.02, 38.95], zoom: 10}} height={"500px"} width={"700px"}>
                                    <TrafficControl options={{float: "right"}}/>
                                    {markers.map((marker, index) => (
                                        <MyPlacemark key={index} coordinates={marker.coordinates} content={marker.content} />
                                     ))}
                                </Map>
                            </div>
                        </div>
                        <Report report={report} height={""}/>
                    </div>
                </div>}


        </YMaps>
    );
};

export default MapWrap;