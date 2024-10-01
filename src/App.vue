<script lang="ts">
import axios from 'axios';
import type { PokemonProps } from './@types/pokemon';
import PokemonCard from './components/PokemonCard/PokemonCard.vue';
import Filtro from './components/Filtro/Filtro.vue';




export default {
  components: {
    PokemonCard,
    Filtro
  },
  data() {
    return {
      pokemons: [] as PokemonProps[],
      pokemonImages: [] as string[],
      limit: 25,
      offset: 0,
      isLoading: false,
      scrollThreshold: 300,
      
    };
  },
  
  methods: {
    async fetchPokemon() {
      if (this.isLoading) return;
      try {
        this.isLoading = true;        
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`);
        //this.pokemons = response.data.results;
        
        const pokemonDataPromises = response.data.results.map((pokemon: PokemonProps) => {
          return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        })
        
        const responseData = await Promise.all(pokemonDataPromises)
        const pokemonData = responseData.map((pokemon) => pokemon.data)

        this.pokemons = [...this.pokemons, ...pokemonData];
        this.offset += this.limit;
        
        //console.log(pokemonData)
      } catch (err) {
        console.log("Erro ao fazer a requisição", err)
        
      } finally {
        this.isLoading = false;
      }
    },
    infinityScroll() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      if (pageHeight - scrollPosition < this.scrollThreshold) {
        this.fetchPokemon();
      }
    },    
  },
  mounted() {
    this.fetchPokemon();
    window.addEventListener('scroll', this.infinityScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.infinityScroll)
  },

};
</script>

<template>
  <header>
    <Filtro/>
  </header>
  <main class="container">
    <section class="pokemonsContainer">      
      <div class="cardContainer" v-for="pokemon in pokemons" :key="pokemon.id">
        <PokemonCard :pokemon="pokemon"/>               
      </div>
    </section>    
  </main>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 200px;

  .pokemonsContainer {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    width: 90%;
    gap: 20px;

    .cardContainer {
      cursor: pointer;
    }
  }
}
</style>