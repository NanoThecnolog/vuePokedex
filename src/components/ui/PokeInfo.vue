<script lang="ts">
import type { PropType } from 'vue';


    export default {
        props: {
            height: {
                type: Number as PropType<number>,
                required: true
            },
            weight: {
                type: Number as PropType<number>,
                required: true
            }
        }
    }
</script>
<template>
    <div class="moreInfo">
        <p>Altura: {{ height / 10 }}m</p>
        <p>Peso: {{ weight /10 }}kg</p>
    </div>

</template>
<style lang="scss" scoped>
    .moreInfo{
        position: absolute;
        bottom: 0%;
        right: 10%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;    

        p{
            font-weight: 700;
            font-family: var(--font-Roboto);
            font-style: italic;
        }
    }     
</style>