import flashLight from "/src/Images/emergency.png";
import React, { useState, useEffect } from 'react';
import { Device } from '@twilio/voice-sdk';
import validator from 'validator';

const CallButton = () => {
    const [phoneNumber, setPhoneNumber] = useState('+1231241241');
    const [isCalling, setIsCalling] = useState(false);
    const [callStatus, setCallStatus] = useState('');
    const [device, setDevice] = useState(null);

    useEffect(() => {
        // Функция для получения токена доступа с сервера
        const fetchToken = async () => {
            try {
                const response = await fetch('/token'); // Замените на ваш эндпоинт для получения токена
                const data = await response.json();
                const newDevice = new Device(data.token, {
                    // Дополнительные опции, если необходимо
                });

                newDevice.on('ready', () => setCallStatus('Device is ready'));
                newDevice.on('error', (error) => setCallStatus( error.message));
                newDevice.on('disconnect', () => setIsCalling(false));

                setDevice(newDevice);
            } catch (error) {
            }
        };

        fetchToken();
    }, []);

    const handleCall = () => {
        if (!validator.isMobilePhone(phoneNumber, 'any')) {
            setCallStatus("Неправильный номер");
            return;
        }

        if (isCalling) {
            device.disconnectAll();
        } else {
            const call = device.connect({ params: { To: phoneNumber } });
            setIsCalling(true);
            setCallStatus('Calling...');

            call.on('disconnect', () => {
                setIsCalling(false);
                setCallStatus('Call ended');
            });

            call.on('error', (error) => {
                setIsCalling(false);
                console.log(error);
            });
        }
    };

    return (
        <div className="right-10 bottom-28 flex justify-center items-center flex-col fixed">
            <div className={"flex flex-col text-center justify-center max-w-38 bg-rose-600 p-2 text-white rounded-xl mb-5"}>
                {callStatus && <p>{callStatus}</p>}
            </div>
            <div className={"flex w-full justify-end items-end"}>
                <button onClick={handleCall}>
                    <img src={flashLight} alt="camera"
                         className={" w-16 h-16 rounded-full border-solid border-2 borer-zinc-800"}/>
                </button>
            </div>
        </div>
    );
};

export default CallButton;