<script lang="ts">
import type { PropType } from 'vue';
import type { PokemonProps } from '@/@types/pokemon';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faVenus } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faMars } from '@fortawesome/free-solid-svg-icons';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

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
            faVenus,
            faMars,
            faXmark,
            faVolumeHigh,
            colors,
            pokeImage: "",
            male: true
        }
    },
    mounted() {
        this.pokeImage = this.pokemon.sprites.other.home.front_default;
    },
    methods:{
        closeModal(){
            this.$emit('closeModal');
        },
        playCrie() {
            const audio = this.$refs.audioCrie as HTMLAudioElement;
            if (audio) {
                audio.play();
            }
        },
        changeToFemale() {
            this.male = false
            if (this.pokemon.sprites.other.home.front_female)
                this.pokeImage = this.pokemon.sprites.other.home.front_female;
        },
        changeToMale() {  
            this.male = true
            if (this.pokemon.sprites.other.home.front_default)
            this.pokeImage = this.pokemon.sprites.other.home.front_default;
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="modalContainer">
            <button class="closeButton" @click='closeModal' type="button">
                <font-awesome-icon :icon="faXmark" />
            </button>
            
            <div class="pokemonInfo">
                <div class="infoContainer">
                    <div>
                        <h3>#{{ pokemon.id.toString().padStart(4, '0') }}</h3>
                    </div>
                    <div class="crie" @click="playCrie" v-if="pokemon.cries.latest">
                        <audio ref="audioCrie" v-if="pokemon.cries.latest" :src="pokemon.cries.latest"></audio>
                        <font-awesome-icon :icon="faVolumeHigh" />
                    </div>
                    <div class="imageContainer" :style="{backgroundColor: colors[pokemon.types[0].type.name]}">
                        <img class="pokemonImage" v-if="pokeImage != ''" :src="pokeImage" :alt="pokemon.name">
                        <div class="gender">
                            <font-awesome-icon v-if="male" :icon="faMars" />
                            <font-awesome-icon v-if="!male" :icon="faVenus" />
                        </div>
                    </div>
                    <div class="pokemonName">
                        <h2>{{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}}</h2>
                        <h4>Exp. base: {{ pokemon.base_experience }}</h4>
                    </div>
                    <div class="pokemonTypes">
                        <p :style="{ backgroundColor: colors[pokemon.types[0].type.name] || '' }">{{ pokemon.types[0].type.name }}</p>
                        <p :style="{ backgroundColor: colors[pokemon.types[1].type.name] || '' }" v-if="pokemon.types.length > 1">{{ pokemon.types[1].type.name }}</p>
                    </div>
                    <div style="display: flex;width: 100%;">
                        <div class="pokemonAbilities">
                            <h3>Habilidades</h3>
                            <p>{{ pokemon.abilities[0].ability.name }}</p>
                            <p v-if="pokemon.abilities.length > 1">{{ pokemon.abilities[1].ability.name }}</p>
                        </div>
                        <div class="genderOptions">
                            <h3>Gênero</h3>
                            <button @click="changeToMale" style="background-color: #a595ff; color: white"><font-awesome-icon :icon="faMars" /></button>
                            <button @click="changeToFemale" style="background-color: #ff95d3;"><font-awesome-icon :icon="faVenus" /></button>
                        </div>

                    </div>
                    
                </div>
                <div class="infoContainer">peso, altura colocar perto da imagem do pokemon?</div>
                <div class="infoContainer">status, evoluções, moves, versões do jogo que aparece e os Ids de cada versão</div>
            </div>
            
        </div>
    </div>

</template>
<style scoped>
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top:0;
    left: 0;
    z-index: 99;
    cursor:auto;

}
.modalContainer{
    background-color: #f8f8f8;
    width: 80%;
    height: 80%;
    border-radius: 2rem;
    padding: 12px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor:auto;
}
.closeButton{
    border: none;
    background-color: gray;
    border-radius: 2rem;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 2%;
    right: 1%;
    cursor: pointer;
}
.closeButton svg{
    font-size: 30px;
}
.pokemonInfo{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    
    width: 100%;
}
.infoContainer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    gap: 10px;
}
.crie{
    position: absolute;
    top: 10%;
    left: 20%;
    cursor: pointer;
    background-color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .4s;
}
.crie:hover{
    transform: scale(1.2);
}
.imageContainer{
    position: relative;
    border-radius: 50%;
}
.pokemonImage{
    width: 200px;
    height: 200px;
    object-fit: contain;
    filter: drop-shadow(3px 1px 3px rgba(0, 0, 0, 0.5));
    transition: .4s;
}
.gender{
    position: absolute;
    bottom: 0%;
    left: -20%;
    font-size: 20px;
}
.pokemonImage:hover{
    transform: scale(1.2);
}
.pokemonName{
    
    width: 90%;
    height: 50px;    
    border-radius: .4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
}
.pokemonName h2{
    font-weight: 700;
    font-family: sans-serif;
}
.pokemonTypes{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;    
    align-items: center;    
}
.pokemonTypes p{
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    font-size: 1.2rem;    
}
.pokemonAbilities{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    padding-top: 20px;
}
.pokemonAbilities p{
    background-color: #b6c9f1;
    width: 80%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;

}
.genderOptions{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    gap: 12px;
    padding-top: 20px;
}

.genderOptions button{
    border: none;
    border-radius: .4rem;
    padding: 7px 36px;
    font-size: 1.5rem;
    transition: .4s;
    cursor: pointer;
}
.genderOptions button:hover{
    transform: scale(1.2);
}
</style>