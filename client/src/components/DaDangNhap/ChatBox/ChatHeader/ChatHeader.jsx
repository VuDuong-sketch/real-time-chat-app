import "./ChatHeader.css"

export default function ChatHeader({ name, back }) {
  return (
    <div className="chat-header">

      <button onClick={back} className="back-btn">
        ←
      </button>
      <div className="avatar">V</div>

      <div className="header-info">
        <h3>{name}</h3>
      </div>
    </div>
  )
}