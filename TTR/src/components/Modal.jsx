import React, {useState} from "react";

export default function Modal(props) {
    /*
        todo:
            -implement button option
    */
    //define element arrays for head, body, and foot section of modal
    const hElements = [],
    bElements = [],
    fElements = [];
    //populate each array with elements based on the modalSection field of object defined in props
    for (const key in props.modalData.modalElements) {
        switch (props.modalData.modalElements[key].modalSection) {
            case "head":
                hElements.push(createElement(props.modalData.modalElements[key]));
                break;
            case "body":
                bElements.push(createElement(props.modalData.modalElements[key]));
                break;
            case "foot":
                fElements.push(createElement(props.modalData.modalElements[key]));
                break;
        }
    }
    //create html as defined by displayAs field of object defined in props
    function createElement(fieldData) {
        switch (fieldData.displayAs) {
            case "h1":
                return <h1 key={fieldData.objectField} className={`modal-h1 modal-${fieldData.modalSection}`}>{fieldData.value}</h1>;
                break;
            case "h2":
                return <h2 key={fieldData.objectField} className={`modal-h2 modal-${fieldData.modalSection}`}>{fieldData.value}</h2>;
                break;
            case "p":
                return <p key={fieldData.objectField} className={`modal-p modal-${fieldData.modalSection}`}>{fieldData.value}</p>;
                break;
        }
    }

    const body = <>
        <div className="close-modal" onClick={props.closeFunction}>x</div>
        <div className="modal-header">
            {hElements}
        </div>
        <div className="moldal-body">
            {bElements}
        </div>
        <div className="modal-footer">
            {fElements}
        </div>
    </>

    return (
        <div className="modal-shell">
            {props.modalData.visible && body}
        </div>
    )
}