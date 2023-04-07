import React from "react";

//props:
//  -dataForDisplay: [name, level, school, source]
//  -handleClick: updateSearch
//  -id: json identifier

export default function DataRow(props) {
    const keys = Object.keys(props.dataForDisplay);
    const tdElements = keys.map((key) => {
        return <td key={key} className={`info ${key} ${props.dataForDisplay[key].sizeTag}`}>{props.dataForDisplay[key].value}</td>
    })

    return (
        <tr onClick={props.handleClick} className={`${props.id} search-table data-row`}>
            {tdElements}
        </tr>
    )
}

