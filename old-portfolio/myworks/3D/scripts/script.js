const module = new function () {
    const module = this;

    const MOUSE_BUTTON = ['left', 'middle', 'right'];

    let scene, renderer, camera,
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

    const addCube = this.addCube = (conf) => {
      let cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshPhongMaterial({
            color: conf.color
        }
      ));
      cube.position.copy(conf.position);
      scene.add(cube);
      return cube;
    };


    module.getCamera = () => {
        return camera;
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
        camera.position.z = 2;


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

        /////////////////////////////////////////
        const ambient = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambient)





        //model
        const loader = new THREE.GLTFLoader();
        loader.load('./models/scene.gltf', gltf => {
                scene.add(gltf.scene);
            },
            function (error) {
                console.log('Error: ' + error)
            }
        )


        animate();
    };
};