import "./Message.css"

export default function Message({type, content}) {
  return (
    <div className={`message ${type}`}>
      {content}
    </div>
  )
}