import React from 'react';
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CoolDateTime = ({onChange}) => {
    const changeHandler = newValue => {
        onChange(newValue.toString().substr(0,15));
    }
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar onChange={(newValue) => changeHandler(newValue)} />
            </LocalizationProvider>
        </div>
    );
};

export default CoolDateTime;