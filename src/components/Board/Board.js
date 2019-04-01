import React from 'react';
import Tile from '../Tile/Tile';
import './Board.css';

const Board = ({grid, colors,onAnimationEndFunc}) => {
    let rows = Object.keys(grid.nodes).map((v) => {
        return <Tile key={v} color={colors[grid.nodes[v].color]} value={grid.nodes[v].value}  
        move={grid.nodes[v].move} id={grid.nodes[v].id}  onAnimationEndFunc={onAnimationEndFunc} />
    });
    return (
        <div className="board">
            <div className="row">
                <div className="tile-container"></div>
                <div className="tile-container"></div>
                <div className="tile-container"></div>
                <div className="tile-container"></div>
            </div>
            <div className="row">
                <div className="tile-container"></div>
                <div className="tile-container"></div>
                <div className="tile-container"></div>
                <div className="tile-container"></div>
            </div>
            <div className="row">
                <div className="tile-container"></div>
                <div className="tile-container"></div>
                <div className="tile-container"></div>
                <div className="tile-container"></div>
            </div>
            <div className="row">
                <div className="tile-container"></div>
                <div className="tile-container"></div>
                <div className="tile-container"></div>
                <div className="tile-container"></div>
            </div>
            {rows}
        </div>
    );
}
  
export default Board;