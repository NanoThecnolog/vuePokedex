<script lang="ts">
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { PropType } from 'vue';

export default {
    components: {
        FontAwesomeIcon
    },
    props: {
        male: {
            type: Boolean as PropType<boolean>,
            required: true
      }  
    },
    data() {
        return {
            faMars,
            faVenus
        }
    },
}
</script>
<template>
    <div class="gender">
        <font-awesome-icon v-if="male" :icon="faMars" />
        <font-awesome-icon v-if="!male" :icon="faVenus" />
    </div>
</template>
<style lang="scss" scoped>
    .gender{
        position: absolute;
        bottom: 15%;
        left: 10%;
        font-size: 20px;
        background-color: var(--color-white);
        border: 2px solid var(--color-red);
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--color-metalic);
        
    }
</style>