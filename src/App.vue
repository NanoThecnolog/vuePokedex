<script lang="ts">
import axios from 'axios';
import type { PokemonProps } from './@types/pokemon';
import PokemonCard from './components/PokemonCard/PokemonCard.vue';




export default {
  components: {
    PokemonCard
  },
  data() {
    return {
      pokemons: [] as PokemonProps[],
      pokemonImages: [] as string[],
      
    };
  },
  mounted() {
    this.fetchPokemon();
  },
  methods: {
    async fetchPokemon() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200')
        //this.pokemons = response.data.results;
        
        const pokemonDataPromises = response.data.results.map((pokemon: PokemonProps) => {
          return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        })
        
        const responseData = await Promise.all(pokemonDataPromises)
        const pokemonData = responseData.map((pokemon) => {
          return pokemon.data
        })
        this.pokemons = pokemonData
        this.pokemonImages = this.pokemons.map((pokemon) => {
          if (pokemon.sprites.front_default) {
            return pokemon.sprites.front_default
          } else {
            return ""
          }
        })
        //console.log(this.pokemonImages)
        console.log(pokemonData)
        

        
      } catch (err) {
        console.log("Erro ao fazer a requisição", err)
      }
    }
  }

};


</script>

<template>
  <header>  
  </header>

  <main class="container">
    <section class="pokemonsContainer">      
      <div class="cardContainer" v-for="pokemon in pokemons" :key="pokemon.id">
        <PokemonCard :pokemon="pokemon"/>               
      </div>

    </section>
    
  </main>
</template>