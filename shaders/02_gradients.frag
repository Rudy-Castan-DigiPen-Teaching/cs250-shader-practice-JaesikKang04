#version 300 es
precision mediump float;

/**
 * \file
 * \author Jaesik Kang
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */

out vec4 FragColor;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.149, 0.141, 0.912);
vec3 colorB = vec3(1.000, 0.833, 0.224);

float band(vec2 uv, float v) {
    float w = 0.01;
    return smoothstep(v - w, v, uv.y) - smoothstep(v, v + w, uv.y);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    float x = uv.x;
    float y = uv.y;

    float r = 0.5 + 0.5 * cos(3.14159 * x + u_time);
    float g = 0.5 + 0.5 * sin(3.14159 * x * 1.5);
    float b = sqrt(abs(x));

    vec3 factor = vec3(r, g, b);
    vec3 base = mix(colorA, colorB, vec3(x));

    vec3 color = base;
    color = mix(color, vec3(1.0, 0.0, 0.0), band(uv, r));
    color = mix(color, vec3(0.0, 1.0, 0.0), band(uv, g));
    color = mix(color, vec3(0.0, 0.0, 1.0), band(uv, b));

    FragColor = vec4(color, 1.0);
}
