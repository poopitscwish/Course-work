<template>
    {{ message }}
</template>
<script lang="ts">

import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
export default {
    name: "Home",
    setup() {
        const store = useStore();
        const message = ref('You are not logged in!')
        onMounted(async () => {
            try {
                const response = await fetch('http://localhost:3000/workers/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const content = await response.json();
                const job_id = await fetch(`http://localhost:3000/workers/jobID/${content.id}`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const id = await job_id.json();
                if (response.ok) {
                    message.value = `Привет ${content.id + ' ' + content.first_name + ' ' + content.second_name}`;
                    await store.dispatch('setAuth', true);
                    await store.dispatch('setWorkerId', id.job_id);
                }
                else {
                    message.value = ('You are not logged in!');
                    await store.dispatch('setAuth', false);
                }
            } catch (e) {
                message.value = ('Error');
            }
        });
        return {
            message
        }
    }
}
</script>

