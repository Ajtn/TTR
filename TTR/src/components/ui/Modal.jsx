import React, {useState} from "react";

export default function Modal(props) {

    const body = <>
        <div className="close-modal modal" onClick={props.closeFunction}>x</div>
        <div className="modal-header modal">
            {props.head}
        </div>
        <div className="moldal-body modal">
            {props.body}
        </div>
        <div className="modal-footer modal">
            {props.footer}
        </div>
    </>

    return (
        <div className="modal-shell">
            {body}
        </div>
    )
}