import React from "react";

export type rowField = {
    name: string;
    value: string | number;
    sizeTag: "small" | "medium" | "large" | "xLarge"
};

type dataRowProps = {
    dataForDisplay: rowField[];
    handleClick: (event: React.MouseEvent) => void;
    id: string;
};

export default function DataRow(props: dataRowProps) {
    const tdElements = props.dataForDisplay.map((element) => {
        return <td key={element.name} className={`info ${element.name} ${element.sizeTag}`}>{element.value}</td>
    });

    return (
        <tr onClick={props.handleClick} className={`${props.id} search-table data-row`}>
            {tdElements}
        </tr>
    )
}
