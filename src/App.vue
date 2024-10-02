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
      allPokemons: [] as {name: string, url: string}[],
      pokemons: [] as PokemonProps[],
      filteredPokemons: [] as PokemonProps[],
      pokemonImages: [] as string[],
      limit: 25,
      offset: 0,
      isLoading: false,
      scrollThreshold: 300,
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
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1500`);
        this.allPokemons = response.data.results;
        
      } catch (err) {
        console.log("Erro ao buscar todos os pokemons", err)
      }      
    },
    async fetchPokemon() {
      if (this.isLoading) return;
      try {
        this.isLoading = true;
        const pokemonSlice = this.allPokemons.slice(this.offset, this.offset + this.limit)
        const pokemonDataPromises = pokemonSlice.map((pokemon) => {
          return axios.get(pokemon.url)
        })
        const responseData = await Promise.all(pokemonDataPromises);
        const pokemonData = responseData.map((pokemon)=> pokemon.data)

        this.pokemons = [...this.pokemons, ...pokemonData];
        this.applyFilters();
        this.offset += this.limit;
        
        //console.log(pokemonData)
      } catch (err) {
        console.log("Erro ao fazer a requisição", err)
        
      } finally {
        this.isLoading = false;
      };
    },
    infinityScroll() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      if (pageHeight - scrollPosition < this.scrollThreshold) {
        this.fetchPokemon();
      };
    },//aqui eu tenho que dar um jeito de buscar todos os pokemons e salvar num array de objetos pra aplicar o filtro nele
    applyFilters() {
      const { name, id, type } = this.filters;
      console.log(type);
      this.filteredPokemons = this.pokemons.filter((pokemon: PokemonProps) => {
        const matchesName = name ? pokemon.name.toLowerCase().includes(name.toLowerCase()) : true;
        const matchesId = id ? pokemon.id === id : true;

        let matchesType = false;
        if (type && type.length > 0) {
          if (type.length === 1 || type[1] === '') {
            matchesType = pokemon.types.some(t => t.type.name.toLowerCase() === type[0].toLowerCase())
          } else if (type.length === 2) {
            matchesType = type.every(tp => pokemon.types.some(t => t.type.name.toLowerCase() === tp.toLowerCase()))
          }
        } else {
          matchesType = true;
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