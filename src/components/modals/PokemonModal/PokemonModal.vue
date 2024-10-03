<script lang="ts">
import type { PropType } from 'vue';
import type { PokemonProps } from '@/@types/pokemon';
import Moves from '@/components/ui/Moves.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faVenus } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faMars } from '@fortawesome/free-solid-svg-icons';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import Image from '@/components/ui/Image.vue';
import PokeName from '@/components/ui/PokeName.vue';
import PokeID from '@/components/ui/PokeID.vue';
import PokeCrie from '@/components/ui/PokeCrie.vue';
import PokeGender from '@/components/ui/PokeGender.vue';
import PokeInfo from '@/components/ui/PokeInfo.vue';
import PokeTypes from '@/components/ui/PokeTypes.vue';
import PokeAbilities from '@/components/ui/PokeAbilities.vue';
import PokeEvo from '@/components/ui/PokeEvo.vue';
import PokeStatus from '@/components/ui/PokeStatus.vue';
import { pokemonRequest } from '@/Services/pokemonRequests';



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
        FontAwesomeIcon,
        Moves,
        Image,
        PokeID,
        PokeCrie,
        PokeGender,
        PokeInfo,
        PokeName,
        PokeTypes,
        PokeAbilities,
        PokeEvo,
        PokeStatus,
        
    },
    props: {
        pokemon: {
            type: Object as PropType<PokemonProps>,
            required: true
        },        
    },
    data() {
        return {
            faVenus,
            faMars,
            faXmark,
            faVolumeHigh,
            colors,
            pokeImage: "",
            male: true,
            evolutions: [] as EvosProps[],
        }
    },
    mounted() {
        this.pokeImage = this.pokemon.sprites.other.home.front_default;
        this.fetchEvos();            
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
        },
        async fetchEvos() {
            try {
                const specie = await pokemonRequest.getPokemonSpecie(this.pokemon.id);                
                const evoChain = await pokemonRequest.getEvolutionChain(specie.evolution_chain.url);
                
                const chain = evoChain.chain;
                const evolutions: string[] = [
                    chain.species.name,
                    chain.evolves_to?.[0]?.species.name || null,
                    chain.evolves_to?.[0]?.evolves_to?.[0]?.species.name || null,
                ].filter(Boolean)//Aqui removo valores nulos ou indefinidos
                
                const evoData = await pokemonRequest.getEvoPokemonDetails(evolutions)
                const evos: EvosProps[] = evoData.map((chain) => {
                    return {
                        id: chain.id,
                        name: chain.name,
                        imageMale: chain.sprites.other.home?.front_default || "",
                        imageFemale: chain.sprites.other.home?.front_female || ""
                    }
                });
                this.evolutions = evos;             

            } catch (err) {
                console.log("Erro ao buscar evoluções", err)
            }
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
                    <div class="pokemonId">
                        <PokeID :id="pokemon.id"/>
                    </div>                    
                    <div class="backImage">
                        <PokeCrie :crie="pokemon.cries.latest"/>
                        <div class="imageContainer" :style="{backgroundColor: colors[pokemon.types[0].type.name]}">
                            <Image
                                :condition="pokeImage != ''"
                                :pokemonImage="pokeImage"
                                :pokemonAlt="pokemon.name"
                                class="pokemonImage"
                            />
                            <PokeGender :male="male" />                            
                            <PokeInfo :height="pokemon.height" :weight="pokemon.weight"/>                            
                        </div>                       
                    </div>
                    <div class="pokemonName">
                        <PokeName :name="pokemon.name"/>                        
                        <h4>Exp. base: {{ pokemon.base_experience }}</h4>
                    </div>
                    <PokeTypes :typePrimary="pokemon.types[0].type.name" :typeSecondary="pokemon.types?.[1]?.type.name"/> 
                    <PokeAbilities
                        :changeToMale="changeToMale"
                        :changeToFemale="changeToFemale"
                        :ability="pokemon.abilities?.[0]?.ability?.name"
                        :abilityHidden="pokemon.abilities?.[1]?.ability?.name"
                        />                 
                </div>
                <div class="infoContainer">
                    <PokeEvo :evolutions="evolutions"/> 
                    <PokeStatus :status="pokemon.stats"/>                  
                </div>
                <div class="infoContainer">
                    <div class="moves">
                        <h3>Movimentos:</h3>
                        <Moves v-for="(move, index) in pokemon.moves" :key="index" :moves="move"/>
                    </div>                    
                </div>
            </div>
        </div>
    </div>

</template>
<style lang="scss" scoped>
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


    .modalContainer{
        background-color: #2B2D42;        
        width: 80%;
        height: 70vh;
        border: 5px double var(--color-red);
        border-radius: 2rem;
        padding: 50px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor:auto;

        .closeButton{
            border: none;
            background-color: var(--color-red);
            border-radius: 2rem;
            width: 40px;
            height: 40px;
            position: absolute;
            top: 2%;
            left: 1%;
            cursor: pointer;
            transition: .4s;
            //z-index: 99;

            &:hover {
                transform: scale(1.2);
            }

            svg{
                    font-size: 30px;
                }
        }
        .pokemonInfo{
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            gap: 20px;            
            width: 100%;
            height: 100%;
            //flex-wrap: wrap;

            .infoContainer{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 100%;
                position: relative;
                gap: 10px;

                .pokemonId{
                    display: flex;
                    justify-content: center;                    
                    background-color: var(--color-black);
                    width: 100px;
                    border: 2px solid var(--color-red);
                    border-radius: 2rem;
                }
                
                .backImage{
                    
                    width: 100%;
                    height: 400px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;

                    .imageContainer{                    
                    border-radius: 50%;
                    width: 230px;
                    height: 230px;

                        .pokemonImage{
                            width: 200px;
                            height: 200px;
                            object-fit: contain;
                            filter: drop-shadow(3px 1px 3px rgba(0, 0, 0, 0.5));
                            transition: .4s;

                            &:hover{
                                transform: scale(1.2);
                            }
                        }
                    }                    
                }
                
                .pokemonName{
                    width: 100%;
                    height: 60px;
                    border-radius: 2rem;
                    background-color: var(--color-celesticBlue);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;                    

                    h1{
                        font-weight: 700;
                        font-family: sans-serif;
                        font-size: 1.5rem;
                        margin: 0;
                    }
                    h4{
                        font-weight: 700;
                    }
                }
                
                
                
                
                .moves{
                    width: 100%;
                    height: 100%;                    
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    padding: 10px;
                    scrollbar-width: thin;
                }
            }
        }
    }
}
/* Responsividade */
@media(max-width: 1580px){
    .container{
        .modalContainer{
            width: 95%;
            .pokemonInfo{
                .infoContainer{
                    .moves{
                        width: 90%;
                    }
                }
            }
        }
    }
}
@media(max-width: 1325px){
    .container{
        .modalContainer{
            width: 80%;
            
            .pokemonInfo{
                .infoContainer{
                    .moves{
                        display: none;
                    }
                }
            }
        }
    }
}
@media (max-width: 1024px){
    .container{
        .modalContainer {
        width: 90%;
        height: 95vh;
        padding: 20px;
            .pokemonInfo {
                flex-direction: column;
                gap: 10px;

                .infoContainer {
                    .backImage {
                        height: 300px;

                        .imageContainer {
                            width: 180px;
                            height: 180px;

                            .pokemonImage {
                                width: 160px;
                                height: 160px;
                            }
                        }
                    }
                    .moves{
                        display: none;
                    }                    
                }
            }
        }
    }
}
@media (max-width: 768px) {
    .container{
        .modalContainer {
        width: 90%;
        height: 95vh;
        padding: 20px;
            .pokemonInfo {
                flex-direction: column;
                gap: 10px;

                .infoContainer {
                    .backImage {
                        height: 300px;

                        .imageContainer {
                            width: 180px;
                            height: 180px;

                            .pokemonImage {
                                width: 160px;
                                height: 160px;
                            }
                        }
                    }
                    .moves{
                        display: none;
                    }
                }
            }
        }
    }
    
}

@media (max-width: 480px) {
    .container{
        .modalContainer {
        width: 95%;
        height: 90vh;
        padding: 10px;

        .pokemonInfo {
            flex-direction: column;
            gap: 10px;

            .infoContainer {
                .backImage {
                    height: 250px;

                    .imageContainer {
                        width: 150px;
                        height: 150px;

                        .pokemonImage {
                            width: 130px;
                            height: 130px;
                        }
                    }
                }
                
            }
        }
    }
    }
}
</style>