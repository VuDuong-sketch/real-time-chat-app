import "./ChatSidebar.css"
import FriendList from "./FriendList/FriendList"
import { controller } from "../../../control"

export default function ChatSidebar({chooseFriend}) {
  return (
    <div className="chat-sidebar">
      <div class="sidebar-header">
        Chats
      </div>

      <div class="search-box">
        <input type="text" placeholder="Tìm kiếm..." />
      </div>
      <FriendList friendList={controller.getFriends()} chooseFriend={chooseFriend} />
      {/* <FriendList friendList={users} onClick={onClick} /> */}
    </div>
  )
}