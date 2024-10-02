<script lang="ts">
import type { PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';


export default {
    components: {
        FontAwesomeIcon
    },
    props: {
        ability: {
            type: String as PropType<string>,
            required: true
        },
        abilityHidden: {
            type: String as PropType<string>,
            required: false
        },
        changeToMale: {
            type: Function as PropType<() => void>,
            required: true
        },
        changeToFemale: {
            type: Function as PropType<() => void>,
            required: true
        }
    },
    data() {
        return {
            faMars,
            faVenus
        }
    }
}
</script>
<template>
    <div class="containerAbility">
        <div class="pokemonAbilities">
            <h3>Habilidades</h3>
            <p>{{ ability }}</p>
            <p v-if="abilityHidden">{{ abilityHidden }}</p>
        </div>
        <div class="genderOptions">
            <h3>Gênero</h3>
            <button @click="changeToMale" style="background-color: #a595ff; color: white"><font-awesome-icon :icon="faMars" /></button>
            <button @click="changeToFemale" style="background-color: #ff95d3;"><font-awesome-icon :icon="faVenus" /></button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .containerAbility{
        display: flex;
        width: 100%;
        
            .pokemonAbilities{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                width: 50%;
                padding-top: 5px;
                gap: 12px;

                p{
                    background-color: #b6c9f1;
                    width: 80%;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 2rem;
                }
            }                
            .genderOptions{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                width: 50%;                
                gap: 12px;
                padding-top: 5px;

                button{
                    border: none;
                    border-radius: .4rem;
                    padding: 7px 36px;
                    font-size: 1.5rem;
                    transition: .4s;                    
                    cursor: pointer;

                    &:hover{
                        transform: scale(1.2);
                    }
                }
            }
    }
    
</style>