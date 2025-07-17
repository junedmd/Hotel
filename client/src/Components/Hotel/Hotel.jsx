import React, { useState } from 'react';
import "./Hotel.css";
// import Dummy from '../../Pages/Dummy/Dummy';
import btn from "./images/Btn-logo.png";
import img1 from "./images/Item1.png";
import img2 from "./images/Item2.png";
import img3 from "./images/Item3.png";
import img4 from "./images/Item4.png";

function Hotel() {
   
    return (
        <div className="hotel-wrapper">
            {/* <Dummy/> */}
            <div className="hotel-info">
                <div className="right-section">
                    <img src={btn} alt="Play" className="play-btn" />
                </div>

                <div className="left-section">
                    <span className='line1'> </span> 
                    <h5 className="subheading">DISCOVER OUR HOTEL  </h5>
                    <h2 className="heading">Enjoy A Luxury <br />Experience</h2>
                    <p className="description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias error natus dolores nemo architecto est reiciendis nesciunt enim ratione soluta dolor commodi porro aliquid at non nam.
                    </p>

                    <div className="stats">
                        <div className="stat-item">
                            <img src={img1} alt="Employee" />
                        </div>
                        <div className="stat-item">
                            <img src={img2} alt="Facility" />
                        </div>
                        <div className="stat-item">
                            <img src={img3} alt="Room" />
                        </div>
                        <div className="stat-item">
                            <img src={img4} alt="Receptionist" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Hotel
