import React from "react";
import { modalField } from "./SearchTable.types";

export default function DetailedData (props: modalField[]) {
    //define element arrays for head, body, and foot section of modal
    const hElements = [],
    bElements = [],
    fElements = [];
    //populate each array with elements based on the modalSection field of object defined in props
    for (const key in props) {
        switch (props[key].modalSection) {
            case "head":
                hElements.push(createElement(props[key]));
                break;
            case "body":
                bElements.push(createElement(props[key]));
                break;
            case "foot":
                fElements.push(createElement(props[key]));
                break;
        }
    }
    //create html as defined by displayAs field of object defined in props
    function createElement(fieldData: modalField) {
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
        }
    }

    return {head: hElements, body: bElements, footer: fElements};
}