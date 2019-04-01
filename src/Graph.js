const COLORS = [{id:0,value:3},{id:1,value:1},{id:2,value:2}];//0:white // 1:blue // 2:red //

const randomIndexFromCollection = (collection) =>{
    var index = 0;
    for(var i =1, max = collection.length;i<max;i++){
        if(Math.random()< 1/(i+1)){
            index = i;
            
        }
    }
    return collection[index];
}

const shuffle = (arr)=>{
    return arr.sort(()=>Math.random() -0.5);
}

const randomIndexWhenStart = ()=>{
    var arr = shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
    var indexes=[];
    while (indexes.length<9) {
        for(var i = 1, max = arr.length;i<max;i++){
            if(Math.random() < 1/(i+1)){
                indexes.push(arr[i]);
                arr.splice(i,1);
                break;
            }
        }
        if(indexes.length < 9){
            indexes.push(arr[0]);
            arr.splice(0,1);
        }
        
    }
    return indexes;
};



class Node {
    constructor(id, color, value,move){
        this.id = id;
        this.color = color;
        this.value = value;
        this.move = move;
    }
}

class Edge{
    constructor(sourceId, destId,weight,direct){
        this.sourceId = sourceId;
        this.destId = destId;
        this.direct = direct;
        this.weight = weight;
    }
}

class Graph{
    constructor(opts){
        this.opts = opts;
        this.size = 4;
        this.nodes={};
        this.edgesbyNode;
        this.directs={up:-1,down:-1,left:-1,right:-1};
        this.clone;
        this.count;
        this.score;
        this.startGame();
    };
    startGame(){
        var listRandom = randomIndexWhenStart();
        this.count = 0;
        this.nodes={};
        this.clone = {};
        for(let i = 0,m = listRandom.length;i<m;i++){
            var info = randomIndexFromCollection(COLORS);
            this.nodes[listRandom[i]] = new Node(listRandom[i], info.id,info.value,'none');
        }
        this.clone = this.iterationCopy(this.nodes);
        this.setKeyFrames();
        this.setEdgeWeights();
    };
    setKeyFrames(){
        var style = document.createElement('style');
        style.type = 'text/css';
        var keyFrames=""
        let upIndex,downIndex,leftIndex,rightIndex;
        let top = 22, left = 22, ptop,pleft,ntop, nleft;
        for(var i = 0;i<16;i++){
            upIndex = i - 4;
            downIndex = i+4;
            leftIndex = i -1;
            rightIndex = i +1 ;
            ptop = top +(130*Math.floor(i/4));
            pleft = left +(92*(i%4));
            if(upIndex >=0){
                ntop = top +(130*Math.floor(upIndex/4));
                nleft = left +(92*(upIndex%4));
                keyFrames += '\
                @keyframes move-up-'+i+'{\
                    from {\
                        top:'+ptop+'px;\
                        left:'+pleft+'px;\
                    }\
                    to {\
                        top:'+ntop+'px;\
                        left:'+nleft+'px;\
                    }\
                }';
            }
            if(rightIndex % 4 > 0){
                ntop = top +(130*Math.floor(rightIndex/4));
                nleft = left +(92*(rightIndex%4));
                keyFrames += '\
                @keyframes move-right-'+i+'{\
                    from {\
                        top:'+ptop+'px;\
                        left:'+pleft+'px;\
                    }\
                    to {\
                        top:'+ntop+'px;\
                        left:'+nleft+'px;\
                    }\
                }';
            }
            if(downIndex <16){
                ntop = top +(130*Math.floor(downIndex/4));
                nleft = left +(92*(downIndex%4));
                keyFrames += '\
                @keyframes move-down-'+i+'{\
                    from {\
                        top:'+ptop+'px;\
                        left:'+pleft+'px;\
                    }\
                    to {\
                        top:'+ntop+'px;\
                        left:'+nleft+'px;\
                    }\
                }';
            }
            if(i % 4 !== 0){
                ntop = top +(130*Math.floor(leftIndex/4));
                nleft = left +(92*(leftIndex%4));
                keyFrames += '\
                @keyframes move-left-'+i+'{\
                    from {\
                        top:'+ptop+'px;\
                        left:'+pleft+'px;\
                    }\
                    to {\
                        top:'+ntop+'px;\
                        left:'+nleft+'px;\
                    }\
                }';
            }
        };
        // bonus up
        keyFrames += '\
            @keyframes bonus-up-12 {\
                from {\
                    top:542px;\
                    left:22px;\
                }\
                to {\
                    top:410px;\
                    left:22px;\
                }\
            }';
        keyFrames += '\
            @keyframes bonus-up-13 {\
                from {\
                    top:542px;\
                    left:114px;\
                }\
                to {\
                    top:410px;\
                    left:114px;\
                }\
            }';
        keyFrames += '\
            @keyframes bonus-up-14 {\
                from {\
                    top:542px;\
                    left:206px;\
                }\
                to {\
                    top:410px;\
                    left:206px;\
                }\
            }';
        keyFrames += '\
            @keyframes bonus-up-15 {\
                from {\
                    top:542px;\
                    left:298px;\
                }\
                to {\
                    top:410px;\
                    left:298px;\
                }\
            }';
        // bonus down
        keyFrames += '\
            @keyframes bonus-down-0 {\
                from {\
                    top:-110px;\
                    left:22px;\
                }\
                to {\
                    top:22px;\
                    left:22px;\
                }\
            }';
        keyFrames += '\
            @keyframes bonus-down-1 {\
                from {\
                    top:-110px;\
                    left:114px;\
                }\
                to {\
                    top:22px;\
                    left:114px;\
                }\
            }';
        keyFrames += '\
            @keyframes bonus-down-2 {\
                from {\
                    top:-110px;\
                    left:206px;\
                }\
                to {\
                    top:22px;\
                    left:206px;\
                }\
            }';
        keyFrames += '\
            @keyframes bonus-down-3 {\
                from {\
                    top:-110px;\
                    left:298px;\
                }\
                to {\
                    top:22px;\
                    left:298px;\
                }\
            }';
        // bonus right
        keyFrames += '\
            @keyframes bonus-right-0 {\
                from {\
                    top:22px;\
                    left:-80px;\
                }\
                to {\
                    top:22px;\
                    left:22px;\
                }\
            }';
        keyFrames += '\
            @keyframes bonus-right-4 {\
                from {\
                    top:152px;\
                    left:-80px;\
                }\
                to {\
                    top:152px;\
                    left:22px;\
                }\
            }';
        keyFrames += '\
            @keyframes bonus-right-8 {\
                from {\
                    top:282px;\
                    left:-80px;\
                }\
                to {\
                    top:282px;\
                    left:22px;\
                }\
            }';
        keyFrames += '\
            @keyframes bonus-right-12 {\
                from {\
                    top:412px;\
                    left:-80px;\
                }\
                to {\
                    top:412px;\
                    left:22px;\
                }\
            }';
        // bonus left
        keyFrames += '\
            @keyframes bonus-left-3 {\
                from {\
                    top:22px;\
                    left:400px;\
                }\
                to {\
                    top:22px;\
                    left:298px;\
                }\
            }';
        keyFrames += '\
            @keyframes bonus-left-7 {\
                from {\
                    top:152px;\
                    left:400px;\
                }\
                to {\
                    top:152px;\
                    left:298px;\
                }\
            }';
        keyFrames += '\
            @keyframes bonus-left-11 {\
                from {\
                    top:282px;\
                    left:400px;\
                }\
                to {\
                    top:282px;\
                    left:298px;\
                }\
            }';
        keyFrames += '\
            @keyframes bonus-left-15 {\
                from {\
                    top:412px;\
                    left:400px;\
                }\
                to {\
                    top:412px;\
                    left:298px;\
                }\
            }';

        style.innerHTML = keyFrames;
        document.getElementsByTagName('head')[0].appendChild(style);
    };

    iterationCopy(src) {
        let target = {};
        this.score = 0;
        Object.keys(src).forEach((id)=>{
            let node = new Node(src[id].id,src[id].color,src[id].value,src[id].move);
            target[id] = node;
            this.score += src[id].value;
        });
        return target;
      };
    

    setEdgeWeights(){
        
        this.edgesbyNode = {};
        this.directs={up:-1,down:-1,left:-1,right:-1};
        
        this.checkUpLeft();
        this.checkDownRight();
        
    };
    checkUpLeft(){
        Object.keys(this.clone).forEach((id)=>{
            let node = this.clone[id];
            let nodeId = node.id;
            let edges = [];

            let topIndex = nodeId - this.size;
            let leftIndex = nodeId  -1;

            if(topIndex >=0){
                let w = this.checkDirect(nodeId,topIndex,'up');
                if(w >0) {
                    edges.push(new Edge(nodeId,topIndex,w,"up"));
                    this.directs.up = 0;
                };
            }
            if(nodeId % this.size !==0){
                let w = this.checkDirect(nodeId, leftIndex,'left');
                if(w>0) {
                    edges.push(new Edge(nodeId, leftIndex,w, "left"));
                    this.directs.left = 0;
                }
            }
            this.edgesbyNode[nodeId] = edges;

        });
    };
    checkDownRight(){
        
        var tmp = Object.keys(this.clone);
        for(var i =tmp.length-1;i>-1;i--){
            let node = this.clone[tmp[i]];
            let nodeId = node.id;
            let rightIndex = nodeId +1;
            let bottomIndex = nodeId + this.size;
            
            if(rightIndex % this.size > 0 ){
                let w = this.checkDirect(nodeId, rightIndex,'right');
                if(w>0){
                     this.edgesbyNode[nodeId].push(new Edge(nodeId, rightIndex,w, "right"));
                     this.directs.right = 0;
                }
            }

            if( bottomIndex < this.size*this.size){
                let w = this.checkDirect(nodeId, bottomIndex,'down');
                if(w>0){
                    this.edgesbyNode[nodeId].push(new Edge(nodeId, bottomIndex,w, "down"));
                    this.directs.down = 0;
                }
            }
        }
    };
    checkDirect(nodeId,index,direct){
        if(this.edgesbyNode[index]){
            for(var i =0,m = this.edgesbyNode[index].length;i<m;i++){
                var edge = this.edgesbyNode[index][i];
                if(edge.direct ===direct){
                    return this.clone[nodeId].value;
                }
            }
            return this.checkAddition(this.clone[nodeId].value,this.clone[index].value)
        }else{
            return this.clone[nodeId].value;
        }
    };
    checkAddition(a,b){
        if(a===b && a>=3){
            return (a+b);
        }else if((a + b) ===3){
            return (a+b);
        }else{
            return -1;
        }
    };
    keyUp(colorNext){
        if(this.directs.up > -1){
            Object.keys(this.edgesbyNode).forEach((id)=>{
                for(var i =0,m = this.edgesbyNode[id].length;i<m;i++){
                    var edge = this.edgesbyNode[id][i];
                    if(edge.direct ==='up'){
                        this.directs.up++;
                        if(!this.clone[edge.destId]){
                            this.addNode(edge.destId,edge.weight);
                            delete this.clone[id];
                        }else{
                            this.clone[edge.destId].value =edge.weight;
                            let color = (edge.weight===1 || edge.weight ===2)?edge.weight:0;
                            this.clone[edge.destId].color = color;
                            delete this.clone[id];
                        }
                        this.nodes[id].move = "move-up-"+id;
                    }
                }
                this.count = this.directs.up;
            });
            
            let id = this.checkEmptyPosition([12,13,14,15]);
            if(id>-1) {
                this.count++;
                this.addNode(id,COLORS[colorNext].value);
                this.nodes['bonus'] = new Node(id, colorNext, COLORS[colorNext].value, "bonus-up-"+id);
            }
            this.setEdgeWeights();
        }
        this.opts.updateState();
    };
    keyLeft(colorNext){
        if(this.directs.left > -1){
            Object.keys(this.edgesbyNode).forEach((id)=>{
                for(var i =0,m = this.edgesbyNode[id].length;i<m;i++){
                    var edge = this.edgesbyNode[id][i];
                    if(edge.direct ==='left'){
                        this.directs.left++;
                        if(!this.clone[edge.destId]){
                            this.addNode(edge.destId,edge.weight);
                            delete this.clone[id];
                        }else{
                            this.clone[edge.destId].value =edge.weight;
                            let color = (edge.weight===1 || edge.weight ===2)?edge.weight:0;
                            this.clone[edge.destId].color = color;
                            delete this.clone[id];
                        }
                        this.nodes[id].move = "move-left-"+id;
                    }
                }
                this.count = this.directs.left;
            });
            
            let id = this.checkEmptyPosition([3,7,11,15]);
            if(id>-1) {
                this.count++;
                this.addNode(id,COLORS[colorNext].value);
                this.nodes['bonus'] = new Node(id, colorNext, COLORS[colorNext].value, "bonus-left-"+id);
            }
            this.setEdgeWeights();
        }
        this.opts.updateState();
    };
    keyDown(colorNext){
        if(this.directs.down>-1){
            var tmp = Object.keys(this.edgesbyNode);
            for(var t = tmp.length-1;t>-1;t--){
                let id = tmp[t];
                for(var i =0,m = this.edgesbyNode[id].length;i<m;i++){
                    var edge = this.edgesbyNode[id][i];
                    if(edge.direct ==='down'){
                        this.directs.down++;
                        if(!this.clone[edge.destId]){
                            this.addNode(edge.destId,edge.weight);
                            delete this.clone[id];
                        }else{
                            this.clone[edge.destId].value =edge.weight;
                            let color = (edge.weight===1 || edge.weight ===2)?edge.weight:0;
                            this.clone[edge.destId].color = color;
                            delete this.clone[id];
                        }
                        this.nodes[id].move = "move-down-"+id;
                    }
                }
                this.count = this.directs.down;
            }
            
            let id = this.checkEmptyPosition([0,1,2,3]);
            if(id>-1) {
                this.count++;
                this.addNode(id,COLORS[colorNext].value);
                this.nodes['bonus'] = new Node(id, colorNext, COLORS[colorNext].value, "bonus-down-"+id);
            }
            this.setEdgeWeights();
        }
        this.opts.updateState();
    };
    keyRight(colorNext){
        if(this.directs.right>-1){
            var tmp = Object.keys(this.edgesbyNode);
            for(var t = tmp.length-1;t>-1;t--){
                let id = tmp[t];
                for(var i =0,m = this.edgesbyNode[id].length;i<m;i++){
                    var edge = this.edgesbyNode[id][i];
                    if(edge.direct ==='right'){
                        this.directs.right++;
                        if(!this.clone[edge.destId]){
                            this.addNode(edge.destId,edge.weight);
                            delete this.clone[id];
                        }else{
                            this.clone[edge.destId].value =edge.weight;
                            let color = (edge.weight===1 || edge.weight ===2)?edge.weight:0;
                            this.clone[edge.destId].color = color;
                            delete this.clone[id];
                        }
                        this.nodes[id].move = "move-right-"+id;
                    }
                }
                this.count = this.directs.right;
            }
            
            let id = this.checkEmptyPosition([0,4,8,12]);
            if(id>-1) {
                this.count++;
                this.addNode(id,COLORS[colorNext].value);
                this.nodes['bonus'] = new Node(id, colorNext, COLORS[colorNext].value, "bonus-right-"+id);
            }
            this.setEdgeWeights();
        }
        this.opts.updateState();
    };
    checkEmptyPosition(arr){
        var tmp = [];
        for(var i =0, m = arr.length;i<m;i++){
            if(!this.clone[arr[i]]){
                tmp.push(arr[i]);
            }
        }
        if(tmp.length > 0){
            let id = Math.floor(Math.random()*(tmp.length));
            //console.log(" add node: ",tmp, id, tmp[id]);
            return tmp[id];
        }else{
            return -1;
        }
    };

    assignClone(){
        this.nodes={};
        this.score = 0;
        this.nodes = this.iterationCopy(this.clone);
        if(this.directs.up === -1 && this.directs.down === -1 && this.directs.left === -1 && this.directs.right === -1){
            return 'block';
        }
        else return 'none';
    };
    
    addNode(index,value){
        var color = (value===1 || value ===2)?value:0;
        this.clone[index] = new Node(index, color, value, 'none');
    };
    
}

export { Graph };