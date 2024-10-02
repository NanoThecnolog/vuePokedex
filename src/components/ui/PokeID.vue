<script lang="ts">
import type { PropType } from 'vue';

export default {
    props: {
        id: {
            type: Number as PropType<number>,
            required: true
        }
    }
}
</script>
<template>
    <p>#{{ id.toString().padStart(4, '0') }}</p>
</template>
<style lang="scss" scoped>
</style>