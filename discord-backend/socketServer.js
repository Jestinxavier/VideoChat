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
    const emitOnlineUser = ()=>{
        const onlineUsers = serverStore.getOnlineUsers();
        io.emit('online-user',{onlineUsers})
    }

 
    // when it is successfull we can connect the connectin 
    io.on('connection',(socket)=>{
        console.log("user connected");
        console.log(socket.id);
        // new connection handler
        newConnectionHandler(socket,io);
        emitOnlineUser()
    })

    io.on('disconnect',()=>{
        console.log('disconnect Socket server');
        disconnectHandler(socket)
    })


    setInterval(()=>{
        emitOnlineUser();
    },
    [1000*8])


}
module.exports={registSockServer};