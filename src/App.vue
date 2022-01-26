<template>
    <div class="main">
        <div class="header">
            <router-link to="/">Home</router-link>
            <router-link to="/how">How It's Done</router-link>
        </div>
        <div class="content">
            <router-view v-slot="{ Component }">
                <transition
                    mode="out-in"
                    v-on:enter="enterAnimation"
                    v-on:leave="leaveAnimation"
                >
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script setup>
import { useSmoke } from './transitions/smoke';

const { enterAnimation, leaveAnimation } = useSmoke();
</script>

<style lang="scss" scoped>
@use './global/variables.scss';
.main {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.header {
    display: flex;
    align-items: center;
}

.header > * {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 10rem;
    padding: 0.5rem;
    border: 1px solid variables.$color-blue;
    border-radius: 1rem;
}

.content {
    flex: 1 0;
    position: relative;
}

.content > * {
    padding: 1rem 0;
}
</style>
