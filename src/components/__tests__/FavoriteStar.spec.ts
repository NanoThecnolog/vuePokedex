import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils';
import FavoriteStar from '../ui/FavoriteStar.vue';
describe('FavoriteStar', () => {
    it('should render the favorite star with correct color when pokemon is favorited', async () => {
        const wrapper = shallowMount(FavoriteStar, {
            propsData: {
                isFavorite: true,
                pokemonId: 25,
                pokemonName: 'Pikachu'
            }
        });
        const favoriteStar = wrapper.find('.icon');
        expect(favoriteStar.exists()).toBe(true);
        await wrapper.vm.$nextTick();

        if (!favoriteStar.exists()) {
            console.error(wrapper.html());
        }
        expect(favoriteStar.exists()).toBe(true);
        const computedStyle = window.getComputedStyle(favoriteStar.element);
        expect(computedStyle.color).toBe('rgb(255, 186, 8)');
    });

    it('should render the favorite star with default color when pokemon is not favorited', async () => {
        const wrapper = shallowMount(FavoriteStar, {
            propsData: {
                isFavorite: false,
                pokemonId: 25,
                pokemonName: 'Pikachu'
            }
        });

        const favoriteStar = wrapper.find('.icon');
        expect(favoriteStar.exists()).toBe(true);
        if (!favoriteStar.exists()) {
            console.error(wrapper.html());
        }
        await wrapper.vm.$nextTick();
        expect(favoriteStar.exists()).toBe(true);
        const computedStyle = window.getComputedStyle(favoriteStar.element);
        expect(computedStyle.color).toBe('rgb(248, 249, 250)');
    });
});
