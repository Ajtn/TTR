import React, {MouseEventHandler} from "react";

type modalProps = {
    modalContent: {
        head?: React.JSX.Element[],
        body?: React.JSX.Element[],
        footer?: React.JSX.Element[]
    };
    closeFunction: (event: MouseEvent) => void;
};

export default function Modal(props: modalProps):React.JSX.Element {

    const body = <>
        <div className="close-modal modal" onClick={props.closeFunction}>x</div>
        <div className="modal-header modal">
            {props.modalContent.head}
        </div>
        <div className="modal-body modal">
            {props.modalContent.body}
        </div>
        <div className="modal-footer modal">
            {props.modalContent.footer}
        </div>
    </>

    return (
        <div className="modal-shell">
            {body}
        </div>
    )
}