<template>
    <table v-if="auth" class="table table-hover table-dark">
        <thead>
            <tr>
                <th v-for="column in columns" v-bind:key="column">
                    {{ column }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(record, recordIndex) in data" :key="recordIndex">
                <td v-for="(item, itemIndex) in record" :key="itemIndex">
                    <span v-if="itemIndex.toString() == 'id'">
                        {{ recordIndex+ 1 }}
                    </span>
                    <input id="staff" v-else-if="itemIndex.toString() == 'phone_number'" v-model=record[itemIndex]
                        v-mask="'+7##########'" type="tel">
                    <select v-else-if="itemIndex.toString() == 'job_id'" v-model=record[itemIndex] name="cars"
                        id="job_id">
                        <option v-if="item.toString() == 'Повар'" selected>{{ item }}</option>
                        <option v-else>Повар</option>
                        <option v-if="item.toString() == 'Официант'" selected>{{ item }}</option>
                        <option v-else>Официант</option>
                        <option v-if="item.toString() == 'Менеджер'" selected>{{ item }}</option>
                        <option v-else>Менеджер</option>
                        <option v-if="item.toString() == 'Заместитель директора'" selected>{{ item }}</option>
                        <option v-else>Заместитель Директора</option>
                        <option v-if="item.toString() == 'Директор'" selected>{{ item }}</option>
                        <option v-else>Директор</option>
                    </select>
                    <input id="staff" v-else v-model=record[itemIndex]>
                </td>
                <td>
                    <i v-on:click="update(record)" class="fa-solid fa-check me-3"></i>
                    <i v-on:click="delet(record)" class="fa-solid fa-xmark"></i>
                </td>
            </tr>
        </tbody>
    </table>
    <span v-else>
        You are not allowed to POOP
    </span>

</template>



<script lang="ts">
import { mask } from 'vue-the-mask'
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';


// import store from '../store/index';
export default {
    name: "Staff",
    directives: { mask },
    methods: {

        async update(record) {
            let job = '5';
            switch (record.job_id) {
                case 'Повар': {
                    job = '5';
                    break;
                }
                case 'Официант': {
                    job = '4';
                    break;
                }
                case 'Менеджер': {
                    job = '3';
                    break;
                }
                case 'Заместитель директора': {
                    job = '2';
                    break;
                }
                case 'Директор': {
                    job = '1';
                    break;
                }
                default: {
                    alert("Ошибка")
                }
            }
            if (confirm("Are you sure you want to update")) {
                await fetch(`http://localhost:3000/workers/${record.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    },
                    credentials: 'include',
                    body: JSON.stringify(
                        {
                            first_name: record.first_name,
                            second_name: record.second_name,
                            phone_number: record.phone_number,
                            last_name: record.last_name.trim(),
                            job_id: job
                        }
                    )
                });


                location.reload();
            }
        },

        async delet(record) {
            if (confirm("Are you sure you want to delete")) {
                await fetch(`http://localhost:3000/workers/${record.id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                location.reload();
            }
        },
    },

    setup() {
        const data = ref(Object);
        const store = useStore();
        const auth = computed(() => store.state.authenticated);
        const id = computed(() => store.state.worker_id);
        onMounted(async () => {
            try {
                const check = await fetch('http://localhost:3000/workers/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const user = await check.json();
                const job_id = await fetch(`http://localhost:3000/workers/jobID/${user.id}`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const id = await job_id.json();
                if (check.ok) {
                    await store.dispatch('setAuth', true);
                    await store.dispatch('setWorkerId', id.job_id);
                }
                else {
                    await store.dispatch('setAuth', false);
                }
                const response = await fetch('http://localhost:3000/workers', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const content = await response.json();
                content.forEach(c => {
                    c.job_id = c.job_id.name;
                });
                data.value = content;
            } catch (e) {
                // message.value = ('Error');
            }
        });
        return {
            id,
            data,
            columns: ["#", 'Фамилия', 'Имя', 'Отчество', 'Номер телефона', 'Должность', ' '],
            auth
        }
    }
}
</script>

<style>
table,
th,
td {
    border: 1px solid;
    text-align: center;

}

#staff {
    width: 80%;
}
</style>