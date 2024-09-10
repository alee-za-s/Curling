

//the function emits a socket to get the current state of the game, and disables buttons accordingly. Calls the function to update variables related to the home player
function handleJoinAsHomeButton(){
   
    
  disableHome()

  if (getLog() === false){

    logOn()
      
  }

  newHome(getUser())

  socket.emit('curState');
    
  
  }

  //the function emits a socket to get the current state of the game, and disables buttons accordingly. Calls the function to update variables related to the visitor player
  function handleJoinAsVisitorButton(){

    disableVisitor()

    if (getLog() === false){

      logOn()
      
    }

    newVisitor(getUser())

    socket.emit('curState');
  }

//the function emits a socket to get the current state of the game, and disables buttons accordingly.
  function handleJoinAsSpectatorButton(){

    let btn = document.getElementById("JoinAsSpectatorButton")
    btn.disabled = true //disable button
    btn.style.backgroundColor="lightgray"
  
    if(!isSpectatorClient) isSpectatorClient = true

    
    socket.emit('curState');
}
 
  
  
//enables the home button
  function enableHome(){

    let btn = document.getElementById("JoinAsHomeButton")
    btn.disabled = false //disable button
    btn.style.backgroundColor=HOME_PROMPT_COLOUR
    
  }

  //enables the visitor button
  function enableVisitor(){

    let btn = document.getElementById("JoinAsVisitorButton")
    btn.disabled = false //disable button
    btn.style.backgroundColor=VISITOR_PROMPT_COLOUR
    
  }

  //disables the home button
  function disableHome(){

    let btn = document.getElementById("JoinAsHomeButton")
    btn.disabled = true //disable button
    btn.style.backgroundColor="lightgray"
    
  }

  //disables the visitor button
  function disableVisitor(){
    
    let btn = document.getElementById("JoinAsVisitorButton")
    btn.disabled = true //disable button
    btn.style.backgroundColor="lightgray"



  }