<script lang="ts">
import type { PokemonProps } from '@/@types/pokemon';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { PropType } from 'vue';

export default {
    props: {
        isFavorite: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
        pokemonId: {
            type: Number as PropType<number>,
            required: true
        },
        pokemonName: {
            type: String as PropType<string>,
            required: true
        }
    },
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            faStar,
            favorited: this.isFavorite
        }
    },    
    methods: {
        addFavorite() {
            try {
                const favorites = JSON.parse(localStorage.getItem('pokeFavorites') || '[]');
                const pokemonIndex = favorites.findIndex((fav: PokemonProps) => fav.id === this.pokemonId);
                if (pokemonIndex === -1) {
                    favorites.push({ id: this.pokemonId, name: this.pokemonName });                              
                    this.favorited = true;
                } else {
                    favorites.splice(pokemonIndex, 1);                    
                    this.favorited = false;          
                }
                localStorage.setItem('pokeFavorites', JSON.stringify(favorites));
            } catch (err) {
                console.log("Erro ao acessar LocalStorage: ", err)
            }
            
        }
    },
    watch: {
        isFavorite(newVal: boolean) {
            this.favorited = newVal;
        }
    }
}
</script>
<template>
    <button type="button" class="favorite" @click.stop="addFavorite">
            <FontAwesomeIcon class="icon" :icon="faStar" :style="{ color: favorited ? '#ffba08' : '#f8f9fa'}"/>
    </button>

</template>
<style lang="scss" scoped>
    .favorite{        
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
</style>