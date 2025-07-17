import React from "react";
import "./ContactForm.css";
import { FiEdit, FiMail, FiSearch } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa6";
const ContactForm = () => {
  return (
    <div className="form-section">
      <div className="form-main">
        <form>
          <label>Name</label>
          <div className="input-form">
            <input type="text" placeholder="Your Name Here"  className="inputs"/>
            <FiEdit className="icon" />
          </div>

          <label>Email</label>
          <div className="input-form">
            <input type="email" placeholder="Your Email Here" className="inputs" />
            <FiMail className="icon" />
          </div>

          <label>Message</label>
          <div className="input-form message-box">
            <textarea placeholder="Your Message Here"  className="inputs" />
            <FiSearch className="icon" />
          </div>

          <button type="submit" className="submit-btn">Check Availability   <FaAngleRight className="arrow"/> </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
