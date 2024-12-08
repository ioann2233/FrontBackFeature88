import React from 'react';

const CoolButton = ({bg, children, onClick,color,width}) => {
    return (
        <button className={`pl-2 pr-2 text-lg mr-2 ml-2 lg:h-[40px] bg-white drop-shadow-sm border-2 rounded-2xl hover:scale-[1.05] transition-all 
         ${bg} ${color}
        hover:bg-gray-50` } onClick={onClick} style={{width: `${width}px`}}>
            {children}
        </button>
    );
};

export default CoolButton;