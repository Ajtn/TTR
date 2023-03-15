import React, {useState} from 'react'
import MapIcon from './MapIcon'
import npcData from '../assets/testData'

export default function Map(props) {
    //list of all NPCs on map, includes location, carried items, knowledge, and alignment
    const [npcs, setNpc] = useState(npcData)
    //list of all sub-areas on map, includes location and data to load new map
    const [subMaps, setSubMaps] = useState([])
    const [items, setItems] = useState([])

    const npcIcons = npcs.map((npc) => {
        return <MapIcon
            key={npc.id}
            type="npc"
            title={npc.name}
            desc={npc.desc}
            img={npc.img}
            position={npc.position}
        />
    })

    const subMapIcons = subMaps.map((map) => {
        return <MapIcon
            type="map"
            title={map.name}
            desc={map.desc}
            img={map.img}
            position={map.position}
        />
    })


    //function to called when map clicked to add in new map marker for NPCs/items/sub maps
    //todo:
    //decide how to set flag for which type of feature is being added
    //could be a toggle button like choosing a painting tool in paint or could be a query after you click
    // function addFeature() {
    //     //find X Y co-ordinates within picture
    //     //ask for user to populate feature details
    //     //create new object for feature and append to appropriate state array
    //     if (npc === true) {

    //     } else if (subMap === true) {

    //     } else if (item === true) {

    //     }
    // }

    function addFeature(mouseEvent) {
        const {pageX, pageY} = mouseEvent;
        const xPos = `${pageX/document.documentElement.scrollWidth*100}%`,
        yPos = `${pageY/document.documentElement.scrollHeight*100}%`;
        setNpc((oldNpc) => {
            const temp = [];
            oldNpc.map((npc) => {
                console.log(npc)
                npc.id !== 1 ? temp.push(npc) : temp.push({...npc, position: {position: "absolute", left: xPos, top:yPos}})
            })
            return temp
        })
    }
    console.log(npcData);
    const imgStyle = {
        display: "block",
        margin: "0",
        width: "auto",
        height: "100vh",
        position: "relative",
        zIndex: "1"
    };

    return (
        <div className='map-container'>
            <img onClick={addFeature} className='map-img' src={props.mapLink} alt={props.mapName}/>
            {npcIcons}
            {subMapIcons}
        </div>
    )
}