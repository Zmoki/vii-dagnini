window.addEventListener('load', () => {
  const loopVideos = {
    'four-hands': {'webm': 'videos/_loops/webm/four%20hands%20loop.webm', 'hevc': 'videos/_loops/hevc/four%20hands%20loop.mp4'},
    'gorgulia': {'webm': 'videos/_loops/webm/gorgulia%20new%20loop.webm', 'hevc': 'videos/_loops/hevc/gorgulia%20new%20loop.mp4'},
    'goroh': {'webm': 'videos/_loops/webm/goroh%20raduga%20loop.webm', 'hevc': 'videos/_loops/hevc/goroh%20raduga%20loop.mp4'},
    'leg': {'webm': 'videos/_loops/webm/leg%20leg.webm', 'hevc': 'videos/_loops/hevc/leg%20leg.mp4'},
    'lion': {'webm': 'videos/_loops/webm/new%20lion%20loopp.webm', 'hevc': 'videos/_loops/hevc/new%20lion%20loopp.mp4'},
    'opera': {'webm': 'videos/_loops/webm/opera%20loop.webm', 'hevc': 'videos/_loops/hevc/opera%20loop.mp4'},
    'pip-show': {'webm': 'videos/_loops/webm/pip%20show%20loop.webm', 'hevc': 'videos/_loops/hevc/pip%20show%20loop.mp4'},
    'rusalka': {'webm': 'videos/_loops/webm/rusalka%20looop.webm', 'hevc': 'videos/_loops/hevc/rusalka%20looop.mp4'},
    'smotritelnitsa': {'webm': 'videos/_loops/webm/smotritelnitsa%20loop.webm', 'hevc': 'videos/_loops/hevc/smotritelnitsa%20loop.mp4'},
    'sport': {'webm': 'videos/_loops/webm/sport%20loop.webm', 'hevc': 'videos/_loops/hevc/sport%20loop.mp4'},
    'svetofor': {'webm': 'videos/_loops/webm/svetofor%20loop.webm', 'hevc': 'videos/_loops/hevc/svetofor%20loop.mp4'},
    'svidetel': {'webm': 'videos/_loops/webm/svidetel%20loop.webm', 'hevc': 'videos/_loops/hevc/svidetel%20loop.mp4'},
  }
  const moveVideos = {
    'four-hands': {'webm': 'videos/_moves/webm/four%20hands%20move.webm', 'hevc': 'videos/_moves/hevc/four%20hands%20move.mp4'},
    'gorgulia': {'webm': 'videos/_moves/webm/gorgulia%20move%20+%202%20loops.webm', 'hevc': 'videos/_moves/hevc/gorgulia%20move%20+%202%20loops.mp4'},
    'goroh': {'webm': 'videos/_moves/webm/goroh%20raduga%20move.webm', 'hevc': 'videos/_moves/hevc/goroh%20raduga%20move.mp4'},
    'lion': {'webm': 'videos/_moves/webm/lion%20new%20move.webm', 'hevc': 'videos/_moves/hevc/lion%20new%20move.mp4'},
    'opera': {'webm': 'videos/_moves/webm/opera%20moove.webm', 'hevc': 'videos/_moves/hevc/opera%20moove.mp4'},
    'pip-show': {'webm': 'videos/_moves/webm/pip%20show%20move%20pt2.webm', 'hevc': 'videos/_moves/hevc/pip%20show%20move%20pt2.mp4'},
    'rusalka': {'webm': 'videos/_moves/webm/rusalka%20loop%20move%20loop.webm', 'hevc': 'videos/_moves/hevc/rusalka%20loop%20move%20loop.mp4'},
    'smotritelnitsa': {'webm': 'videos/_moves/webm/smotritelnitsa%20loop%20move%20loop.webm', 'hevc': 'videos/_moves/hevc/smotritelnitsa%20loop%20move%20loop.mp4'},
    'sport': {'webm': 'videos/_moves/webm/sport%20loop%20move%20loop.webm', 'hevc': 'videos/_moves/hevc/sport%20loop%20move%20loop.mp4'},
    'svetofor': {'webm': 'videos/_moves/webm/svetofor%20move.webm', 'hevc': 'videos/_moves/hevc/svetofor%20move.mp4'},
    'svidetel': {'webm': 'videos/_moves/webm/svidetel%20move.webm', 'hevc': 'videos/_moves/hevc/svidetel%20move.mp4'},
  }
  const otherVideos = {
    'gorgulia': {'webm': 'videos/_loops/webm/gorgulia%20new%20loop.webm', 'hevc': 'videos/_loops/hevc/gorgulia%20new%20loop.mp4'},
    'wings': {'webm': 'videos/_loops/webm/wings.webm', 'hevc': 'videos/_loops/hevc/wings.mp4'},
    'heruvim': {'webm': 'videos/_loops/webm/heruvim.webm', 'hevc': 'videos/_loops/hevc/heruvim.mp4'},
  }
  let type = "WebGL"
  if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
  }

  PIXI.utils.sayHello(type)

  let app = new PIXI.Application({width: 1400, height: 800, transparent: true});
  //app.renderer.backgroundColor = PIXI.utils.string2hex("#dddddd");
  app.renderer.view.style.maxWidth = '100%'
  app.renderer.view.style.maxHeight = 'calc(100vh - 40px)'
  app.renderer.view.style.flex = '1 0 auto'

  const platformItems = [
    {
      name: 'goroh',
      height: 380,
      width: 274,
    },
    {
      name: 'svetofor',
      height: 700,
      width: 389,
    },
    {
      name: 'sport',
      height: 400,
      width: 353,
    },
    {
      name: 'smotritelnitsa',
      height: 410,
      width: 289,
    },
    {
      name: 'rusalka',
      height: 390,
      width: 332,
    },
    {
      name: 'opera',
      height: 530,
      width: 439,
    },
    {
      name: 'lion',
      height: 440,
      width: 439,
    },
    {
      name: 'four-hands',
      height: 380,
      width: 395,
    },
    {
      name: 'pip-show',
      height: 415,
      width: 319,
    },
    {
      name: 'leg',
      height: 200,
      width: 345,
    },
    {
      name: 'svidetel',
      height: 480,
      width: 385,
    }
  ]

  const moves = [
    {
      name: 'goroh',
      height: 380,
      width: 274,
    },
    {
      name: 'gorgulia',
      height: 340,
      width: 331,
    },
    {
      name: 'svetofor',
      height: 700,
      width: 389,
    },
    {
      name: 'sport',
      height: 400,
      width: 353,
    },
    {
      name: 'smotritelnitsa',
      height: 410,
      width: 289,
    },
    {
      name: 'rusalka',
      height: 390,
      width: 332,
    },
    {
      name: 'opera',
      height: 530,
      width: 439,
    },
    {
      name: 'lion',
      height: 440,
      width: 439,
    },
    {
      name: 'four-hands',
      height: 380,
      width: 395,
    },
    {
      name: 'pip-show',
      height: 415,
      width: 319,
    },
    {
      name: 'leg',
      height: 200,
      width: 345,
    },
    {
      name: 'svidetel',
      height: 480,
      width: 385,
    }
  ]

  const other = [
    {
      name: 'gorgulia',
      height: 340,
      width: 331,
    },
    {
      name: 'heruvim',
      height: 150,
      width: 150,
    },
    {
      name: 'wings',
      height: 150,
      width: 248,
    },
  ]

  const degreeStep = 360 / platformItems.length

  const getXYZ = (degres) => {
    const radius = 550
    const radians = (degres) * (Math.PI/180)
    const x = 700 + radius * Math.cos(radians)
    const y = 700 + radius * Math.sin(radians) / 6

    let z
    if (degres > 0 && degres <= 45) {
      z = 9
    }
    else if (degres > 45 && degres <= 135) {
      z = 10
    }
    else if (degres > 135 && degres <= 180) {
      z = 9
    }
    else if (degres > 180 && degres <= 225) {
      z = 8
    }
    else if (degres > 225 && degres <= 315) {
      z = 7
    }
    else {
      z = 8
    }

    return {
      x,
      y,
      z
    }
  }


  /*const otherSpritesMap = other.reduce((accumulator, item) => {
    if (otherVideos[item.name] == null) {
      return accumulator
    }
    const videoElement = document.createElement('video')

    videoElement.muted = true
    videoElement.loop = true
    videoElement.autoplay = true

    const sources = otherVideos[item.name]

    const webmSource = document.createElement('source')
    webmSource.type = 'video/webm'
    webmSource.src = sources.webm

    const hevcSource = document.createElement('source')
    hevcSource.type = 'video/mp4; codecs=hvc1'
    hevcSource.src = sources.hevc

    videoElement.appendChild(webmSource)
    videoElement.appendChild(hevcSource)

    const texture = PIXI.Texture.from(videoElement)
    const sprite = new PIXI.Sprite(texture)

    sprite.height = item.height
    sprite.width = item.width

    accumulator[item.name] = sprite

    return accumulator
  }, {})*/

  const loader = new PIXI.Loader()
  const platformItemsVideos = platformItems.reduce((items, item) => {
    const videoElement = document.createElement('video')

    videoElement.muted = true
    videoElement.loop = true
    videoElement.WebKitPlaysInline = true
    videoElement.width = item.width
    videoElement.height = item.height
/*
    const sources = loopVideos[item.name]

    const webmSource = document.createElement('source')
    webmSource.type = 'video/webm'
    webmSource.src = sources.webm

    const hevcSource = document.createElement('source')
    hevcSource.type = 'video/mp4; codecs=hvc1'
    hevcSource.src = sources.hevc

    videoElement.appendChild(webmSource)
    videoElement.appendChild(hevcSource)

    const promise = new Promise((resolve) => {
      videoElement.addEventListener('canplaythrough', () => {
        console.log('can play', item.name)
        videoElement.play()
        resolve()
      })
    }, {once: true})


    videoElement.load()*/


    //promises.push(promise)
    items[item.name] = videoElement

    return items
  }, {})



  /*if (otherSpritesMap.gorgulia != null) {
    otherSpritesMap.gorgulia.x = 700 - (otherSpritesMap.gorgulia.width / 2)
    otherSpritesMap.gorgulia.y = 0
    otherSpritesMap.gorgulia.zIndex = 8
    otherSpritesMap.gorgulia.interactive = true
    // otherSpritesMap.gorgulia.on('pointertap', () => {
    //   platformMovingState = 'paused'
    //   platformItemsContainer.visible = false
    //
    //   const move = moveSpritesMap.gorgulia
    //
    //   move.x = 700 - (move.width / 2)
    //   move.y = 400 - (move.height / 2)
    //
    //   const stop = () => {
    //     app.stage.removeChild(move)
    //     platformItemsContainer.visible = true
    //     platformMovingState = 'running'
    //     platformMoving()
    //   }
    //
    //   move.interactive = true
    //
    //   move.on('pointertap', stop)
    //
    //   const video = move.texture.baseTexture.resource.source
    //
    //   video.play()
    //   video.addEventListener('ended', stop)
    //
    //   app.stage.addChild(move)
    // })

    platformItemsContainer.addChild(otherSpritesMap.gorgulia)
  }

  if (otherSpritesMap.heruvim != null) {
    otherSpritesMap.heruvim.x = 400 - (otherSpritesMap.heruvim.width / 2)
    otherSpritesMap.heruvim.y = 0
    otherSpritesMap.heruvim.zIndex = 8

    platformItemsContainer.addChild(otherSpritesMap.heruvim)
  }
  if (otherSpritesMap.wings != null) {
    otherSpritesMap.wings.x = 1100 - (otherSpritesMap.wings.width / 2)
    otherSpritesMap.wings.y = 0
    otherSpritesMap.wings.zIndex = 8

    platformItemsContainer.addChild(otherSpritesMap.wings)
  }*/

  let platformMovingState = 'running'


  Promise.all(promises).then(() => {
    console.log('all')
    //setup()
  })

  const setup = () => {
    const sprites = platformItems.map((item, index) => {
      const videoElement = platformItemsVideos[item.name]

      const texture = PIXI.Texture.from(videoElement)
      const sprite = new PIXI.Sprite(texture)

      const degrees = index * degreeStep

      const {x, y, z} = getXYZ(degrees)

      sprite.height = item.height
      sprite.width = item.width

      sprite.x = x - (item.width / 2)
      sprite.y = y - item.height
      sprite.zIndex = z

      sprite.degrees = degrees

      sprite.interactive = true

      //sprite.texture.baseTexture.resource.source.play()

      // if (moveVideos[item.name] != null) {
      //   sprite.on('pointertap', () => {
      //     platformMovingState = 'paused'
      //     platformItemsContainer.visible = false
      //
      //     const moveVideoElement = document.createElement('video')
      //
      //     moveVideoElement.muted = true
      //     moveVideoElement.autoplay = true
      //
      //     const sources = moveVideos[item.name]
      //
      //     const webmSource = document.createElement('source')
      //     webmSource.type = 'video/webm'
      //     webmSource.src = sources.webm
      //
      //     const hevcSource = document.createElement('source')
      //     hevcSource.type = 'video/mp4; codecs=hvc1'
      //     hevcSource.src = sources.hevc
      //
      //     moveVideoElement.appendChild(webmSource)
      //     moveVideoElement.appendChild(hevcSource)
      //
      //     const texture = PIXI.Texture.from(moveVideoElement)
      //     const moveSprite = new PIXI.Sprite(texture)
      //
      //     moveSprite.x = 700 - (moveSprite.width / 2)
      //     moveSprite.y = 400 - (moveSprite.height / 2)
      //
      //     const stop = () => {
      //       app.stage.removeChild(moveSprite)
      //       platformItemsContainer.visible = true
      //       platformMovingState = 'running'
      //       platformMoving()
      //     }
      //
      //     moveSprite.interactive = true
      //
      //     moveSprite.on('pointertap', stop)
      //
      //     const video = moveSprite.texture.baseTexture.resource.source
      //
      //     video.load()
      //     video.addEventListener('canplay', () => {
      //       video.play()
      //     })
      //     video.addEventListener('ended', stop)
      //
      //     app.stage.addChild(moveSprite)
      //   })
      // }

      return sprite
    })
    const platformMoving = () => {
      if (platformMovingState === 'running') {
        requestAnimationFrame(platformMoving)

        sprites.forEach(sprite => {
          sprite.degrees += 0.1

          if (sprite.degrees >= 360) {
            sprite.degrees = 0
          }

          const {x, y, z} = getXYZ(sprite.degrees)

          sprite.x = x - (sprite.width / 2)
          sprite.y = y - sprite.height
          sprite.zIndex = z
        })
      }
    }
    const platformItemsContainer = new PIXI.Container()

    platformItemsContainer.sortableChildren = true

    sprites.forEach(sprite => {
      platformItemsContainer.addChild(sprite);
    })

    app.stage.addChild(platformItemsContainer)

    platformMoving()
    document.querySelector('#carousel').appendChild(app.view);
    document.querySelector('#loader').hidden = true
  }

})
