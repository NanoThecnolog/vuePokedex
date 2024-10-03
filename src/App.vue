<script lang="ts">
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
      limit: 25,//determina a quantidade de Pokemon a ser carregada a cada carregamento do infinityScroll
      offset: 0,//contador para controle
      isLoading: false,//controle para a função de busca ser chamada corretamente, se acumular requisições
      scrollHeight: 300,//altura limite da barra de rolagem para chamar a função infinityScroll
      filters: {
        name: '',
        id: null as number | null,
        type: [] as string[]
      }
      
    };
  },
  
  methods: {
    //Busca inicial do nome e da url de cada pokemon
    async fetchAllPokemon() {
      try {
        //Aqui utilizo o serviço que criei para buscar nome e url de Pokemon, aceitando um número como a quantidade a ser buscada
        const response = await pokemonRequest.getAllPokemon(1500)
        this.allPokemons = response;
      } catch (err) {
        console.log("Erro ao buscar todos os pokemons", err)
      }
    },
    //Busca dos detalhes dos Pokemon
    async fetchPokemon() {
      if (this.isLoading) return;
      try {
        this.isLoading = true;
        //Aqui estou cortando a lista com os nomes e urls dos Pokemon. offset e limit determinam onde será cortado
        const pokemonSlicer = this.allPokemons.slice(this.offset, this.offset + this.limit)
        //Com uma nova lista resultante do corte que fiz, separo nome da url do Pokemon numa nova lista a ser passada a função de request
        const pokemonUrls = pokemonSlicer.map(pokemon => pokemon.url)
        //Aqui utilizo o serviço que criei para buscar detalhes de multiplos Pokemon, aceitando uma lista com as urls dos Pokemon
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
    //Função do scroll infinito
    infinityScroll() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      if (pageHeight - scrollPosition < this.scrollHeight) {
        this.fetchPokemon();
      };
    },
    //Função que aplica os filtros
    applyFilters() {
      const { name, id, type } = this.filters;      
      this.filteredPokemons = this.pokemons.filter((pokemon: PokemonProps) => {
        const matchesName = name ? pokemon.name.toLowerCase().includes(name.toLowerCase()) : true;
        const matchesId = id ? pokemon.id === id : true;

        let matchesType = true;
        //Aqui verifico a quantidade de tipos a serem filtrados
        if (type.length > 0 && (type[0] || type[1])) {
          const noEmptyTypes = type.filter(tp => tp);
          matchesType = noEmptyTypes.every(tp =>
            pokemon.types.some(t => t.type.name.toLowerCase() === tp.toLowerCase())
          )
        }
        
        return matchesName && matchesId && matchesType;
      });
    },
    //Função de apresentação dos Pokemon favoritos
    handleFavoritesFilter(event: { favorites: PokemonProps[], isLoading: boolean }) {
      this.isLoading = event.isLoading
      const favoritesIds = event.favorites.map(fav => fav.id)
      this.filteredPokemons = this.pokemons.filter(pokemon => favoritesIds.includes(pokemon.id))  
    },
    //Função chamada ao disparar evento filter no componente Filtro
    onFilterChange(filterData: {
      name: string,
      id: number | null,
      type: string[]
    }, isLoading: boolean) {
      this.filters = filterData;
      this.isLoading = isLoading;      
      this.applyFilters();
    }
  },
  async mounted() {
    
    await this.fetchAllPokemon();
    this.fetchPokemon();
    //eventListener do scroll para a função infinityScroll
    window.addEventListener('scroll', this.infinityScroll)
  },
  beforeUnmount() {
    //Retirando eventListener do scroll para a função infinityScroll ao desmontar componente 
    window.removeEventListener('scroll', this.infinityScroll)
  },

};
</script>

<template>
  <header>
    
  </header>
  <main class="container">
    <h1 class="pokedex">PoKeDeX</h1>
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

  .pokedex{
    font-family: var(--font-Press-Start);
    font-weight: 600;
    font-size: 5rem;
    color: var(--color-yellow);
    -webkit-text-stroke: 5px var(--color-celesticBlue)
  }

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
@media (max-width: 768px){
  .container{
    .pokedex{
      font-size: 4rem;
    }
  }
}
@media(max-width: 480px){
  .container{
    .pokedex{
      font-size: 3rem;
      -webkit-text-stroke: 4px var(--color-celesticBlue)
    }
  }
}
@media(max-width: 375px){
  .container{
    .pokedex{
      font-size: 2rem;
      -webkit-text-stroke: 3px var(--color-celesticBlue)
    }
  }
}

</style>