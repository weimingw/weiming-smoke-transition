<template>
    <div class="home">
        <h3>Welcome to a demonstration of a smoke transition in Vue</h3>
        <h4>The inspiration</h4>
        <p>
            I saw this website and got really intrigued:
            <a href="https://designmodo.com/smoke-transitions/"
                >Smoke Transitions: Beginning of a Trend?</a
            >
        </p>
        <p>
            I already have a history of deconstructing visually impressive UIs:
            <a
                v-for="(link, i) in links"
                :href="link"
                v-bind:key="link"
                target="_blank"
            >
                [{{ i + 1 }}]&nbsp;
            </a>
        </p>
        <p>So it made sense to try to reverse engineer something like this too!</p>
        <h4>The goal</h4>
        <p>There needs to be a screen wipe, and the wipe has to resemble billowing smoke.</p>
        <p>Click 'How It's Done' to see it in action and read about how it's done!</p>
    </div>
</template>

<script setup>
const links = [
    'https://medium.com/geekculture/recreating-page-piling-in-react-for-your-personal-sites-without-extra-libraries-23fcde868ed9',
    'https://medium.com/geekculture/recreating-animated-numerical-counters-in-react-from-scratch-better-than-existing-libraries-2fa6d3056b33',
    'https://medium.com/geekculture/how-to-jazz-up-your-website-like-apple-with-javascript-eed2bf227fec',
];
</script>

<style lang="scss" scoped></style>
