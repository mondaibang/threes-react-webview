import React, { Component } from 'react';
import Next from './components/Next/Next';
import New from './components/New/New';
import Board from './components/Board/Board';
import Overlay from './components/Overlay/Overlay';
import { Graph } from './Graph';

import './index.css';

const COLORS = ['number','blue','red'];

class App extends Component {
    constructor(props) {
      super(props);
      this.onAnimationEndFunc = this.onAnimationEndFunc.bind(this);
      this.newGame = this.newGame.bind(this);
      this.count = 0;
      this.panResponder;
      this.myEventHandler = this.myEventHandler.bind(this);
      this.onOverlayFn = this.onOverlayFn.bind(this);
      this.state = {
          gestureName: 'none',
          graph: new Graph({updateState:this.onUpdateState.bind(this)}),
          colors: COLORS,
          next:this.randomNext(),
          displayOverlay:'none',
          score:0
      };
      document.addEventListener('keydown',this.myEventHandler);
    };

    myEventHandler(e){
        switch (e.keyCode) {
            case 38:
                //up
                this.count = 0;
                this.state.graph.keyUp(this.state.next);
                break;
            case 40:
                //down
                this.count = 0;
                this.state.graph.keyDown(this.state.next);
                break;
            case 39:
                //right
                this.count = 0;
                this.state.graph.keyRight(this.state.next);
                break;
            case 37:
                //left
                this.count = 0;
                this.state.graph.keyLeft(this.state.next);
                break;
        }
    };
  
    randomNext(){
        var index = 0;
        for(var i =1, max = COLORS.length;i<max;i++){
            if(Math.random()< 1/(i+1)){
                index = i;
            }
        }
        return index;
    };
    newGame(){
        this.state.graph.startGame();
        this.setState({});
        
    };
    onAnimationEndFunc(){
        this.count++;
        if(this.count === this.state.graph.count){
            this.state.graph.count= 0;
            let endgame= this.state.graph.assignClone();
            let graph = this.state.graph;
            this.setState({
                graph:graph,
                next:this.randomNext(),
                displayOverlay: endgame,
                score:graph.score,
            });
        }
    };
    onUpdateState(){
        this.setState({});
    };
    onOverlayFn(){
        this.setState({
            displayOverlay: 'none',
        });
    };
  
    render() {
      return (
        <div>
            <div className="game">
                <Board grid={this.state.graph} colors={COLORS} onAnimationEndFunc={this.onAnimationEndFunc}/>
                <Next type={COLORS[this.state.next]}/>
                <New onPressFn={this.newGame}/>
            </div>
            <Overlay score={this.state.score} displayOverlay={this.state.displayOverlay} onClickFn={this.onOverlayFn}/>
        </div>
      );
    }
  }
  
  export default App;