const objects = document.querySelectorAll('.object')

for (let object of objects) {
  const loop = object.querySelector('.object__video_type_loop')
  const move = object.querySelector('.object__video_type_move')

  const startMove = () => {
    loop.pause()
    loop.classList.toggle('object__video_hidden')
    move.classList.toggle('object__video_hidden')

    move.addEventListener('transitionend', () => {
      move.play()
    }, {once: true})

    move.addEventListener('ended', () => {
      endMove()
    }, {once: true})
  }

  const endMove = () => {
    loop.classList.toggle('object__video_hidden')
    move.classList.toggle('object__video_hidden')

    loop.addEventListener('transitionend', () => {
      loop.play()
    }, {once: true})
  }

  loop.addEventListener('click', () => {
    startMove()
  })
}
