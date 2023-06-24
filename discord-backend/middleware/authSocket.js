const jwt = require('jsonwebtoken');
const config = process.env
const verifyTokensocket = (socket,next)=>{
const token = socket.handshake.auth?.tocken;
try {
    const decoded = jwt.verify(token,config.TOKEN_KEY)
    socket.user = decoded
} catch (error) {
    const socketError = new Error('Not Authorised')
   return next(socketError);
}
next()
}

module.exports = verifyTokensocket