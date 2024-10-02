<script lang="ts">
import type { MovesProps } from '@/@types/pokemon';
import type { MovesFetchProps } from '@/@types/Moves';
import axios from 'axios';
import type { PropType } from 'vue';

export default {
    props: {
        moves: {
            type: Object as PropType<MovesProps>,
            required: true
        }
    },
    data() {
        return {
            moveInfo: {} as MovesFetchProps,
            
        }
    },
    mounted() {
        this.fetchMoves();
    },
    methods: {
        async fetchMoves() {
            try {
                const response = await axios.get(`${this.moves.move.url}`)
                const data = response.data
                this.moveInfo = data                           

            } catch (err) {
                console.log("Erro ao buscar dados do movimento.")                
            }
        }
    }
}
</script>

<template>    
    <div class="moveContainer" :title="moveInfo?.effect_entries?.[0]?.effect">        
        <div class="title container">
            {{ moveInfo.name }}    
        </div>
        <div class="pp container">
            <p>PP</p>
            <p>{{ moveInfo.pp ? moveInfo.pp : "-"}}</p>
        </div>
        <div class="power container">
            <p>POWER</p>
            <p>{{ moveInfo.power ? moveInfo.power : "-"}}</p>
        </div>
        <div class="accuracy container">
            <p>ACCURACY</p>
            <p>{{ moveInfo.accuracy ? moveInfo.accuracy : "-"}}</p>
        </div>
        <div class="priority container">
            <p>PRIORITY</p>
            <p>{{ moveInfo.priority}}</p>
        </div>
        
        
    </div>
</template>
<style lang="scss" scoped>
.moveContainer{
    background-color: var(--color-gray);
    width: 100%;
    height: 100px;
    display: flex;    
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    border-radius: 1rem;    
    padding: 10px;
    color: var(--color-black);

    .container{
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    .title {
        align-items: flex-start;
    }
    
}
</style>