export interface PokemonProps {
    abilities: AbilitiesProps[],
    base_experience: number,
    cries: CriesProps,
    forms: FormsProps[],
    height: number,
    held_items: HeldItemsProps[],
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: MovesProps[],
    name: string,
    order: number,
    past_abilities: AbilitiesProps[],
    past_types: TypesProps[],
    species: SpeciesProps,
    sprites: SpritesProps,
    stats: StatsProps[],
    types: TypesProps[],
    weight: number
}

interface AbilitiesProps {
    ability: {
        name: string,
        url: string
    },
    is_hidden: boolean,
    slot: number
}
interface CriesProps {
    latest: string,
    legacy: string,
}
interface FormsProps {
    name: string,
    url: string,
}

interface HeldItemsProps {
    item: {
        name: string,
        url: string
    },
    version_details: [
        {
            rarity: number,
            version: {
                name: string,
                url: string
            }
        }
    ]
}
export interface MovesProps {
    move: {
        name: string,
        url: string,
    },
    version_group_details: {
        level_learned_at: number,
        move_learn_method: {
            name: string,
            url: string
        },
        version_group: {
            name: string,
            url: string
        }
    }[];

}
interface SpeciesProps {
    name: string,
    url: string,
}
interface SpritesProps {
    back_default: string | null,
    back_female: string | null,
    back_shiny: string | null,
    back_shiny_female: string | null,
    front_default: string | null,
    front_female: string | null,
    front_shiny: string | null,
    front_shiny_female: string | null,
    other: {
        dream_world: {
            front_default: string,
            front_female: string | null
        },
        home: {
            front_default: string,
            front_female: string | null,
            front_shiny: string | null,
            front_shiny_female: string | null,
        }
    }
}
export interface StatsProps {
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
}
interface TypesProps {
    slot: number,
    type: {
        name: string,
        url: string
    }

}
