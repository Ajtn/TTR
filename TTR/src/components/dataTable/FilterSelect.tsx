import React from "react";
import ArrowUp from "../../assets/triangleUp.svg";
import ArrowDown from "../../assets/triangleDown.svg";
import Diamond from "../../assets/diamond.svg";
import { filter } from "./SearchTable.types";

type filterSelectProps = {
    filterData: filter;
    value: string | number;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => void;
    sort: (event: React.MouseEvent<HTMLImageElement>) => void;
    selected?: {fieldName: string, extension?: string, invert: boolean};
};

export default function FilterSelect(props: filterSelectProps) {
    const {filterName: name, filterOptions: options, inputType: input, varType: type ,scale: size} = props.filterData;
    let inputElement: null | React.ReactNode;
    if (input === "select") {
        if (type === "number") {
            inputElement = 
            (
            <select defaultValue={0} name={name} onChange={props.handleChange}>
                <option key={0} value={0}>Filter by {name}</option>
                {options?.map(option => <option key={option} value={option}>{`${name} ${option}`}</option>)}
            </select>)
        } else {
            inputElement = 
            (
            <select defaultValue="" name={name} onChange={props.handleChange}>
                <option key="0" value="">Filter by {name}</option>
                {options?.map(option => <option key={option} value={option}>{`${name} ${option}`}</option>)}
            </select>)
        }
    } else {
        inputElement = <input name={name} placeholder={name} value={props.value} onChange={props.handleChange} />;
    }
    let icon: string;
    if (props.selected === undefined) {
        icon = Diamond;
    } else {
        if (props.selected.fieldName === name)
            icon = props.selected.invert ? ArrowUp : ArrowDown;
        else 
            icon = Diamond;
    }

    return (
        <td className={`${name} ${size} filter`}>
            <div className={`${name} order-by`}><img onClick={props.sort} src={icon} alt="select icon" width={25}/></div>
            {inputElement}
        </td>
    );
}
