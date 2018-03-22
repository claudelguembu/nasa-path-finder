/**
 * Project: NASA Path in conjunction with University of Maryland University College
 * @author Group 1 NASA Path team
 * @author Nikki Florea
 */
// March 2018 - Nikki - Modified to add glow and update visibility of handrails,
// added in-line documentation
import React from 'react';
import 'utils/stlLoader';
import {
  loadMeshFromFile,
  positionModelsBasedOnStrFile,
  createDomEvents,
  bindDomEventsToMeshes,
  unbindDomEventsFromMeshes
} from 'utils/nodeProcessor/nodeProcessor';
import Detector from 'utils/detector';
import Stats from 'stats-js';
import OrbitControlsFactory from 'three-orbit-controls';
import PropTypes from 'prop-types';

let OrbitControls = OrbitControlsFactory(THREE);

// create constructor
export default class Renderer extends React.Component {
  constructor() {
    super();
    this.container = null;
    this.stats = null;
    this.camera = null;
    this.cameraTarget = null;
    this.scene = null;
    this.renderer = null;
    this.stationModel = null;
    this.stationModelIsDirty = true;
    this.handrailModels = {};
    this.domEvents = null;
    this.handleHandrailMouseOver = this.handleHandrailMouseOver.bind(this);
    // this.domEventsMap = {
    //   'mouseover': this.handleHandrailMouseOver
    // };
    this.state = {
      hoveredHandrail: null
    };
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.animate = this.animate.bind(this);
    this.processFiles = this.processFiles.bind(this);
  }

  //enable props (React name for components accepting arbitrary inputs)
  componentWillReceiveProps(newProps) {
    if (this.props.stationFile !== newProps.stationFile) {
      this.stationModelIsDirty = true;
    }
  }

  // 
  componentDidMount() {
	// create constants and set values
	const {
		// -- set background and lighting effect values here --
		scene_bg_color = '#0a2044', //navy
		hemisphere_sky_color = '#eff6f7', //light blue
		hemisphere_ground_color = '#eff6f7', //light blue
		hemisphere_intensity = .7,
	} = this.props;
	
	// checks for webgl
    if (!Detector.webgl) {
      Detector.addGetWebGLMessage();
    }
    
    // create camera object
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.0001, 5000);
    //start position of camera (left-right, up-down, zoom)
    this.camera.position.set(-1, 0, 2.3);
    this.cameraTarget = new THREE.Vector3(0, 0, 0);
    
    // create scene object
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(scene_bg_color);

    // mouse controls to rotate/zoom the model
    new OrbitControls(this.camera);
    
    // create lights
    this.scene.add(new THREE.HemisphereLight(hemisphere_sky_color, hemisphere_ground_color, hemisphere_intensity));
    // addShadowedLight parameters (x, y, z, color, intensity)
    this.addShadowedLight(1, 1, 1, 0xffffff, .8);
    this.addShadowedLight(0.5, 1, -1, 0xffffff, 1);
    
    // create renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.renderReverseSided = false;
    this.container.appendChild(this.renderer.domElement);
    this.stats = new Stats();
    
    // create window event listener
    this.container.appendChild(this.stats.domElement);
    window.addEventListener('resize', this.handleWindowResize, false);
    // dom events for meshes
    this.domEvents = createDomEvents(this.camera, this.renderer);
  } //end componentDidMount()

  //check for updates
  componentDidUpdate() {
    this.processFiles();
  }

  //dismount -- does nothing atm
  componentWillUnMount() {
    window.addEventListener('resize', this.handleWindowResize, false);
    // unbindDomEventsFromMeshes(this.handrailModels, this.domEvents, this.domEventsMap);
  }

  //handrail mouseover state
  handleHandrailMouseOver(e) {
    this.setState({hoveredHandrail: e.target});
  }
  
  //process stl and str files
  processFiles() {
	//create constant props
    const {
      // -- set hand-rail color values here --
      hr_color = '#3f5056', //blue-gray
      hr_start_color = '#0fff00', // green //
      hr_end_color = '#ff0022', //red
      
      stationFile,
      handrailFiles,
      strFiles,
      startHandrail,
      endHandrail,
      routes,
    } = this.props;
    if (!stationFile) {
      return;
    }
    
    //clean model
    if (this.stationModelIsDirty) {
      if (this.stationModel) {
        this.scene.remove(this.stationModel);
        this.stationModel.geometry.dispose();
        this.stationModel.material.dispose();
        this.stationModel = undefined;
      }
      

/*  	var sphereGeometry = new THREE.SphereGeometry( .3, 10, 10 );
  	
  	var lavaTexture = new THREE.TextureLoader.load( 'images/lava.jpg' );
    var sphereMaterial = new THREE.MeshPhongMaterial( { map: lavaTexture } );
	var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	sphere.position.set(0,0,1);
	this.scene.add(sphere);
      
    //create texture  
	var lavaTexture = new THREE.TextureLoader().load( "images/lava.jpg" );
	//create geometry
	var geometry = new THREE.BoxBufferGeometry( .3, .3, .3);
	//map texture to geometry
	var sphereMaterial = new THREE.MeshBasicMaterial( { map: lavaTexture } );
	//combine geometry and material into a mesh
	var sphere = new THREE.Mesh( geometry, sphereMaterial );
	//position mesh
	sphere.position.set(0,0,1);
	//add mesh to screen
	this.scene.add( sphere );
      
      
      //make sphere (radius, segmentsWidth, segmentsHeight)
      var sphereGeom = new THREE.SphereGeometry(.5, 10, 10);

      
     
      
      //load texture
      var lavaTexture = THREE.ImageUtils.loadTexture( 'images/lava.jpg' );
      lavaTexture.wrapS = lavaTexture.wrapT = THREE.RepeatWrapping;
      lavaTexture.repeat.set( 10, 10 );
      var lavaMaterial = new THREE.MeshBasicMaterial( { map: lavaTexture } );
      var lavaBall = new THREE.Mesh( sphereGeom, lavaMaterial );

      //set position
      lavaBall.position.set(0,0,-1);
      //add to scene
      this.scene.add(lavaBall);
      
      
      */
      
      
      
      const mesh = loadMeshFromFile(stationFile);
      this.stationModel = mesh;
      this.scene.add(mesh);
      this.camera.lookAt(mesh);
      this.stationModelIsDirty = false;
    }
    
    //script that defines the vertex shader
    var vertexShaderSource = `
    	uniform vec3 viewVector;
    	uniform float c;
    	uniform float p;
    	varying float intensity;
    	void main() 
    	{
	    	vec3 vNormal = normalize( normalMatrix * normal );
	    	vec3 vNormel = normalize( normalMatrix * viewVector );
	    	intensity = pow( c - dot(vNormal, vNormel), p );
	    	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    	}
    `;
    
    //script that defines the fragment shader
    var fragmentShaderSource = `
    	uniform vec3 glowColor;
    	varying float intensity;
    	void main() 
    	{
	    	vec3 glow = glowColor * intensity;
	    	gl_FragColor = vec4( glow, 1.0 );
    	}
    `;
    
    // create glow material
    const glowMaterial = new THREE.ShaderMaterial( 
    	{
    		uniforms: 
    		{ 
    			"c":   { type: "f", value: 1 },
    			"p":   { type: "f", value: 3 },
    			glowColor: { type: "c", value: new THREE.Color(0xff0022) },
    			viewVector: { type: "v3", value: this.camera.position }
    		},
    		//add shaders to the material
    		vertexShader: vertexShaderSource,
    		fragmentShader: fragmentShaderSource,
    		//set cast shadow to front
    		side: THREE.FrontSide,
    		//set blending equation to blend RGB and Alpha
    		blending: THREE.AdditiveBlending,
    		//turn on transparency
    		transparent: true
   	}   );
    
    //load handrails
    if (handrailFiles && Object.keys(handrailFiles).length > 0 && strFiles && strFiles.length > 0 ) {
    	Object.values(this.handrailModels).forEach(model => this.scene.remove(model));
    	Object.entries(handrailFiles).forEach(([name, handrailFile]) => {
    		let color = hr_color;
    		let scale = 1;
    		var handrailMesh = loadMeshFromFile(handrailFile, {color}, {scale});
    		// set start/end/route handrail color
    		if (startHandrail && name === `${startHandrail.value}.stl`) {
    			color = hr_start_color;
    			handrailMesh = loadMeshFromFile(handrailFile, {color}, {scale});
    			// add glowy-handrail mesh to scene
    			const handrailMeshClone = new THREE.Mesh(handrailMesh.geometry, new THREE.ShaderMaterial(glowMaterial));
    			handrailMeshClone.scale.multiplyScalar(1.4);
    			handrailMesh.add(handrailMeshClone);
    		} else if (endHandrail && name === `${endHandrail.value}.stl`) {
    			color = hr_end_color;
    			handrailMesh = loadMeshFromFile(handrailFile, {color}, {scale});
    			// add glowy-handrail mesh to scene
    			const handrailMeshClone = new THREE.Mesh(handrailMesh.geometry, new THREE.ShaderMaterial(glowMaterial));
    			handrailMeshClone.scale.multiplyScalar(1.4);
    			handrailMesh.add(handrailMeshClone);
    		} else {
    			// refactor and exit early or just loop routes outside for performance
    			routes.forEach(route => { 
    				route.nodes.forEach(node => {
    					if (name === `${node}.stl`) {
    						color = route.color;
    						scale = 1;
    						handrailMesh = loadMeshFromFile(handrailFile, {color}, {scale});
    					}
    				});
    			});
    		}
    		handrailMesh.name = name;
    		this.handrailModels[name] = handrailMesh;
    		// add handrail mesh to scene
    		this.scene.add(handrailMesh);
    	});
    	strFiles.forEach(strFile => positionModelsBasedOnStrFile(this.handrailModels, strFile));
    	// bindDomEventsToMeshes(this.handrailModels, this.domEvents, this.domEventsMap);
    }
    this.animate();
  } //end processFiles()

  //shadowed light effect
  addShadowedLight(x, y, z, color, intensity) {
	  const directionalLight = new THREE.DirectionalLight(color, intensity);
	  directionalLight.position.set(x, y, z);
	  this.scene.add(directionalLight);
	  directionalLight.castShadow = true;
	  const d = 1;
	  directionalLight.shadow.camera.left = -d;
	  directionalLight.shadow.camera.right = d;
	  directionalLight.shadow.camera.top = d;
	  directionalLight.shadow.camera.bottom = -d;
	  directionalLight.shadow.camera.near = 1;
	  directionalLight.shadow.camera.far = 4;
	  directionalLight.shadow.mapSize.width = 1024;
	  directionalLight.shadow.mapSize.height = 1024;
	  directionalLight.shadow.bias = -0.005;
  }
  
  //handle window
  handleWindowResize() {
	  this.camera.aspect = window.innerWidth / window.innerHeight;
	  this.camera.updateProjectionMatrix();
	  this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  //animate scene movement
  animate() {
	  requestAnimationFrame(this.animate);
	  this.camera.lookAt(this.cameraTarget);
	  this.renderer.render(this.scene, this.camera);
	  this.stats.update();
  }

  //render div for state of hovered handrails
  render() {
	  const {
		  hoveredHandrail
	  } = this.state;
	  return (
			  <div>
			  <div className='info-panel'>
			  {hoveredHandrail &&
				  <div>
			  <div>{hoveredHandrail.name}</div>
			  <div>{Object.values(hoveredHandrail.position).join(', ')}</div>
			  </div>
			  }
			  </div>
			  <div ref={c => this.container = c}></div>
			  </div>
	  );
  }
}

//renderer props
Renderer.propTypes = {
		stationFile: PropTypes.object,
		handrailFiles: PropTypes.object.isRequired,
		strFiles: PropTypes.array.isRequired,
		startHandrail: PropTypes.object,
		endHandrail: PropTypes.object,
		routes: PropTypes.array,
};
