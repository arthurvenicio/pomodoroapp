import React from 'react';
import { SecondsToTime } from '../utils/secondsToTime';

type TimerProps = {
    mainTime: number;
};
export function Timer(props: TimerProps): JSX.Element {
    return <div className="timer">{SecondsToTime(props.mainTime)}</div>;
}
