import React from 'react';
import './Footer.css';
import logo from "./image/Logo.png"
import { FaTwitter, FaFacebookF, FaInstagram, FaPinterestP, FaDribbble } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Left Column */}
                <div className="footer-section">
                    <div>
                        <img src={logo} alt='logo' className='logo1' />
                    </div>
                    <p className="footer-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                {/* Middle Column */}
                <div className="links-section">
                    <h4>USEFUL LINKS</h4>
                    <ul>
                        <li>HOME</li>
                        <li>ABOUT</li>
                        <li>SERVICE</li>
                        <li>ROOM</li>
                    </ul>
                </div>

                {/* Right Column */}
                <div className=" subscribe-section">
                    <h4>SUBSCRIBE</h4>
                    <p>Don’t miss to subscribe our news, kindly fill the form below</p>
                    <div className="subscribe-input">
                        <input type="email" placeholder="Your Email Here" />
                        <button>{'>'}</button>
                    </div>
                </div>
            </div>

            {/* Social Icons and Bottom Line */}
            <div className="footer-social">
                <div className="social-icons">
                    <FaTwitter />
                    <FaFacebookF />
                    <FaInstagram />
                    <FaPinterestP />
                    <FaDribbble />
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <p>© 2025 Imperial Grand Hotel. All Rights Reserved.</p>
                <div>
                    <a href="/">Privacy Policy</a>
                    <a href="/">Terms of Use</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
