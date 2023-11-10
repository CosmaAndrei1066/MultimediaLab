//index.html

window.onload = function(){
    let canvas = document.getElementById('chart');
    let context = canvas.getContext('2d');
    function generateVerticalLines(){

    }
    function generateHorizontalLines(){

    }
    function generateChart(){

    }
    function render(){
        generateHorizontalLines();
        generateVerticalLines();
        generateChart();
    }
    console.log(context);
}

//charts.js
window.onload = function(){
    let canvas = document.getElementById('chart');
    let context = canvas.getContext('2d');
    
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.clientHeight;
    
    let data=[];
    //const data works because it only does not let reassignmnet (exp. data=1)
    
    function generateHorizontalLines(){
        for (let i=100; i<=canvasHeight;i+=100){
            context.beginPath();
            context.moveTo(0,i);
            context.lineTo(canvasWidth,i);
            context.stroke();

            context.fillText(canvasHeight-i,5,i-5);
        }
    }
    function generateVerticalLines(){
        for (let i=150; i<900;i+=150){
            context.beginPath();
            context.moveTo(i,0);
            context.lineTo(i,canvasHeight);
            context.stroke();
            context.fillText(i,i+10,canvasHeight);
        }
    }
    function generateRandomNumber(){
        return parseInt(Math.random() * canvasHeight);
    }
    
    function generateData(){
        for (let i=0;i<=canvasWidth/20;i++){
            data[i]=generateRandomNumber();
        }
    }
    
    function generateChart(){
        context.lineWidth=3;
        context.strokeStyle="red";
        context.beginPath();
        //you substract from Canvas Height so the values allign with the pixels
        context.moveTo(0,canvasHeight-data[0]);
        for(let i=1; i<data.length;i++){
            context.lineTo(i*20,canvasHeight-data[i]);
        }
        context.stroke();
        //you need to switch the context back
        //the context is shared for the whole chart
        //so that if you generate chart first the whole chart will not turn red
        context.lineWidth=1;
        context.strokeStyle="black";
    }
    function clearCanvas(){
        context.clearRect(0,0,canvasWidth,canvasHeight);
    }

    function render(){
        //so that we clear the canvas if we want a new one each second
        clearCanvas();
        //if you generate chart first it will draw the axis over your line
        generateChart();
        generateHorizontalLines();
        generateVerticalLines();
        
    }
    
    // use setInterval to create new values each second
    setInterval(function(){
        data.push(generateRandomNumber());
        data.shift();
        render();
    }, 500);


    generateData();
    render();
    console.log(data);
    
}
