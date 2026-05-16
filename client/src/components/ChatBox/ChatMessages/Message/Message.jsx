import "./Message.css"

export default function Message({type, content, time}) {
  return (
    <div className={`message ${type}`}>
      {content}
      <div className="time">{time}</div>
    </div>
  )
}