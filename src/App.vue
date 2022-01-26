<template>
    <div class="main">
        <div class="header">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
        </div>
        <router-view v-slot="{ Component }">
            <transition mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script setup>
import { useSmoke } from './transitions/smoke';

const { enterAnimation, leaveAnimation } = useSmoke();
</script>

<style lang="scss" scoped></style>
