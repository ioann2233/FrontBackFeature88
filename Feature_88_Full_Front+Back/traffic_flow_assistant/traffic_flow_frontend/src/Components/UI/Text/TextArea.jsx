import React from 'react';

const TextArea = ({title,description,value,onChange,...props}) => {
    return (
        <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-black">{title}</label>
            <textarea
                id="message"
                rows="4"
                {...props}
                value={value}
                onChange={onChange}
                className="block max-h-48 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={description}
            />
        </div>
    );
};
export default TextArea;