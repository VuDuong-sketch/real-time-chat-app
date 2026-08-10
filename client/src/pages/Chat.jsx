import { OTHER_PARTY, SELF } from "../enum/enum";
import sendButton from '../assert/send-button.png';
import { useEffect, useLayoutEffect, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { read, send } from "../store/actions";

export default function Chat() {

  const otherPartyId = useParams().otherPartyId;

  const dispatch = useDispatch();

  const chats = useSelector(state => state.data.chats); // phải lấy nguyên chats chứ không được find luôn trong đó để đảm bảo rerender

  let chat = chats.find(chat => chat.otherPartyId === otherPartyId);

  if (!chat)
    return <Navigate to={'/chats'} />

  const messages = chat.messages;

  const messagesRef = useRef();

  const contentRef = useRef();

  function handleSend() {
    const content = contentRef.current.value;
    contentRef.current.value = '';
    dispatch(send(otherPartyId, content));
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSend();
    }
  }

  // auto cuộn xuống
  useLayoutEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  // đọc tin nhắn khi bấm vào (tính năng chưa đọc, đã đọc)
  useEffect(() => {
    if (!chat.read) {
      dispatch(read(otherPartyId));
    }
  });

  return (
    <div className="border flex-1 h-full flex flex-col p-[10px]">
      <div className="h-[50px] flex items-center">
        <img className="w-[40px] h-[40px] rounded-full bg-white mr-[10px]" src="https://scontent-hkg4-2.xx.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s100x100&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=quJucpaWspEQ7kNvwExLdeS&_nc_oc=Adr9EmzNsol2XkgC9fDtSJWTFlIfFYN3l-qkfrnieXg_xxvRaRbKKt2tckg7Etk9Ru8&_nc_ad=z-m&_nc_cid=0&_nc_zt=24&_nc_ht=scontent-hkg4-2.xx&_nc_ss=7a22e&oh=00_AQGT3dB5n9-PvEIPTv0Coc2h8aTfP4Cyw-t38mvskZuNUg&oe=6A9BA07A" alt="avt" />
        <div>{chat.otherPartyUsername}</div>
      </div>

      <div ref={messagesRef} className="flex-1 min-h-0 overflow-y-auto">
        {messages.map((message, index) =>
          <div className={`flex items-center mt-[15px] ${message.sender === SELF ? 'justify-end' : ''}`} key={index}>
            {message.sender === OTHER_PARTY &&
              <img className="w-[35px] h-[35px] rounded-full bg-white" src="https://scontent-hkg4-2.xx.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s100x100&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=quJucpaWspEQ7kNvwExLdeS&_nc_oc=Adr9EmzNsol2XkgC9fDtSJWTFlIfFYN3l-qkfrnieXg_xxvRaRbKKt2tckg7Etk9Ru8&_nc_ad=z-m&_nc_cid=0&_nc_zt=24&_nc_ht=scontent-hkg4-2.xx&_nc_ss=7a22e&oh=00_AQGT3dB5n9-PvEIPTv0Coc2h8aTfP4Cyw-t38mvskZuNUg&oe=6A9BA07A" alt="avt" />
            }
            <div className={`max-w-[200px] rounded-[35px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] ml-[5px] mr-[5px] whitespace-pre-wrap break-words ${message.sender === SELF ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}>
              {message.content}
            </div>
          </div>
        )}

        
      </div>

      <div className="flex mb-[10px] mt-[10px]">
        <input onKeyDown={handleKeyDown} ref={contentRef} className="flex-1 min-w-0 border rounded-full outline-none pl-[10px] pt-[5px] pb-[5px]" type="text" placeholder="Aa" />
        <button onClick={handleSend} className="w-[35px] h-[35px] text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer ml-[5px] flex justify-center items-center">
          <img className="w-[30px] h-[30px]" src={sendButton} alt="Send" />
        </button>
        
      </div>
    </div>
  );
}