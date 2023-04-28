import React from "react";

export default function DetailedData (modalElements) {
    //console.log(modalElements);
    //define element arrays for head, body, and foot section of modal
    const hElements = [],
    bElements = [],
    fElements = [];
    //populate each array with elements based on the modalSection field of object defined in props
    for (const key in modalElements) {
        switch (modalElements[key].modalSection) {
            case "head":
                hElements.push(createElement(modalElements[key]));
                break;
            case "body":
                bElements.push(createElement(modalElements[key]));
                break;
            case "foot":
                fElements.push(createElement(modalElements[key]));
                break;
        }
    }
    //create html as defined by displayAs field of object defined in props
    function createElement(fieldData) {
        switch (fieldData.displayAs) {
            case "h1":
                return <h1 key={fieldData.objectField} className={`modal-content modal-h1 modal-${fieldData.modalSection}`}>{fieldData.value}</h1>;
                break;
            case "h2":
                return <h2 key={fieldData.objectField} className={`modal-content modal-h2 modal-${fieldData.modalSection}`}>{fieldData.value}</h2>;
                break;
            case "p":
                return <p key={fieldData.objectField} className={`modal-content modal-p modal-${fieldData.modalSection}`}>{fieldData.value}</p>;
                break;
        }
    }

    return {head: hElements, body: bElements, footer: fElements};
}