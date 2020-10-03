      var canvas = null;
      var context = null;
      var bufferCanvas = null;
      var bufferCanvasCtx = null;
      var flakeArray = [];
      var flakeTimer = null;
      var maxFlakes = 500; // Here you may set max flackes to be created 
  
      function init() {
          //Canvas on Page
          canvas = document.getElementById('canvasRain');
          context = canvas.getContext("2d");
          //Buffer Canvas
          bufferCanvas = document.createElement("canvas");
          bufferCanvasCtx = bufferCanvas.getContext("2d");
          bufferCanvasCtx.canvas.width = context.canvas.width;
          bufferCanvasCtx.canvas.height = context.canvas.height;
  
          
          flakeTimer = setInterval(addFlake, 200);
  
          Draw();
  
          setInterval(animate, 30);
           
      }
      function animate() {
          
          Update();
          Draw();
          
      }
      function addFlake() {
  
          flakeArray[flakeArray.length] = new Flake();
          if (flakeArray.length == maxFlakes)
              clearInterval(flakeTimer);
      }
      function blank() {
          bufferCanvasCtx.fillStyle = "rgba(0,0,0,0.8)";
          bufferCanvasCtx.fillRect(0, 0, bufferCanvasCtx.canvas.width, bufferCanvasCtx.canvas.height);
          
      }
      function Update() {
          for (var i = 0; i < flakeArray.length; i++) {
              if (flakeArray[i].y < context.canvas.height) {
                  flakeArray[i].y += flakeArray[i].speed;
                  if (flakeArray[i].y > context.canvas.height)
                      flakeArray[i].y = -5;
                  flakeArray[i].x += flakeArray[i].drift;
                  if (flakeArray[i].x > context.canvas.width)
                      flakeArray[i].x = 0;
              }
          }
          
      }
      function Flake() {
          this.x = Math.round(Math.random() * context.canvas.width);
          this.y = -10;
          this.drift = Math.random();
          this.speed =  7.21;

          this.height = (Math.random() * 3) + 5;
          
          this.width = Math.random() *
           0.15;
      }
      function Draw() {
          context.save();
          
          blank();
  
          for (var i = 0; i < flakeArray.length; i++) {
              bufferCanvasCtx.fillStyle = "white";
              bufferCanvasCtx.fillRect(flakeArray[i].x, flakeArray[i].y, flakeArray[i].width, flakeArray[i].height);
          }
  
          
          context.drawImage(bufferCanvas, 0, 0, bufferCanvas.width, bufferCanvas.height);
          context.restore();
      }