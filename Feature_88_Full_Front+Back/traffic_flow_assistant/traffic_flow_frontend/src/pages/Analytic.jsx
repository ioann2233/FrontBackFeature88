import React, {useState} from 'react';
import {BarChart} from "@mui/x-charts";
import CoolDateTime from "../Components/UI/CoolDateTime/CoolDateTime.jsx";
import dayjs from "dayjs";

const Analytic = () => {
    const [regionReports, setRegionReports] = React.useState([
        {region:"Тест регsssssss",avgLoad:"30",avgSpeed:"40",incident:"Затор"},
        {region:"Тест регион",avgLoad:"30",avgSpeed:"40",incident:"Затор"},
        {region:"Тест регион",avgLoad:"30",avgSpeed:"40",incident:"Затор"},
        {region:"Тест регион",avgLoad:"30",avgSpeed:"40",incident:"Затор"},
        {region:"Тест регион",avgLoad:"30",avgSpeed:"40",incident:"Затор"},
    ])
    const [currentDate, setCurrentDate] = useState("Sun, 08 Dec 202");
    const stats = [
        {date: "Sun, 02 Dec 202",data: [10, 3, 1, 8, 5, 2, 9, 4, 7, 6, 10, 2, 8, 1, 5, 9, 4, 7, 3, 6, 1, 10, 2, 8]},
        {date: "Mon, 03 Dec 202",data: [7, 1, 6, 3, 10, 2, 9, 5, 8, 4, 7, 1, 6, 3, 10, 2, 9, 5, 8, 4, 7, 1, 6, 3]},
        {date: "Tue, 03 Dec 202",data: [5, 8, 3, 10, 6, 1, 4, 9, 2, 7, 5, 8, 3, 10, 6, 1, 4, 9, 2, 7, 5, 8, 3, 10]},
        {date: "Wed, 04 Dec 202",data:  [6, 10, 5, 2, 9, 4, 1, 7, 3, 8, 6, 10, 5, 2, 9, 4, 1, 7, 3, 8, 6, 10, 5, 2]},
        {date: "Thu, 05 Dec 202",data:  [7, 4, 2, 9, 6, 1, 10, 8, 5, 3, 7, 1, 4, 8, 2, 10, 5, 3, 6, 9, 7, 4, 1, 2]},
        {date:"Fri, 06 Dec 202", data: [1, 1, 3, 2, 3, 7, 5, 6, 7, 8, 9, 10, 3, 5, 1, 2, 3, 3, 2, 8, 4, 2, 3, 1]},
        {date:"Sat, 07 Dec 202", data: [3, 1, 1, 2, 7, 4, 5, 6, 3, 3, 9, 10, 9, 5, 1, 2, 3, 1, 2, 8, 4, 2, 1, 1]},
        {date:"Sun, 08 Dec 202", data: [1, 1, 1, 7, 3, 4, 7, 6, 7, 8, 3, 10, 9, 5, 1, 2, 3, 1, 8, 4, 4, 2, 1, 1]},
    ]
    const filteredStats = stats.find(stat => stat.date === currentDate)?.data;
    return (
        <div className={"flex flex-col mt-10 h-full w-[70%]"}>
            <div className={"flex h-[100%] items-center bg-zinc-50 mb-10 rounded-xl border-2 border-zinc-200 border-solid"}>
                <div className={"flex ml-12 bg-rose-100"}>
                    <CoolDateTime onChange={setCurrentDate} />
                </div>
                <div className={"flex ml-16  mt-4 mb-4"}>
                    <BarChart
                        xAxis={[
                            {
                                id: 'barCategories',
                                data: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",],
                                scaleType: 'band',
                                label: "Время"
                            },
                        ]}
                        yAxis={
                            [{id: 'time', label:"Баллы"}]
                        }
                        series={[
                            {
                                data: filteredStats ? filteredStats : []
                            },

                        ]}
                        width={900}
                        height={500}
                    />
                </div>

            </div>

            <div className="overflow-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2 text-left">Регион</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Средняя загрузка</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Средняя скорость</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Инциденты</th>
                    </tr>
                    </thead>
                    <tbody className={"bg-zinc-200"}>
                    {
                        regionReports.map((region, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">{region.region}</td>
                                <td className="border border-gray-200 px-4 py-2">{region.avgLoad}</td>
                                <td className="border border-gray-200 px-4 py-2">{region.avgSpeed}</td>
                                <td className="border border-gray-200 px-4 py-2">{region.incident}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
            );
            };

            export default Analytic;