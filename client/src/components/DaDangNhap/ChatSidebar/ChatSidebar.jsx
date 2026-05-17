import "./ChatSidebar.css"
import FriendList from "./FriendList/FriendList"

export default function ChatSidebar({users, onClick}) {
  return (
    <div className="chat-sidebar">
      <div class="sidebar-header">
        Chats
      </div>

      <div class="search-box">
        <input type="text" placeholder="Tìm kiếm..." />
      </div>
      <FriendList friendList={users} onClick={onClick} />
    </div>
  )
}