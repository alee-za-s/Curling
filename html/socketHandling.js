

//socket emits a disable home button function if a user joins as home
socket.on('joinHome',function(user) {

    disableHome()
 });



//socket emits the drawCanvas() function
socket.on('redraw',function() {

    drawCanvas()

});


//socket emits to all users to enable the home button
socket.on('exitHome',function(){

    enableHome()

});



//socket emits to all users to enable the visitor button
socket.on('exitVisitor',function(){

    enableVisitor()

});

//socket emits a disable home button function if a user joins as visitor
socket.on('joinVisitor',function(user) {

    disableVisitor()

    
});

//updates all users on the state of home and visitor buttons
socket.on('curState',function(){

    if (isHomePlayerAssigned){

        disableHome()
    }

    if (isVisitorPlayerAssigned){

        disableVisitor()
    }



});






 

