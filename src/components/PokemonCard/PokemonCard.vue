<script lang="ts">
import type { PropType } from 'vue';
import type { PokemonProps } from '@/@types/pokemon';
import PokemonModal from '../modals/PokemonModal/PokemonModal.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Image from '../ui/Image.vue';
import PokeName from '../ui/PokeName.vue';
import PokeID from '../ui/PokeID.vue';
import FavoriteStar from '../ui/FavoriteStar.vue';

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
    FontAwesomeIcon,
    Image,
    PokeName,
    PokeID,
    FavoriteStar
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
    },
    mounted() {
      const favorites = JSON.parse(localStorage.getItem('pokeFavorites') || '[]');
      const isFav = favorites.some((fav: PokemonProps) => fav.id === this.pokemon.id);
      this.isFavorite = isFav;    
    }
}
</script>
<template>
    <div class="card" :style="pokemon.types.length > 1
      ? { backgroundImage: `linear-gradient(45deg, ${colors[pokemon.types[0].type.name]} 40%, ${colors[pokemon.types[1].type.name]} 75%)` }
      : {backgroundColor: colors[pokemon.types[0].type.name] || 'rgba(255,146,146)'}" @click="openModal">
        <div class="imageContainer">
          <Image
          :condition="pokemon.sprites.other.home.front_default != null"
          :pokemonImage="pokemon.sprites.other.home.front_default"
          :pokemonAlt="pokemon.name"
          />
        </div>          
        <div class="infoContainer">
          <PokeName :name="pokemon.name"/>
          <PokeID :id="pokemon.id"/>
        </div>
        <div class="favoriteContainer" title="Adicionar aos favoritos">
          <FavoriteStar
          :isFavorite="isFavorite"
          :pokemonId="pokemon.id"
          :pokemonName="pokemon.name"
          />
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

        
    }

    .infoContainer {
        text-align: center;
        text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
    }
    .favoriteContainer{      
      width: 100%;
      padding-left: 20px;      
    }

}
</style>