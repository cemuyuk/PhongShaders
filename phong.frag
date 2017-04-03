// Phong Fragment Shader

#version 330 core
out vec4 color;

in vec3 FragPos;  //
in vec3 Normal;  //
  
uniform vec3 lightPos; //
uniform vec3 viewPos;
uniform vec3 lightColor; //
uniform vec3 objectColor;

//Reference: http://learnopengl.com/#!Lighting/Basic-Lighting

void main()
{
    vec3 norm, lightDirection, diffuse, ambient, viewDirection, reflectDirection, specular, result;
    float sp;
    
    //Converting the normal vector to unit size:
    norm = normalize(Normal);
    
    //The direction vector between the light source and fragment position normalized to unit size:
    lightDirection = normalize(lightPos-FragPos);
    
    //DIFFUSE
    //In order to get the impact of the diffuse we take a dot product between the normal vector and light direction. The case that the angle between them is greater than 90 degrees results in negative. For that reason, we take the max between the result of the dot product and 0.0. Larger the angle between the light source and a fragment, darker the fragment is:
    diffuse =  max(dot(norm, lightDirection), 0.0)*lightColor;
    //For only diffuse:
    //color = vec4(diffuse * objectColor, 1.0f);
    
    
    
    //AMBIENT
    //Some fraction that will allow us to see a little bit of the object even in the dark with respect to the color of the light:
    ambient = lightColor*0.1f;
    //For only ambient:
    //color = vec4(ambient * objectColor, 1.0f);
    
    
    
    //SPECULAR
    //Subtracting fragment position from view position and then normalizing the result will give us the viewing vector in unit form:
    viewDirection = normalize(viewPos-FragPos);
    
    //Reflection is in the opposite direction with the light, so we negate lightDirection:
    reflectDirection = reflect(-lightDirection, norm);
    
    //We calculate the dot product, down below, between viewing and reflection direction to get the effect of specularity that changes with regards to angle. Then we take max of that result and 0.0 to prevent it from resulting negative for the angles (that are between viewing and reflection direction) greater than 90. The only thing that's left after this is to take a power of the dot product for shininess. Smaller power results in more scattered light on the object of reflection. (I tried some different powers to see how it differs.) Then the last thing is to just multiply this with a floating number and light color to get specularity.
    sp = pow(max(dot(viewDirection,reflectDirection),0.0),64);
    //s = pow(max(dot(viewDirection,reflectDirection),0.0),256);
    //s = pow(max(dot(viewDirection,reflectDirection),0.0),6);
    //s = pow(max(dot(viewDirection,reflectDirection),0.0),32);
    
    specular = 0.5f * sp * lightColor;
    //For only specular:
    //color = vec4(specular * objectColor, 1.0f);
    
    
    //Final color
    color = vec4((ambient + diffuse + specular) *objectColor, 1.0f);
} 
