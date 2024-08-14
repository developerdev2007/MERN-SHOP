import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);

// console.log(io);
let users = [];

///?? addUser to socket

const addUser = (userId, socketId) => {
  !users.some((user) => userId === userId) &&
    users.push({
      userId,
      socketId,
    });
};

///??? remove user

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
///??? get user

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

////////! define a property (message) with a seen property

const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

//! when connect(main part of this )
io.on("connection", (socket) => {
  console.log("a user has been connected successfully");

  //** take user id and socket id from user */
  //add user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //?? send and get message
  const messages = {}; //++++ object to track messages send to each user
  ///!!! send message to the users
  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({ senderId, receiverId, text, images });

    const user = getUser(receiverId);

    //? store the message in the message object

    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }

    //???? send the message to the receiver

    io.to(user?.socketId).emit("getMessage", message);
  });

  //!!! message seen property adding

  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);

    ///*** update the seen flag  for the message */
    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message.receiverId === receiverId && message.id === messageId
      );
      if (message) {
        message.seen = true;
        ///! send message to seen event to the sender
        io.to(user?.senderId).emit("messageSeen", {
          senderId,
          receiverId,
          messageId,
        });
      }
    }
  });
  ///!! update last message
  socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
    io.emit("getLastMessage", {
      lastMessage,
      lastMessageId,
    });
  });

  socket.on("disconnect", () => {
    console.log("user Disconnected");

    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
/////////////**_______________________________________________________________________________
app.get("/", (req, res) => {
  res.send("Hello World from socket server");
});

server.listen(process.env.PORT || 5000, () => {
  console.log(
    "socket io server is running perfectly👍 on port ",
    process.env.PORT
  );
});
