import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { io } from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import { backend_url, server } from "../server";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../styles/style";

const URL = process.env.REACT_APP_CHAT_API_URL;
console.log(process.env.REACT_APP_CHAT_API_URL);

const socketId = io(URL, {
  transports: ["websocket"],
});

socketId.on("connect", () => {
  console.log(socketId); // log the socketId object after connection is established
});

socketId.on("connect_error", (err) => {
  console.log("Connection error:", err); // log any connection errors
});
const InboxPage = () => {
  const { user } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [image, setImage] = useState();

  ///////////////////////////// ///

  console.log("UserInbox");

  ///!!! socket  connection
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // console.log(messages);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  //todo //get conversation
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/conversation/get-user-conversation/${user?._id}`,
          {
            withCredentials: true,
          }
        );
        setConversations(res.data.conversations);
        // toast.success(res.data.message);
      } catch (err) {
        toast.error(err.response.data.message);
        console.log(err);
      }
    };

    fetchConversations();
  }, [user?._id, setConversations]);

  //////*** get all online users */

  useEffect(() => {
    if (user) {
      try {
        const userId = user?._id;
        socketId.emit("addUser", userId);
        socketId.on("getUsers", (data) => {
          setOnlineUsers(data);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [user, setOnlineUsers]);

  const checkOnlineUsers = (chat) => {
    const chatNumbers = chat?.members?.find((member) => member !== user?._id);
    const online = onlineUsers?.find((user) => user?.userId === chatNumbers);
    setActiveStatus(online ? true : false);
    return online ? true : false;
  };

  ///! update last message
  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user?._id,
    });

    console.log("updateMessage hello");
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/conversation/update-last-message/${currentChat?._id}`,
        {
          lastMessage: newMessage,
          lasMessageId: user?._id,
        }
      )
      .then((res) => {
        console.log(res.data);
        // toast.success(res.data.message);
        setNewMessage("");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  //! handle send message
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );
    socketId.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });
    try {
      if (newMessage !== "") {
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/message/create-new-message`,
            message
          )
          .then((res) => {
            // toast.success(res.data.msg);
            setMessages([...messages], res.data.message);
            console.log("updateMessage");

            updateLastMessage();
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data.message);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  ////!! handle image input and uploader
  const updateLastMessageForImage = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/conversation/update-last-message/${currentChat?._id}`,
        {
          lastMessage: "Photo",
          lasMessageId: user?._id,
        }
      )
      .then((res) => {
        console.log(res.data);
        // toast.success(res.data.message);
        setNewMessage("");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const imageSendingHandler = async (e) => {
    const formData = new FormData();

    formData.append("image", e);
    formData.append("sender", user._id);
    formData.append("text", newMessage);
    formData.append("conversationId", currentChat._id);

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      images: e,
    });
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/message/create-new-message`,
          formData
        )
        .then((res) => {
          // toast.success(res.data.msg);
          setImage();
          setMessages([...messages], res.data.message);
          console.log("updateMessage");

          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
    imageSendingHandler(file);
  };
  /// ! get All messages of chat
  useEffect(() => {
    const getAllMessage = async () => {
      try {
        await axios
          .get(
            `${process.env.REACT_APP_API_URL}/message/get-all-messages/${currentChat?._id}`
          )
          .then((res) => {
            setMessages(res.data.messages);
          })
          .catch((err) => {
            console.log(err.response.data.messages);
            toast.error(err.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getAllMessage();
  }, [currentChat?._id, newMessage, image]);
  //////////////////////////////////////////////////////////
  return (
    <>
      <div className="w-full">
        <Header />
        {!open && (
          <>
            <h1 className="text-center text-3xl py-3   font-Roboto font-medium from-orange-600 to-lime-500">
              All Messages
            </h1>
            {conversations &&
              conversations?.map((conversation, index) => (
                <>
                  <MessageList
                    data={conversation}
                    key={index}
                    index={index}
                    setOpen={setOpen}
                    setCurrentChat={setCurrentChat}
                    me={user}
                    setUserData={setUserData}
                    userData={userData}
                    online={() => checkOnlineUsers(conversation)}
                    setActiveStatus={setActiveStatus}
                  />
                </>
              ))}
          </>
        )}
        {/* ///!!!  on open of message  */}
        {open && (
          <>
            <UserInbox
              setOpen={setOpen}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessageHandler={sendMessageHandler}
              messages={messages}
              user={user}
              userData={userData}
              online={activeStatus}
              handleImageUpload={handleImageUpload}
            />
          </>
        )}
      </div>
    </>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  userData,
  online,
  setActiveStatus,
}) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/inbox?${id}`);
    setOpen(true);
  };

  //   console.log(data);
  useEffect(() => {
    const userId = data.members.find((user) => user !== me._id);

    const getUser = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/shop/get-shop-info/${userId}`)
        .then((res) => {
          setUser(res.data.shop);
          //   toast.success("user data has been finfded");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log(err);
        });
    };
    getUser();
  }, [me._id]);

  return (
    <div
      className={`w-full flex px-3 py-3  ${
        active === index ? " bg-pink-50" : "bg-transparent"
      }`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data?._id) ||
        setUserData(user) ||
        setCurrentChat(data) ||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src={`${backend_url}/${user?.avatar}`}
          alt=""
          className="w-16 h-16 rounded-full object-cover"
        />
        {online ? (
          <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-cyan-500"></div>
        ) : (
          <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500"></div>
        )}
      </div>
      <div className="my-auto pl-3 text-lg">
        <h5 className="block">{user?.name}</h5>
        <p className="text-base text-black/70">
          {data.lastMessageId !== user?._id
            ? "You : "
            : userData?.name.split(" ")[0] + " : "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

/// !! UserInbox

const UserInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  user,
  userData,
  online,
  handleImageUpload,
}) => {
  return (
    <>
      <div className="w-full max-h-[80vh] flex flex-col justify-between">
        <div className="flex h-24 justify-between items-center bg-pink-300/90">
          {/* //// image name  */}
          <div className="flex w-full m-4">
            <img
              src={`${backend_url}/${userData?.avatar}`}
              alt=""
              className="w-14 h-14 rounded-full object-cover "
            />
            <div className="ml-2">
              <h5 className="sm:text-lg text-md font-medium ">
                {userData?.name}
              </h5>
              {online ? (
                <h6 className="">Active now</h6>
              ) : (
                <h6 className="">Offline</h6>
              )}
            </div>
          </div>
          {/* /// icon  */}
          <div className="m-4">
            <AiOutlineArrowRight
              size={20}
              className="cursor-pointer "
              onClick={() => setOpen(false)}
            />
          </div>
        </div>

        {/* // !  Messages of screen  */}
        <div className="px-3 bg-slate-200   h-[70vh] overflow-y-auto">
          {messages &&
            messages.map((message, index) => (
              <>
                <div
                  className={`flex items-center my-2 ${
                    message.sender === user?._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                  key={index}
                >
                  {message.sender !== user?._id && (
                    <>
                      <img
                        src={`${backend_url}/${user.avatar}`}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover mr-1 "
                      />
                    </>
                  )}

                  {message?.image && (
                    <>
                      <div className="flex  flex-col  my-2">
                        <img
                          src={`${backend_url}/${message.image}`}
                          alt=""
                          className="aspect-square w-56 block rounded-lg border border-teal-500 h-56 object-cover"
                        />
                        <p className=" text-slate-600 block text-right text-[12px]">
                          {format(message?.createdAt)}
                        </p>
                      </div>
                    </>
                  )}

                  {message?.text !== "" && (
                    <>
                      <div className="w-max my-0.5">
                        <div className=" w-full px-2 py-1 text rounded-md ml-0.5 bg-slate-300">
                          <p className="block text-left text-gray-900">
                            {message.text}
                          </p>
                        </div>
                        <p className=" text-slate-600 text-[12px]">
                          {format(message?.createdAt)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </>
            ))}
        </div>
        {/* //! send messages input   */}

        <form
          aria-required={true}
          className=" w-11/12 mb-4 mx-auto relative flex items-center justify-between"
          onSubmit={sendMessageHandler}
        >
          <div className="w-[3%] mr-0.5">
            <input
              type="file"
              name="image"
              id="image"
              accept="/images/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label htmlFor="image" className="w-full cursor-pointer p-0.5">
              <TfiGallery size={20} className="cursor-pointer" />
            </label>
          </div>
          <div className="w-[90%] 800px:w-[95%]">
            <input
              type="text"
              className={`${styles.input} !border-pink-500 outline-none focus:ring-1 ring-pink-400 !px-4`}
              placeholder="Enter Your Message Here!!!"
              required
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <input type="submit" value="Send" className="hidden" id="submit" />
            <label htmlFor="send" onClick={sendMessageHandler}>
              <AiOutlineSend
                size={20}
                className="absolute cursor-pointer   top-2 right-3"
              />
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default InboxPage;
