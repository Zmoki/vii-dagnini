const objects = document.querySelectorAll('.object')

for (let object of objects) {
  const loop = object.querySelector('.object__loop')
  const move = object.querySelector('.object__move')

  const moveStartsFrom = Number.parseFloat(loop.dataset.moveStartsFrom)
  const moveEndsTo = Number.parseFloat(loop.dataset.moveEndsTo)

  const startMove = () => {
    loop.pause()
    loop.hidden = true

    move.hidden = false
    move.play()

    move.addEventListener('ended', () => {
      endMove()
    }, {once: true})
  }

  const endMove = () => {
    move.hidden = true

    loop.hidden = false
    loop.addEventListener('canplay', () => {
      loop.currentTime = moveEndsTo
    }, {once: true})
    loop.play()
  }

  loop.addEventListener('click', () => {
    loop.playbackRate = 3.0
    const timeUpdateListenerThatStartMove = () => {
      if (loop.currentTime >= moveStartsFrom) {
        loop.playbackRate = 1.0
        startMove()
        loop.removeEventListener('timeupdate', timeUpdateListenerThatStartMove)
      }
    }
    const timeUpdateListenerThatWaitTime = () => {
      if (loop.currentTime < moveStartsFrom) {
        loop.removeEventListener('timeupdate', timeUpdateListenerThatWaitTime)
        loop.addEventListener("timeupdate", timeUpdateListenerThatStartMove);
      }
    }

    if (loop.currentTime < moveStartsFrom) {
      console.log('lower')

      loop.addEventListener("timeupdate", timeUpdateListenerThatStartMove);
    } else {
      console.log('upper')

      loop.addEventListener('timeupdate', timeUpdateListenerThatWaitTime)
    }
  })
}
