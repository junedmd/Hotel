
import React, { useState } from 'react';
import "./Growth.css";
import logo from "./images/img-bar.png";

function Growth() {
  const [isEditing2, setIsEditing2] = useState(false);
  const [text2, setText2] = useState("Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, quidem.");

  const handleBlur = async () => {
    try {
      await fetch("/update-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          component: "Growth",
          field: "paragraph2",
          value: text2,
        }),
      });
      console.log("Edit sent!");
    } catch (err) {
      console.error("Edit failed", err);
    }
    setIsEditing2(false);
  };

  return (
    <div className="container">
      <div className='content'>
        <div><span className='line2'> </span></div>
        <div>
          <span className='text2'> ABOUT TIMELINE</span>
          <p className='text3'>Our Growth Journey</p>
        </div>

        <div className="year-line">
          <div className="item"><p className="year gold-text">2000</p><div className="circle gold"></div></div>
          <div className="item"><p className="year gold-text">2006</p><div className="circle gold"></div></div>
          <div className="item"><p className="year gold-main">2012</p><div className="circle gold big"></div></div>
          <div className="item"><p className="year">2018</p><div className="circle white"></div></div>
          <div className="item"><p className="year">2023</p><div className="circle white"></div></div>
          <div className="line-track"></div>
        </div>

        <div className='last-wrapper'>
          <div className='triangle'></div>
          <div className='last-part'>
            <div className='last-left'></div>
            <div className='last-right'>
              <div className='main-last'>
                <img src={logo} alt="Room" className='logo-hotel' />
                <h2>Guest & Service Improvement</h2>
              </div>

              <div className="second-last">
                <h5>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit doloremque ipsa. consectetur adipisicing elit. Adipisci, quidem
                </h5>

                {isEditing2 ? (
                  <input
                    type="text"
                    className="editable-input"
                    value={text2}
                    autoFocus
                    onChange={(e) => setText2(e.target.value)}
                    onBlur={handleBlur}
                  />
                ) : (
                  <h5 className='end' onClick={() => setIsEditing2(true)}>
                    {text2}
                  </h5>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Growth;

