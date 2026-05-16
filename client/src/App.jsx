import ChatBox from "./components/ChatBox/ChatBox"

export default function App() {

  const header = {
    avatar: "Vũ",
    name: "Dương Minh Vũ",
    activeStatus: "Đang hoạt động"
  }

  const messages = [
    {
      type: "other-message",
      time: "10:30",
      content: "Xin chào 👋"
    },
    {
      type: "my-message",
      time: "10:31",
      content: "Chào bạn!"
    }
  ]

  return (
    <>
      <ChatBox header={header} messages={messages} />
    </>
  )
}