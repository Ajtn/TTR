import React from "react";

//todo: change x in order-by div to arrow
export default function FilterSelect(props) {
    let inputElement = {};
    if (props.type === "select") {
        inputElement = 
        (
        <select defaultValue={0} name={props.name} onChange={props.handleChange}>
            <option key="0" value={0}>Filter by {props.name}</option>
            {props.filterData.map(option => <option key={option} value={option}>{`${props.name} ${option}`}</option>)}
        </select>)
    } else {
        inputElement = <input name={props.name} placeholder={props.name} value={props.value} onChange={props.handleChange} />;
    }
    return (
        <td className={`${props.name} filter-td-top-row`}>
            <div className={`${props.name} order-by`} onClick={props.sort}>x</div>
            {inputElement}
        </td>
    );
}
