import * as THREE from 'three';
import vertex from './shaders/cloud.vert';
import fragment from './shaders/cloud.frag';
import './smoke.scss';

/**
 * @param {Number} duration length of animation
 * @returns {AnimationHookReturnValue} pass into <Transition />>
 */
function useSmoke(duration = 2000, enterDuration = duration / 4) {
    const startLocation = 1.2;
    const gradientSize = startLocation - 1;

    return {
        enterAnimation(el, done) {
            el.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: enterDuration,
                easing: 'ease-out',
            }).onfinish = done;
        },
        leaveAnimation(el, done) {
            const canvas = createCanvas(el);

            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
            renderer.setClearColor(0x000000, 0);
            const wipeDuration = duration * 0.75;
            const fadeDuration = duration - wipeDuration;

            const { scene, planeGeometry, planeMaterial, planeMesh, camera } = setStage({
                gradientSize,
            });
            const unregisterResizeCallback = handleWindowResize(renderer, camera, planeMesh, planeMaterial);

            const start = Date.now();
            function animateWipe() {
                const time = Date.now() - start;
                if (planeMaterial) {
                    const time = Date.now() - start;
                    planeMaterial.uniforms.uThreshold.value = startLocation - (time / wipeDuration) * startLocation;
                    planeMaterial.uniforms.uTime.value = time;
                    renderer.render(scene, camera);
                }
                if (time < wipeDuration) {
                    requestAnimationFrame(animateWipe);
                } else {
                    el.style.opacity = 0;
                    canvas.animate([{ opacity: 1 }, { opacity: 0 }], {
                        duration: fadeDuration,
                        easing: 'linear',
                    }).onfinish = () => {
                        done();
                        canvas.parentNode.removeChild(canvas);
                        unregisterResizeCallback();
                    };
                }
            }

            animateWipe();
        },
    };
}

function createCanvas(el) {
    const canvas = document.createElement('canvas');
    canvas.className = 'smoke-transition-canvas';
    el.insertAdjacentElement('afterend', canvas);
    return canvas;
}

function setStage(opts) {
    const scene = new THREE.Scene();
    const planeGeometry = new THREE.PlaneGeometry();
    const planeMaterial = new THREE.ShaderMaterial({
        uniforms: {
            ...THREE.UniformsUtils.clone(THREE.ShaderLib.sprite.uniforms),
            uThreshold: { value: 1.25 },
            uTime: { value: 0 },
            uScaleFactor: { value: 3 },
            uTimeFactor: { value: 0.001 },
            uDisplayStrength: { value: 0.12 },
            uGradientSize: { value: opts.gradientSize },
            uColor: { value: new THREE.Vector3(0.25, 0.25, 0.25) },
            uResolution: {
                value: new THREE.Vector2(
                    window.innerWidth,
                    window.innerHeight,
                ),
            },
        },
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.scale.set(window.innerWidth / window.innerHeight, 1, 1);
    scene.add(planeMesh);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 1000);
    camera.position.set(0, 0, 1);
    scene.add(camera);

    return { scene, planeGeometry, planeMaterial, planeMesh, camera };
}

function handleWindowResize(renderer, camera, planeMesh, planeMaterial) {
    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
        planeMesh.scale.set(window.innerWidth / window.innerHeight, 1, 1);
        planeMaterial.uniforms.uResolution.value = new THREE.Vector2(
            window.innerWidth * window.devicePixelRatio,
            window.innerHeight * window.devicePixelRatio,
        );
    };
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
}

export { useSmoke };
