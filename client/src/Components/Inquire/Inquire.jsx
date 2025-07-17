import React from 'react'
import "./Inquire.css"
import img from "./images/img.png"


import { FaAngleUp } from "react-icons/fa6"
import { FaAngleDown } from "react-icons/fa6";
function Inquire() {
  return (
    <div>
      <div className="main-section">
        <div className="main-title">
          
          <span className="line3"></span>
          <p className="heading">FREQUENTLY ASKED QUESTIONS</p>
          <h2 className="text-heading">Most Popular Topics</h2>
        </div>

        <div className="first-section">
          <div className="first-column">
            <div className="first-item active">
              <h4>How Can I Confirm My Reservation?<FaAngleUp className='arr-up'/></h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In voluptate excepturi veritatis officiis eveniet quos similique error inventore eaque a.</p>
            </div>
            <div className="first-item">
              <h4>Do You Have Any Discount Code? <FaAngleDown className='arr-down'/> </h4>
            </div>
            <div className="first-item">
              <h4>Can I Cancel My Reservation? <FaAngleDown className='arr-down'/> </h4>
            </div>
            <div className="first-item">
              <h4>Up To What Age Are They Considered Children? <FaAngleDown className='arr-down'/> </h4>
            </div>
          </div>
         

          <div className="second-section">
             
            <div className="first-item active">
              <h4>Can I Book A Room Directly? <FaAngleUp className='arr-up'/></h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis sed possimus
                 </p>
            </div>
            <div className="first-item">
              <h4>What Is Included In Your Services?<FaAngleDown className='arr-down'/> </h4>
            </div>
            <div className="first-item">
              <h4>What Payment Methods Can I Use? <FaAngleDown className='arr-down'/> </h4>
            </div>
            <div className="first-item">
              <h4>Do You Have Hotels With A Spa? <FaAngleDown className='arr-down'/> </h4>
            </div>
          </div>
        </div>
      </div>
        <img src={img} alt='images' className='img-last'/>

    </div>
  )
}

export default Inquire

