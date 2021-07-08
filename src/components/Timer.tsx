import React from 'react';
import { SecondsToMinutes } from '../utils/secondsToMinutes';

type TimerProps = {
    mainTime: number;
};
export function Timer(props: TimerProps): JSX.Element {
    return <div className="timer">{SecondsToMinutes(props.mainTime)}</div>;
}
