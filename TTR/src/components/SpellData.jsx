import React from "react";

export default function SpellData(props) {
    let components = "";
    if (props.data.system.components.focus)
        components = components + "f";
    if (props.data.system.components.material)
        components = components + "m";
    if (props.data.system.components.somatic)
        components = components + "s";

    return (
        <>
            <h4 className="spelltext-info">Components: {components}</h4>
            <div className="spelltext-body" dangerouslySetInnerHTML={{__html: props.data.system.description.value}}></div>
        </>
    )

}