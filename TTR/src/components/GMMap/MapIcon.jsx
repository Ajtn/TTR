import React from 'react'

//Component to create individual map icons based on data sent from Map
export default function MapIcon(props) {
    let iconUrl = "";
    if (props.type === "npc") {
        iconUrl = "./src/assets/npcIcon.jpeg"
    } else if (props.type === "map") {
        iconUrl = "mapIcon.png"
    } else if (props.type === "item") {
        iconUrl = "itemIcon.png"
    }
    
    return (
        <div style={props.position} className={`map-icon ${props.type}`}>
            <div className='icon-text map-icon-scroll-text'>
                <h2 className='icon-title'>{props.title}</h2>
                <p className='icon-desc'>{props.desc}</p>
                <img className='icon-specific-img' src={props.img} alt={props.title} width="200px"/>
            </div>
            <img className='icon-map-image' src={iconUrl} alt='map icon'/>
        </div>
    )
}