import "./FriendList.css"
import Friend from "./Friend"

export default function FriendList({friendList, chooseFriend}) {
  return (
    <div class="friend-list">

      {friendList.map((username, index) => <Friend avatar="V" name={username} onClick={() => chooseFriend(username)} key={index} />)}

    </div>
  )
}