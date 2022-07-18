import React from 'react';

import './style.css';

const MyRuneItem = ({ name, rune, reward }) => {
  const ETHUnit = 1e18;
  return (
    <React.Fragment>
      <div className="row px-2 mx-0 rune-item">
        <div className="col-6">{name}</div>
        <div className="col-3 ps-3">{rune}</div>
        <div className="col-3 ps-3">{(parseFloat(reward) / ETHUnit).toFixed(4)}</div>
      </div>
    </React.Fragment>
  );
}

export default MyRuneItem;