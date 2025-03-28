#version 300 es
precision mediump float;

/**
 * \file
 * \author Jaesik Kang
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */
 
#ifdef GL_ES
precision mediump float;
#endif

out vec4 FragColor;

uniform vec2 u_resolution;
uniform float u_time;

vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.00, 0.33, 0.67); // 색상 주기 조절
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float t = fract(uv.x + u_time * 0.1);
    float yfade = smoothstep(0.0, 1.0, uv.y);
    float offset = sin(uv.y * 3.0 + u_time) * 0.5 + 0.5;

    vec3 color = palette(t + offset) * yfade;

    FragColor = vec4(color, 1.0);
}
