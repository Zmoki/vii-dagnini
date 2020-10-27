window.addEventListener('load', () => {
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

  let platformMovingState = 'running'
  const platformItemsContainer = new PIXI.Container()

  platformItemsContainer.sortableChildren = true

  const moveSpritesMap = moves.reduce((accumulator, item) => {
    const source = document.querySelector(`.move_name_${item.name}`)

    if (source == null) {
      return accumulator
    }

    const texture = PIXI.Texture.from(source)
    const sprite = new PIXI.Sprite(texture)

    sprite.height = item.height
    sprite.width = item.width

    accumulator[item.name] = sprite

    return accumulator
  }, {})

  const otherSpritesMap = other.reduce((accumulator, item) => {
    const source = document.querySelector(`.other_name_${item.name}`)

    if (source == null) {
      return accumulator
    }

    const texture = PIXI.Texture.from(source)
    const sprite = new PIXI.Sprite(texture)

    sprite.height = item.height
    sprite.width = item.width

    accumulator[item.name] = sprite

    return accumulator
  }, {})


  const sprites = platformItems.map((item, index) => {
    const source = document.querySelector(`.platform-item_name_${item.name}`)

    const texture = PIXI.Texture.from(source)
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

    sprite.texture.baseTexture.resource.source.play()

    if (moveSpritesMap[item.name] != null) {
      sprite.on('pointertap', () => {
        platformMovingState = 'paused'
        platformItemsContainer.visible = false

        const move = moveSpritesMap[item.name]

        move.x = 700 - (move.width / 2)
        move.y = 400 - (move.height / 2)

        const stop = () => {
          app.stage.removeChild(move)
          platformItemsContainer.visible = true
          platformMovingState = 'running'
          platformMoving()
        }

        move.interactive = true

        move.on('pointertap', stop)

        const video = move.texture.baseTexture.resource.source

        video.load()
        video.addEventListener('canplay', () => {
          video.play()
        })
        video.addEventListener('ended', stop)

        app.stage.addChild(move)
      })
    }

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

  if (otherSpritesMap.gorgulia != null) {
    otherSpritesMap.gorgulia.x = 700 - (otherSpritesMap.gorgulia.width / 2)
    otherSpritesMap.gorgulia.y = 0
    otherSpritesMap.gorgulia.zIndex = 8
    otherSpritesMap.gorgulia.interactive = true
    otherSpritesMap.gorgulia.on('pointertap', () => {
      platformMovingState = 'paused'
      platformItemsContainer.visible = false

      const move = moveSpritesMap.gorgulia

      move.x = 700 - (move.width / 2)
      move.y = 400 - (move.height / 2)

      const stop = () => {
        app.stage.removeChild(move)
        platformItemsContainer.visible = true
        platformMovingState = 'running'
        platformMoving()
      }

      move.interactive = true

      move.on('pointertap', stop)

      const video = move.texture.baseTexture.resource.source

      video.play()
      video.addEventListener('ended', stop)

      app.stage.addChild(move)
    })

    platformItemsContainer.addChild(otherSpritesMap.gorgulia)
  }

  if (otherSpritesMap.heruvim != null) {
    otherSpritesMap.heruvim.x = 400 - (otherSpritesMap.heruvim.width / 2)
    otherSpritesMap.heruvim.y = 0
    otherSpritesMap.heruvim.zIndex = 8

    platformItemsContainer.addChild(otherSpritesMap.heruvim)
  }

  sprites.forEach(sprite => {
    platformItemsContainer.addChild(sprite);
  })

  if (otherSpritesMap.wings != null) {
    otherSpritesMap.wings.x = 1100 - (otherSpritesMap.wings.width / 2)
    otherSpritesMap.wings.y = 0
    otherSpritesMap.wings.zIndex = 8

    platformItemsContainer.addChild(otherSpritesMap.wings)
  }

  sprites.forEach(sprite => {
    platformItemsContainer.addChild(sprite);
  })


  app.stage.addChild(platformItemsContainer)

  platformMoving()

  document.querySelector('#carousel').appendChild(app.view);
  document.querySelector('#loader').hidden = true
})
