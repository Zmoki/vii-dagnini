const VERSION = 3

window.addEventListener('load', () => {
  const loopVideos = {
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

      height: 130,
      width: 215,
    },
    'heruvim': {

      height: 150,
      width: 150,
    },
  }
  const moveVideos = {
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
  const platformItems = [
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
  const topItems = [
    {
      name: 'gorgulia',
      x: 600,
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
  let platformMovingState = 'running'
  const getXYZ = (degres) => {
    const radius = 500
    const radians = (degres) * (Math.PI / 180)
    const x = 600 + radius * Math.cos(radians)
    const y = 740 + radius * Math.sin(radians) / 7
    let scale = 1

    let z
    if (degres >= 0 && degres <= 45) {
      z = 9
      scale = .9 + (((1 - .9) / 45) * degres)
    } else if (degres > 45 && degres <= 135) {
      z = 10
      scale = 1
    } else if (degres > 135 && degres <= 180) {
      z = 9
      scale = 1 + (((.9 - 1) / 45) * (degres - 135))
    } else if (degres > 180 && degres <= 225) {
      z = 8
      scale = .9 + (((.8 - .9) / 45) * (degres - 180))
    } else if (degres > 225 && degres <= 315) {
      z = 7
      scale = .8
    } else {
      z = 8
      scale = .8 + (((.9 - .8) / 45) * (degres - 315))
    }

    return {
      x,
      y,
      z,
      scale
    }
  }
  const degreeStep = 360 / platformItems.length
  const FPS = 15
  const SUPER_SCALE = 1.15

  let type = "canvas"
  if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
  }

  let isSafari = false
  const testEl = document.createElement("video")
  if (testEl.canPlayType('video/webm')) {
    isSafari = false
  } else if (testEl.canPlayType('video/mp4; codecs=hvc1')) {
    isSafari = true
  }

  PIXI.utils.sayHello(type)

  let app = new PIXI.Application({width: 1200, height: 800, transparent: true, forceCanvas: true});
  //app.renderer.backgroundColor = PIXI.utils.string2hex("#dddddd");
  app.renderer.view.style.maxWidth = '100%'
  app.renderer.view.style.maxHeight = 'calc(100vh - 40px)'

  const loader = new PIXI.Loader()

  loader
    .add(Object.keys(loopVideos).map((name) => {
      let url = null

      if (isSafari) {
        url = `videos/_loops/hevc/${name}-loop.mp4?v=${VERSION}`
      }
      else {
        url = `videos/_loops/webm/${name}-loop.webm?v=${VERSION}`
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
  loader.onProgress.add(loadProgressHandler)

  function loadProgressHandler(loader) {
    document.getElementById('progress').innerText = Math.floor(loader.progress) + "%"
  }

  loader.load((loader, resources) => {
    console.log('load', loader, resources)

    const platformItemsContainer = new PIXI.Container()
    const sprites = {}

    platformItemsContainer.sortableChildren = true

    Object.keys(resources).map((name, index) => {
      const videoElement = document.createElement('video')

      videoElement.muted = true
      videoElement.loop = true
      videoElement.autoplay = true
      videoElement.WebKitPlaysInline = true
      videoElement.setAttribute('playsinline', '')
      videoElement.src = resources[name].url

      const texture = PIXI.Texture.from(videoElement)
      texture.baseTexture.resource.updateFPS = FPS

      sprites[name] = new PIXI.Sprite(texture)
    })

    platformItems.forEach((name, index) => {
      const sprite = sprites[name]
      const degrees = index * degreeStep

      const {x, y, z, scale} = getXYZ(degrees)

      sprite.width = loopVideos[name].width * scale * SUPER_SCALE
      sprite.height = loopVideos[name].height * scale * SUPER_SCALE
      sprite.x = x - (sprite.width * SUPER_SCALE / 2)
      sprite.y = y - sprite.height * SUPER_SCALE + (typeof loopVideos[name].deltaY === 'undefined' ? 0 : loopVideos[name].deltaY)
      sprite.zIndex = z
      sprite.degrees = degrees
      sprite.interactive = true

      platformItemsContainer.addChild(sprite);
    })
    topItems.forEach((item) => {
      const sprite = sprites[item.name]

      sprite.width = loopVideos[item.name].width * SUPER_SCALE
      sprite.height = loopVideos[item.name].height * SUPER_SCALE
      sprite.x = item.x - (sprite.width * SUPER_SCALE / 2)
      sprite.y = item.y
      sprite.zIndex = 9

      if (item.name === 'gorgulia') {
        sprite.interactive = true
      }

      platformItemsContainer.addChild(sprite);
    })

    const platformMoving = () => {
      platformItems.forEach(name => {
        const sprite = sprites[name]
        sprite.degrees += 0.2

        if (sprite.degrees >= 360) {
          sprite.degrees = 0
        }

        const {x, y, z, scale} = getXYZ(sprite.degrees)

        sprite.width = loopVideos[name].width * scale * SUPER_SCALE
        sprite.height = loopVideos[name].height * scale * SUPER_SCALE
        sprite.x = x - (sprite.width * SUPER_SCALE / 2)
        sprite.y = y - sprite.height * SUPER_SCALE + (typeof loopVideos[name].deltaY === 'undefined' ? 0 : loopVideos[name].deltaY)
        sprite.zIndex = z
      })
    }

    app.stage.addChild(platformItemsContainer)

    const playPromises = []
    Object.keys(sprites).forEach((name, index) => {
      const sprite = sprites[name]
      // sprite.x = 260 * index - 0
      // sprite.y = 600 - sprite.height + (typeof loopVideos[name].deltaY === 'undefined' ? 0 : loopVideos[name].deltaY)

      if (typeof moveVideos[name] !== 'undefined') {
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
            const moveVideoElement = document.createElement('video')

            moveVideoElement.id = `${moveName}-move`
            moveVideoElement.muted = !['four-hands', 'opera'].includes(moveName)
            moveVideoElement.autoplay = true
            moveVideoElement.WebKitPlaysInline = true
            moveVideoElement.setAttribute('playsinline', '')

            if (moveName === 'heruvim') {
              moveVideoElement.src = isSafari ?`videos/_loops/hevc/${moveName}-loop.mp4?v=${VERSION}` : `videos/_loops/webm/${moveName}-loop.webm?v=${VERSION}`
              moveVideoElement.height = loopVideos[moveName].height
            }
            else {
              moveVideoElement.src = isSafari ?`videos/_moves/hevc/${moveName}-move.mp4?v=${VERSION}` : `videos/_moves/webm/${moveName}-move.webm?v=${VERSION}`
              moveVideoElement.height = moveVideos[moveName].height
            }

            document.querySelector('#move').appendChild(moveVideoElement)

            moveVideoElement.addEventListener('ended', stop)
            document.querySelector('#move').addEventListener('click', () => {
              moveVideoElement.pause()
            }, {once: true})
          })
          document.querySelector('#move').addEventListener('click', () => {
            stop()
          }, {once: true})
        })
      }

      const videoElement = sprite.texture.baseTexture.resource.source
      const playPromise = videoElement.play()

      playPromises.push(playPromise)
      playPromise.then(() => {
        console.log(name, 'play')
      })
    })

    const setup = () => {
      console.log('play')
      document.querySelector('#loader').hidden = true
      document.querySelector('#carousel').classList.toggle('hidden')
      document.querySelector('#carousel').appendChild(app.view);
      setInterval(() => {
        if (platformMovingState === 'running') {
          requestAnimationFrame(platformMoving)
        }
      }, 1000 / FPS)
    }
    if (isSafari) {
      setup()
    }
    else {
      Promise.all(playPromises).then(() => {
        setup()
      })
    }
  })
})
