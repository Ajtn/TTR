import React, {useState} from "react";

export default function Modal(props) {

    const body = <div className="modal">
        <div className="modal-header">
            <h2>{props.header}</h2>
        </div>
        <div className="moldal-body">
            {props.children}
        </div>
        <div className="modal-footer">
            {typeof props.buttons !== "undefined" && props.buttons.map(button => <button onClick={button.handleClick}>{button.text}</button>)}
        </div>
    </div>

    return (
        <div className="modal-shell">
            {props.visible && body}
        </div>
    )
}