// via curl noise https://codepen.io/mnmxmx/pen/rzqoeW
//　via polygon-shader https://github.com/spite/polygon-shredder
var container, stats;
var camera, scene, renderer;
var mesh;

var geometry;
// var material:THREE.MeshBasicMaterial;
var cube;
var offsetAttribute;
var orientationAttribute;
var lastTime = 0;
var mesh;
var uniforms;

var WIDTH = 128;
var PARTICLES = WIDTH * WIDTH;


var gpuCompute;
var velocityVariable;
var positionVariable;
var quaternionVariable;
var quaternionUniforms;

var material;
var shadowMaterial;
var light;
var shadowCamera;

var imgWidth = 75;
var imgHeight = 50;
var rotateVec = new THREE.Vector3(0,0,0);
var isRotate = false;
var timer = 0.0;
var cameraStartZ = 100;
var startTimer = 0.8;
var enableInfo = true;
var texture;
texture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/311372/gogh_small.jpg',function (){
  init();
});
                                         
           


function init() {
    container = document.getElementById( 'container' );
    //
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = cameraStartZ;
    scene = new THREE.Scene();
   
    renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    container.appendChild( renderer.domElement );
    renderer.setClearColor(0xebe8ed,0);


    light = new THREE.DirectionalLight( 0xFFAA55,0.5 );
    light.position.set(0, 1, 1);
    light.castShadow = true;
    shadowCamera = light.shadow.camera;
    shadowCamera.lookAt( scene.position );

    light.shadow.matrix.set(
        0.5, 0.0, 0.0, 0.5,
        0.0, 0.5, 0.0, 0.5,
        0.0, 0.0, 0.5, 0.5,
        0.0, 0.0, 0.0, 1.0
    );

    light.shadow.matrix.multiply( shadowCamera.projectionMatrix );
    light.shadow.matrix.multiply( shadowCamera.matrixWorldInverse );

    if(light.shadow.map === null){
        light.shadow.mapSize.x = 2048;
        light.shadow.mapSize.y = 2048;

        var pars = { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat };

        light.shadow.map = new THREE.WebGLRenderTarget( light.shadow.mapSize.x,light.shadow.mapSize.y, pars );
        // light.shadow.map.texture.name = light.name + ".shadowMap";
    }

    initComputeRenderer();



    var instances = PARTICLES;
    var bufferGeometry = new THREE.BoxBufferGeometry( 2, 1, 1 );
    // copying data from a simple box geometry, but you can specify a custom geometry if you want
    geometry = new THREE.InstancedBufferGeometry();
    geometry.index = bufferGeometry.index;
    geometry.attributes.position = bufferGeometry.attributes.position;
    geometry.attributes.uv = bufferGeometry.attributes.uv;
    geometry.attributes.normal = bufferGeometry.attributes.normal;

    var offsets = [];
    // var pos_uv = [];
    var orientations = [];
    var vector = new THREE.Vector4();
    var x, y, z, w;

    var uvs = new Float32Array( PARTICLES * 2 );
    var xywidth = new Float64Array( 3 );
    xywidth[2] = WIDTH;
    var p = 0;
    for ( var j = 1; j < WIDTH; j++ ) {
        for ( var i = 1; i < WIDTH; i++ ) {
            xywidth[0] = i;
            xywidth[1] = j;
            uvs[ p++ ] = xywidth[0] / ( xywidth[2] )-(1.0/xywidth[2]);
            uvs[ p++ ] = xywidth[1] / ( xywidth[2] )-(1.0/xywidth[2]);
        }
    }


    for ( var i = 0; i < instances; i ++ ) {
        // offsets
        x = Math.random() * 50 - 25;
        y = Math.random() * 50 - 25;
        z = Math.random() *0;

        vector.set( x, y, z, 0 ).normalize();
        vector.multiplyScalar( 5 ); // move out at least 5 units from center in current direction
        offsets.push( x + vector.x, y + vector.y, z + vector.z,i );

        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        w = Math.random() * 2 - 1;
        vector.set( x, y, z, w ).normalize();
        orientations.push( vector.x, vector.y, vector.z, vector.w );
    }
    offsetAttribute = new THREE.InstancedBufferAttribute( new Float32Array( offsets ), 4 );

    orientationAttribute = new THREE.InstancedBufferAttribute( new Float32Array( orientations ), 4 ).setDynamic( true );


    

    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;


    var pos_uvsAttribute = new THREE.InstancedBufferAttribute( uvs, 2 );
    geometry.addAttribute( 'offset', offsetAttribute );
    geometry.addAttribute( 'orientation', orientationAttribute );
    geometry.addAttribute( 'pos_uv', pos_uvsAttribute );
    // material

    uniforms = {
        map: { value: texture},
        // monalisa:{value:texture},
        time:{value:0.0},
        texturePosition:{value:null},
        textureVelocity:{value:null},
        // pre_texturePosition:{value:null},
        // pre_textureVelocity:{value:null}
        textureOriginal:{value:null},
        shadowMap: { type: 't', value: light.shadow.map },
        shadowMapSize: {type: "v2", value: light.shadow.mapSize},
        shadowBias: {type: "f", value: light.shadow.bias},
        shadowRadius: {type: "f", value: light.shadow.radius},
        uMatrix:{value:null},
        imgWidth:{value:imgWidth},
        imgHeight:{value:imgHeight},
        near:{value:camera.near},
        far:{value:camera.far},
        cameraPos:{value:camera.position},
        sceneInvMatrix:{value:null},
        isStart:{value:startTimer}
    };
    material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: document.getElementById( 'vertex' ).textContent,
        fragmentShader: document.getElementById( 'fragment' ).textContent,
        shading: THREE.FlatShading,
        transparent:true
    } );

    shadowMaterial = new THREE.ShaderMaterial( {
        uniforms: {
            map: { value: texture},
            time:{value:0.0},
            texturePosition:{value:null},
            textureVelocity:{value:null},
            size: { type: "f", value: WIDTH },

            timer: { type: 'f', value: 0 },

            shadowMatrix: { type: 'm4', value: light.shadow.matrix},
            lightPosition: { type: 'v3', value: light.position }
        },
        vertexShader: document.getElementById( 'vertex' ).textContent,
        fragmentShader: document.getElementById( 'Mosaic_ComputeShadow' ).textContent,
    });


    mesh = new THREE.Mesh( geometry, material );
    mesh.frustumCulled = false;
    scene.add( mesh );
    
    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'click', click, false);
   animate();
}

function initComputeRenderer()
{

    gpuCompute = new GPUComputationRenderer( WIDTH, WIDTH, renderer );

    // 今回はパーティクルの位置情報と、移動方向を保存するテクスチャを2つ用意します
    var dtPosition = gpuCompute.createTexture();
    var dtVelocity = gpuCompute.createTexture();
    var dtOriginal = gpuCompute.createTexture();

  fillTextures( dtPosition, dtVelocity,dtOriginal );

    velocityVariable = gpuCompute.addVariable( "textureVelocity", document.getElementById( 'Mosaic_ComputeVelocity' ).textContent, dtVelocity );
    positionVariable = gpuCompute.addVariable( "texturePosition", document.getElementById( 'Mosaic_ComputePosition' ).textContent, dtPosition );
    quaternionVariable = gpuCompute.addVariable( "textureOriginal", document.getElementById( 'Mosaic_ComputeOriginal' ).textContent, dtOriginal );

    let variables = [ positionVariable, velocityVariable, quaternionVariable ];
    gpuCompute.setVariableDependencies( velocityVariable, variables );
    gpuCompute.setVariableDependencies( positionVariable, variables );
    gpuCompute.setVariableDependencies( quaternionVariable, variables );


    quaternionUniforms = quaternionVariable.material.uniforms;
    quaternionUniforms.pre_texturePosition = {value:dtPosition};


    var error = gpuCompute.init();
    if ( error !== null ) {
        console.error( error );
    }
}


function fillTextures( texturePosition, textureVelocity, textureQuaternion ) {

    var posArray = texturePosition.image.data;
    var velArray = textureVelocity.image.data;
    var qtArray = textureQuaternion.image.data;

   
    for ( var k = 0, kl = posArray.length; k < kl; k += 4 ) {
        // Position
        var x, y, z;
        x = Math.random()*imgWidth-imgWidth/2;
        y = Math.random()*imgHeight-imgHeight/2;
        z = Math.random()*10-5;
        posArray[ k + 0 ] = x;
        posArray[ k + 1 ] = y;
        posArray[ k + 2 ] = z;
        posArray[ k + 3 ] = 0;

        qtArray[ k + 0 ] = x;
        qtArray[ k + 1 ] = y;
        qtArray[ k + 2 ] = z;
        qtArray[ k + 3 ] = 0;

        velArray[ k + 0 ] = Math.random()*2-1;
        velArray[ k + 1 ] = Math.random()*2-1;
        velArray[ k + 2 ] = Math.random()*2-1;
        velArray[ k + 3 ] = 100*Math.random();
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function click()
{
    isRotate = !isRotate;
    startTimer = 3.0;
}

function animate() {
    requestAnimationFrame( animate );
    render();

}
function render() {
    var time = performance.now();

    if(startTimer > 0)
    {
        startTimer -=0.008;
    } else
    {
        uniforms.isStart.value = startTimer;
        isRotate = true;
    }

    if(isRotate)
    {
        timer += 0.003;
        timer = timer%(Math.PI*2);
      
        cameraStartZ += (30.0 - cameraStartZ) * 0.02;
        camera.position.z = cameraStartZ + Math.sin(timer) * 40.0;
    } else
    {
        var speed = 0.045;
        rotateVec.x += (0.0 - rotateVec.x) * speed;
        rotateVec.y += (0.0 - rotateVec.y) * speed;
        rotateVec.z += (0.0 - rotateVec.z) * speed;
        scene.position.z +=(0.0 - scene.position.z) * speed;
        mesh.position.z +=(0.0 - scene.position.z) * speed;
        camera.position.z +=( cameraStartZ  - camera.position.z) * speed;
        cameraStartZ += (70.0 - cameraStartZ) * speed;
        timer +=(0.0 -timer)*speed;
    }

    scene.rotation.setFromVector3(rotateVec);
    quaternionUniforms.pre_texturePosition = gpuCompute.getCurrentRenderTarget( positionVariable ).texture;

    // uniforms.pre_texturePosition.value = gpuCompute.getCurrentRenderTarget( positionVariable ).texture;
    // uniforms.pre_textureVelocity.value = gpuCompute.getCurrentRenderTarget( velocityVariable ).texture;

    gpuCompute.compute();

    uniforms.textureOriginal.value = gpuCompute.getCurrentRenderTarget( quaternionVariable ).texture;
    uniforms.texturePosition.value = gpuCompute.getCurrentRenderTarget( positionVariable ).texture;
    uniforms.textureVelocity.value = gpuCompute.getCurrentRenderTarget( velocityVariable ).texture;

    shadowMaterial.uniforms.texturePosition.value = gpuCompute.getCurrentRenderTarget( positionVariable ).texture;
    shadowMaterial.uniforms.textureVelocity.value = gpuCompute.getCurrentRenderTarget( velocityVariable ).texture;



    uniforms.time.value = timer;
    shadowMaterial.uniforms.time.value = timer;
    lastTime = timer;


    // mesh.material = shadowMaterial;
    // renderer.render( scene, shadowCamera, light.shadow.map);



    mesh.material = material;
    material.uniforms.shadowMap.value = light.shadow.map;
    let m = new THREE.Matrix4();
    material.uniforms.uMatrix.value = m.getInverse(mesh.matrix);
    renderer.render( scene, camera );
}

document.onkeydown = function (e){
    if(!e) e = window.event; 

    

    if(e.key === "h")
    {
        console.log($);
        console.log($("#info"));
        if(enableInfo)
        {
            $("#info").fadeOut("0.3");
            enableInfo = false;
        }else
        {
            $("#info").fadeIn("0.3");
            enableInfo = true;
        }
    }
};