<script lang="ts">
import type { Prop, PropType } from 'vue';

export default {
    props:{
        condition: {
            type: Boolean as PropType<boolean>,
            required: true
        },
        pokemonImage: {
            type: String as PropType<string>,
            required: true,
        },
        pokemonAlt: {
            type: String as PropType<string>,
            required: true
        },
    }
}
</script>
<template>
    <img class="image" v-if="condition" :src="pokemonImage" :alt="pokemonAlt"/>
</template>
<style lang="scss" scoped>
    .image {
        width: 100px;
        height: 100px;
        object-fit: contain;
        border: none;
        filter: drop-shadow(3px 1px 3px rgba(0, 0, 0, 0.5));
        transition: 0.5s;

        &:hover {
            transform: scale(1.5);
        }
    }
</style>
