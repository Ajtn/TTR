import React from "react";

export default function DataRow(props) {
    let components = "";
    if (props.data.system.components.focus)
        components = components + "f";
    if (props.data.system.components.material)
        components = components + "m";
    if (props.data.system.components.somatic)
        components = components + "s";


    return (
        <tr onClick={props.handleClick} dataid={props.data._id} className="spell-row">
            <td className="td-name td-info">{props.data.name}</td>
            <td className="td-level td-info">{props.data.system.level.value}</td>
            <td className="td-school td-info">{props.data.system.school.value}</td>
            <td className="td-source td-info">{props.data.system.source.value}</td>
            <td className="spelltext td-info">
                <div>
                    <h2 className="spelltext-heading">{props.data.name}</h2>
                    <h4 className="spelltext-info">Components: {components}</h4>
                    <div className="spelltext-body" dangerouslySetInnerHTML={{__html: props.data.system.description.value}}></div>
                </div>
            </td>
        </tr>
    )
}

