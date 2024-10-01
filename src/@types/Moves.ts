export interface MovesFetchProps {
    accuracy: number | null,
    damage_class: {
        name: string,
        url: string
    },
    effect_entries: EffectEntries[],
    id: number,
    name: string,
    power: number | null,
    pp: number,
    priority: number,
    target: {
        name: string,
        url: string
    },
    type: {
        name: string,
        url: string
    }
}

interface EffectEntries {
    effect: string,
    short_effect: string
}