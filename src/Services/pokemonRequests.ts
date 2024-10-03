import api from "./apiService";

export const pokemonRequest = {
    async getAllPokemon(limit: number) {
        try {
            const response = await api.get(`/pokemon?limit=${limit}`);
            return response.data.results;
        } catch (err) {
            console.error('Erro ao buscar todos os pokemons', err);
            throw err;
        }
    },
    async getPokemonDetails(pokemonUrl: string) {
        try {
            const response = await api.get(pokemonUrl);
            return response.data;
        } catch (err) {
            console.error('Erro ao buscar detalhes do pokemon', err);
            throw err;
        }
    },
    async getMultiplePokemonDetails(pokemonUrls: string[]) {
        try {
            //console.log(pokemonUrls)
            const promises = pokemonUrls.map(url => api.get(url));
            const responses = await Promise.all(promises);
            return responses.map(res => res.data);
        } catch (err) {
            console.error('Erro ao buscar detalhes dos pokemons', err);
            throw err;
        }
    },
    async getPokemonSpecie(pokemonId: number) {
        try {
            const response = await api.get(`/pokemon-species/${pokemonId}/`)
            return response.data
        } catch (err) {
            console.error('Erro ao buscar a espécie do pokemon', err);
            throw err;
        }
    },
    async getEvolutionChain(url: string) {
        try {
            //console.log(url)
            const response = await api.get(url);
            return response.data;
        } catch (err) {
            console.error('Erro ao buscar a cadeia de evolução', err);
            throw err;
        }
    },
    async getEvoPokemonDetails(names: string[]) {
        try {
            const promises = names.map(name => api.get(`/pokemon/${name}`));
            const responses = await Promise.all(promises);
            return responses.map(res => res.data)
        } catch (err) {
            console.error("Erro ao buscar com os nomes dos pokemons");
            throw err;
        }
    }


}