import React from 'react';
import './Next.css';

const Next = ({type}) => {
    let classString = "tile " +type;
    return (
      <div className="next">
        <div className="title">Next</div>
        <div className={classString}></div>
      </div>
    );
}
  
export default Next;