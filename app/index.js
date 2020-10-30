const VERSION = 3
const SCENE_WIDTH = 1300
const SCENE_HEIGHT = 800
const RADIUS = 500
const FPS = 15
const SPEED = 0.2
const SUPER_SCALE = 1.15
const LOOPS = {
  'four-hands': {
    height: 290,
    width: 301,
    deltaY: 5
  },
  'gorgulia': {
    height: 300,
    width: 292,
  },
  'leg': {
    height: 180,
    width: 310,
    deltaY: 20
  },
  'goroh': {
    height: 260,
    width: 187,
    deltaY: -30,
  },
  'lion': {
    height: 320,
    width: 319,
    deltaY: 3
  },
  'opera': {
    height: 460,
    width: 381,
    deltaY: 30,
  },
  'pip-show': {
    height: 300,
    width: 230,
    deltaY: 5
  },
  'rusalka': {
    height: 290,
    width: 247,
    deltaY: 5
  },
  'smotritelnitsa': {
    height: 310,
    width: 218,
    deltaY: 10
  },
  'sport': {
    height: 310,
    width: 274,
    deltaY: 5
  },
  'svetofor': {
    height: 550,
    width: 306,
    deltaY: 90,
  },
  'svidetel': {
    height: 350,
    width: 280,
    deltaY: 0
  },
  'wings': {
    height: 132,
    width: 218,
  },
  'heruvim': {
    height: 170,
    width: 170,
  },
}
const MOVES = {
  'four-hands': {
    height: 400,
  },
  'gorgulia': {
    height: 400
  },
  'goroh': {
    height: 400
  },
  'leg': {
    height: 200
  },
  'lion': {
    height: 400
  },
  'opera': {
    height: 500
  },
  'pip-show': {
    height: 560
  },
  'raduga': {
    height: 290,
  },
  'rusalka': {
    height: 400,
  },
  'smotritelnitsa': {
    height: 400,
  },
  'sport': {
    height: 400,
  },
  'svetofor': {
    height: 600,
  },
  'svidetel': {
    height: 400,
  },
}
const PLATFORM_ITEMS = [
  'goroh',
  'svetofor',
  'sport',
  'smotritelnitsa',
  'rusalka',
  'opera',
  'lion',
  'four-hands',
  'pip-show',
  'leg',
  'svidetel',
]
const TOP_ITEMS = [
  {
    name: 'gorgulia',
    x: SCENE_WIDTH / 2,
    y: -50,
  },
  {
    name: 'heruvim',
    x: 250,
    y: 0,
  },
  {
    name: 'wings',
    x: 950,
    y: -20,
  },
]

const DEGREES_STEP = 360 / PLATFORM_ITEMS.length

const getPosition = (degrees) => {
  const radians = (degrees) * (Math.PI / 180)
  const x = (SCENE_WIDTH / 2) + RADIUS * Math.cos(radians)
  const y = (SCENE_HEIGHT - 60) + RADIUS * Math.sin(radians) / 7
  let scale = 1

  let z
  if (degrees >= 0 && degrees <= 45) {
    z = 9
    scale = .9 + (((1 - .9) / 45) * degrees)
  } else if (degrees > 45 && degrees <= 135) {
    z = 10
    scale = 1
  } else if (degrees > 135 && degrees <= 180) {
    z = 9
    scale = 1 + (((.9 - 1) / 45) * (degrees - 135))
  } else if (degrees > 180 && degrees <= 225) {
    z = 8
    scale = .9 + (((.8 - .9) / 45) * (degrees - 180))
  } else if (degrees > 225 && degrees <= 315) {
    z = 7
    scale = .8
  } else {
    z = 8
    scale = .8 + (((.9 - .8) / 45) * (degrees - 315))
  }

  return {
    x,
    y,
    z,
    scale
  }
}
const createVideoElement = () => {
  const videoElement = document.createElement('video')

  videoElement.muted = true
  videoElement.loop = true
  videoElement.autoplay = true
  videoElement.WebKitPlaysInline = true
  videoElement.setAttribute('playsinline', '')

  return videoElement
}

window.addEventListener('load', () => {
  let platformMovingState = 'running'

  let isSafari
  const testEl = document.createElement("video")
  if (testEl.canPlayType('video/webm')) {
    isSafari = false
  } else if (testEl.canPlayType('video/mp4; codecs=hvc1')) {
    isSafari = true
  } else {
    throw new Error('Video not supported')
  }

  let type = "WebGL"
  if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
  }

  PIXI.utils.sayHello(type)

  let app = new PIXI.Application({width: SCENE_WIDTH, height: SCENE_HEIGHT, transparent: true, forceCanvas: true});

  app.renderer.view.style.maxWidth = '100%'
  app.renderer.view.style.maxHeight = 'calc(100vh - 40px)'

  const loader = new PIXI.Loader()

  loader
    .add(Object.keys(LOOPS).map((name) => {
      let url

      if (window.matchMedia("(max-width: 799px)").matches) {
        if (isSafari) {
          url = `videos/_loops/_small/hevc/${name}-loop.mp4?v=${VERSION}`
        } else {
          url = `videos/_loops/_small/webm/${name}-loop.webm?v=${VERSION}`
        }
      } else {
        if (isSafari) {
          url = `videos/_loops/hevc/${name}-loop.mp4?v=${VERSION}`
        } else {
          url = `videos/_loops/webm/${name}-loop.webm?v=${VERSION}`
        }
      }

      return {
        name,
        url,
        onComplete: (e) => {
          console.log('complete', name, e)
        },
        onError: (e) => {
          console.log('error', name, e)
        }
      }
    }))
  loader.onError.add((e) => {
    console.log('errror', e)
  })
  loader.onProgress.add((loader) => {
    document.getElementById('progress').innerText = Math.floor(loader.progress) + "%"
  })

  loader.load((loader, resources) => {
    console.log('load', loader, resources)

    const sprites = {}
    const carouselContainer = new PIXI.Container()
    const playPromises = []

    carouselContainer.sortableChildren = true

    Object.keys(resources).map((name, index) => {
      const videoElement = createVideoElement()

      videoElement.src = resources[name].url

      const texture = PIXI.Texture.from(videoElement)

      texture.baseTexture.resource.updateFPS = FPS

      const sprite = new PIXI.Sprite(texture)

      if (!isSafari) {
        const playPromise = sprite.texture.baseTexture.resource.source.play()

        playPromises.push(playPromise)
        playPromise.then(() => {
          console.log(name, 'play')
        })
      }
      // sprite.x = 260 * index - 0
      // sprite.y = 600 - sprite.height + (typeof loopVideos[name].deltaY === 'undefined' ? 0 : loopVideos[name].deltaY)

      if (typeof MOVES[name] !== 'undefined') {
        sprite.on('pointertap', () => {
          platformMovingState = 'paused'
          Object.keys(sprites).forEach(item => {
            sprites[item].texture.baseTexture.resource.source.pause()
          })
          document.querySelector('#carousel').classList.toggle('hidden')
          document.querySelector('#move').classList.toggle('hidden')

          const stop = () => {
            document.querySelector('#move').classList.toggle('hidden')
            Object.keys(sprites).forEach(item => {
              sprites[item].texture.baseTexture.resource.source.play()
            })
            platformMovingState = 'running'
            document.querySelector('#carousel').classList.toggle('hidden')
            document.querySelector('#move').addEventListener('transitionend', () => {
              document.querySelector('#move').innerHTML = ''
            }, {once: true})
          }

          let moves = [name]

          if (name === 'smotritelnitsa') {
            moves = ['smotritelnitsa', 'raduga']
          }
          if (name === 'four-hands') {
            moves = ['heruvim', 'four-hands']
          }

          moves.forEach((moveName) => {
            const videoElement = createVideoElement()

            videoElement.id = `${moveName}-move`
            videoElement.muted = !['four-hands', 'opera'].includes(moveName)
            videoElement.loop = false

            if (moveName === 'heruvim') {
              videoElement.src = isSafari ? `videos/_loops/hevc/${moveName}-loop.mp4?v=${VERSION}` : `videos/_loops/webm/${moveName}-loop.webm?v=${VERSION}`
              videoElement.height = LOOPS[moveName].height
            } else {
              videoElement.src = isSafari ? `videos/_moves/hevc/${moveName}-move.mp4?v=${VERSION}` : `videos/_moves/webm/${moveName}-move.webm?v=${VERSION}`
              videoElement.height = MOVES[moveName].height
            }

            document.querySelector('#move').appendChild(videoElement)

            videoElement.addEventListener('ended', stop)
            document.querySelector('#move').addEventListener('click', () => {
              videoElement.pause()
            }, {once: true})
          })
          document.querySelector('#move').addEventListener('click', () => {
            stop()
          }, {once: true})
        })
      }

      sprites[name] = sprite
    })

    PLATFORM_ITEMS.forEach((name, index) => {
      const sprite = sprites[name]
      const degrees = index * DEGREES_STEP

      const {x, y, z, scale} = getPosition(degrees)

      sprite.width = LOOPS[name].width * scale * SUPER_SCALE
      sprite.height = LOOPS[name].height * scale * SUPER_SCALE
      sprite.x = x - (sprite.width * SUPER_SCALE / 2)
      sprite.y = y - sprite.height * SUPER_SCALE + (typeof LOOPS[name].deltaY === 'undefined' ? 0 : LOOPS[name].deltaY)
      sprite.zIndex = z
      sprite.degrees = degrees
      sprite.interactive = true

      carouselContainer.addChild(sprite);
    })
    TOP_ITEMS.forEach((item) => {
      const sprite = sprites[item.name]

      sprite.width = LOOPS[item.name].width * SUPER_SCALE
      sprite.height = LOOPS[item.name].height * SUPER_SCALE
      sprite.x = item.x - (sprite.width * SUPER_SCALE / 2)
      sprite.y = item.y
      sprite.zIndex = 9

      if (item.name === 'gorgulia') {
        sprite.interactive = true
      }

      carouselContainer.addChild(sprite);
    })

    const platformMoving = () => {
      PLATFORM_ITEMS.forEach(name => {
        const sprite = sprites[name]
        sprite.degrees += SPEED

        if (sprite.degrees >= 360) {
          sprite.degrees = 0
        }

        const {x, y, z, scale} = getPosition(sprite.degrees)

        sprite.width = LOOPS[name].width * scale * SUPER_SCALE
        sprite.height = LOOPS[name].height * scale * SUPER_SCALE
        sprite.x = x - (sprite.width * SUPER_SCALE / 2)
        sprite.y = y - sprite.height * SUPER_SCALE + (typeof LOOPS[name].deltaY === 'undefined' ? 0 : LOOPS[name].deltaY)
        sprite.zIndex = z
      })
    }

    const setup = () => {
      console.log('play')
      app.stage.addChild(carouselContainer)
      document.querySelector('#loader').hidden = true
      document.querySelector('#carousel').classList.toggle('hidden')
      document.querySelector('#carousel').appendChild(app.view);
      setInterval(() => {
        if (platformMovingState === 'running') {
          requestAnimationFrame(platformMoving)
        }
      }, 1000 / FPS)
    }

    if (!isSafari) {
      Promise.all(playPromises).then(() => {
        setup()
      })
    } else {
      setup()
    }
  })
})
