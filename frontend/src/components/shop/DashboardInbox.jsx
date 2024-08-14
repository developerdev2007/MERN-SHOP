import { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { backend_url, server } from "../../server";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import { io } from "socket.io-client";
import { format } from "timeago.js";
const URL = "http://localhost:5000";
const socketId = io(URL, {
  transports: ["websocket"],
});
socketId.on("connect", () => {
  console.log(socketId); // log the socketId object after connection is established
});

socketId.on("connect_error", (err) => {
  console.log("Connection error:", err); // log any connection errors
});
// console.log(socketId);

const DashboardInbox = () => {
  const { seller } = useSelector((state) => state.seller);
  // const { user } = useSelector((state) => state.user);
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

  console.log("DashInbox");

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
          `${server}/conversation/get-seller-conversation/${seller?._id}`
        );
        setConversations(res.data.conversations);
        // toast.success(res.data.message);
      } catch (err) {
        toast.error(err.response.data.message);
        console.log(err);
      }
    };

    fetchConversations();
  }, [seller, messages]);

  //////*** get all online users */

  useEffect(() => {
    if (seller) {
      try {
        const userId = seller?._id;
        socketId.emit("addUser", userId);
        socketId.on("getUsers", (data) => {
          setOnlineUsers(data);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [seller]);

  const checkOnlineUsers = (chat) => {
    const chatNumbers = chat?.members?.find((member) => member !== seller?._id);
    const online = onlineUsers?.find((user) => user?.userId === chatNumbers);
    setActiveStatus(online ? true : false);
    return online ? true : false;
  };

  ///! update last message
  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller?._id,
    });

    console.log("updateMessage hello");
    await axios
      .put(`${server}/conversation/update-last-message/${currentChat?._id}`, {
        lastMessage: newMessage,
        lasMessageId: seller?._id,
      })
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
      sender: seller?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member?._id !== seller?._id
    );
    socketId.emit("sendMessage", {
      senderId: seller?._id,
      receiverId,
      text: newMessage,
    });
    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
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
      .put(`${server}/conversation/update-last-message/${currentChat?._id}`, {
        lastMessage: "Photo",
        lasMessageId: seller?._id,
      })
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
    formData.append("sender", seller._id);
    formData.append("text", newMessage);
    formData.append("conversationId", currentChat._id);

    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );
    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      images: e,
    });
    try {
      await axios
        .post(`${server}/message/create-new-message`, formData)
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
          .get(`${server}/message/get-all-messages/${currentChat?._id}`)
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
  return (
    <>
      <div className="w-full bg-white  m-5 drop-shadow-2xl shadow-red-500  h-[85vh] overflow-y-scroll rounded-md mt-14 ">
        {/* //! All Messages  */}

        {/* ///!!!  on not open of message  */}
        {!open && (
          <>
            <h1 className="text-center text-3xl py-3   font-Roboto font-medium from-orange-600 to-lime-500">
              All Messages
            </h1>
            {conversations &&
              conversations?.map((conversation, index) => (
                <>
                  <Messages
                    data={conversation}
                    key={index}
                    index={index}
                    setOpen={setOpen}
                    setCurrentChat={setCurrentChat}
                    seller={seller}
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
            <SellerInbox
              setOpen={setOpen}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessageHandler={sendMessageHandler}
              messages={messages}
              seller={seller}
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

const Messages = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  seller,
  setUserData,
  setActiveStatus,
  online,
}) => {
  console.log(online);
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  console.log("Message");
  const handleClick = (id) => {
    navigate(`/dashboard-inbox?${id}`);
  };
  useEffect(() => {
    const userId = data.members.find((user) => user !== seller?._id);

    const getUser = async () => {
      await axios
        .get(`${server}/user/user-info/${userId}`)
        .then((res) => {
          setUser(res.data.user);
          // toast.success("user data has been finfded");ss
        })
        .catch((err) => {
          toast.error(err.response.data.messsage);
          console.log(err);
        });
    };
    getUser();
  }, [seller._id, data]);

  return (
    <div
      className={`w-full flex px-3 py-3  ${
        active === index ? " bg-pink-50" : "bg-transparent"
      }`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data?._id) ||
        setOpen(true) ||
        setUserData(user) ||
        setActiveStatus(online) ||
        setCurrentChat(data)
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
          {data?.lastMessageId !== user?._id
            ? "You : "
            : user?.name?.split(" ")[0] + " : "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

/// !! SellerInbox

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  seller,
  userData,
  online,
  handleImageUpload,
}) => {
  console.log("Seller");

  return (
    <>
      <div className="w-full min-h-[85vh] flex flex-col justify-between">
        <div className="flex justify-between items-center bg-pink-300/90">
          {/* //// image name  */}
          <div className="flex w-full m-4">
            <img
              src={`${backend_url}/${userData?.avatar}`}
              alt=""
              className="w-16 h-16 rounded-full object-cover "
            />
            <div className="ml-2">
              <h5 className="text-xl font-medium ">{userData?.name}</h5>
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
                    message.sender === seller?._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                  key={index}
                >
                  {message.sender !== seller?._id && (
                    <>
                      <img
                        src={`${backend_url}${userData?.avatar}`}
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
                        <p className=" text-slate-600 text-right text-[12px]">
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
            <input type="submit" value="Send" className="hidden" id="send" />
            <label htmlFor="send">
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

export default DashboardInbox;
