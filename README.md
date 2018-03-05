## Project Overview
Using Dijkstra's algorithm, find the most efficient path of handrails along the exterior of the ISS when navigating from Point A to Point B.  A 3D Model
of the ISS is used to select, configure, and highlight calculated path.  Astronaut wingspan, additional intermediate points, and hazards should be taken into 
consideration when calculating the optimal path(s).  

#### Phase 1 (Fall 2017)
Phase 1 Repository README.md details Linux installation instructions.  

Repository: <https://github.com/lovetostrike/nasa-path-finder>  
Demo: <https://lovetostrike.github.io/nasa-path-finder/demo.html>  
Site: <https://lovetostrike.github.io/nasa-path-finder/>  

#### Phase 2 (Fall 2018)
Phase 2 Repository README.md adds Windows installation and development instructions.  

Repository: <https://github.com/xpaddict/nasa-path-finder>  

## Dependencies
#### Front-End
Jest: 		Test Execution  
Node.js: 	Package Management  
React.js: 	UI Rendering Library  
Three.js: 	3D Rendering  
Webpack:	Module Management  
Yarn:		Package Management  

#### Back-End
AJAX: 		Asynchronous Algorithm Display  
Java:		Software Platform  

#### Supplemental Tools
CircleCI: 	Continuous Integration  
Docker: 	Web Building and Packaging  
Eletron: 	Build Management  
GitHub:		Code Repository  

## Installation and Configuration

#### Dependency Installation
Install Node.js <https://nodejs.org/en/>  
Install Yarn <https://yarnpkg.com/en/docs/install>  
Install/Update Java 8 <https://www.java.com/en/download/>  
Install Maven (Apache Maven Project) <https://maven.apache.org/>  

#### Configuration
1. Environment Variables: Add or Update Windows Environment Paths to include the following...   
* JAVA_HOME - Set to Java 8 JDK installation folder  
* M2_HOME - Set to location of Maven installation folder  
* MAVEN_HOME - Set to location of Maven installation folder  
* Path - Include new path record "%M2_HOME%\bin"  

2. Source Paths  
Update path references in ```server/src/main/java/com/nasa/CreateNodes.java ``` to reflect resource paths.  
If installed to C:\ this path would be: C:\nasa-path-finder\server\src\main\resources\  

3. Yarn Dependencies  
Using command line, download all yarn dependencies by navigating to the root of the project executing:  
```yarn```  
This step may take several minutes.

## Execution
NASA Path Finder now supports both Linux and Windows execution, the commands to compile and start the application are slightly different

#### Linux
1. In first command line window, navigate to root of the project directory and execute: ```yarn start```  
2. In a second command line window, navigate to root of the project directory and execute: ```yarn compile:start:server```  
3. Navigate to <http://localhost:3000> or <http://127.0.0.1:3000>

#### Windows
1. In first command line window, navigate to root of the project directory and execute: ```yarn start```  
2. In a second command line window, navigate to root of the project directory and execute: ```yarn compilewin:start:server```  
3. Navigate to <http://localhost:3000> or <http://127.0.0.1:3000>

## Development


#### Structure
