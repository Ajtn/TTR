import React from "react";

//props:
//  -dataForDisplay: [name, level, school, source]
//  -handleClick: updateSearch
//  -id: json identifier
//*may want to turn data into objects instead of raw values to have access to keys (for classname)
export default function DataRow(props) {
    const keys = Object.keys(props.dataForDisplay);
    const tdElements = keys.map((key) => {
        return <td key={key} className={`td-info td-${key}`}>{props.dataForDisplay[key]}</td>
    })

    return (
        <tr onClick={props.handleClick} className={`${props.id} search-table data-row`}>
            {tdElements}
        </tr>
    )
}

