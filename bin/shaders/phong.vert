// // classic Phong equation
#version 410

layout( location = 0) in vec4 Position;
layout( location = 2) in vec4 Normal;

out vec4 vPosition;
out vec4 vNormal;

uniform mat4 ProjectionViewModel;

// We need the model matrix seperate 
uniform mat4 ModelMatrix;

// we need this matrix to transfrom the normal (it's the transposed model matrix:)
uniform mat4 NormalMatrix;
 
void main() 
{
	vPosition = ModelMatrix * Position;
	vNormal =	NormalMatrix * Normal;
	gl_Position = ProjectionViewModel * Position;
}