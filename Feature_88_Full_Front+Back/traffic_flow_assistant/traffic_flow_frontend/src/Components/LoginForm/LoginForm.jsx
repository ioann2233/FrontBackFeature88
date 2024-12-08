import React from 'react';
import TextBox from "../UI/Text/TextBox.jsx";
import CoolButton from "../UI/CoolButton/CoolButton.jsx";

const SignUpForm = () => {
    return (
        <div className={"w-[450px] h-[400px] ml-auto mr-auto mt-20 flex justify-center box-content border-2 border-gray-100 rounded-3xl shadow-lg bg-white"}>
            <div className={"w-full p-[55px] flex flex-col  gap-4"}>
                <h1 className={"text-4xl mb-5 font-bold text-gray-900 text-center"}>Авторизация</h1>
                <TextBox title={"Введите логин"} placeholder={"Логин"} />
                <TextBox title={"Введите пароль"} placeholder={"Пароль"} />
                <div className={'flex justify-center mt-5'}>
                    <CoolButton children={"Войти"}/>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;