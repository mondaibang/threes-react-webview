import React from 'react';
import './Overlay.css';

const Overlay = ({score, displayOverlay,onClickFn}) => {
    let pStyle={
        display:displayOverlay,
    };
    
    return (
      <div className="overlay" style={pStyle} onClick={onClickFn}>
        <div className="endgame">
            <div className="score-intro">&nbsp;Thanks for playing!&nbsp; <strong>^___^</strong>&nbsp; You score is</div>
            <div className="score">{score}</div>
        </div>
      </div>
    );
}
  
export default Overlay;