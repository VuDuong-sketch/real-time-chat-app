export default function SauKhiTimKiem({name, onClick}) {
  return (
    <div onClick={onClick} className="friend">

      <div className="avatar">
        V
      </div>

      <div className="friend-info">

        <div className="friend-name">
          {name}
        </div>

      </div>

    </div>
  )
}