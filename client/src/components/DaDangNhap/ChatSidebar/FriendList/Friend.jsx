export default function Friend({avatar, name, onClick}) {
  return (
    <div onClick={onClick} class="friend">

      <div class="avatar">
        {avatar}
      </div>

      <div class="friend-info">

        <div class="friend-name">
          {name}
        </div>

      </div>

    </div>
  )
}