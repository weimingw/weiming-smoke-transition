<template>
    <div class="how">
        <h3>Quick answer: shaders... but I think it's sorcery.</h3>
        <p>This is the first time I've ever worked with shaders.</p>
        <p>
            <a
                href="https://github.com/weimingw/weiming-smoke-transition"
                target="_blank"
                >It might help to look at the source code.</a
            >
        </p>
        <h4>Quick lesson on shaders:</h4>
        <p>The important thing here is fragment shaders.</p>
        <p>
            For the uninitiated, fragment shaders are chunks of code that run on
            every pixels being processed for output and spits out a color for
            the pixel.
        </p>
        <p>
            They accept parameters from the outside called "uniforms" that do
            not vary by pixel position. They also have parameters that vary by
            position called "varying".
        </p>
        <p>
            The big caveat: they don't know the output of any other pixel, and
            that's by design. Shaders are able to be optimized because all the
            shaders for a frame can run in parallel.
        </p>
        <h4>What the shader is doing</h4>
        <p>
            (The shader code is in
            <a
                href="https://github.com/weimingw/weiming-smoke-transition/blob/main/src/transitions/shaders/cloud.frag"
                target="_blank"
                >/src/transitions/shaders/cloud.frag</a
            >)
        </p>
        <p>
            At its base, the shader has 3 parts from which the pixels derive
            their color:
        </p>
        <ol>
            <li>
                The part of the screen that has not been wiped over yet, which
                is fully transparent.
            </li>
            <li>
                The part of the screen that has been wiped over, which has full
                opacity.
            </li>
            <li>
                The part of the screen that is being covered by smoke, which has
                a gradient.
            </li>
        </ol>
        <p>At this point, it looks like this:</p>
        <img :src="baseImg" />
        <p>
            Since it needs to look like billowing smoke, the pixels in the
            gradient portion must have random shades similar to the shade of
            adjacent cells, and we bypass the need for knowing the output of
            other cells by using noise functions! (Yet another level of
            sorcery).
        </p>
        <p>
            We utilize the noise function to randomly sample pixels from the
            base if the pixel falls into the "gradient" portion of the screen.
            The process looks like this, with the pixels taking on the color at
            the end of its arrow:
        </p>
        <img :src="samplingImg" />
        <p>
            The end result of this sorcery: it looks like billowing smoke.
            (Don't worry, I don't really get it either. It just works.)
        </p>
        <p>&nbsp;</p>
        <h4>And of course, the other half, custom Vue transitions</h4>
        <p>
            If you didn't already know, Vue has exceptional support for custom
            transitions. Just pass in a method into the enter and leave events
            into a transition component and watch the magic happen.
        </p>
        <p>
            <a
                href="https://vuejs.org/v2/guide/transitions.html"
                target="_blank"
                >Vue's documentation.</a
            >
        </p>
        <p>
            <a
                href="https://github.com/weimingw/weiming-smoke-transition/blob/main/src/transitions/smoke.js"
                target="_blank"
                >My smoke transition JS code.</a
            >
        </p>
        <p>The transition does the following:</p>
        <ol>
            <li>
                It creates a &lt;canvas&gt; with styling that lets it overlay on
                top of the element being transitioned out
            </li>
            <li>
                It triggers the shaders (through three.js) and executes the
                shaders.
            </li>
            <li>
                After the shaders simulate screen wipe, it starts fading out the
                &lt;canvas&gt;.
            </li>
        </ol>
        <h4>The things I left out</h4>
        <p>For brevity, I didn't include a few other things:</p>
        <p>
            The cloud.vert file is a vertex shader file that basically sets up
            the scene inside the &lt;canvas&gt; so that we are looking only at
            the output of cloud shaders.
        </p>
        <p>
            cloud.frag also includes some uniforms that lets us customize how
            the output looks and helps with scaling the output to look good on
            many aspect ratios.
        </p>
    </div>
</template>

<script setup>
import baseImg from '../assets/base.gif';
import samplingImg from '../assets/sampling.png';
</script>

<style lang="scss" scoped>
.how img {
    width: 300px;
}
</style>
