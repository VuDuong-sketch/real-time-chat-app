import "./ChatHeader.css"

export default function ChatHeader({avatar, name, activeStatus}) {
  return (
    <div className="chat-header">
      <div className="avatar">{avatar}</div>

      <div className="header-info">
        <h3>{name}</h3>
        <p>{activeStatus}</p>
      </div>
    </div>
  )
}