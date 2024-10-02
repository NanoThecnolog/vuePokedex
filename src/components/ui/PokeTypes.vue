<script lang="ts">
import type { PropType } from 'vue';


const colors: Record<string,string> = {
            fire: '#EC8484',
            grass: '#8CC66D',
            electric: '#e5e549',
            water: '#6699FF',
            ground: '#e0c068',
            rock: '#b8a038',
            fairy: '#F6C8D6',
            poison: '#C596BD',
            bug: '#a8b820',
            ghost: '#705898',
            dragon: '#7038f8',
            ice: '#98d8d8',
            dark: '#5b5b5b',
            psychic: '#f85888',
            flying: '#a890f0',
            fighting: '#903028',
            steel: '#b8b8d0',
            normal: '#a8a878'
}

export default {
    props: {
        typePrimary: {
            type: String as PropType<string>,
            required: true
        },
        typeSecondary: {
            type: String as PropType<string>,
            required: false
        }
    },
    data() {
        return {
            colors,
        }
    }
}

</script>
<template>
    <div class="pokemonTypes">
        <p :style="{ backgroundColor: colors[typePrimary] || '' }">{{ typePrimary }}</p>
        <p :style="{ backgroundColor: colors[typeSecondary] || '' }" v-if="typeSecondary">{{ typeSecondary }}</p>
    </div>
</template>
<style lang="scss" scoped>
    .pokemonTypes{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-around;    
        align-items: center;
        
        p{
            width: 200px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 2rem;
            font-size: 1.2rem;    
        }
    }
</style>