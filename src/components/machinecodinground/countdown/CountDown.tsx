'use client';
import React, { useEffect, useRef, useState } from 'react'


const CountDown = () => {


    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(3);
    const [second, setSecond] = useState(0);
    const pause = useRef(false);



    const getTime = () => {
        if (hour === 0 && minute === 0 && second === 0) return;
        if (pause.current) return;

        if (second !== 0) {
            setSecond((prev) => prev - 1);
            return;
        }

        if (minute !== 0) {
            setMinute((prev) => prev - 1);
            setSecond(59);
            return;
        }

        if (hour !== 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
            return;
        }
    }


    const handleReset = () => {
        setHour(0);
        setMinute(0);
        setSecond(0);
    }

    const handlePause = () => {
        pause.current = !pause.current;
    };




    useEffect(() => {
        const interval = setInterval(() => {
            getTime();
        }, 1000);
        return () => clearInterval(interval);
    }, [minute, hour, second]);

    return (

        <section>
            <div className='flex justify-between items-center bg-white text-black p-4'>
                <div className='flex flex-col justify-center items-center'>
                    <p>Hour</p>
                    <p>{hour.toString().padStart(2, '0')}</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p>Minutes</p>
                    <p>{minute.toString().padStart(2, "0")}</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p>Second</p>
                    <p>{second.toString().padStart(2, "0")}</p>
                </div>
            </div>
            <div className='bg-white text-black flex justify-between items-center p-4'>
                <button onClick={handlePause}>pause</button>
                <button onClick={handleReset}>reset</button>
            </div>
        </section>

    )
}

export default CountDown