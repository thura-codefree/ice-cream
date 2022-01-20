let scene, camera, renderer;
renderer = new THREE.WebGLRenderer({
    antialias: true
});
/* ------------ Render ပေါင်းစပ်လှုပ်ရှားမယ်  ----------*/
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
document.body.appendChild(renderer.domElement);

function init() {
    /* ------------ Scene မြင်ကွင်း အကျယ်  ----------*/
    scene = new THREE.Scene(); // scene == container
    // scene.background = new THREE.Color('black');

    /* ------------  Camara အမြင်  ----------*/
    // 40 =field of view , window.innerWidth/window.innerHeight = aspect ratio , 1, 5000 = view frustum 
    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 5000);
    camera.rotation.y = 25 / 90 * Math.PI;
    camera.rotation.y = 800;
    camera.position.x = 800;
    camera.position.y = 800;
    camera.position.z = 10;

    /* ------------  Controler  ----------*/
    // camera နဲ့ body ထဲက element တွေကို 3D view နဲ့ control လုပ်တာ
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderer);


    /* ------------  Lighting  ----------*/
    hlight = new THREE.AmbientLight('', 0.5);
    scene.add(hlight);
    directionalLight = new THREE.DirectionalLight('green');
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    // light = new THREE.PointLight(0xc4c4c4, 10);
    // light.position.set(0, 300, 500);
    // scene.add(light);

    /* ------------ Setup render resolution and Size  ----------*/
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight); // responsive ဖြစ်အောင်လုပ်တာ
    camera.position.setZ(10);

    /* ------------ sence နောက်ခံ Texture  ----------*/
    const skyTexture = new THREE.TextureLoader().load('sky.jpg');
    scene.background = skyTexture;

    /* ------------ GLTFLoader (with Blender gltf export file)  ----------*/
    let loader = new THREE.GLTFLoader();
    loader.load('scene.gltf', function(gltf) {
        bagan = gltf.scene.children[0];
        bagan.scale.set(1, 1, 1);
        scene.add(gltf.scene);
        animate(); // callback function animate
    });
}

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
init(); // call back function init()