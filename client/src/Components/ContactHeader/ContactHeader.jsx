import React from 'react'
import "./ContactHeader.css";
import Navbar from '../Navbar/Navbar';

function Header() {
    return (
        <div className='contact-container'>
            <Navbar />
            <div className='inside-contact'>
                    
                <span className='line'> </span>
                <p> Get In Touch</p>
                <p>With Us</p>
            </div>
        </div>
    )
}

export default Header
