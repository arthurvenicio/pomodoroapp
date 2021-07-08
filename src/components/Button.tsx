import React from 'react';

type ButtonProps = {
    text: string;
    onClick?: () => void;
    className?: string;
};
export function Button(props: ButtonProps): JSX.Element {
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.text}
        </button>
    );
}
