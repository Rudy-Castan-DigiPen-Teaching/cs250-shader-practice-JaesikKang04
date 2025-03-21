#version 300 es
precision mediump float;

/**
 * \file 01_shaping.frag
 * \author Jaesik Kang
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */

out vec4 FragColor;
uniform vec2 u_resolution;

#define PI 3.14159265359

float plot(vec2 st, float pct){

  return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

void main()
{
    vec2 st = gl_FragCoord.xy/u_resolution;

    //float y = pow(st.x,0.5);
    float y = step(0.9, st.x);
    y = smoothstep(0.3, 0.6, st.x);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);
    
    FragColor = vec4(color, 1.0);
}