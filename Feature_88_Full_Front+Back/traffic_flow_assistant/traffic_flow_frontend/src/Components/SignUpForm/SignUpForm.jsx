import React from 'react';
import TextBox from "../UI/Text/TextBox.jsx";
import CoolButton from "../UI/CoolButton/CoolButton.jsx";

const SignUpForm = () => {
    return (
        <div className={"w-[450px] h-[600px] ml-auto mr-auto mt-20 flex justify-center box-content border-2 border-gray-100 rounded-3xl shadow-lg bg-white"}>
            <div className={"w-full p-[55px] flex flex-col  gap-4"}>
                <h1 className={"text-4xl font-bold text-gray-900 text-center"}>Регистрация</h1>
                <TextBox title={"Введите фио"} placeholder={"Имя и фамилия"} />
                <TextBox title={"Введите почту"} placeholder={"Почта"} />
                <TextBox title={"Введите логин"} placeholder={"Логин"} />
                <TextBox title={"Введите пароль"} placeholder={"Пароль"} />
                <div className={'flex justify-center mt-10'}>
                    <CoolButton children={"Регистрация"} bg={"bg-green-300"}/>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;