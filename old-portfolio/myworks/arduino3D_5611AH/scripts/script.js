const module = new function () {
    const module = this;
    const MOUSE_BUTTON = ['left', 'middle', 'right'];
    const loader = new THREE.GLTFLoader();
    const loaderT = new THREE.TextureLoader();

    class model3D {
        constructor(model_name, model_path = './models/5611AH/8/', model_if = false) {
            this.model_name = model_name;
            this.model_path = model_path;
            this.model_if = model_if;
        }
        get_if() {
            return this.model_if;
        }
    }

    let scene, renderer, camera,
        models = [],
        config = {
            'mouse_lock' : false
        },
        keys = {},
        mouse = {
            'position' : {'x' : 0, 'y' : 0},
            'speed' : {'x' : 0, 'y' : 0},
            'locked' : false,
            'keys' : {
                'left' : false,
                'right' : false,
                'middle' : false,
                'wheel' : 0
            }
        },
        events = {
            'keydown' : null,
            'keydown' : null,
            'keyup' : null,
            'mousedown' : null,
            'mouseup' : null,
        };
    module.on = (event_name, processor) => {
        events[event_name] = processor;
    };

    const v = this.v = (x,y,z) => {
      return new THREE.Vector3(x,y,z);
    };

    const call_event = (evt, args) => {
        if (events[evt])
            events[evt](args);
    };
    const material = new THREE.MeshBasicMaterial({
        map: loaderT.load('m.jpg'),
      });
    const addCube = this.addCube = (conf) => {
      let cube = new THREE.Mesh(new THREE.BoxGeometry(), //new THREE.MeshPhongMaterial({
          //  color: conf.color
        //}
      //)
      new THREE.MeshBasicMaterial({
        map: loaderT.load('./im.png'),
      })
      );
      cube.position.copy(conf.position);
      scene.add(cube);
      return cube;
    };

    const check = this.check = (i) => {
        if (document.getElementById(i.toString()).checked) {
            // TRUE
            for (let j = 0; j < models.length; j++) {
                if (models[j].get_if() == true)
                    if (models[j].model_path == ('./models/5611AH/8/8_'+i+'_On.gltf')) {
                        show(j);

                        //alert(models[j].model_path);
                    }
            }
            //alert(i + " - true");
        } else {
            // FALSE
            for (let j = 0; j < models.length; j++) {
                if (models[j].get_if() == false)
                    if (models[j].model_path == ('./models/5611AH/8/8_'+i+'_Off.gltf')) {
                        show(j, false);

                        //alert(models[j].model_path);

                    }
            }
            //alert(i + " - false");
        }
    };


    function show(i, bol = true) {
        loader.load(models[i].model_path, gltf => {

                if (models[i].get_if() == bol) {
                    scene.add(gltf.scene);
                }
                else {
                    scene.remove(gltf.scene);
                }
            },
            function (error) {
                console.log('Error: ' + error)
            }
        );
    }

    module.getCamera = () => {
        return camera;
    };


    module.models = () => {
        return models;
    };

    const animate = this.animate = () => {
            call_event('keydown', keys);

        renderer.render( scene, camera );
        requestAnimationFrame( animate );
    };


    this.init = (settings) => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( '#1b1e23' );
        camera.position.z = 0.3;


        if (settings.keys_capture){
            window.addEventListener('keydown', (e) => {
                //отменение базовых дейстивй при нажатии на клавиатуру
                e.preventDefault();
                if (!keys[e.code]){
                    keys[e.code] = true;
                    call_event('keypress', keys);
                }
                light.position.set(camera.position.x, camera.position.y, camera.position.z);

            });
        }

        window.addEventListener('keyup', (e) => {
            //отменение базовых дейстивй при нажатии на клавиатуру
            e.preventDefault();
            keys[e.code] = false;
            call_event('keyup', keys);
        });

        if (settings.mouse_capture) {
            if (settings.mouse_lock){
                config.mouse_lock = true;
                document.addEventListener('pointerlockchange', (e) => {
                    mouse.locked = !!document.pointerLockElement;
                });
            }
            //отключение правой кнопки мыши (меню)
            window.addEventListener('contextmenu', (e) => {
                e.preventDefault();
            });
            window.addEventListener('mousedown', (e) => {
                //console.log(e.button);
                //отключение средней кнопки мыши (навигация)
                e.preventDefault();
                mouse.keys[MOUSE_BUTTON[e.button]] = true;
                call_event('mousedown', mouse);

                if (config.mouse_lock && !mouse.locked) {
                    console.log('locked');
                    document.body.requestPointerLock();
                }
            });
            window.addEventListener('mouseup', (e) => {
                //отключение средней кнопки мыши (навигация)
                e.preventDefault();
                mouse.keys[MOUSE_BUTTON[e.button]] = false;
                call_event('mouseup', mouse);
            });

            window.addEventListener('mousemove', (e) => {
                e.preventDefault();
                mouse.position.x = e.screenX;
                mouse.position.y = e.screenY;
                mouse.speed.x = e.movementX;
                mouse.speed.y= e.movementY;
                call_event('mousemove', mouse);
                light.position.set(camera.position.x, camera.position.y, camera.position.z);
            });
        }

        const light = new THREE.DirectionalLight(0xFFFFFF, 1);
        light.position.set(-1, 2, 4);
        scene.add(light);
        light.position.set(camera.position.x, camera.position.y, camera.position.z);

        document.body.appendChild( renderer.domElement );

        const ambient = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambient)

        //model
        loader.load('./models/5611AH/model.gltf', gltf => {
                scene.add(gltf.scene);
            },
            function (error) {
                console.log('Error: ' + error)
            }
        );

        let gg = new model3D();

        for (let i = 1; i <= 10; i++) {
            if (i != 3) {
                if (i != 8) {
                    gg = new model3D(
                        i,
                        './models/5611AH/8/8_'+i+'_On.gltf',
                        true
                    );
                    models.push(gg);
                    gg = new model3D(
                        i,
                        './models/5611AH/8/8_'+i+'_Off.gltf',
                        false
                    );
                    models.push(gg);
                }
            }
        }
        // onload for()
        for (let i = 0; i < models.length; i++) {
            //if (i != 3 || i != 1)
                show(i);
        }
        // onload end

        animate();
    };
};

