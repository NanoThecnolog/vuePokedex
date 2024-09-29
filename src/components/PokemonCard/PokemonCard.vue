<script lang="ts">
import type { PropType } from 'vue';
import './PokemonCard.scss'
import type { PokemonProps } from '@/@types/pokemon';

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
    pokemon: {
        type: Object as PropType<PokemonProps>,
        required: true
        }
    },
    data() {
        return {
            colors: colors,
        }
    },
    mounted() {
        
    }
}
</script>
<template>    
    <div class="card" :style="{ backgroundColor: colors[pokemon.types[0].type.name] || 'rgb(255, 146, 146)' }">
        teste
          <div class="imageContainer">
            <img class="image" v-if="pokemon.sprites.other.dream_world.front_default" :src="pokemon.sprites.other.dream_world.front_default" :alt="pokemon.name"/>
          </div>          
          <div class="infoContainer">            
            <h1>{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</h1>
            <p>#{{ pokemon.id.toString().padStart(4, '0') }}</p>
          </div>
        </div>
</template>