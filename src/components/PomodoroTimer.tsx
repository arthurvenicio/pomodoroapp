import React, { useState } from 'react';
import { useEffect } from 'react';
import { useInterval } from '../hooks/useInterval';
import { SecondsToTime } from '../utils/secondsToTime';
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
    const [resting, setResting] = useState(false);
    const [isPaused, setIsPause] = useState(true);
    const [completedCycles, setCompletedCycles] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);
    const [cyclesQtdManager, setCyclesQtdManager] = useState(
        new Array(props.cycles - 1).fill(true),
    );

    useInterval(
        () => {
            setMainTime(mainTime - 1);
            if (working) setFullWorkingTime(fullWorkingTime + 1);
        },
        timeCounting ? 1000 : null,
    );

    const enableWorking = () => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setIsPause(false);
        setMainTime(props.defaultPomodoroTime);
    };

    const pauseMode = () => {
        setTimeCounting(!timeCounting);
        setIsPause(!isPaused);
    };

    const configureRest = (Long: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setResting(true);
        setIsPause(false);

        if (Long) {
            setMainTime(props.defaultLongRestTime);
        } else {
            setMainTime(props.defaultRestTime);
        }
    };

    const toogleWorkingMode = () => {
        if (working === true) document.body.classList.add('working');
        else if (working === false) document.body.classList.remove('working');
    };

    useEffect(() => {
        toogleWorkingMode();

        if (mainTime > 0) return;

        if (working && cyclesQtdManager.length > 0) {
            configureRest(false);
            cyclesQtdManager.pop();
        } else if (working && cyclesQtdManager.length <= 0) {
            configureRest(true);
            setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
            setCompletedCycles(completedCycles + 1);
        }

        if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    }, [
        working,
        mainTime,
        cyclesQtdManager,
        numberOfPomodoros,
        completedCycles,
        configureRest,
        setCyclesQtdManager,
        props.cycles,
    ]);

    return (
        <div className="pomodoro">
            <h2>You are: Working</h2>
            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button text="Working" onClick={() => enableWorking()} />
                <Button text="Rest" onClick={() => configureRest(false)} />
                <Button
                    className={!working && !resting ? 'hidden' : ''}
                    text={!isPaused ? 'Pause' : 'Play'}
                    onClick={() => pauseMode()}
                />
            </div>

            <div className="details">
                <p>Completed Cycles: {completedCycles}</p>
                <p>Cycles Completed: {SecondsToTime(fullWorkingTime)}</p>
                <p>Completed Pomodoro: {completedCycles}</p>
            </div>
        </div>
    );
}
