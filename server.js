/*
COMP 2406 Collision Demo
(c) Louis D. Nel 2018

This example is based on the collision geometry math presented in
assignment #3 (fall 2018).
Some of the variable names (e.g. angle_d) correspond to those
presented in the powerpoint slides with the assignment.

This code is intended to serve as the base code for building
an online multi-player game where clients are kept in synch
through a server -presumably using the socket.io npm module.


Use browser to view pages at http://localhost:3000/collisions.html
*/

//Server Code

const http = require("http") //need to http
const app = require('http').createServer(handler)
const fs = require("fs") //needed if you want to read and write files
const url = require("url") //to parse url strings
const io = require('socket.io')(app) 

const PORT = process.env.PORT || 3000
app.listen(PORT) //start server listening on PORT

const ROOT_DIR = "html" //dir to serve static files from

const MIME_TYPES = {
  css: "text/css",
  gif: "image/gif",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript", //should really be application/javascript
  json: "application/json",
  png: "image/png",
  svg: "image/svg+xml",
  txt: "text/plain"
}

function get_mime(filename) {
  //Get MIME type based on extension of requested file name
  //e.g. index.html --> text/html
  for (let ext in MIME_TYPES) {
    if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
      return MIME_TYPES[ext]
    }
  }
  return MIME_TYPES["txt"]
}


//variables hold whether home and visitor players have been assigned
let homeAssigned = false
let visitorAssigned = false

//handles emitting sockets back to clients
io.on('connection', function(socket){

  if (homeAssigned){

    io.emit('joinHome')}

    if (visitorAssigned){

      io.emit('joinVisitor')
    }

  socket.on('joinHome', function(curUser){

    homeAssigned = true
    
    io.emit('joinHome', curUser)
  })

  socket.on('mouseDownData',function(canvasX, canvasY){
      
    io.emit('mouseDownData',canvasX, canvasY)
  })

  socket.on('mouseMove', function(data){
    
    io.emit('mouseMove', data)
  })

  socket.on('mouseUp', function(data){
    
    io.emit('mouseUp', data)
  })

  socket.on('mouseDown', function(data){
    
    io.emit('mouseDown', data)
  })

  socket.on('homeMove', function(curUser){
    
    io.emit('homeMove', curUser) 
  })

  socket.on('joinVisitor', function(curUser){

    visitorAssigned = true
    
    io.emit('joinVisitor', curUser) 
  })

  socket.on('redraw',function(){
    
    io.emit('redraw') 
  })

  socket.on('exitHome',function(){

    homeAssigned = false

    io.emit('exitHome') 

  })

  socket.on('exitVisitor',function(){

    visitorAssigned = false

    
  io.emit('exitVisitor') 
  })

  socket.on('curState',function(){

    io.emit('curState')

  })


})

 
function handler(request, response) {

  let urlObj = url.parse(request.url, true, false)

  let receivedData = ""
  
    let dataObj = null
    let returnObj = null

  //attached event handlers to collect the message data
  request.on("data", function(chunk) {
    receivedData += chunk
  })

  //event handler for the end of the message
  request.on("end", function() {
    
    if (request.method == "GET") {
      
      fs.readFile(ROOT_DIR + urlObj.pathname, function(err, data) {
        if (err) {
          
          response.writeHead(404)
          response.end(JSON.stringify(err))
          return
        }
        response.writeHead(200, {
          "Content-Type": get_mime(urlObj.pathname)
        })
        response.end(data)
      })
    }
    if (request.method == "POST") {
      //Do this for all POST messages
      //echo back the data to the client FOR NOW
      dataObj = JSON.parse(receivedData)
      console.log("received data object: ", dataObj)
      console.log("type: ", typeof dataObj)
      console.log("USER REQUEST: " + dataObj.text)
      returnObj = {}
      returnObj.text = dataObj.text
      response.writeHead(200, {
        "Content-Type": MIME_TYPES["json"]
      
      
  })
  response.end(data)
}
})
}



console.log("Server Running at PORT 3000  CNTL-C to quit")
console.log("To Test")
console.log("http://localhost:3000/curling.html")