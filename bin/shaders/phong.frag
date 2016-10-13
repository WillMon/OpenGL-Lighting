// classic Phong equation
#version 410

in vec4 vPosition;
in vec4 vNormal;

uniform vec3 Id;
uniform vec3 Is;
uniform vec3 Ia; 
//
uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;
//
uniform vec3 lightDirection;
uniform vec3 cameraPosition;
//
uniform float specularPower;
//
out vec4 FragColor;
//
//normalize 


void main() 
{
	vec3 L = normalize(lightDirection);
	vec3 N = normalize(vNormal.xyz);
	
	vec3 E = normalize(cameraPosition - vPosition.xyz);
	//The refection from the Normalized Vertex and the Normalized light direction 
	vec3 R = 2 * dot(L, N) * N - L;
	//Specular Lighting 
	float specularTerm = pow(max(0.0f , dot(R, E)), specularPower);

	//Hemaspher set colorsd
	vec3 color1 = vec3(255, 0, 0);
	vec3 color2	= vec3(0, 255, 0);
	vec3 color3	= vec3(0, 0, 255);
	
	float hemDot = dot(N,vec3(0, 1, 0));
	vec3 hemisphere = 0.5f * mix(color1,color3,hemDot) + 0.0f;
	
	//Ambient Light
	vec3 Ambient = (Ka) * (Ia * 0.01f) *  hemisphere;
	//vec3 Ambient = Ia * Ka;
	//Lambert Term
	float LambertTerm =  max(0.0f, dot(L, N));
	//Deffuse
	vec3 Diffuse = Id * Kd * LambertTerm ;
	
	vec3 Specualar = Is * Ks * specularTerm; // Specular light (1)
	
	FragColor = vec4(Ambient + Diffuse + Specualar,1);
}