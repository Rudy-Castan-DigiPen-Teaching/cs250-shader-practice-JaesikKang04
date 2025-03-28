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

#define PI 3.14159265359

out vec4 FragColor;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const vec3 baseColor = vec3(0.149, 0.141, 0.912);
const vec3 targetColor = vec3(1.000, 0.833, 0.224);

float drawLine(vec2 uv, float t) {
    float edge = 0.01;
    return smoothstep(t - edge, t, uv.y) - smoothstep(t, t + edge, uv.y);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.x += 0.05 * sin(u_time + uv.y * 10.0);

    vec3 interp = vec3(uv.x);

    interp.r = 0.5 + 0.5 * sin(u_time);
    interp.g = sin(PI * uv.x + u_time * 2.0);
    interp.b = pow(uv.x + sin(u_time), 0.5);

    vec3 color = mix(baseColor, targetColor, interp);

    vec2 mouseNorm = u_mouse / u_resolution;
    float fade = 1.0 - smoothstep(0.2, 0.5, distance(uv, mouseNorm));
    color *= fade;

    color = mix(color, vec3(1.0, 0.0, 0.0), drawLine(uv, interp.r));
    color = mix(color, vec3(0.0, 1.0, 0.0), drawLine(uv, interp.g));
    color = mix(color, vec3(0.0, 0.0, 1.0), drawLine(uv, interp.b));

    FragColor = vec4(color, 1.0);
}
