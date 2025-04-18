#version 300 es

precision mediump float;

/**
 * \file 04_circle.frag
 * \author Jaesik Kang
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */

 out vec4 FragColor;

 uniform vec2 u_resolution;
 uniform vec2 u_mouse;
 uniform float u_time;

// Convert pixel coords to normalized coords
 vec2 to_coord(vec2 pixel_point)
 {
    vec2 point = pixel_point / u_resolution;
    if(u_resolution.x > u_resolution.y)
    {
        // wide not tall
        // height is going to between 0-1
        // width is going to be expanded, larger than 0-1
        point.x *= u_resolution.x / u_resolution.y;
        // now to recenter the range
        point.x += (u_resolution.y - u_resolution.x) / (u_resolution.x);
    }
    else
    {
        point.y *= u_resolution.y / u_resolution.x;
        point.y += (u_resolution.x - u_resolution.y) / u_resolution.y;
    }

    return point;
 }

 float sCircle(vec2 point, vec2 center, float radius)
 {
    float d = distance(point, center);
    return d - radius;
 }

 // return 0 not in circle, 1 in circle
 float circle(vec2 point, vec2 center, float radius)
 {
    float sd = sCircle(point, center, radius);
    // return 1.0 - step(0., sd);
    float E = fwidth(sd);
    return 1. - smoothstep(-E, E, sd);
 }

 void main(void)
 {
    vec2 position = to_coord(gl_FragCoord.xy);
    vec3 color = vec3(0.05, 0.05, 0.1);
    vec3 sunColor = vec3(0.9882, 0.4941, 0.0);
    vec3 planetColor = vec3(0.0706, 0.5686, 0.8196);
    vec3 moonColor = vec3(1);

    vec2 center = vec2(0.5);

    //sun
    float sun = circle(position, center,0.1);
    color = mix(color, sunColor, sun);

    //planet
    vec2 planetPosition = vec2 (cos(u_time), sin(u_time))*0.3 + center;
    float planet = circle(position, planetPosition, 0.05);
    color = mix(color, planetColor, planet);

    //moon
    float moonOrbit = 0.1;
    vec2 moonPosition = vec2(cos(u_time*3.0), sin(u_time*3.0))*moonOrbit+planetPosition;
    float moon = circle(position, moonPosition, 0.02);
    color = mix(color, moonColor, moon); 
    //vec2 p = vec2(cos(u_time), sin(u_time))*0.25+vec2(0.5);
    //float t = circle(position, p  ,0.125);
    //color = mix(color, vec3(1), t);
    
    FragColor = vec4(color, 1.0);
 }