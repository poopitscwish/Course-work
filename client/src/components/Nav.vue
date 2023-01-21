<template>


    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">Главная</router-link>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <router-link to="/staff" class="nav-link active">Сотрудники</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/schedule" class="nav-link active">Расписание</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/total" class="nav-link active">Итоги дня</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/test" class="nav-link active">Test</router-link>
                    </li>

                </ul>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link active" v-if="!auth">Войти</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link active" v-if="!auth">Регистрация</router-link>
                    </li>
                    <li class="nav-item">
                        <a href="/login" class="nav-link active" v-if="auth" @click="logout">Выйти</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: "Nav",
    setup() {
        const store = useStore();
        const auth = computed(() => store.state.authenticated);
        const id = computed(() => store.state.worker_id);
        const logout = async () => {
            await fetch('http://localhost:3000/workers/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
        }
        return {
            id,
            auth,
            logout
        }
    }
}
</script>

<style>
/* #home{
    color: aliceblue;
} */
</style>

