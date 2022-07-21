import React from 'react';

import './style.css'

const RuneItem = ({ name1, name2, tokens, rewards, img_url, img_alt }) => {
  return (
    <React.Fragment>
      <div className="row my-4">
        <div className="col-md-8 text-start">
          <p className='fw-bold fs-5'>{name1} GENERATOR</p>
          <p className='m-0'>Strength:</p>
          <p>1 {name2} Generator can be purchased with <span className='cl-brown fw-bold'>{tokens} $SAN Tokens</span></p>
          <p className='m-0'>Rewards:</p>
          <p>Daily reward of <span className='cl-blue fw-bold'>{rewards} $SAN Tokens</span> per {name2} Generator owned</p>
        </div>
        <div className="col-md-4">
          <div className="rune-field">
            <img src={img_url} alt={img_alt} className='rune-img' />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RuneItem;