/*uniform vec3 glowColor;
varying float intensity;
void main() 
	{
		vec3 glow = glowColor * intensity;
		gl_FragColor = vec4( glow, 1.0 );
	}
*/
uniform float time;

void main() {
gl_FragColor = vec4(0.5 + 0.3*sin(time),  
                    0.5 + 0.3*cos(time), 
                    0.5 + 0.2*sin(time), 
                    1.0);
}