import React from 'react'
import "./Contact.css"
import ContactForm from '../../Components/ContactForm/ContactForm'
import ContactHeader from "../../Components/ContactHeader/ContactHeader";
import ContactMiddle from "../../Components/ContactMiddle/ContactMiddle";
import Footer from '../../Components/Footer/Footer';
function Contact() {
  return (
    <div>
      <div className="contact main-part">
        <ContactHeader/>
      </div>

                    {/* overlap-wrapper */}
      <div className="contact-overlap"> 
        <div className="contact-form-container">
            <ContactForm/>
        </div>
      </div>

                    {/* section section-2 */}
      <div className="contact-last">
         <ContactMiddle />
      </div>
      
     
      <Footer />
    </div>
  )
}

export default Contact
