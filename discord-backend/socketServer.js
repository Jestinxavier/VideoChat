const authSocket = require('./middleware/authSocket');
const newConnectionHandler =  require('./socketHandlers/newConnectionHandler');
const registSockServer = (sever)=>{
    const io = require('socket.io')(sever,{
        cors:{
            origin:'*',
            methods:['GET']
        }
    })
    io.use((socket,next)=>{
        // validation wheather the email is already exist.
        authSocket(socket,next)
    })
    // when it is successfull we can connect the connectin 
    io.on('connection',(socket)=>{
        console.log("user connected");
        console.log(socket.id);
        // new connection handler
        newConnectionHandler(socket,io);
    })

    io.on('disconnect',(socket)=>{
        console.log('disconnect Socket server');
        disconnectHandler()
    })


}
module.exports={registSockServer};