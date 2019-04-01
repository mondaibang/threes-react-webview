import React from 'react';
import './New.css';

const New = ({onPressFn}) => {
    return (
      <div className="new" onClick={onPressFn}>New game</div>
    );
}
  
export default New;