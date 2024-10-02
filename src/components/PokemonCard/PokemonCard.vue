<script lang="ts">
import type { PropType } from 'vue';
import type { PokemonProps } from '@/@types/pokemon';
import PokemonModal from '../modals/PokemonModal/PokemonModal.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';




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
  components: {
    PokemonModal,
      FontAwesomeIcon
    },
    props: {
    pokemon: {
        type: Object as PropType<PokemonProps>,
        required: true
        }
    },
    data() {
        return {
          colors: colors,
          isVisible: false,
          isFavorite: false,
          faStar,
        }
    },
    methods: {
      openModal() {
        this.isVisible = true;
      },
      closeModal() {
        this.isVisible = false;
      },
      addFavorite() {
        const favorites = JSON.parse(localStorage.getItem('pokeFavorites') || '[]');
        const pokemonIndex = favorites.findIndex((fav: PokemonProps) => fav.id === this.pokemon.id);
        if (pokemonIndex === -1) {
          favorites.push({ id: this.pokemon.id, name: this.pokemon.name });          
          localStorage.setItem('pokeFavorites', JSON.stringify(favorites));
          this.isFavorite = true;          
        } else {
          favorites.splice(pokemonIndex, 1);
          localStorage.setItem('pokeFavorites', JSON.stringify(favorites));
          this.isFavorite = false;          
        }
      }
    },
    mounted() {
      const favorites = JSON.parse(localStorage.getItem('pokeFavorites') || '[]');
      const isFav = favorites.some((fav: PokemonProps) => fav.id === this.pokemon.id);
      this.isFavorite = isFav;
      console.log(isFav)
    }
}
</script>
<template>    
    <div class="card" :style="{ backgroundColor: colors[pokemon.types[0].type.name] || 'rgb(255, 146, 146)' }" @click="openModal">
        <div class="imageContainer">
          <img class="image" v-if="pokemon.sprites.other.home.front_default" :src="pokemon.sprites.other.home.front_default" :alt="pokemon.name"/>
        </div>          
        <div class="infoContainer">            
          <h1>{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</h1>
          <p>#{{ pokemon.id.toString().padStart(4, '0') }}</p>
        </div>
        <div class="favoriteContainer" title="Adicionar aos favoritos">
          <button type="button" class="favorite" @click.stop="addFavorite">
            <FontAwesomeIcon :icon="faStar" :style="{ color: isFavorite ? '#ffba08' : '#f8f9fa'}"/>
          </button>
        </div>
    </div>
    <div class="modal">
      <PokemonModal v-if="isVisible" :pokemon="pokemon" @close-modal="closeModal"/>
    </div>
    
</template>
<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    border-radius: 1rem;
    transition: .5s;
    

    &:hover {
        transform: scale(1.1);
    }

    .imageContainer {
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        width: 110px;
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;

        .image {
            width: 100px;
            height: 100px;
            object-fit: contain;
            border: none;
            filter: drop-shadow(3px 1px 3px rgba(0, 0, 0, 0.5));
            transition: 0.5s;

            &:hover {
                transform: scale(1.5);
            }
        }
    }

    .infoContainer {
        text-align: center;
        text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
    }
    .favoriteContainer{      
      width: 100%;
      padding-left: 20px;
      button{
        background-color: transparent;
        border: none;
        cursor: pointer;
        transition: .4s;

        &:hover{
          transform: scale(1.2);
        }

        svg{
          font-size: 1.7rem;
          color: var(--color-white);
        }
      }
    }

}
</style>