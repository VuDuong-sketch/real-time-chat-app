import "./FriendList.css"
import Friend from "./Friend"

export default function FriendList({friendList, chooseFriend}) {
  return (
    <div className="friend-list">

      {friendList.map((username, index) => <Friend name={username} onClick={() => chooseFriend(username)} key={index} />)}

    </div>
  )
}