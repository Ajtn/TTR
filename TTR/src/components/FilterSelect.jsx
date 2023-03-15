import React from "react";

export default function FilterSelect(props) {
    return (
        <td className={`filter-td-top-row td-${props.name}`}>
            <select defaultValue={0} name={props.name} onChange={props.handleChange}>
                <option key="0" value={0}>Filter by {props.name}</option>
                {props.filterData.map(option => <option key={option} value={option}>{`${props.name} ${option}`}</option>)}
            </select>
        </td>
    )
}