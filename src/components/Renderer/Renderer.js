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
    
    // add ambientLight
    const ambientLight = new THREE.AmbientLight(0x2c3e50);
    this.scene.add(ambientLight);
    
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
  };
  
  //create glow material
  buildGlow(hexColor, vert, frag){
	    // create glass material 
	    // based on Lee Stemkoski's glow
	    const material = new THREE.ShaderMaterial( 
	   	{
	   		uniforms: 
	   		{ 
	   			"c":   { type: "f", value: .1 },
	   			"p":   { type: "f", value: 10 },
	   			glowColor: { type: "c", value: new THREE.Color(hexColor) },
	   			viewVector: { type: "v3", value: this.camera.position }
	   		},
	   		//add shaders to the material
	   		vertexShader: vert,
	   		fragmentShader: frag,
	   		//set cast shadow to front
	   		side: THREE.BackSide,
	   		//set blending equation to blend RGB and Alpha
	   		blending: THREE.AdditiveBlending,
	   		//turn on transparency
	   		transparent: true
	  }   );
	  
	  //create explosion material
/*	  const material = new THREE.RawShaderMaterial({
		  vertexShader: vert,
		  fragmentShader: frag,
		  uniforms: {
			  time: { type: 'f', value: 0 }
		  },
	  });*/
	  return material;
};
  
  //process stl and str files
  processFiles() {
	//create constant props
    const {
      // -- set hand-rail color values here --
      hrColor = '#3f5056', //blue-gray
      hrStartColor = '#0cff00', // green
      hrEndColor = '#ff0022', //red
      hrStartHexColor = 0x0cff00,
      hrEndHexColor = 0xff0022,
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

      const mesh = loadMeshFromFile(stationFile);
      this.stationModel = mesh;
      this.scene.add(mesh);
      this.camera.lookAt(mesh);
      this.stationModelIsDirty = false;
    }

    //script that defines the vertex shader for glass effect
    const vertexShaderSource = `
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
    
    //script that defines the fragment shader for glass effect
    const fragmentShaderSource = `
    	uniform vec3 glowColor;
    	varying float intensity;
    	void main() 
    	{
	    	vec3 glow = glowColor * intensity;
	    	gl_FragColor = vec4( glow, 1.0 );
    	}
    `;
    
/*  //script that defines the vertex shader for explosion effect 
 *  based on Matt DesLauriers's bunny tutorial 
    const vertexShaderSource = `
    	attribute vec4 position;
    	attribute vec3 normal;

    	uniform mat4 projectionMatrix;
    	uniform mat4 modelViewMatrix;

    	varying vec3 vNormal;

    	void main () {
	    	vNormal = normal;
	
	    	vec4 offset = position;
	    	float dist = 0.25;
	    	offset.xyz += normal * dist;
	    	gl_Position = projectionMatrix * modelViewMatrix * offset;
    	}
    `;
    
    //script that defines the fragment shader for explosion effect
    const fragmentShaderSource = `
    	precision highp float;

    	varying vec3 vNormal;

    	void main () {
    		gl_FragColor = vec4(vNormal, 1.0);
    	}
    `;*/

    
    if (handrailFiles && Object.keys(handrailFiles).length > 0 && strFiles && strFiles.length > 0 ) {
    	Object.values(this.handrailModels).forEach(model => this.scene.remove(model));
    	Object.entries(handrailFiles).forEach(([name, handrailFile]) => {
    		let color = hrColor;
    		let scale = 1;
    		var handrailMesh = loadMeshFromFile(handrailFile, {color}, {scale});
    		
    		// set start/end/route handrail color
    		if (startHandrail && name === `${startHandrail.value}.stl`) {
    			//set color of handrail
    			color = hrStartColor;
    			
    			//create handrail
    			handrailMesh = loadMeshFromFile(handrailFile, {color}, {scale});
 			
    			// set glow material values for start handrail
    			const glowMaterialStart = this.buildGlow(hrStartColor, vertexShaderSource, fragmentShaderSource);
    			
    			// add glowy-handrail mesh to scene
    			//how it's done for explosion material
    			//const handrailMeshClone = new THREE.Mesh(handrailMesh.geometry, glowMaterialStart);
    			
    			// how it's done for glass effect material
    			const handrailMeshClone = new THREE.Mesh(handrailMesh.geometry, glowMaterialStart);
    			
    			//scale up clone
    			handrailMeshClone.scale.multiplyScalar(1.2);
    			
    			//add clone to scene in handrail location 
    			handrailMesh.add(handrailMeshClone);
    			
    			// add another glowy-handrail mesh to scene
    			const handrailMeshClone2 = new THREE.Mesh(handrailMesh.geometry,glowMaterialStart);
    			
    			// scale it down
    			handrailMeshClone2.scale.multiplyScalar(.8);
    			
    			//add to scene
    			handrailMesh.add(handrailMeshClone2);
    			
    			//give it it's own light
    			var light = new THREE.PointLight( hrStartHexColor, .5, .3 );
    		    handrailMesh.add(light);
    		} else if (endHandrail && name === `${endHandrail.value}.stl`) {
    			// set color of handrail
    			color = hrEndColor;
    			// create handrail 
    			handrailMesh = loadMeshFromFile(handrailFile, {color}, {scale});
    			
    			// set glow material values for end handrail
    			const glowMaterialEnd = this.buildGlow(hrEndColor, vertexShaderSource, fragmentShaderSource);
    			
    			// add glowy-handrail mesh to scene
    			//how it's done for explosion material
    			//const handrailMeshClone = new THREE.Mesh(handrailMesh.geometry, glowMaterialEnd);
    			
    			// how it's done for glass effect material
    			const handrailMeshClone = new THREE.Mesh(handrailMesh.geometry, glowMaterialEnd);
    			
    			// scale up the clone
    			handrailMeshClone.scale.multiplyScalar(1.2);
    			
    			// add clone to scene in same location as handrail
    			handrailMesh.add(handrailMeshClone);
    			
    			// add another glowy-handrail mesh to scene
    			const handrailMeshClone2 = new THREE.Mesh(handrailMesh.geometry,glowMaterialEnd);
    			
    			// scale it down
    			handrailMeshClone2.scale.multiplyScalar(.8);
    			
    			//add to scene
    			handrailMesh.add(handrailMeshClone2);
    			//give it it's own light
    			light = new THREE.PointLight( hrEndHexColor, .5, .4 );
    		    handrailMesh.add(light);
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
