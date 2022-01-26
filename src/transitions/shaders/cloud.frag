#pragma glslify: fbm3d = require('glsl-fractal-brownian-noise/3d')
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)


// uniform sampler2D uTxtShape;
uniform float uTime;
uniform float uThreshold;
uniform float uScaleFactor;
uniform float uTimeFactor;
uniform float uDisplayStrength;
uniform float uGradientSize;
uniform vec3 uColor;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
    float xScale = uResolution.x / uResolution.y;
    vec2 scaledUv = vec2(vUv.x * xScale, vUv.y);
    vec2 newUv = vec2(vUv.x * xScale, vUv.y);

    float noiseBig = fbm3d(vec3(scaledUv * uScaleFactor, uTime * uTimeFactor), 4) + 1.0 * 0.5;
    newUv += noiseBig * uDisplayStrength;

    float alpha;
    if (newUv.x / xScale > uThreshold) {
        alpha = 1.0;
    } else if (newUv.x / xScale > uThreshold - uGradientSize) {
        alpha = (newUv.x / xScale - uThreshold) / uGradientSize + 1.0;
    } else {
        alpha = 0.0;
    }

    gl_FragColor = vec4(uColor, alpha);
}
