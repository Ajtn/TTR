import React, {useState} from "react";

export default function Modal(props) {
    /*
        todo:
            -setup more appropriate keys
            -implement different sections of modal
                -can filter here or in search table (ie pass lists of pre filtered data or pass data object with position name)
    */
    let hElements = [];
    
    if (props.head)
        hElements = props.head.map((data) => <p key={data} className="modal-content">{data}</p>);

    function heading(content) {
        return <h1 className="modal-heading">{content}</h1>
    }

    function subHeading(content) {
        return <h2 className="modal-subheading">{content}</h2>
    }

    function paragraph(content) {
        return <p className="modal-paragraph">{content}</p>
    }

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
            {props.visible && hElements}
        </div>
    )
}