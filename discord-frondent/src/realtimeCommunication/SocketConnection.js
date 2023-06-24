import io from "socket.io-client";

export const connectionWithSocketServer = (userDetails) => {

    const jwtTocken = userDetails.token;
  let socket = io("http://localhost:5000",{
    auth:{
        tocken:jwtTocken,
    }
  });

  socket.on("connect", () => {
    console.log("Can I kiss you successfully today?");
    console.log(socket.id);
  });
};