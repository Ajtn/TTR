import React from "react";

export default function NavIcon(props: {name: string, image: string, expanded: boolean, handleClick: (event: React.UIEvent) => void}) {

    return (
        <div onClick={props.handleClick} className={`navicon-${props.name} navicon`}>
            <img src={props.image} alt="navicon" width="30" height="30" onClick={props.handleClick} />
            {props.expanded && <p className="navicon-text">{props.name}</p>}
        </div>
    )
}