const authSocket = require('./middleware/authSocket');
const newConnectionHandler =  require('./socketHandlers/newConnectionHandler');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const serverStore = require('./serverStore')
const registSockServer = (sever)=>{
    const io = require('socket.io')(sever,{
        cors:{
            origin:'*',
            methods:['GET','POST']
        }
    })

     serverStore.setSocketServerInstance(io);
    
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
        emitOnlineUsers();
    socket.on("disconnect", () => {
      console.log("disconnect Socket server");
      disconnectHandler(socket);
    });
    })
    setInterval(() => {
        emitOnlineUsers();
      }, 1000 * 8);

    
    }


    module.exports = { registSockServer };