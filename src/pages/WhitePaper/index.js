import React from 'react';
import { FaDownload } from 'react-icons/fa';

import './style.css'

const WhitePaper = () => {
  return (
    <React.Fragment>
      <div className="whitepaper">
        <p className='container fw-bold fs-2 cl-brown'>Download Whitepaper</p>

        <div className="container">
          <div className="world-map-bg my-5">
            <div className="world-map">
              <div className="row align-items-center m-0">
                <div className="col-sm-6">
                  <img src="assets/agamotto.gif" alt="agamotto" className='agamotto-gif' />
                </div>

                <div className="col-sm-6 d-flex justify-content-center">
                  <form className='d-block'>
                    <input type="text" className='text-input' placeholder='Full Name' />
                    <input type="text" className='text-input' placeholder='Email' />
                    <input type="text" className='text-input' placeholder='Phone No.' />
                    <button type='button' className='btn download-btn fw-bold'><FaDownload /><span className='ms-2'>Download</span></button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WhitePaper;