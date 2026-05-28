import "./ChatSidebar.css"
import FriendList from "./FriendList/FriendList"
import { controller } from "../../../control"
import { useReducer, useRef, useEffect } from "react"
import SauKhiTimKiem from "./SauKhiTimKiem/SauKhiTimKiem"

export default function ChatSidebar({chooseFriend}) {

  const reRender = useReducer(x => x + 1, 0)[1]; // render lại

  const [state, setState] = useReducer((state, action) => {
    if (action.type === "friend-list") {
      return {
        contentType: action.type,
        content: null
      }
    } else {
      return {
        contentType: action.type,
        name: action.name
      }
    }
  }, {contentType: "friend-list", content: null});

  const searchBox = useRef();

  useEffect(() => {
    controller.updateMessagesInChatSidebar = reRender;
  }, []);

  async function search(name) {
      if (await controller.search(name)) {
      console.log("thanhcong");
      setState({
        type: "sau-khi-tim-kiem",
        name: name
      })
    } else {
      setState({
        type: "sau-khi-tim-kiem",
        name: null
      })
    }
  }

  function handleClick() {
    if (state.contentType === "friend-list") {
      search(searchBox.current.value);
    } else {
      setState({type: "friend-list"});
    }
  }

  return (
    <div className="chat-sidebar">
      <div className="sidebar-header">
        Chats
      </div>

      <div className="search-box">
        <input ref={searchBox} type="text" placeholder="Tìm kiếm..." />
        <button onClick={handleClick}>{state.contentType === "friend-list" ? "Tìm" : "Đóng"}</button>
      </div>
      {state.contentType === "friend-list" && <FriendList friendList={controller.getFriends()} chooseFriend={chooseFriend} />}
      {state.contentType === "sau-khi-tim-kiem" && state.name !== null && <SauKhiTimKiem name={state.name} onClick={() => chooseFriend(state.name)} />}
    </div>
  )
}