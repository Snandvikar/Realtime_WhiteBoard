const express = require("express");

// const cors = require("cors");
// const { userJoin, getUsers, userLeave } = require("./utils/user");

const app = express();

const server = require("http").createServer(app);
const {Server}= require("socket.io");

const io = new Server(server);
//routes
app.get("/", (req, res) => {
    res.send("server ");
  });

  let roomIdGlobal,imgURLGolbal;

  io.on("connection", (socket) => {
  socket.on("userJoined",(data)=>{
    const {name,  userId,roomId, host, presenter } = data;
    roomIdGlobal=roomId;
    socket.join(roomId);
    socket.emit("userIsJoined",{success:true});
    socket.broadcast.to(roomId).emit("whiteBoardDataResponse",{
      imgURL:imgURLGolbal,
    });
  });

  socket.on("whiteboardData",(data)=>{
  imgURLGolbal=data;
  socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse",{
    imgURL:data,
  });
  });
  });
// serve on port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log("server is listening on http://localhost:5000")
);
