import React from 'react'
import "./ContactMiddle.css";
import { FaMapMarkerAlt, FaStar, FaPlus, FaMinus } from "react-icons/fa";
import img1 from "./images/tel.png";
import img2 from "./images/mail.png";
import img3 from "./images/location.png";

function ContactMiddle() {
    return (
        <div>
            <div className="hotel-info">
                <div className="right-section">
                    <div className="map-container">
    
                        <div className="location-card">
                            <h3>Imperial Grand Hotel</h3>
                            <p>1250 West 6th Ave, New York, NY 10036,<br />United States</p>
                            <div className="rating">
                                <FaStar className="star" />
                                <span>4.8</span>
                                <span>• 208,443 Reviewers</span>
                            </div>
                        </div>

    
                        <FaMapMarkerAlt className="location-marker" />

                        <div className="square"></div>

                        
                        <div className="zoom-controls">
                            <button><FaPlus className="btns" /></button>
                            <button><FaMinus className="btns" /></button>
                        </div>
                    </div>
                </div>

                <div className="left-section">
                    <span className='line1'> </span>
                    <h5 className="subheading">CONTACT INFO</h5>
                    <h2 className="heading">Contact US</h2>

                    <div className="contact-details">
                        <div className="contact-row">
                            <img src={img2} alt="Email" className="contact-icon" />
                            <div>
                                <div className="contact-title">Email Address</div>
                                <div className="contact-subtitle">info@8pxlstudio</div>
                            </div>
                        </div>

                        <div className="contact-row">
                            <img src={img3} alt="Location" className="contact-icon" />
                            <div>
                                <div className="contact-title">Hotel Location</div>
                                <div className="contact-subtitle">1250 West 6th Ave, New York, NY 10036, United States</div>
                            </div>
                        </div>

                        <div className="contact-row">
                            <img src={img1} alt="Phone" className="contact-icon" />
                            <div>
                                <div className="contact-title">Phone Number</div>
                                <div className="contact-subtitle">+0123456789</div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default ContactMiddle
