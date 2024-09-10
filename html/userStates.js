let userNum =0;
let homeNum =0;
let curNum =0;
let visitorNum =0;
let loggedOn = false;


//returns whether the client can play the stones
function isClientFor(stoneColour){

   
    if(stoneColour === HOME_COLOUR && isHomeClient) return true
    if(stoneColour === VISITOR_COLOUR && isVisitorClient) return true
    return false
  
  }

//logs a user on and updates variables
function logOn(){

    userNum = curNum
    curNum ++
    loggedOn = true


}

//returns whether a user is logged on
function getLog(){

    return loggedOn;
}

//returns a users unique num
function getUser(){

    return userNum
}

//removes a visitor player and updates variables
function exitVisitor(user){

    if (isVisitorPlayerAssigned === true){
        isVisitorPlayerAssigned = false;
        isVisitorClient = false
        homeNum = -1

    }

    socket.emit('exitVisitor')
}

//removes a home player and updates variables
function exitHome(user){

    if (isHomePlayerAssigned === true){
        isHomePlayerAssigned = false;
        isHomeClient = false
        homeNum = -1

    }

    socket.emit('exitHome',user)
}

//adds a visitor player and updates variables, emits that a visitor player has joined
function newVisitor(user) {

    if (isVisitorPlayerAssigned === false){
        isVisitorPlayerAssigned = true;
        isVisitorClient = true
        visitorNum = user}

    socket.emit('joinVisitor',user)


}

//adds a home player and updates variables, emits that a home player has joined
function newHome(user){

    if (isHomePlayerAssigned === false){
        isHomePlayerAssigned = true;
        isHomeClient = true
        homeNum = user

    }

    socket.emit('joinHome',user)
}