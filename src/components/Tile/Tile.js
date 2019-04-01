import React from 'react';
import './Tile.css';

const Tile = ({id,color,value,move,onAnimationEndFunc}) => {
    let classString = "tile " +color;
    let pStyle,ntop,nleft,top=22,left=22;
    if(move==="none"){
        ntop = top +(130*Math.floor(id/4));
        nleft = left +(92*(id%4));
        pStyle= {
            top:ntop,
            left:nleft,
            zIndex:10
        }
    }else{
        pStyle={
            zIndex:100,
            animation: move +' 0.1s forwards',
        }
    }
    return (
      <div className={classString} style={pStyle} onAnimationEnd={onAnimationEndFunc} >{value}</div>
    );
}
  
export default Tile;