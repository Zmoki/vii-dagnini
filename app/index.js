const objects = document.querySelectorAll('.object')
const carousel = document.querySelector('.carousel')

document.querySelectorAll('.object__video_type_loop').forEach(vid => {
  vid.addEventListener('canplay', () => {
    vid.play()
  })
});

for (let object of objects) {
  const loop = object.querySelector('.object__video_type_loop')
  const move = object.querySelector('.object__video_type_move')

  loop.playbackRate = 2.5

  const startMove = () => {
    document.querySelectorAll('.object__video_type_loop').forEach(vid => {
      vid.pause()
      vid.classList.add('object__video_hidden')
    });
    move.classList.toggle('object__video_hidden')

    move.addEventListener('transitionend', () => {
      move.play()
    }, {once: true})

    move.addEventListener('ended', () => {
      endMove()
      carousel.style.setProperty('--play-state', 'running')
    }, {once: true})
  }

  const endMove = () => {
    move.classList.toggle('object__video_hidden')

    move.addEventListener('transitionend', () => {
      document.querySelectorAll('.object__video_type_loop').forEach(vid => {
        vid.classList.toggle('object__video_hidden')
        vid.play()
      });
    }, {once: true})
  }

  if (move !== null) {
    loop.addEventListener('click', () => {
      startMove()
      carousel.style.setProperty('--play-state', 'paused')
    })
  }
}
