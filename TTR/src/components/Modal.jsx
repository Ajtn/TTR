import React, {useState} from "react";

export default function Modal(props) {

    const body = <div className="modal">
        <div className="close-modal" onClick={props.handleClick}>x</div>
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
        <div className="modal-shell" tabIndex={0} onKeyDown={props.handleClick}>
            {props.visible && body}
        </div>
    )
}