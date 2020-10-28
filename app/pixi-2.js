window.addEventListener('load', () => {
  const loopVideos = {
    'four-hands': {
      'webm': 'videos/_loops/webm/four%20hands%20loop.webm?v=1', 'hevc': 'videos/_loops/hevc/four%20hands%20loop.mp4',
      height: 335,
      width: 348,
    },
    'gorgulia': {
      'webm': 'videos/_loops/webm/gorgulia%20new%20loop.webm?v=1',
      'hevc': 'videos/_loops/hevc/gorgulia%20new%20loop.mp4',
      height: 340,
      width: 331,
    },
    'leg': {
      'webm': 'videos/_loops/webm/leg%20leg.webm?v=1', 'hevc': 'videos/_loops/hevc/leg%20leg.mp4',
      height: 200,
      width: 345,
    },
    'goroh': {
      'webm': 'videos/_loops/webm/goroh%20raduga%20loop.webm?v=1',
      'hevc': 'videos/_loops/hevc/goroh%20raduga%20loop.mp4',
      height: 340,
      width: 245,
      deltaY: -25,
    },
    'lion': {
      'webm': 'videos/_loops/webm/new%20lion%20loopp.webm?v=1', 'hevc': 'videos/_loops/hevc/new%20lion%20loopp.mp4',
      height: 410,
      width: 409,
    },
    'opera': {
      'webm': 'videos/_loops/webm/opera%20loop.webm?v=1', 'hevc': 'videos/_loops/hevc/opera%20loop.mp4',
      height: 560,
      width: 464,
      deltaY: 30,
    },
    'pip-show': {
      'webm': 'videos/_loops/webm/pip%20show%20loop.webm?v=1', 'hevc': 'videos/_loops/hevc/pip%20show%20loop.mp4',
      height: 405,
      width: 311,
    },
    'rusalka': {
      'webm': 'videos/_loops/webm/rusalka%20looop.webm?v=1', 'hevc': 'videos/_loops/hevc/rusalka%20looop.mp4',
      height: 390,
      width: 332,
    },
    'smotritelnitsa': {
      'webm': 'videos/_loops/webm/smotritelnitsa%20loop.webm?v=1',
      'hevc': 'videos/_loops/hevc/smotritelnitsa%20loop.mp4',
      height: 410,
      width: 289,
    },
    'sport': {
      'webm': 'videos/_loops/webm/sport%20loop.webm?v=1', 'hevc': 'videos/_loops/hevc/sport%20loop.mp4',
      height: 400,
      width: 353,
    },
    'svetofor': {
      'webm': 'videos/_loops/webm/svetofor%20loop.webm?v=1', 'hevc': 'videos/_loops/hevc/svetofor%20loop.mp4',
      height: 730,
      width: 406,
      deltaY: 20,
    },
    'svidetel': {
      'webm': 'videos/_loops/webm/svidetel%20loop.webm?v=1', 'hevc': 'videos/_loops/hevc/svidetel%20loop.mp4',
      height: 460,
      width: 369,
      deltaY: -20
    },
    'wings': {
      'webm': 'videos/_loops/webm/wings.webm', 'hevc': 'videos/_loops/hevc/wings.mp4',
      height: 150,
      width: 248,
    },
    'heruvim': {
      'webm': 'videos/_loops/webm/heruvim.webm', 'hevc': 'videos/_loops/hevc/heruvim.mp4',
      height: 150,
      width: 150,
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
      x: 700,
      y: 0,
    },
    {
      name: 'heruvim',
      x: 400,
      y: 50,
    },
    {
      name: 'wings',
      x: 1000,
      y: 30,
    },
  ]
  let platformMovingState = 'running'
  const getXYZ = (degres) => {
    const radius = 550
    const radians = (degres) * (Math.PI / 180)
    const x = 700 + radius * Math.cos(radians)
    const y = 720 + radius * Math.sin(radians) / 7

    let z
    if (degres >= 0 && degres <= 45) {
      z = 9
    } else if (degres > 45 && degres <= 135) {
      z = 10
    } else if (degres > 135 && degres <= 180) {
      z = 9
    } else if (degres > 180 && degres <= 225) {
      z = 8
    } else if (degres > 225 && degres <= 315) {
      z = 7
    } else {
      z = 8
    }

    return {
      x,
      y,
      z
    }
  }
  const degreeStep = 360 / platformItems.length

  let type = "WebGL"
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

  let app = new PIXI.Application({width: 1400, height: 800, transparent: true});
  //app.renderer.backgroundColor = PIXI.utils.string2hex("#dddddd");
  app.renderer.view.style.maxWidth = '100%'
  app.renderer.view.style.maxHeight = 'calc(100vh - 40px)'

  const loader = new PIXI.Loader()

  loader
    .add(Object.keys(loopVideos).map((name) => {
      let url = null

      if (!isSafari) {
        url = loopVideos[name].webm
      } else if (isSafari) {
        url = loopVideos[name].hevc
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
    .on("progress", loadProgressHandler)

  function loadProgressHandler(loader, resource) {

    //Display the file `url` currently being loaded
    console.log("loading: " + resource.url);

    //Display the percentage of files currently loaded
    console.log("progress: " + loader.progress + "%");

    document.getElementById('loader').innerText = loader.progress + "%"
    //If you gave your files names as the first argument
    //of the `add` method, you can access them like this
    //console.log("loading: " + resource.name);
  }

  const videos = []
  loader.load((loader, resources) => {
    console.log('load', loader, resources)

    const platformItemsContainer = new PIXI.Container()
    const sprites = {}

    platformItemsContainer.sortableChildren = true

    Object.keys(resources).map((name, index) => {
      const videoElement = document.createElement('video')

      videoElement.muted = true
      videoElement.loop = true
      videoElement.WebKitPlaysInline = true
      videoElement.autoplay = true
      videoElement.setAttribute('playsinline', '')
      videoElement.src = resources[name].url

      videos.push(videoElement)

      const texture = PIXI.Texture.from(videoElement)

      sprites[name] = new PIXI.Sprite(texture)
    })

    platformItems.forEach((name, index) => {
      const sprite = sprites[name]
      const degrees = index * degreeStep

      const {x, y, z} = getXYZ(degrees)

      sprite.width = loopVideos[name].width
      sprite.height = loopVideos[name].height
      sprite.x = x - (sprite.width / 2)
      sprite.y = y - sprite.height + (typeof loopVideos[name].deltaY === 'undefined' ? 0 : loopVideos[name].deltaY)
      sprite.zIndex = z

      sprite.degrees = degrees

      sprite.interactive = true
      console.log(name, sprite.width, sprite.height, sprite.x, sprite.y)
      platformItemsContainer.addChild(sprite);
    })
    topItems.forEach((item) => {
      const sprite = sprites[item.name]

      sprite.width = loopVideos[item.name].width
      sprite.height = loopVideos[item.name].height
      sprite.x = item.x - (sprite.width / 2)
      sprite.y = item.y
      sprite.zIndex = 9
      platformItemsContainer.addChild(sprite);
    })
    const platformMoving = () => {
      if (platformMovingState === 'running') {
        requestAnimationFrame(platformMoving)

        platformItems.forEach(name => {
          const sprite = sprites[name]
          sprite.degrees += 0.1

          if (sprite.degrees >= 360) {
            sprite.degrees = 0
          }

          const {x, y, z} = getXYZ(sprite.degrees)

          sprite.x = x - (sprite.width / 2)
          sprite.y = y - sprite.height + (typeof loopVideos[name].deltaY === 'undefined' ? 0 : loopVideos[name].deltaY)
          sprite.zIndex = z
        })
      }
    }

    app.stage.addChild(platformItemsContainer)
    platformMoving()

    document.querySelector('#carousel').appendChild(app.view);
    document.querySelector('#loader').hidden = true
  })


})
