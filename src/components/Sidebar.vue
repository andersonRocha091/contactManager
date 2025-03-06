<template>
<aside :class="`${isExpanded && 'is-expanded'}`">
    <div class="logo">
        <img src="../assets/vue.svg" alt="">
    </div>
    <div class="menu-toggle-wrap">
        <button class="menu-toggle" @click="toggleMenu">
            <span class="material-icons">keyboard_double_arrow_right</span>
        </button>
    </div>
    <h3>Menu</h3>
    <div class="menu">
        <router-link class="button" to="/contacts">
            <span class="material-icons">contacts</span>
            <span class="text">Contacts</span>
        </router-link>
        <router-link class="button" to="/analytics">
            <span class="material-icons">analytics</span>
            <span class="text">Analytics</span>
        </router-link>
    </div>

</aside>
</template>
<script setup>
import {ref} from 'vue';
const isExpanded = ref(false);
const toggleMenu = () => {
    isExpanded.value = !isExpanded.value;
}
</script>
<style lang="scss" scoped>
aside {
    display: flex;
    flex-direction: column;
    width: calc(2rem + 32px);
    overflow: hidden;
    min-height: 100vh;
    padding: 1rem;
 
    .logo {
        margin-bottom: 1rem;
        img {
            width: 2rem;
        }
    }
    background-color: var(--dark);
    color: var(--light);

    transition: 0.2s ease-out;
    
    .menu-toggle-wrap {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;

        position: relative;
        top: 0;
        transition: 0.2s easy-out;
        .menu-toggle {
            transition: 0.2s easy-out;

            .material-icons {
                font-size: 2rem;
                color: var(--light);
                transition: 0.2s easy-out;
            }

            &:hover {
                .material-icons {
                    color: var(--primary);
                    transform: translateX(0.5rem);
                }
            }
        }
    }
    
    h3, .button .text {
        opacity: 0;
        transition: 0.3s easy-out;
    } 

    h3 {
        color: var(--grey);
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    }

    .menu {
        margin: 0 -1rem;
        .button {
            display: flex;
            align-items: center;
            text-decoration: none;

            padding: 0.5rem 1rem;
            transition: 0.2s easy-out;

            .material-icons {
                font-size: 2rem;
                color: var(--light);
                transition: 0.2s easy-out;
            }

            .text {
                color: var(--light);
                transition: 0.2s easy-out;
            }
            &:hover, &.router-link-exact-active {
                background-color: var(--dark-alt);
            }

            .router-link-exact-active {
                border-right: 5px solid var(--primary);
            }
        }
    }
    &.is-expanded {
        width: var(--sidebar-width);
        
        .menu-toggle-wrap {
            top: -3rem;
            .menu-toggle {
                transform: rotate(-180deg);
            }
        }

         h3, .button .text {
            opacity: 1;
        }
        
        .button {
            .material-icons {
                margin-right: 1rem;
            }
        }

    }
    
    @media (max-width: 768px) {
       position: fixed;
       z-index: 99; 
    }
    
}
</style>