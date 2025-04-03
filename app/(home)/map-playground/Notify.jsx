"use client"
import React, {useEffect, useState} from "react";

// import {FaCircleCheck, FaCircleXmark} from "react-icons/fa6";


function Notify({value}) {
    const [show, setShow] = useState('hidden');

    useEffect(() => {

        setShow(value.visible ? 'block' : 'hidden')
        setTimeout(() => setShow('hidden'), value.timeout || 2000);
    }, [value.visible])


    return (
        <div className={" fixed top-[8%] right-[50%] left-[50%] text-center ml-auto mr-auto py-3 text-white " + show}>
            <div
                className={`w-fit  items-center gap-2 ${value.type == "failure" ? "bg-[#ff3333]" : "bg-green-400"} card rounded-3xl px-10 py-2 inline-block shadow-xl text-white`}>
                {/*{value.type === "success" ? <FaCircleCheck className='text-green-400'/> : <FaCircleXmark className='text-red-700'/>}*/}
                <p className='whitespace-nowrap'>{value.msg}</p>
            </div>
        </div>
    )
}

export default Notify;