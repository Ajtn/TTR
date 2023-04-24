import React from 'react';
import NavIcon from './NavIcon';
import minIcon from '../../assets/diamond.svg';
import book from '../../assets/book.png'
import chip from '../../assets/chip.png'
import page from '../../assets/page.png'

export default function Navbar(props) {
    let navOptions = [
        {name: "Pathfinder Spelllist", image: "book", expanded: false},
        {name: "Unknown Spelllist", image: "page", expanded: false},
        {name: "Ability List", image: "chip", expanded: false}
    ];

    const body = navOptions.map((option) => {
        let icon = book;
        switch (option.image) {
            case "book":
                icon = book;
                break;
            case "chip":
                icon = chip;
                break;
            case "page":
                icon = page;
                break;
        }
        return (<NavIcon key={option.name} name={option.name} image={icon} expanded={props.navState}/>);
    });

    return (
        <nav className={props.navState ? "expanded-nav primary-nav" : "hidden-nav primary-nav"} >
            <div className="toggle-nav"><img onClick={props.handleClick} src={minIcon} alt="expand icon" width={25}/></div>
            <div className='nav-main' onMouseEnter={props.mouseOn} onMouseLeave={props.mouseOff}>{body}</div>
        </nav>
    )

}

