<script lang="ts">
import type { PropType } from 'vue';

export default {
    props: {
        name: {
            type: String as PropType<string>,
            required: true,
        }
    }
}
</script>
<template>
<h1>{{ name.charAt(0).toUpperCase() + name.slice(1) }}</h1>
</template>
<style lang="scss" scoped>
</style>