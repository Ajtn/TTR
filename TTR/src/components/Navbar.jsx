import React from 'react'

//Currently just a hard coded nav menu
//Potentially upgrade to take menu items as arguments for custom navs
export default function Navbar() {
    return (
        <nav className="primary-nav">
            <ul className="primary-nav-ul">
                <li className="primary-nav-li"><p>asdfasdf</p>Home/Projects</li>
                <li className="primary-nav-li">5E</li>
                <li className="primary-nav-li"><a href=""> Pending TT Name </a></li>
            </ul>
        </nav>
    )
}

