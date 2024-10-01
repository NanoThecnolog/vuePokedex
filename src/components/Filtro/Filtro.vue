<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            searchName: '' as string,
            searchId: null as number | null,
            searchType: '' as string,
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
                type: this.searchType
            })
        }
    }
})
</script>
<template>
    <div class="filtroContainer">
        <div>
            <h2>nome</h2>
            <input
                type="text"
                v-model="searchName"
                placeholder="Filter by name"
                @input="applyFilter"
                />
            </div>
        <div>
            <h2>numero</h2>
            <input type="number" v-model="searchId" placeholder="Filter by ID" @input="applyFilter"/>
        </div>
        <div>
            <h2>tipos</h2>            
            <select v-model="searchType" @change="applyFilter">
                <option value="">Todos os Tipos</option>
                <option v-for="type in types" :key="type" :value="type">{{type}}</option>
            </select>
        </div>
    </div>
</template>
<style lang="scss" scoped>

.filtroContainer{
    background-color: red;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100px; 
    gap: 12px;   
}
</style>