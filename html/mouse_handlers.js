//let socket = io('http://' + window.document.location.host)

function getCanvasMouseLocation(e) {
    //provide the mouse location relative to the upper left corner
    //of the canvas
  
    /*
    This code took some trial and error. If someone wants to write a
    nice tutorial on how mouse-locations work that would be great.
    */
    let rect = canvas.getBoundingClientRect()

  //account for amount the document scroll bars might be scrolled

  //get the scroll offset
    const element = document.getElementsByTagName("html")[0]
    let scrollOffsetX = element.scrollLeft
    let scrollOffsetY = element.scrollTop

    let canX = e.pageX - rect.left - scrollOffsetX
    let canY = e.pageY - rect.top - scrollOffsetY

    

    return {
      x: canX,
      y: canY
    }
  }
  
//handles mouse down and emits mouse location
function handleMouseDown(e) {

    const canvasMouseLoc = getCanvasMouseLocation(e);
    const { x, y } = canvasMouseLoc;

    if(enableShooting === false) return //cannot shoot when stones are in motion
    if(!isClientFor(whosTurnIsIt)) return //only allow controlling client
    

    
    socket.emit('mouseDown',{ x, y })
    e.stopPropagation()
    e.preventDefault()

    socket.emit('redraw')
    
}
  
//handles mouse move and emits mouse location
function handleMouseMove(e) {

    const canvasMouseLoc = getCanvasMouseLocation(e);
    const { x, y } = canvasMouseLoc;

    socket.emit('mouseMove',{ x, y })
    e.stopPropagation()
  
  
   
    socket.emit('redraw')
  }
  
//handles mouse up and emits mouse location
function handleMouseUp(e) {
    

    const canvasMouseLoc = getCanvasMouseLocation(e);
    const { x, y } = canvasMouseLoc;

    e.stopPropagation()
    socket.emit('mouseUp',{ x, y })
    document.getElementById('canvas1').removeEventListener('mousemove', handleMouseMove)
    document.getElementById('canvas1').removeEventListener('mouseup', handleMouseUp)
   
    socket.emit('redraw')
    
}

//sets shooting cue for all clients
socket.on('mouseMove',function(data) {

  let canvasX = data.x
  let canvasY = data.y
  
  if (shootingCue != null) {
    shootingCue.setCueEnd(canvasX, canvasY)
  }

});
 
//shoots the stone for all clients
socket.on('mouseUp', function(data){
 
 if (shootingCue != null) {

   let cueVelocity = shootingCue.getVelocity()
   if (stoneBeingShot != null) stoneBeingShot.addVelocity(cueVelocity)
   shootingCue = null
   shootingQueue.dequeue()
   enableShooting = false 
 }

 
 
});

//sets shooting stone and cue for all clients
socket.on('mouseDown', function(data){

  let canvasX = data.x
  let canvasY = data.y
  
  stoneBeingShot =allStones.stoneAtLocation(canvasX, canvasY)

  if(stoneBeingShot === null){
    const canvasMouseLoc = { x: canvasX, y: canvasY };
    if(iceSurface.isInShootingCrosshairArea(canvasMouseLoc)){
      if(shootingQueue.isEmpty()) stageStones()
     
      stoneBeingShot = shootingQueue.front()
      stoneBeingShot.setLocation(canvasMouseLoc)
      //we clicked near the shooting crosshair
    }
  }

  if (stoneBeingShot != null) {

    shootingCue = new Cue(canvasX, canvasY)
   
    document.getElementById('canvas1').addEventListener('mousemove', handleMouseMove)
    document.getElementById('canvas1').addEventListener('mouseup', handleMouseUp)
  }

  
});

