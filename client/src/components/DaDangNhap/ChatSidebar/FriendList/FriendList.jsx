import "./FriendList.css"
import Friend from "./Friend"

export default function FriendList({friendList, onClick}) {
  return (
    <div class="friend-list">

      {friendList.map((user, index) => <Friend avatar="V" name={user.username} onClick={() => onClick(user.username)} key={index} />)}

    </div>
  )
}