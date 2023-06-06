import React, {MouseEventHandler} from "react";
import { modalField } from "./SearchTable.types";

type modalProps = {
    modalData: modalField[];
    closeFunction: (event: MouseEvent) => void;
};

export default function Modal(props: modalProps):React.JSX.Element {
    function configureData() {
        //define element arrays for head, body, and foot section of modal
        const hElements: Array<React.JSX.Element> = [],
        bElements: Array<React.JSX.Element> = [],
        fElements: Array<React.JSX.Element> = [];
        //populate each array with elements based on the modalSection field of object defined in props
        props.modalData.forEach((element) => {
            switch (element.modalSection) {
                case "head":
                    hElements.push(createElement(element));
                    break;
                case "body":
                    bElements.push(createElement(element));
                    break;
                case "footer":
                    fElements.push(createElement(element));
                    break;
            }
        });
        return {head: hElements, body: bElements, footer: fElements};
    }
        
    //create html as defined by displayAs field of object defined in props
    function createElement(fieldData: modalField):React.JSX.Element {
        switch (fieldData.displayAs) {
            case "h1":
                return <h1 key={fieldData.fieldName} className={`modal-content modal-h1 modal-${fieldData.modalSection}`}>{fieldData.value}</h1>;
                break;
            case "h2":
                return <h2 key={fieldData.fieldName} className={`modal-content modal-h2 modal-${fieldData.modalSection}`}>{fieldData.value}</h2>;
                break;
            case "p":
                return <p key={fieldData.fieldName} className={`modal-content modal-p modal-${fieldData.modalSection}`}>{fieldData.value}</p>;
                break;
            default:
                return <p className={`modal-content modal-p bad-modal-content modal-${fieldData.modalSection}`}>Content failed to load</p>
        }
    }
        
    const modalContent = configureData();

    const body = <>
        <div className="close-modal modal" onClick={props.closeFunction}>x</div>
        <div className="modal-header modal">
            {modalContent.head}
        </div>
        <div className="modal-body modal">
            {modalContent.body}
        </div>
        <div className="modal-footer modal">
            {modalContent.footer}
        </div>
    </>

    return (
        <div className="modal-shell">
            {body}
        </div>
    )
}