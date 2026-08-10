import { useDispatch, useSelector } from "react-redux";
import { OTHER_PARTY, SELF } from "../enum/enum";
import { useEffect, useRef } from "react";
import { fetchChats, search } from "../store/actions";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {

  // const chats = [
  //   {
  //     chatId: '',
  //     messages: [],
  //     otherPartyUsername: 'vuduong',
  //     otherPartyId: '',
  //     latestMessage: {
  //       sender: OTHER_PARTY,
  //       content: 'Hi'
  //     }
  //   }
  // ];

  const chats = useSelector(state => state.data.chats);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(otherPartyId) {
    navigate(`/chats/${otherPartyId}`);
  }

  const searchRef = useRef();

  function handleSearchKeyDown(event) {
    if (event.key === "Enter") {
      dispatch(search(searchRef.current.value));
    }
  }

  useEffect(() => {
    if (chats.length === 0) {
      dispatch(fetchChats());
    }
  }, []);

  return (
    <div className="w-[360px] h-full border flex flex-col">
      <div className="h-[150px] border flex flex-col justify-center">
        <div className="p-[10px] font-bold text-[25px]">
          Chats
        </div>
        <div className="w-full p-[10px]">
          <input ref={searchRef} onKeyDown={handleSearchKeyDown} className="border outline-none w-full rounded-full pl-[10px] pt-[5px] pb-[5px]" type="text" placeholder="Search" />
        </div>
      </div>
      <div className="flex-1 border min-h-0 overflow-y-auto">
        {chats.map((chat, index) =>
          <div onClick={() => handleClick(chat.otherPartyId)} className={`h-[75px] flex items-center border hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer ${chat.read ? '' : 'font-bold'}`} key={index}>
            <img className="w-[50px] h-[50px] rounded-full bg-white m-[10px]" src="https://scontent-hkg4-2.xx.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s100x100&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=quJucpaWspEQ7kNvwExLdeS&_nc_oc=Adr9EmzNsol2XkgC9fDtSJWTFlIfFYN3l-qkfrnieXg_xxvRaRbKKt2tckg7Etk9Ru8&_nc_ad=z-m&_nc_cid=0&_nc_zt=24&_nc_ht=scontent-hkg4-2.xx&_nc_ss=7a22e&oh=00_AQGT3dB5n9-PvEIPTv0Coc2h8aTfP4Cyw-t38mvskZuNUg&oe=6A9BA07A" alt="avt" />
            <div>
              <div>{chat.otherPartyUsername}</div>
              {chat.latestMessage && <div className="w-[200px] overflow-x-hidden">
                {`${chat.latestMessage.sender === SELF ? 'You: ' : ''}${chat.latestMessage.content}`}
              </div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}