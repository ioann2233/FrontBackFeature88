import React, {useState} from 'react';
import camera from "D:/django/traffic_flow_assistant/traffic_flow_frontend/src/Images/camera.png";

const Camera = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [address, setAddress] = useState("");
    const toggleForm = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen); // Переключаем состояние
    };
    const cameraPost = (e) =>{
        console.log(address);
        e.preventDefault();
        if(address.length>0){
            toggleForm(e);
            setAddress("");
        }
    }
    return (
        <div className={"right-10 bottom-10 fixed w-16"}>
            <button onClick={toggleForm}>
                <img src={camera} alt="camera" className={"rounded-full border-solid border-2 borer-zinc-800"}/>
            </button>
            {isOpen && (
                <div className="mb-6 mr-8 p-4 w-60 bg-sky-50 border-2 border-solid border-zinc-300 rounded-t-2xl rounded-l-2xl shadow-lg absolute bottom-10 right-10 transition-all">
                    <h2 className="text-lg font-semibold mb-2">Введите локацию</h2>
                    <form>
                        <input
                            type="text"
                            placeholder="Введите вашу локацию"
                            className="border border-gray-300 rounded p-2 w-full"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                        <div className={"flex justify-end"}>
                            <button
                                type="submit"
                                className="mt-2 bg-green-500 text-white font-bold py-2 px-4 rounded"
                                onClick={cameraPost}
                            >
                                Отправить
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
export default Camera;