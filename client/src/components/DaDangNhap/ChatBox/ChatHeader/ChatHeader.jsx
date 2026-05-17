import "./ChatHeader.css"

export default function ChatHeader({ avatar, name, back }) {
  return (
    <div className="chat-header">

      <button onClick={back} class="back-btn">
        ←
      </button>
      <div className="avatar">{avatar}</div>

      <div className="header-info">
        <h3>{name}</h3>
      </div>
    </div>
  )
}