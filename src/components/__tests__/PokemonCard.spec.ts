import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import PokemonModal from '../modals/PokemonModal/PokemonModal.vue';
import PokemonCard from '../PokemonCard/PokemonCard.vue';
//import type { PokemonProps } from '@/@types/pokemon';

beforeEach(() => {
    localStorage.clear()
});

describe('PokemonCard', () => {
    const pokemonMock = {
        id: 1,
        name: 'bulbasaur',
        sprites: {
            other: {
                home: {
                    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
                }
            }
        },
        types: [
            { type: { name: 'grass' } },
            { type: { name: 'poison' } }
        ],
        cries: { latest: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg' }
    }
    it('renders the pokemon card with name, image and id', () => {
        const wrapper = mount(PokemonCard, {
            props: { pokemon: pokemonMock }
        });

        expect(wrapper.find('img').attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png');
        expect(wrapper.find('img').attributes('alt')).toBe('bulbasaur');
        expect(wrapper.findComponent({ name: 'PokeName' }).text()).toBe('Bulbasaur');
        expect(wrapper.findComponent({ name: 'PokeID' }).text()).toContain('1');

    });
    it('opens the modal when the card is clicked', async () => {
        const wrapper = mount(PokemonCard, {
            props: { pokemon: pokemonMock }
        })
        expect(wrapper.findComponent(PokemonModal).exists()).toBe(false);

        await wrapper.find('.card').trigger('click');
        expect(wrapper.findComponent(PokemonModal).exists()).toBe(true);
    });
    it('closes the modal when the close event is emitted', async () => {
        const wrapper = mount(PokemonCard, {
            props: { pokemon: pokemonMock }
        });
        await wrapper.find('.card').trigger('click');
        const modal = wrapper.findComponent(PokemonModal);

        await modal.vm.$emit('close-modal');
        expect(wrapper.findComponent(PokemonModal).exists()).toBe(false);
    });
})