<script lang="ts">
import type { PokemonProps } from '@/@types/pokemon';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            searchName: '' as string,
            searchId: null as number | null,
            searchType1: '' as string,
            searchType2: '' as string,
            types: [
                "Fire",
                "Grass",
                "Electric",
                "Water",
                "Ground",
                "Rock",
                "Fairy",
                "Poison",
                "Bug",
                "Ghost",
                "Dragon",
                "Ice",
                "Dark",
                "Psychic",
                "Flying",
                "Fighting",
                "Steel",
                "Normal",
                
            ] as string[]
        }
    },
    methods: {
        applyFilter() {
            this.$emit('filter', {
                name: this.searchName,
                id: this.searchId,
                type: [this.searchType1, this.searchType2]
            })
        },
        showAllPokemons() {
            this.searchName = '',
            this.searchId = null,
            this.searchType1 = '',
            this.searchType2 = '',
            this.$emit('filter', {
                name: '',
                id: '',
                type: ''
            })
        },
        showFavorites() {
            const favorites = JSON.parse(localStorage.getItem('pokeFavorites') || '[]');
            this.$emit('filter-favorites', {
                favorites: favorites
            })
        }
    }
})
</script>
<template>
    <div class="filtroContainer">
        <div class="filtroNome filter">
            <h2>Nome</h2>
            <input
                type="text"
                v-model="searchName"
                placeholder="Filter by name"
                @input="applyFilter"
                />
            </div>
        <div class="filtroNumero filter">
            <h2>Numero</h2>
            <input type="number" v-model="searchId" placeholder="Filter by ID" @input="applyFilter"/>
        </div>
        <div class="filtroTipo filter">
            <h2>Tipos</h2>
            <div class="types">
                <div>
                <h3>Tipo primário</h3>
                <select v-model="searchType1" @change="applyFilter">
                    <option value="">Todos os Tipos</option>
                    <option v-for="type in types" :key="type" :value="type">{{type}}</option>
                </select>
            </div>
            <div>
                <h3>Tipo secundário</h3>
                <select v-model="searchType2" @change="applyFilter">
                    <option value="">Todos os Tipos</option>
                    <option v-for="type in types" :key="type" :value="type">{{type}}</option>
                </select>
            </div>
        </div>
        </div>
        <div class="buttonContainer">
            <button type="button" @click="showFavorites">
                <h2>Favoritos</h2>
            </button>
            <button type="button" @click="showAllPokemons">
                <h2>Todos os Pokemons</h2>
            </button>
        </div>
    </div>
</template>
<style lang="scss" scoped>

.filtroContainer{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100px; 
    gap: 12px;

    .filtroTipo{
        text-align: center;
    }

    .filter{

        input{
            padding: 10px;
            border-radius: .4rem;

            
            &:focus{
                outline: 3px solid var(--color-red);
            }
        }
        select{
            padding: 10px;
            border-radius: .4rem;
            &:focus{
                outline: 3px solid var(--color-red);
            }
        }
        .types{
            display: flex;
            gap: 10px;
        }
    }
    .buttonContainer{
        display: flex;
        gap: 10px;        
        button{
            background-color: var(--color-red);
            border: none;
            border-radius: .4rem;
            color: var(--color-white);
            padding: 10px;
            width: 150px;
            cursor: pointer;
            transition: .4s;
            &:hover{
                transform: scale(1.05);
            }

        }
    }
}
</style>