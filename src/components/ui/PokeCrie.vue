<script lang="ts">
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { PropType } from 'vue';


export default {
    components: {
        FontAwesomeIcon,
        
    },
    props: {
        crie: {
            type: String as PropType<string>,
            required: true,
        }
    },
    data() {
        return {
            faVolumeHigh
        }
    },
    methods: {
        playCrie() {
            const audio = this.$refs.audioCrie as HTMLAudioElement;
            if (audio) {
                audio.play();
            }
        },
    }
}

</script>
<template>
    <div class="crie" @click="playCrie">
        <audio ref="audioCrie" v-if="crie" :src="crie"></audio>
        <font-awesome-icon :icon="faVolumeHigh" />
    </div>
</template>
<style lang="scss" scoped>
    .crie{
        position: absolute;
        top: 15%;
        left: 10%;
        cursor: pointer;
        background-color: white;                    
        color: var(--color-metalic);
        border: 2px solid var(--color-red);
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .4s;

        &:hover{
            transform: scale(1.2)
        }                    
    }
</style>