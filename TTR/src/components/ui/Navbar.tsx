import React from 'react';
import NavIcon from './NavIcon';
import minIcon from '../../assets/diamond.svg';
import book from '../../assets/book.png'
import chip from '../../assets/chip.png'
import page from '../../assets/page.png'

type navbarProps = {
    handleChange: (event: React.MouseEvent | React.KeyboardEvent) => void;
    navState: boolean;
};

export default function Navbar(props: navbarProps) {
    let navOptions = [
        {name: "Home", image: "book", expanded: false},
        {name: "Pathfinder Spelllist", image: "book", expanded: false},
        {name: "Unknown Spelllist", image: "page", expanded: false},
        {name: "Ability List", image: "chip", expanded: false}
    ];

    function loadContent(event: React.UIEvent):void {
        //todo: add in logic to change app based on icon clicked
    }

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
        return (<NavIcon key={option.name} name={option.name} image={icon} expanded={props.navState} handleClick={loadContent}/>);
    });

    return (
        <nav className={props.navState ? "expanded-nav primary-nav" : "hidden-nav primary-nav"} >
            <div className="toggle-nav"><img onClick={props.handleChange} src={minIcon} alt="expand icon" width={25}/></div>
            <div className='nav-main' onMouseEnter={props.handleChange} onMouseLeave={props.handleChange}>{body}</div>
        </nav>
    )

}

