import React, { useState } from 'react';
import { useEffect } from 'react';
import { useInterval } from '../hooks/useInterval';
import { Button } from './Button';
import { Timer } from './Timer';

type PropsType = {
    defaultPomodoroTime: number;
    defaultRestTime: number;
    defaultLongRestTime: number;
    cycles: number;
};

export function PomodoroTimer(props: PropsType): JSX.Element {
    const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);

    useEffect(() => {
        toogleWorkingMode();
    }, [working]);

    useInterval(
        () => {
            setMainTime(mainTime - 1);
        },
        timeCounting ? 1000 : null,
    );

    const enableWorking = () => {
        setTimeCounting(true);
        setWorking(true);
    };

    const disableWorking = () => {
        setTimeCounting(false);
        setWorking(false);
    };

    const toogleWorkingMode = () => {
        if (working === true) document.body.classList.add('working');
        else if (working === false) document.body.classList.remove('working');
    };

    return (
        <div className="pomodoro">
            <h2>You are: Working</h2>
            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button text="Working" onClick={() => enableWorking()} />
                <Button text="Rest" onClick={() => console.log(1)} />
                <Button text="Pause" onClick={() => disableWorking()} />
            </div>

            <div className="details">
                <p>Teste: 1</p>
                <p>Teste: 2</p>
                <p>Teste: 3</p>
                <p>Teste: 4</p>
            </div>
        </div>
    );
}
