<script lang="ts">
import type { StatsProps } from '@/@types/pokemon';
import type { PropType } from 'vue';


export default {
    props: {
        status: {
            type: Array as PropType<StatsProps[]>,
            required: true
        }
    }
}
</script>
<template>
    <div class="statusContainer">                        
                        <div class="stats" v-for="stat in status" :key="stat.stat.name">
                            <div class="statusTitle">
                                <p>
                                    {{ stat.stat.name === 'special-attack' ? 'SPA' :
                                            stat.stat.name === 'special-defense' ? 'SPD' :
                                                stat.stat.name === 'attack' ? 'ATK' :
                                                    stat.stat.name === 'defense' ? 'DEF' :
                                                        stat.stat.name === 'speed' ? 'SPD' :
                                                            stat.stat.name.toUpperCase() }}
                                </p>
                            </div>
                            <div class="values">
                                <div class="colored" :style="{ height: stat.base_stat / 2 + 'px'}">
                                    <p>{{ stat.base_stat }}</p>
                                </div>                                
                            </div>
                        </div>                        
                    </div>
</template>
<style lang="scss" scoped>
    .statusContainer{
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;                    
        border-radius: .4rem;                    
        padding: 5px;

        .stats{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            //border: 1px solid red;
            height: 150px;
            width: 50px;
            background-color: #b6c9f1;
            border-radius: 2.5rem 2.5rem .4rem .4rem;

            .statusTitle{
                
                background-color: var(--color-celesticBlue);
                border-radius: 50%;
                width: 100%;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                
            }

            .values{
                //border: 1px solid red;
                width: 100%;
                
                .colored{
                background-color: #526886;
                width: 100%;
                height: 100%;
                border-radius: 0 0 .2rem .2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                }
            }

            
        }
    }
    @media(max-width: 1325px){
        .statusContainer{            
            .stats{            
                width: 45px;
                .statusTitle{
                    height: 45px;
                }
            }
        }
    }
    @media(max-width: 1024px){
        .statusContainer{
            .stats{
                width: 70px;
                .statusTitle{
                    height: 70px;
                }
            }
            
        }
    }
    @media(max-width: 768px){
        .statusContainer{
            .stats{
                width: 50px;
                .statusTitle{
                    height: 50px;
                }
            }
        }
    }
    @media(max-width: 480px){
        .statusContainer{
            .stats{
                width: 45px;
                .statusTitle{
                    height: 45px;
                }
            }
        }
    }
    @media(max-width: 375px){
        .statusContainer{
            .stats{
                width: 40px;
                .statusTitle{
                    height: 40px;
                }
            }
        }
    }
</style>