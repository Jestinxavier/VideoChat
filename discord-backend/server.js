const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const socketServer = require('./socketServer');
const authRoutes = require('./routes/authRoutes');
const friendinvitationRouteRoutes = require('./routes/friendinvitationRoutes')
const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
}));

// Add the Referrer-Policy header
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Register the route
app.use("/api/auth", authRoutes);
app.use('/api/friend-invitation',friendinvitationRouteRoutes)

console.log("Starting our server");
const server = http.createServer(app);
socketServer.registSockServer(server);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening at port ${PORT}`);
    });
  })
  .catch(error => console.log(error));
