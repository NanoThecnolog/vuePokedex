<script lang="ts">
import type { PropType } from 'vue';
import Image from './Image.vue';
import PokeName from './PokeName.vue';
import PokeID from './PokeID.vue';

export default {
    components: {
        Image,
        PokeID,
        PokeName
    },
    props: {
        evolutions: {
            type: Array as PropType<EvosProps[]>,
            required: true,
        }
    }
}
</script>

<template>
    <h3>Evoluções</h3>
    <div class="evoContainer">                                
        <div class="evo" v-for="evo in evolutions" :key="evo.id">
            <Image :condition="evo.imageMale != null" :pokemonImage="evo.imageMale" :pokemonAlt="evo.name"/>            
            <p>
                <PokeID :id="evo.id"/>
                <PokeName :name="evo.name"/>
            </p>
        </div>              
    </div>
</template>

<style lang="scss" scoped>
    .evoContainer{
        width: 100%;
        height: 100%;
        display: flex;                    
        justify-content: space-evenly;
        align-items: center;                
        background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.05) 45%, transparent 55%);        
        
        .evo{
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            img{
                transition: .4s;
                &:hover{
                    transform: scale(1.3);
                }
            }

            p{
                padding-top: 2rem;

                h1{
                    font-size: 1rem;
                    margin: 0;
                }
            }
        }
    }
</style>