import React from 'react'
import "./Header.css";
import Navbar from '../Navbar/Navbar';

function Header() {
    return (
        <div className='main-content'>
            <Navbar />
            <div className='inside-contain'>
                    
                <span className='line'> </span>
                <p> Discover Our Story</p>
                

            </div>
        </div>
    )
}

export default Header
