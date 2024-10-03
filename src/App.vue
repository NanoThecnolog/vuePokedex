<script lang="ts">
import axios from 'axios';
import type { PokemonProps } from './@types/pokemon';
import PokemonCard from './components/PokemonCard/PokemonCard.vue';
import Filtro from './components/Filtro/Filtro.vue';
import { pokemonRequest } from './Services/pokemonRequests';




export default {
  components: {
    PokemonCard,
    Filtro
  },
  data() {
    return {
      allPokemons: [] as {name: string, url: string}[],
      pokemons: [] as PokemonProps[],
      filteredPokemons: [] as PokemonProps[],
      pokemonImages: [] as string[],
      limit: 25,
      offset: 0,
      isLoading: false,
      scrollHeight: 300,
      filters: {
        name: '',
        id: null as number | null,
        type: [] as string[]
      }
      
    };
  },
  
  methods: {
    async fetchAllPokemon() {
      try {
        const response = await pokemonRequest.getAllPokemon(1500)
        this.allPokemons = response;
      } catch (err) {
        console.log("Erro ao buscar todos os pokemons", err)
      }
    },
    async fetchPokemon() {
      if (this.isLoading) return;
      try {
        this.isLoading = true;
        const pokemonSlicer = this.allPokemons.slice(this.offset, this.offset + this.limit)
        const pokemonUrls = pokemonSlicer.map(pokemon => pokemon.url)
        const pokemonData = await pokemonRequest.getMultiplePokemonDetails(pokemonUrls)       

        this.pokemons = [...this.pokemons, ...pokemonData];
        this.applyFilters();
        this.offset += this.limit;
      } catch (err) {
        console.log("Erro ao fazer a requisição", err)
        
      } finally {
        this.isLoading = false;
      };
    },
    infinityScroll() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      if (pageHeight - scrollPosition < this.scrollHeight) {
        this.fetchPokemon();
      };
    },
    applyFilters() {
      const { name, id, type } = this.filters;      
      this.filteredPokemons = this.pokemons.filter((pokemon: PokemonProps) => {
        const matchesName = name ? pokemon.name.toLowerCase().includes(name.toLowerCase()) : true;
        const matchesId = id ? pokemon.id === id : true;

        let matchesType = true;

        if (type.length > 0 && (type[0] || type[1])) {
          const noEmptyTypes = type.filter(tp => tp);
          matchesType = noEmptyTypes.every(tp =>
            pokemon.types.some(t => t.type.name.toLowerCase() === tp.toLowerCase())
          )
        }
        
        return matchesName && matchesId && matchesType;
      });
    },
    handleFavoritesFilter(event: {favorites: PokemonProps[]}) {
      const favoritesIds = event.favorites.map(fav => fav.id)
      this.filteredPokemons = this.pokemons.filter(pokemon => favoritesIds.includes(pokemon.id))  
    },
    onFilterChange(filterData: {
      name: string,
      id: number | null,
      type: string[]
    }) {
      this.filters = filterData;
      this.applyFilters();
    }
  },
  async mounted() {
    await this.fetchAllPokemon();
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
    
  </header>
  <main class="container">
    <h1>Pokedex</h1>
    <section class="pokemonFilter">
      <Filtro @filter="onFilterChange" @filter-favorites="handleFavoritesFilter"/>
    </section>
    <section class="pokemonsContainer">
      <div class="cardContainer" v-for="pokemon in filteredPokemons" :key="pokemon.id">
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

  .pokemonFilter{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
  }

  .pokemonsContainer {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    width: 90%;
    gap: 20px;

    .cardContainer {
      cursor: pointer;
      transition: .4s;
    }
  }
}
</style>