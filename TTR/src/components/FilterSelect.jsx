import React from "react";
import ArrowUp from "../assets/triangleUp.svg";
import ArrowDown from "../assets/triangleDown.svg";
import Diamond from "../assets/diamond.svg";

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
        let icon = "";
        if (props.selected === undefined) {
            console.log("huh");
            icon = Diamond;
        } else {
            console.log(props.selected.fieldName);
            icon = (props.selected.fieldName === props.name) ? ArrowDown : Diamond;
        }

    return (
        <td className={`${props.name} filter-td-top-row`}>
            <div className={`${props.name} order-by`}><img onClick={props.sort} src={icon} alt="select icon" width={25}/></div>
            {inputElement}
        </td>
    );
}
