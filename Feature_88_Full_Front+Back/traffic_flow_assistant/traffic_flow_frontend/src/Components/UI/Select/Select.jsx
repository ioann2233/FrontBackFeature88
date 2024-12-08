import React from 'react';

const Select = function({options, defaultOption, value, onChange}){
    return (
        <select
            value={value} // Убедитесь, что value соответствует одному из значений в options
            onChange={event => onChange(event.target.value)}
            className={"bg-white p-2 h-10 w-56"}
        >
            <option value="">{defaultOption}</option>
            {
                options.map(option => (
                    <option key={option.id ? option.id : option.type_inc} value={option.id ? [option.id, option.title] : [option.type_inc, option.title]}>
                        {option.title}
                    </option>
                ))
            }
        </select>
    );
};
export default Select;