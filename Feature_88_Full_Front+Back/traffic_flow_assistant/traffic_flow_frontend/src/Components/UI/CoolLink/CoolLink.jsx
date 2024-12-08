import React from 'react';
import {Link} from "react-router-dom";

const CoolLink = ({linkTo, title}) => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Link to={`/${linkTo}`} className={"flex w-full h-full items-center justify-center"}>{title}</Link>
        </div>
    );
};

export default CoolLink;