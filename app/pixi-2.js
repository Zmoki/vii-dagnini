window.addEventListener('load', () => {
  const loopVideos = {
    'four-hands': {'webm': 'videos/_loops/webm/four%20hands%20loop.webm?v=1', 'hevc': 'videos/_loops/hevc/four%20hands%20loop.mp4'},
    'gorgulia': {'webm': 'videos/_loops/webm/gorgulia%20new%20loop.webm?v=1', 'hevc': 'videos/_loops/hevc/gorgulia%20new%20loop.mp4'},
    'goroh': {'webm': 'videos/_loops/webm/goroh%20raduga%20loop.webm?v=1', 'hevc': 'videos/_loops/hevc/goroh%20raduga%20loop.mp4'},
    'leg': {'webm': 'videos/_loops/webm/leg%20leg.webm?v=1', 'hevc': 'videos/_loops/hevc/leg%20leg.mp4'},
    'lion': {'webm': 'videos/_loops/webm/new%20lion%20loopp.webm?v=1', 'hevc': 'videos/_loops/hevc/new%20lion%20loopp.mp4'},
    'opera': {'webm': 'videos/_loops/webm/opera%20loop.webm?v=1', 'hevc': 'videos/_loops/hevc/opera%20loop.mp4'},
    'pip-show': {'webm': 'videos/_loops/webm/pip%20show%20loop.webm?v=1', 'hevc': 'videos/_loops/hevc/pip%20show%20loop.mp4'},
    'rusalka': {'webm': 'videos/_loops/webm/rusalka%20looop.webm?v=1', 'hevc': 'videos/_loops/hevc/rusalka%20looop.mp4'},
    'smotritelnitsa': {'webm': 'videos/_loops/webm/smotritelnitsa%20loop.webm?v=1', 'hevc': 'videos/_loops/hevc/smotritelnitsa%20loop.mp4'},
    'sport': {'webm': 'videos/_loops/webm/sport%20loop.webm?v=1', 'hevc': 'videos/_loops/hevc/sport%20loop.mp4'},
    'svetofor': {'webm': 'videos/_loops/webm/svetofor%20loop.webm?v=1', 'hevc': 'videos/_loops/hevc/svetofor%20loop.mp4'},
    'svidetel': {'webm': 'videos/_loops/webm/svidetel%20loop.webm?v=1', 'hevc': 'videos/_loops/hevc/svidetel%20loop.mp4'},
  }
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


  const loader = new PIXI.Loader()

  loader
    .add(Object.keys(loopVideos).map((name) => {
      const testEl = document.createElement( "video" )
      let url = null

      if (testEl.canPlayType('video/webm')) {
        url = loopVideos[name].webm
      }
      else if (testEl.canPlayType('video/mp4; codecs=hvc1')) {
        url = loopVideos[name].hevc
      }

      return {
        name,
        url
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

  loader.load((loader, resources) => {
    console.log(loader, resources)

    const platformItemsContainer = new PIXI.Container()

    platformItemsContainer.sortableChildren = true

    Object.keys(resources).map((name, index) => {
      const videoElement = document.createElement('video')

      videoElement.muted = true
      videoElement.loop = true
      videoElement.autoplay = true
      videoElement.src = resources[name].url

      const texture = PIXI.Texture.from(videoElement)
      const sprite = new PIXI.Sprite(texture)
      sprite.x = 100 * index
      sprite.y = 400

      platformItemsContainer.addChild(sprite);
    })


    app.stage.addChild(platformItemsContainer)
    document.querySelector('#carousel').appendChild(app.view);
    document.querySelector('#loader').hidden = true
  })


})
